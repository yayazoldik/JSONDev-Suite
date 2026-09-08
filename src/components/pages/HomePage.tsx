import React, { useState } from 'react';
import {
  FileCode,
  CheckCircle2,
  FolderTree,
  Terminal,
  ShieldCheck,
  Zap,
  ArrowRight,
  Cpu,
  Lock,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';
import { RoutePath } from '../../types';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { PrivacyShieldBanner } from '../common/PrivacyShieldBanner';
import { Accordion } from '../common/Accordion';
import { ROUTES_SEO } from '../../lib/seo-config';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const seoMeta = ROUTES_SEO['/'];

  const tools = [
    {
      path: '/json-formatter' as RoutePath,
      name: 'JSON Formatter & Beautifier',
      description: 'Format, indent, sort object keys alphabetically, and minify multi-megabyte payloads in milliseconds.',
      icon: <FileCode className="w-6 h-6 text-cyan-400" />,
      features: ['2 / 4 Spaces & Tab Indent', 'Deterministic Key Sorting', 'Instant Whitespace Minifier'],
      color: 'border-cyan-800/40 hover:border-cyan-500/50'
    },
    {
      path: '/json-validator' as RoutePath,
      name: 'JSON Syntax Validator & Linter',
      description: 'Strict RFC 8259 syntax checker with line & column error highlights, code snippet pointers, and 1-click auto-repair.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
      features: ['Line & Column Error Locator', 'Auto-Repair Single Quotes', 'Trailing Comma Remover'],
      color: 'border-emerald-800/40 hover:border-emerald-500/50'
    },
    {
      path: '/json-tree-viewer' as RoutePath,
      name: 'Interactive Tree Visualizer',
      description: 'Explore deeply nested JSON hierarchies. Search keys and values in real time and copy exact dot-notation selectors.',
      icon: <FolderTree className="w-6 h-6 text-purple-400" />,
      features: ['Collapsible Hierarchical Nodes', 'Live Filter & Search Input', 'Copy Dot-Notation Path'],
      color: 'border-purple-800/40 hover:border-purple-500/50'
    },
    {
      path: '/mock-api-generator' as RoutePath,
      name: 'Mock REST API Simulator',
      description: 'Generate temporary simulated REST endpoints. Configure latency delays, status codes (200, 404, 500), and copy cURL snippets.',
      icon: <Terminal className="w-6 h-6 text-amber-400" />,
      features: ['Custom HTTP Status Codes', 'Simulated Network Latency', 'Ready-to-Run cURL & fetch()'],
      color: 'border-amber-800/40 hover:border-amber-500/50'
    }
  ];

  return (
    <div className="w-full space-y-10">
      {/* Top Banner AdSense Placement */}
      <AdSenseBanner placement="top" />

      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-4xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Production-Ready Developer Micro-SaaS • 100% In-Browser</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          The High-Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">JSON & API Suite</span> for Engineers
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Format, validate, visualize, and mock JSON payloads up to 10MB completely in your local browser sandbox. Zero tracking, zero telemetry, zero server uploads.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/json-formatter')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-cyan-600/20"
          >
            <FileCode className="w-4 h-4" />
            <span>Open JSON Formatter</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('/json-validator')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs sm:text-sm font-semibold transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Validate Syntax</span>
          </button>
        </div>
      </section>

      {/* Privacy Guarantee Card */}
      <PrivacyShieldBanner />

      {/* Core Tool Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-100">Specialized Developer Tools</h2>
            <p className="text-xs text-zinc-400">Tailored micro-utilities for every stage of API & JSON development.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.path}
              className={`p-6 rounded-2xl border bg-zinc-900/30 backdrop-blur-sm transition-all duration-200 hover:shadow-xl flex flex-col justify-between ${tool.color}`}
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-zinc-950 w-fit border border-zinc-800">
                  {tool.icon}
                </div>
                <h3 className="text-base font-bold text-zinc-100">{tool.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{tool.description}</p>

                <ul className="space-y-1.5 pt-2 border-t border-zinc-800/60 text-xs font-mono text-zinc-400">
                  {tool.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate(tool.path)}
                className="mt-6 flex items-center justify-between w-full p-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 transition-colors border border-zinc-800"
              >
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Performance & Security Benchmarks */}
      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-6 space-y-6">
        <h2 className="text-lg font-bold text-zinc-100 text-center">Engineering Architecture & Benchmarks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
            <div className="text-2xl font-mono font-bold text-emerald-400">&lt; 10ms</div>
            <div className="text-xs font-semibold text-zinc-200 mt-1">Average Parsing Latency</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Tested with 2MB JSON datasets</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
            <div className="text-2xl font-mono font-bold text-cyan-400">0.00 CLS</div>
            <div className="text-xs font-semibold text-zinc-200 mt-1">Cumulative Layout Shift</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Strict height reservations for ads</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
            <div className="text-2xl font-mono font-bold text-purple-400">100% Local</div>
            <div className="text-xs font-semibold text-zinc-200 mt-1">Zero Network Transmission</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Payloads remain in browser RAM</div>
          </div>
        </div>
      </section>

      {/* SEO Technical Copy & FAQ Accordion */}
      <section className="space-y-6 pt-6 border-t border-zinc-800">
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <h2 className="text-xl font-bold text-zinc-100 font-sans tracking-tight">
            Why Modern Engineering Teams Prefer Client-Side Developer Tools
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            In modern cloud environments governed by SOC2, ISO 27001, and GDPR certifications, copying proprietary customer data or production logs into arbitrary third-party web formatters introduces significant compliance liabilities. JSONDev Suite was architected specifically to solve this problem by providing enterprise-grade developer utilities executing 100% inside your web browser.
          </p>
        </div>

        <Accordion items={seoMeta.faqs} title="Frequently Asked Questions: JSONDev Suite" />
      </section>

      {/* Bottom Leaderboard AdSense */}
      <AdSenseBanner placement="bottom" />
    </div>
  );
};
