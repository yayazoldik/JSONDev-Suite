import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Maximize2,
  Minimize2,
  Zap,
  CheckCircle2,
  Layers,
  Split,
  FileCode,
  Check
} from 'lucide-react';
import { parseJsonSafe, formatJsonString, minifyJsonString, autoRepairJson } from '../../lib/json-parser';
import { CodeEditor } from '../common/CodeEditor';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { Accordion } from '../common/Accordion';
import { PrivacyShieldBanner } from '../common/PrivacyShieldBanner';
import { ROUTES_SEO } from '../../lib/seo-config';
import { SAMPLE_JSONS } from '../../lib/utils';

export const JsonFormatterView: React.FC = () => {
  const [rawInput, setRawInput] = useState<string>(SAMPLE_JSONS.ecommerce.json);
  const [indentation, setIndentation] = useState<number>(2); // 2, 4, or -1 (tab)
  const [sortKeys, setSortKeys] = useState<boolean>(false);
  const [mode, setMode] = useState<'formatted' | 'minified'>('formatted');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const seoMeta = ROUTES_SEO['/json-formatter'];

  // Parse & stats
  const parseResult = useMemo(() => {
    return parseJsonSafe(rawInput);
  }, [rawInput]);

  // Output generation
  const formattedOutput = useMemo(() => {
    if (!rawInput.trim()) return '';
    if (mode === 'minified') {
      const res = minifyJsonString(rawInput);
      return res.minified;
    }
    const res = formatJsonString(rawInput, indentation, sortKeys);
    return res.formatted;
  }, [rawInput, indentation, sortKeys, mode]);

  const handleAutoRepair = () => {
    const repaired = autoRepairJson(rawInput);
    setRawInput(repaired);
  };

  const handleLoadSample = (key: keyof typeof SAMPLE_JSONS) => {
    if (SAMPLE_JSONS[key]) {
      setRawInput(SAMPLE_JSONS[key].json);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Ad Placement (CLS Protected) */}
      <AdSenseBanner placement="top" />

      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
            {seoMeta.badge}
          </span>
          <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> V8 In-Memory Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Free Online JSON Formatter & Beautifier
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Beautify, indent, validate, and minify unformatted JSON data instantly. Adjust whitespace indentation, sort keys alphabetically, and process payloads up to 10MB completely in your browser.
        </p>
      </div>

      {/* Privacy Shield Commitment */}
      <PrivacyShieldBanner />

      {/* Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm">
        {/* Left: Mode & Indentation Options */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-lg bg-zinc-950 p-1 border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setMode('formatted')}
              className={`px-3 py-1 rounded-md transition-all ${
                mode === 'formatted'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              2/4 Space Pretty
            </button>
            <button
              onClick={() => setMode('minified')}
              className={`px-3 py-1 rounded-md transition-all ${
                mode === 'minified'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Minify / Compact
            </button>
          </div>

          {mode === 'formatted' && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <span>Indent:</span>
              <select
                value={indentation}
                onChange={(e) => setIndentation(Number(e.target.value))}
                className="bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1 text-zinc-200 focus:outline-none focus:border-cyan-500"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={-1}>Tab (\t)</option>
              </select>
            </div>
          )}

          <label className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="rounded border-zinc-700 text-cyan-500 focus:ring-0 bg-zinc-950 w-3.5 h-3.5"
            />
            <span>Sort Keys (A-Z)</span>
          </label>
        </div>

        {/* Right: Real-time Stats Badge */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="hidden sm:inline">
            Latency: <strong className="text-emerald-400">{parseResult.stats.parseTimeMs}ms</strong>
          </span>
          <span>
            Size: <strong className="text-zinc-200">{parseResult.stats.sizeFormatted}</strong>
          </span>
          <span>
            Keys: <strong className="text-cyan-400">{parseResult.stats.keyCount}</strong>
          </span>
        </div>
      </div>

      {/* Side-by-Side Code Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <CodeEditor
            title="Raw / Input JSON"
            value={rawInput}
            onChange={setRawInput}
            error={parseResult.error}
            onAutoRepair={handleAutoRepair}
            onLoadSample={() => handleLoadSample('ecommerce')}
            placeholder="Paste your unformatted JSON payload here..."
          />
        </div>

        <div>
          <CodeEditor
            title={mode === 'minified' ? 'Minified Output' : 'Beautified Output'}
            value={formattedOutput}
            onChange={() => {}}
            readOnly={true}
            placeholder="Formatted output will display here instantly..."
          />
        </div>
      </div>

      {/* Comprehensive Technical SEO Copy (High Value Inventory to prevent AdSense rejection) */}
      <section className="mt-12 pt-8 border-t border-zinc-800 space-y-8">
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-6">
          <h2 className="text-xl font-bold text-zinc-100 font-sans tracking-tight">
            How to Use the Online JSON Formatter & Beautifier
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Formatting unorganized JSON files is a fundamental task for software developers, QA analysts, and data engineers. This tool provides an ultra-fast, zero-latency in-browser engine to transform raw JSON strings into clean, human-readable representations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="text-cyan-400 font-mono text-xs font-semibold uppercase mb-1">Step 1</div>
              <h3 className="text-sm font-bold text-zinc-200 mb-1">Paste or Upload</h3>
              <p className="text-xs text-zinc-400">
                Paste your unformatted string directly into the left editor or click "Sample" to load test datasets.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="text-cyan-400 font-mono text-xs font-semibold uppercase mb-1">Step 2</div>
              <h3 className="text-sm font-bold text-zinc-200 mb-1">Configure Indent & Sort</h3>
              <p className="text-xs text-zinc-400">
                Choose 2-space, 4-space, or tab indentation. Toggle "Sort Keys" to arrange nested properties alphabetically.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="text-cyan-400 font-mono text-xs font-semibold uppercase mb-1">Step 3</div>
              <h3 className="text-sm font-bold text-zinc-200 mb-1">Copy or Download</h3>
              <p className="text-xs text-zinc-400">
                Instantly copy the beautified JSON to your clipboard with one click, or download a clean <code>.json</code> file.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-zinc-100 font-sans tracking-tight">
            JSON vs XML vs YAML: A Structural Comparison
          </h2>
          <div className="overflow-x-auto not-prose my-4">
            <table className="w-full text-xs text-left text-zinc-300 border border-zinc-800 rounded-lg overflow-hidden font-mono">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Feature</th>
                  <th className="p-3">JSON (RFC 8259)</th>
                  <th className="p-3">YAML</th>
                  <th className="p-3">XML</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950/40">
                <tr>
                  <td className="p-3 font-semibold text-cyan-400">Payload Overhead</td>
                  <td className="p-3">Low (Minimal syntax)</td>
                  <td className="p-3">Lowest (Whitespace only)</td>
                  <td className="p-3 text-red-400">High (Closing tags)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-cyan-400">Browser Native Support</td>
                  <td className="p-3 text-emerald-400">Built-in (JSON.parse)</td>
                  <td className="p-3 text-amber-400">Requires 3rd-party library</td>
                  <td className="p-3">DOMParser</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-cyan-400">Comments Support</td>
                  <td className="p-3 text-zinc-500">No (Strict spec)</td>
                  <td className="p-3 text-emerald-400">Yes (# syntax)</td>
                  <td className="p-3 text-emerald-400">Yes (&lt;!-- --&gt;)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-cyan-400">Primary Use Case</td>
                  <td className="p-3">REST APIs & Web Services</td>
                  <td className="p-3">DevOps & CI/CD Configs</td>
                  <td className="p-3">Legacy Enterprise & SOAP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical FAQs with Accordion */}
        <Accordion items={seoMeta.faqs} title="Frequently Asked Questions: JSON Formatting & Minification" />
      </section>

      {/* Bottom AdSense Unit */}
      <AdSenseBanner placement="bottom" />
    </div>
  );
};
