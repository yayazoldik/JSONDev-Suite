import React, { useRef, useEffect, useState } from 'react';
import {
  Copy,
  Check,
  Download,
  Trash2,
  FileText,
  AlertTriangle,
  ClipboardPaste,
  Wand2,
  FileCode,
  Sparkles
} from 'lucide-react';
import { ParseErrorDetail } from '../../types';
import { copyToClipboard, downloadJsonFile, cn } from '../../lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: ParseErrorDetail | null;
  onAutoRepair?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  title?: string;
  onLoadSample?: () => void;
  heightClass?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  error,
  onAutoRepair,
  placeholder = 'Paste or type JSON here...',
  readOnly = false,
  title = 'JSON Input',
  onLoadSample,
  heightClass = 'h-[440px]'
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = value ? value.split('\n') : [''];
  const lineCount = lines.length;

  // Synchronize line numbers scroll with textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleCopy = async () => {
    if (!value) return;
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onChange(text);
        }
      }
    } catch {
      // Fallback: user can paste directly into textarea
      textareaRef.current?.focus();
    }
  };

  const handleDownload = () => {
    if (!value) return;
    downloadJsonFile(value, 'payload.json');
  };

  const handleClear = () => {
    onChange('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col w-full rounded-xl border border-zinc-800 bg-zinc-950 shadow-md overflow-hidden">
      {/* Editor Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 px-4 py-2.5 bg-zinc-900/60 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-300">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>{title}</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            {lineCount} lines • {new Blob([value]).size} bytes
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {!readOnly && (
            <>
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors border border-zinc-750"
                title="Paste from Clipboard"
              >
                <ClipboardPaste className="w-3.5 h-3.5 text-cyan-400" />
                <span>Paste</span>
              </button>

              {onLoadSample && (
                <button
                  type="button"
                  onClick={onLoadSample}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors border border-zinc-750"
                  title="Load Sample JSON Data"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sample</span>
                </button>
              )}

              {onAutoRepair && error && (
                <button
                  type="button"
                  onClick={onAutoRepair}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-medium transition-colors border border-emerald-700/60 animate-pulse"
                  title="Automatically fix quotes, trailing commas, and unquoted keys"
                >
                  <Wand2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Auto-Repair</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleClear}
                disabled={!value}
                className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-red-950/40 text-zinc-400 hover:text-red-400 text-xs font-medium transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-zinc-400"
                title="Clear content"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors disabled:opacity-40"
            title="Copy JSON to Clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={!value}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors disabled:opacity-40"
            title="Download formatted .json file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Editor Body with Gutter Line Numbers */}
      <div className={cn('relative flex w-full bg-zinc-950 font-mono text-xs overflow-hidden', heightClass)}>
        {/* Line Numbers Gutter */}
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="w-12 shrink-0 select-none overflow-hidden bg-zinc-900/40 border-r border-zinc-800/80 py-3 text-right pr-2.5 font-mono text-zinc-600 leading-[20px]"
        >
          {Array.from({ length: Math.max(1, lineCount) }).map((_, i) => {
            const isErrorLine = error && error.line === i + 1;
            return (
              <div
                key={i}
                className={cn(
                  'transition-colors',
                  isErrorLine ? 'text-red-400 font-bold bg-red-950/40 px-1 -mx-1 rounded' : ''
                )}
              >
                {i + 1}
              </div>
            );
          })}
        </div>

        {/* Textarea Area */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          className="flex-1 w-full resize-none bg-transparent p-3 text-zinc-200 placeholder-zinc-600 focus:outline-none leading-[20px] font-mono selection:bg-cyan-500/30 selection:text-cyan-200 whitespace-pre overflow-auto"
        />
      </div>

      {/* Real-time Syntax Error Warning Banner */}
      {error && (
        <div className="border-t border-red-900/60 bg-red-950/40 px-4 py-2.5 flex items-start gap-2.5 text-xs text-red-200">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-red-300">Syntax Error</span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-red-900/40 text-red-300 border border-red-800/60">
                Line {error.line}, Column {error.column}
              </span>
            </div>
            <p className="text-red-300/90 mt-1 font-mono text-[11px] break-all">{error.message}</p>
            {error.suggestion && (
              <p className="text-zinc-300 text-[11px] mt-1 flex items-center gap-1">
                <span className="text-emerald-400 font-semibold font-mono">Suggested Fix:</span>{' '}
                {error.suggestion}
              </p>
            )}
            {error.snippet && (
              <pre className="mt-1.5 p-2 rounded bg-black/60 border border-red-900/40 font-mono text-[11px] text-red-300 overflow-x-auto">
                {error.snippet}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
