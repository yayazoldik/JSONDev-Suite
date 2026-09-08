import { ParseErrorDetail, ParseStats } from '../types';
import { formatBytes } from './utils';

export function calculateDepth(obj: unknown): number {
  if (obj === null || typeof obj !== 'object') return 0;
  let maxDepth = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      maxDepth = Math.max(maxDepth, calculateDepth((obj as Record<string, unknown>)[key]));
    }
  }
  return 1 + maxDepth;
}

export function countKeys(obj: unknown): number {
  if (obj === null || typeof obj !== 'object') return 0;
  let count = 0;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      count += countKeys(item);
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        count += 1 + countKeys((obj as Record<string, unknown>)[key]);
      }
    }
  }
  return count;
}

export function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj).sort((a, b) => a.localeCompare(b));
    const sorted: Record<string, unknown> = {};
    for (const key of keys) {
      sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return obj;
}

export function parseJsonSafe(raw: string): {
  parsed: unknown | null;
  error: ParseErrorDetail | null;
  stats: ParseStats;
} {
  const t0 = performance.now();
  const trimmed = raw.trim();
  const sizeBytes = new Blob([raw]).size;
  const charCount = raw.length;
  const lineCount = raw ? raw.split('\n').length : 0;

  if (!trimmed) {
    return {
      parsed: null,
      error: null,
      stats: {
        sizeBytes: 0,
        sizeFormatted: '0 Bytes',
        charCount: 0,
        lineCount: 0,
        keyCount: 0,
        depth: 0,
        parseTimeMs: 0,
        isValid: false
      }
    };
  }

  try {
    const parsed = JSON.parse(raw);
    const parseTimeMs = Math.round((performance.now() - t0) * 100) / 100;
    const depth = calculateDepth(parsed);
    const keyCount = countKeys(parsed);

    return {
      parsed,
      error: null,
      stats: {
        sizeBytes,
        sizeFormatted: formatBytes(sizeBytes),
        charCount,
        lineCount,
        keyCount,
        depth,
        parseTimeMs,
        isValid: true
      }
    };
  } catch (err: unknown) {
    const parseTimeMs = Math.round((performance.now() - t0) * 100) / 100;
    const errorMessage = err instanceof Error ? err.message : String(err);
    const errorDetail = extractErrorPosition(raw, errorMessage);

    return {
      parsed: null,
      error: errorDetail,
      stats: {
        sizeBytes,
        sizeFormatted: formatBytes(sizeBytes),
        charCount,
        lineCount,
        keyCount: 0,
        depth: 0,
        parseTimeMs,
        isValid: false
      }
    };
  }
}

export function extractErrorPosition(raw: string, errorMessage: string): ParseErrorDetail {
  let line = 1;
  let column = 1;
  let suggestion: string | undefined = undefined;

  // V8 message pattern: "Unexpected token X in JSON at position 123"
  // or "at line X column Y"
  const lineColMatch = errorMessage.match(/line (\d+) column (\d+)/i);
  const positionMatch = errorMessage.match(/at position (\d+)/i);

  if (lineColMatch) {
    line = parseInt(lineColMatch[1], 10);
    column = parseInt(lineColMatch[2], 10);
  } else if (positionMatch) {
    const pos = parseInt(positionMatch[1], 10);
    const prefix = raw.slice(0, pos);
    const lines = prefix.split('\n');
    line = lines.length;
    column = lines[lines.length - 1].length + 1;
  } else {
    // Fallback: try to find unexpected tokens
    if (errorMessage.includes("Expected ',' or '}'")) {
      suggestion = "Check for a missing comma between properties or trailing comma.";
    } else if (errorMessage.includes("Unexpected token '")) {
      suggestion = "JSON requires standard double quotes (\") instead of single quotes (').";
    }
  }

  // Generate code snippet around error line
  const allLines = raw.split('\n');
  let snippet: string | undefined;
  if (line > 0 && line <= allLines.length) {
    const targetLine = allLines[line - 1];
    const pointer = ' '.repeat(Math.max(0, column - 1)) + '^';
    snippet = `${targetLine}\n${pointer}`;
  }

  if (!suggestion) {
    if (/trailing comma/i.test(errorMessage) || raw.includes(',\n}') || raw.includes(',\n]')) {
      suggestion = 'Trailing commas are forbidden in standard RFC 8259 JSON.';
    } else if (/'/.test(raw) && !raw.includes('"')) {
      suggestion = 'Keys and string values must be enclosed in double quotes ("), not single quotes.';
    } else if (/undefined|None|True|False/.test(raw)) {
      suggestion = 'Convert Python/JS keywords (None, True, False, undefined) to JSON equivalents (null, true, false).';
    } else {
      suggestion = 'Review syntax around the highlighted line and column for mismatched quotes or delimiters.';
    }
  }

  return {
    message: errorMessage,
    line,
    column,
    snippet,
    suggestion
  };
}

export function autoRepairJson(raw: string): string {
  let cleaned = raw;

  // 1. Remove single-line comments // ...
  cleaned = cleaned.replace(/\/\/[^\n\r]*/g, '');

  // 2. Remove multi-line comments /* ... */
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');

  // 3. Replace Python/JS keywords
  cleaned = cleaned.replace(/\bNone\b/g, 'null');
  cleaned = cleaned.replace(/\bundefined\b/g, 'null');
  cleaned = cleaned.replace(/\bTrue\b/g, 'true');
  cleaned = cleaned.replace(/\bFalse\b/g, 'false');

  // 4. Quote unquoted object keys e.g. { foo: "bar" } -> { "foo": "bar" }
  cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_$-]+)\s*:/g, '$1"$2":');

  // 5. Replace single quotes around keys and values:
  // Regex looks for 'value' and replaces with "value"
  cleaned = cleaned.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

  // 6. Remove trailing commas before } or ]
  cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');

  // Check if now valid
  try {
    const parsed = JSON.parse(cleaned);
    return JSON.stringify(parsed, null, 2);
  } catch {
    // If still invalid, return the best-effort cleaned string
    return cleaned;
  }
}

export function formatJsonString(
  raw: string,
  indentSpaces = 2,
  sortKeys = false
): { formatted: string; error: ParseErrorDetail | null } {
  try {
    let parsed = JSON.parse(raw);
    if (sortKeys) {
      parsed = sortObjectKeys(parsed);
    }
    const indent = indentSpaces === -1 ? '\t' : indentSpaces;
    const formatted = JSON.stringify(parsed, null, indent);
    return { formatted, error: null };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      formatted: raw,
      error: extractErrorPosition(raw, errorMessage)
    };
  }
}

export function minifyJsonString(raw: string): { minified: string; error: ParseErrorDetail | null } {
  try {
    const parsed = JSON.parse(raw);
    return { minified: JSON.stringify(parsed), error: null };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      minified: raw,
      error: extractErrorPosition(raw, errorMessage)
    };
  }
}
