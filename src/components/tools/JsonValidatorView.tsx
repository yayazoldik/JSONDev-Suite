import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Wand2,
  Sparkles,
  ShieldCheck,
  Check,
  FileCode,
  Bug,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { parseJsonSafe, autoRepairJson } from '../../lib/json-parser';
import { CodeEditor } from '../common/CodeEditor';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { Accordion } from '../common/Accordion';
import { PrivacyShieldBanner } from '../common/PrivacyShieldBanner';
import { ROUTES_SEO } from '../../lib/seo-config';
import { SAMPLE_JSONS } from '../../lib/utils';

// Invalid sample designed to test the validator and auto-fixer
const INVALID_SAMPLE = `{\n  // This JSON contains deliberate syntax bugs to test the validator!\n  username: 'alex_developer',\n  'role': 'Senior Architect',\n  preferences: {\n    theme: 'dark',\n    notifications: True,\n    betaAccess: undefined,\n  },\n  tags: [\n    "cloud",\n    "k8s",\n  ],\n}`;

export const JsonValidatorView: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>(INVALID_SAMPLE);
  const [schemaMode, setSchemaMode] = useState<boolean>(false);
  const [requiredFieldsInput, setRequiredFieldsInput] = useState<string>('username, preferences');

  const seoMeta = ROUTES_SEO['/json-validator'];

  const parseResult = useMemo(() => {
    return parseJsonSafe(inputJson);
  }, [inputJson]);

  // Schema validation test
  const schemaValidation = useMemo(() => {
    if (!parseResult.isValid || !parseResult.parsed || typeof parseResult.parsed !== 'object') {
      return null;
    }
    const reqs = requiredFieldsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const missing: string[] = [];
    const targetObj = parseResult.parsed as Record<string, unknown>;

    for (const req of reqs) {
      if (!(req in targetObj)) {
        missing.push(req);
      }
    }

    return {
      totalChecked: reqs.length,
      missing,
      passed: missing.length === 0
    };
  }, [parseResult, requiredFieldsInput]);

  const handleAutoRepair = () => {
    const repaired = autoRepairJson(inputJson);
    setInputJson(repaired);
  };

  const handleLoadValidSample = () => {
    setInputJson(SAMPLE_JSONS.userProfile.json);
  };

  const handleLoadBrokenSample = () => {
    setInputJson(INVALID_SAMPLE);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top AdSense Banner */}
      <AdSenseBanner placement="top" />

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
            {seoMeta.badge}
          </span>
          <span className="text-xs text-zinc-400 font-mono">RFC 8259 Standard Linter</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Free Online JSON Validator & Syntax Checker
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Validate JSON syntax in real time with line and column precision. Automatically detect and fix syntax errors, remove illegal comments, repair single quotes, and strip trailing commas.
        </p>
      </div>

      <PrivacyShieldBanner />

      {/* Validation Status Indicator Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${
            parseResult.isValid
              ? 'border-emerald-800/80 bg-emerald-950/20 text-emerald-300'
              : 'border-red-900/80 bg-red-950/30 text-red-300'
          }`}
        >
          {parseResult.isValid ? (
            <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-7 h-7 text-red-400 shrink-0" />
          )}
          <div>
            <div className="font-semibold text-sm">
              {parseResult.isValid ? 'Valid RFC 8259 JSON' : 'Syntax Error Detected'}
            </div>
            <div className="text-xs opacity-80 font-mono mt-0.5">
              {parseResult.isValid
                ? `Passed in ${parseResult.stats.parseTimeMs}ms • 0 syntax issues`
                : parseResult.error
                ? `Line ${parseResult.error.line}, Col ${parseResult.error.column}`
                : 'Invalid structure'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between text-xs font-mono">
          <div>
            <div className="text-zinc-400">Payload Metrics</div>
            <div className="text-zinc-200 font-bold text-sm mt-0.5">
              {parseResult.stats.sizeFormatted} • {parseResult.stats.lineCount} lines
            </div>
          </div>
          <div className="text-right">
            <div className="text-zinc-400">Total Keys</div>
            <div className="text-cyan-400 font-bold text-sm mt-0.5">{parseResult.stats.keyCount}</div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400">Auto-Fix Engine</div>
            <div className="text-xs text-zinc-200 font-medium mt-0.5">Heuristic Repair Available</div>
          </div>
          <button
            onClick={handleAutoRepair}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Auto-Repair</span>
          </button>
        </div>
      </div>

      {/* Quick Test Payloads Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Test Payloads:</span>
          <button
            onClick={handleLoadBrokenSample}
            className="px-2.5 py-1 rounded bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/50 transition-colors"
          >
            Broken JSON (Test Errors)
          </button>
          <button
            onClick={handleLoadValidSample}
            className="px-2.5 py-1 rounded bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 transition-colors"
          >
            Valid User JSON
          </button>
        </div>

        <button
          onClick={() => setSchemaMode(!schemaMode)}
          className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
        >
          {schemaMode ? 'Hide Schema Checks' : 'Test Required Keys / Schema'}
        </button>
      </div>

      {/* Schema Verification Panel */}
      {schemaMode && (
        <div className="p-4 rounded-xl border border-cyan-900/50 bg-cyan-950/20 text-xs space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between font-mono">
            <span className="font-semibold text-cyan-300">Required Object Properties Checker</span>
            {schemaValidation && (
              <span
                className={`px-2 py-0.5 rounded font-mono ${
                  schemaValidation.passed ? 'bg-emerald-900/60 text-emerald-300' : 'bg-red-900/60 text-red-300'
                }`}
              >
                {schemaValidation.passed ? 'All Required Keys Present' : `${schemaValidation.missing.length} Missing`}
              </span>
            )}
          </div>
          <input
            type="text"
            value={requiredFieldsInput}
            onChange={(e) => setRequiredFieldsInput(e.target.value)}
            placeholder="e.g. id, username, email, preferences"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-zinc-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
          />
          {schemaValidation && !schemaValidation.passed && (
            <div className="text-red-400 font-mono text-[11px]">
              Missing required keys: {schemaValidation.missing.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Main Code Editor */}
      <CodeEditor
        title="JSON Payload to Validate"
        value={inputJson}
        onChange={setInputJson}
        error={parseResult.error}
        onAutoRepair={handleAutoRepair}
        placeholder="Paste your JSON to validate syntax..."
        heightClass="h-[480px]"
      />

      {/* Educational Technical Content (AdSense Valuable Content Protection) */}
      <section className="mt-12 pt-8 border-t border-zinc-800 space-y-8">
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-6">
          <h2 className="text-xl font-bold text-zinc-100 font-sans tracking-tight flex items-center gap-2">
            <Bug className="w-5 h-5 text-cyan-400" />
            Top 5 Most Frequent JSON Parsing Errors & How to Fix Them
          </h2>

          <div className="space-y-4 not-prose">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-red-400">
                <span>1. Trailing Comma (Trailing Delimiter Error)</span>
              </div>
              <p className="text-xs text-zinc-300">
                Unlike JavaScript, Python dictionaries, or modern TypeScript objects, the JSON standard (RFC 8259) strictly forbids trailing commas after the final element in an array or object.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-red-950/30 border border-red-900/40 text-red-300">
                  ❌ Incorrect: <code>{`{ "items": [1, 2,] }`}</code>
                </div>
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                  ✅ Compliant: <code>{`{ "items": [1, 2] }`}</code>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-red-400">
                <span>2. Single Quotes Instead of Double Quotes</span>
              </div>
              <p className="text-xs text-zinc-300">
                JSON keys and string values must always be wrapped in standard double quotes (<code>"</code>). Single quotes (<code>'</code>) cause instant syntax errors across all standard JSON parsers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-red-950/30 border border-red-900/40 text-red-300">
                  ❌ Incorrect: <code>{`{ 'user': 'john' }`}</code>
                </div>
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                  ✅ Compliant: <code>{`{ "user": "john" }`}</code>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-red-400">
                <span>3. Unquoted Property Names (Keys)</span>
              </div>
              <p className="text-xs text-zinc-300">
                All property keys in JSON must be enclosed in double quotes. Omitting quotes is acceptable in JavaScript object literals, but illegal in JSON.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-red-950/30 border border-red-900/40 text-red-300">
                  ❌ Incorrect: <code>{`{ status: "ok" }`}</code>
                </div>
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                  ✅ Compliant: <code>{`{ "status": "ok" }`}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Accordion items={seoMeta.faqs} title="Frequently Asked Questions: JSON Syntax & Validation" />
      </section>

      {/* Bottom AdSense Banner */}
      <AdSenseBanner placement="bottom" />
    </div>
  );
};
