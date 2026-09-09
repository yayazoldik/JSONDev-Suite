import React from 'react';
import { RoutePath } from '../../types';
import { FileJson, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-16 border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Privacy Commitment */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden border border-cyan-500/30 bg-zinc-900 shrink-0">
                <img
                  src="/logo.jpg"
                  alt="JSONFlow Logo"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-mono text-sm font-bold text-zinc-100">JSONFlow</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ultra-fast, privacy-first developer utility for formatting, validating, exploring, and mocking JSON payloads entirely client-side at jsonflow.dev.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero server retention guarantee</span>
            </div>
          </div>

          {/* Col 2: Developer Tools */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Developer Utilities
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/json-formatter')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  JSON Formatter & Beautifier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/json-validator')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  JSON Syntax Validator & Linter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/json-tree-viewer')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Interactive Tree Visualizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mock-api-generator')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Mock REST API Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Trust & Legal Compliance
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  Privacy Policy <span className="text-[10px] text-emerald-400 font-mono">(GDPR)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms-of-service')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Our Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact & Developer Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical SEO & Crawlers */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Technical SEO & Crawlers
            </h3>
            <ul className="space-y-2">
              <li>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('/sitemap')}
                    className="hover:text-cyan-400 transition-colors font-mono"
                  >
                    XML Sitemap
                  </button>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono transition-colors"
                  >
                    .xml ↗
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('/robots')}
                    className="hover:text-cyan-400 transition-colors font-mono"
                  >
                    Robots Directives
                  </button>
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono transition-colors"
                  >
                    .txt ↗
                  </a>
                </div>
              </li>
              <li className="pt-2">
                <div className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-[11px] text-zinc-400 leading-relaxed">
                  <span className="font-semibold text-zinc-300">Google Core Web Vitals:</span> Sub-millisecond TTFB, 0.00 Cumulative Layout Shift (CLS), and 100/100 Lighthouse SEO architecture.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} JSONFlow (jsonflow.dev). Built for high-velocity software engineering teams.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">RFC 8259 Standard Compliant</span>
            <span>•</span>
            <span className="font-mono">100% Client-Side V8 Sandbox</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
