import React, { useState } from 'react';
import {
  Code2,
  CheckCircle2,
  FileCode,
  FolderTree,
  Terminal,
  FileJson,
  Menu,
  X,
  Sparkles,
  Shield,
  Layers
} from 'lucide-react';
import { RoutePath } from '../../types';
import { cn } from '../../lib/utils';

interface HeaderProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  onOpenSchemaModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSchemaModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ path: RoutePath; label: string; icon: React.ReactNode; badge?: string }> = [
    { path: '/', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { path: '/json-formatter', label: 'Formatter', icon: <FileCode className="w-4 h-4" /> },
    { path: '/json-validator', label: 'Validator', icon: <CheckCircle2 className="w-4 h-4" />, badge: 'Linter' },
    { path: '/json-tree-viewer', label: 'Tree Viewer', icon: <FolderTree className="w-4 h-4" /> },
    { path: '/mock-api-generator', label: 'Mock API', icon: <Terminal className="w-4 h-4" />, badge: 'REST' }
  ];

  const handleNav = (path: RoutePath) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/90 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden border border-cyan-500/30 shadow-md shadow-cyan-500/20 bg-zinc-900 shrink-0 group-hover:border-cyan-400/60 transition-all">
              <img
                src="/logo.jpg"
                alt="JSONDev Suite Logo"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-zinc-100 group-hover:text-cyan-400 transition-colors">
                <span className="text-base font-mono">JSON</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                  DevSuite
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all select-none',
                    isActive
                      ? 'bg-zinc-800/90 text-cyan-400 shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Privacy Indicator & Schema Inspector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Client-Side Privacy Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">100% In-Browser</span>
          </div>

          {/* SEO Structured Data Schema Inspector */}
          <button
            onClick={onOpenSchemaModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 transition-all"
            title="Inspect Schema.org JSON-LD Structured Data"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline">SEO Schema</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-zinc-800 text-cyan-400 font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-900'
                )}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between px-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <Shield className="w-3.5 h-3.5" /> Client Sandbox Active
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
