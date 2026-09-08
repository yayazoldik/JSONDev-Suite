import React, { useState, useMemo } from 'react';
import {
  FolderTree,
  ChevronRight,
  ChevronDown,
  Search,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Hash,
  Type,
  ToggleLeft,
  X,
  FileCode
} from 'lucide-react';
import { parseJsonSafe } from '../../lib/json-parser';
import { CodeEditor } from '../common/CodeEditor';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { Accordion } from '../common/Accordion';
import { PrivacyShieldBanner } from '../common/PrivacyShieldBanner';
import { ROUTES_SEO } from '../../lib/seo-config';
import { SAMPLE_JSONS, copyToClipboard } from '../../lib/utils';

// Helper component for recursive tree nodes
interface TreeNodeProps {
  name: string;
  value: unknown;
  path: string;
  searchTerm: string;
  isRoot?: boolean;
  defaultExpanded?: boolean;
  onCopyPath: (path: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  name,
  value,
  path,
  searchTerm,
  isRoot = false,
  defaultExpanded = true,
  onCopyPath
}) => {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);

  // Search matching
  const matchesSearch = useMemo(() => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    if (name.toLowerCase().includes(term)) return true;
    if (!isObject && String(value).toLowerCase().includes(term)) return true;
    return false;
  }, [name, value, searchTerm, isObject]);

  const handleCopyPath = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyPath(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Render Primitive Value
  const renderPrimitive = (val: unknown) => {
    if (val === null) {
      return <span className="text-zinc-500 font-mono italic">null</span>;
    }
    if (typeof val === 'string') {
      return <span className="text-emerald-400 font-mono font-medium">"{val}"</span>;
    }
    if (typeof val === 'number') {
      return <span className="text-cyan-400 font-mono font-medium">{val}</span>;
    }
    if (typeof val === 'boolean') {
      return <span className="text-amber-400 font-mono font-bold">{val ? 'true' : 'false'}</span>;
    }
    return <span className="text-zinc-400 font-mono">{String(val)}</span>;
  };

  if (!matchesSearch && !isObject) {
    return null;
  }

  return (
    <div className="font-mono text-xs select-none">
      <div
        onClick={() => isObject && setExpanded(!expanded)}
        className={`flex items-center gap-1.5 py-1 px-1.5 rounded-md hover:bg-zinc-800/60 group transition-colors cursor-pointer ${
          matchesSearch && searchTerm ? 'bg-cyan-950/40 text-cyan-200' : ''
        }`}
      >
        {/* Toggle Icon */}
        {isObject ? (
          <button
            type="button"
            className="p-0.5 text-zinc-500 group-hover:text-zinc-300"
            aria-label="Toggle Node"
          >
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <span className="w-3.5" />
        )}

        {/* Property Key Name */}
        {!isRoot && (
          <span className="text-zinc-300 font-semibold group-hover:text-zinc-100">
            {name}
            <span className="text-zinc-600 mr-1">:</span>
          </span>
        )}

        {/* Value or Collection Summary */}
        {isObject ? (
          <span className="text-zinc-500 text-[11px]">
            {isArray ? (
              <span className="text-purple-400 bg-purple-950/40 px-1.5 py-0.2 rounded border border-purple-800/40">
                Array[{(value as unknown[]).length}]
              </span>
            ) : (
              <span className="text-blue-400 bg-blue-950/40 px-1.5 py-0.2 rounded border border-blue-800/40">
                Object{`{${Object.keys(value as Record<string, unknown>).length}}`}
              </span>
            )}
          </span>
        ) : (
          <div className="truncate max-w-md">{renderPrimitive(value)}</div>
        )}

        {/* Copy Node Path button on hover */}
        <button
          type="button"
          onClick={handleCopyPath}
          title={`Copy path: ${path}`}
          className="ml-auto opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-cyan-300 transition-opacity flex items-center gap-1 text-[10px]"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span className="hidden sm:inline font-mono">{copied ? 'Path Copied' : 'Path'}</span>
        </button>
      </div>

      {/* Children */}
      {isObject && expanded && (
        <div className="pl-4 border-l border-zinc-800/80 ml-2 space-y-0.5 my-0.5">
          {isArray
            ? (value as unknown[]).map((item, idx) => (
                <TreeNode
                  key={idx}
                  name={`[${idx}]`}
                  value={item}
                  path={`${path}[${idx}]`}
                  searchTerm={searchTerm}
                  defaultExpanded={defaultExpanded}
                  onCopyPath={onCopyPath}
                />
              ))
            : Object.entries(value as Record<string, unknown>).map(([k, v]) => (
                <TreeNode
                  key={k}
                  name={k}
                  value={v}
                  path={path ? `${path}.${k}` : k}
                  searchTerm={searchTerm}
                  defaultExpanded={defaultExpanded}
                  onCopyPath={onCopyPath}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export const JsonTreeViewer: React.FC = () => {
  const [rawInput, setRawInput] = useState<string>(SAMPLE_JSONS.ecommerce.json);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'treeOnly'>('split');

  const seoMeta = ROUTES_SEO['/json-tree-viewer'];

  const parseResult = useMemo(() => {
    return parseJsonSafe(rawInput);
  }, [rawInput]);

  const handleCopyPath = (path: string) => {
    copyToClipboard(path);
    setCopiedNotification(path);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div className="w-full space-y-6">
      <AdSenseBanner placement="top" />

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
            {seoMeta.badge}
          </span>
          <span className="text-xs text-zinc-400 font-mono">Interactive Node Navigator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Interactive JSON Tree Viewer & Visualizer
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Inspect, traverse, and filter complex hierarchical JSON trees. Expand and collapse nested objects, copy dot-notation accessor paths, and search across all keys and values in real time.
        </p>
      </div>

      <PrivacyShieldBanner />

      {/* Tree Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm">
        {/* Search / Filter Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keys, values, tags, or arrays..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-8 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 font-mono focus:outline-none focus:border-cyan-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setViewMode(viewMode === 'split' ? 'treeOnly' : 'split')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 transition-colors"
          >
            {viewMode === 'split' ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            <span>{viewMode === 'split' ? 'Tree Fullscreen' : 'Split View'}</span>
          </button>
        </div>
      </div>

      {/* Path Copied Feedback Toast */}
      {copiedNotification && (
        <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in fade-in duration-150">
          <span>Copied path selector: <strong>{copiedNotification}</strong></span>
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Main Workspace */}
      <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {viewMode === 'split' && (
          <div>
            <CodeEditor
              title="JSON Source Input"
              value={rawInput}
              onChange={setRawInput}
              error={parseResult.error}
              placeholder="Paste JSON to generate interactive tree..."
              heightClass="h-[520px]"
            />
          </div>
        )}

        {/* Tree Render Container */}
        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 shadow-md overflow-hidden h-[570px]">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5 bg-zinc-900/60 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300">
              <FolderTree className="w-4 h-4 text-purple-400" />
              <span className="font-semibold">Interactive Tree Inspector</span>
            </div>
            <div className="text-zinc-500 text-[11px]">
              {parseResult.isValid
                ? `Depth: ${parseResult.stats.depth} • Keys: ${parseResult.stats.keyCount}`
                : 'Invalid JSON'}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 bg-zinc-950">
            {parseResult.isValid && parseResult.parsed !== null ? (
              <TreeNode
                name="root"
                value={parseResult.parsed}
                path="data"
                searchTerm={searchTerm}
                isRoot={true}
                defaultExpanded={true}
                onCopyPath={handleCopyPath}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-xs space-y-2">
                <FolderTree className="w-8 h-8 text-zinc-700" />
                <p>Provide valid JSON in the editor to inspect interactive tree nodes.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Technical Guide */}
      <section className="mt-12 pt-8 border-t border-zinc-800 space-y-8">
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <h2 className="text-xl font-bold text-zinc-100 font-sans tracking-tight">
            How to Use the Interactive JSON Tree Visualizer
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The JSON Tree Viewer converts arbitrary JSON structures into an expandable and searchable hierarchical tree. This eliminates the visual cognitive load of manually tracking matching brackets and nested arrays in multi-megabyte payloads.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
              <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase mb-1">
                Real-Time Node Search
              </h3>
              <p className="text-xs text-zinc-400">
                Filter keys, nested strings, and numbers instantly. Matching nodes are highlighted with cyan accents while retaining their full parent hierarchy.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
              <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase mb-1">
                One-Click Dot Path Copy
              </h3>
              <p className="text-xs text-zinc-400">
                Hover over any property or array index to copy dot-notation accessor paths (e.g. <code>data.products[0].specifications.resolution</code>) for unit tests or frontend code.
              </p>
            </div>
          </div>
        </div>

        <Accordion items={seoMeta.faqs} title="Frequently Asked Questions: JSON Tree Visualizer" />
      </section>

      <AdSenseBanner placement="bottom" />
    </div>
  );
};
