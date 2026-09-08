import React from 'react';
import {
  FileCode,
  CheckCircle2,
  FolderTree,
  Terminal,
  Database,
  ShieldCheck,
  Zap,
  Sparkles,
  Info
} from 'lucide-react';
import { RoutePath } from '../../types';
import { cn } from '../../lib/utils';
import { AdSenseBanner } from '../ads/AdSenseBanner';

interface SidebarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  onLoadSample?: (sampleKey: 'ecommerce' | 'userProfile' | 'geojson') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate, onLoadSample }) => {
  const tools: Array<{
    path: RoutePath;
    name: string;
    description: string;
    icon: React.ReactNode;
    tag?: string;
  }> = [
    {
      path: '/json-formatter',
      name: 'JSON Formatter',
      description: 'Beautify, indent, & minify',
      icon: <FileCode className="w-4 h-4 text-cyan-400" />,
      tag: 'Popular'
    },
    {
      path: '/json-validator',
      name: 'JSON Validator',
      description: 'Line errors & auto-repair',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      tag: 'RFC 8259'
    },
    {
      path: '/json-tree-viewer',
      name: 'Tree Viewer',
      description: 'Interactive node search',
      icon: <FolderTree className="w-4 h-4 text-purple-400" />
    },
    {
      path: '/mock-api-generator',
      name: 'Mock REST API',
      description: 'Simulate endpoints & curl',
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      tag: 'New'
    }
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-5">
      {/* Tools Navigation Card */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
        <div className="flex items-center justify-between px-2 pb-2.5 mb-1.5 border-b border-zinc-800/60">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> Developer Tools
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">v2.4</span>
        </div>

        <div className="space-y-1">
          {tools.map((tool) => {
            const isActive = currentPath === tool.path;
            return (
              <button
                key={tool.path}
                onClick={() => onNavigate(tool.path)}
                className={cn(
                  'w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-all group select-none',
                  isActive
                    ? 'bg-zinc-800 border border-zinc-700/80 text-zinc-100 shadow-sm'
                    : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 border border-transparent'
                )}
              >
                <div
                  className={cn(
                    'p-1.5 rounded-md mt-0.5 transition-colors',
                    isActive ? 'bg-zinc-900' : 'bg-zinc-900/60 group-hover:bg-zinc-800'
                  )}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'text-xs font-semibold truncate',
                        isActive ? 'text-cyan-300' : 'text-zinc-200 group-hover:text-zinc-100'
                      )}
                    >
                      {tool.name}
                    </span>
                    {tool.tag && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 font-mono">
                        {tool.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{tool.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Sample JSON Injector */}
      {onLoadSample && (
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 px-1 mb-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Load Sample Payloads</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => onLoadSample('ecommerce')}
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/60 text-left text-xs text-zinc-300 hover:text-cyan-300 transition-colors"
            >
              <span>E-commerce Catalog</span>
              <span className="text-[10px] text-zinc-500 font-mono">1.2 KB</span>
            </button>
            <button
              onClick={() => onLoadSample('userProfile')}
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/60 text-left text-xs text-zinc-300 hover:text-cyan-300 transition-colors"
            >
              <span>User Profile & RBAC</span>
              <span className="text-[10px] text-zinc-500 font-mono">1.1 KB</span>
            </button>
            <button
              onClick={() => onLoadSample('geojson')}
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/60 text-left text-xs text-zinc-300 hover:text-cyan-300 transition-colors"
            >
              <span>GeoJSON Coordinates</span>
              <span className="text-[10px] text-zinc-500 font-mono">0.8 KB</span>
            </button>
          </div>
        </div>
      )}

      {/* Mandatory Google AdSense 300x250 Sidebar Slot */}
      <div className="w-full">
        <AdSenseBanner placement="sidebar" />
      </div>

      {/* Trust & Architecture Checklist */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-3 text-xs text-zinc-400 space-y-2">
        <div className="flex items-center gap-1.5 font-semibold text-zinc-300 text-[11px] font-mono uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Compliance & Privacy
        </div>
        <ul className="space-y-1 text-[11px] text-zinc-400">
          <li className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            100% In-Browser Computation
          </li>
          <li className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Zero Server Logs or Telemetry
          </li>
          <li className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            AdSense Program Compliant
          </li>
        </ul>
      </div>
    </aside>
  );
};
