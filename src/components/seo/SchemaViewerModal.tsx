import React, { useState } from 'react';
import { Code2, Copy, Check, ExternalLink, X, FileJson, Sparkles } from 'lucide-react';
import { RouteMeta } from '../../types';
import { generateStructuredData } from '../../lib/seo-config';
import { copyToClipboard } from '../../lib/utils';

interface SchemaViewerModalProps {
  meta: RouteMeta;
  isOpen: boolean;
  onClose: () => void;
}

export const SchemaViewerModal: React.FC<SchemaViewerModalProps> = ({ meta, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const schemaData = generateStructuredData(meta);
  const jsonString = JSON.stringify(schemaData, null, 2);

  const handleCopy = async () => {
    const ok = await copyToClipboard(jsonString);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4 bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                Structured Data Inspector (JSON-LD)
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Active in &lt;head&gt;
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Live Schema.org markup injected on <code className="text-cyan-300 font-mono">{meta.path}</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-3 bg-zinc-900/30 border-b border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Targeting Google Rich Snippets: WebApplication, BreadcrumbList, FAQPage
          </span>
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
          >
            Test on Google Rich Results <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-950 font-mono text-xs">
          <pre className="text-zinc-300 selection:bg-cyan-500/30 whitespace-pre-wrap leading-relaxed">
            {jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-3 bg-zinc-900/50">
          <span className="text-xs text-zinc-500 font-mono">
            {schemaData.length} schema nodes active
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors border border-zinc-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied JSON-LD' : 'Copy JSON-LD'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
