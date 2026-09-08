import React from 'react';
import { Cpu, ShieldCheck, Zap, Globe, Sparkles, Heart } from 'lucide-react';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { Accordion } from '../common/Accordion';
import { ROUTES_SEO } from '../../lib/seo-config';

export const AboutPage: React.FC = () => {
  const seoMeta = ROUTES_SEO['/about'];

  return (
    <div className="w-full space-y-8 max-w-4xl mx-auto">
      <AdSenseBanner placement="top" />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineering Manifesto</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
          About JSONDev Suite
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Crafted for engineers who value privacy, sub-millisecond execution speeds, and clean developer aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-2">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-zinc-200">Sub-100ms LCP & Parsing</h2>
          <p className="text-xs text-zinc-400">
            Zero bloat, zero heavy third-party tracking scripts. Optimized for instantaneous initial render and streaming V8 parsing.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-2">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-zinc-200">Privacy-First Architecture</h2>
          <p className="text-xs text-zinc-400">
            Your payloads are never sent to a cloud backend. Data remains securely inside your browser's private memory sandbox.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-2">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-zinc-200">RFC 8259 Standard Strictness</h2>
          <p className="text-xs text-zinc-400">
            Enforcing standard JSON interchange specifications prevents syntax flaws before payloads enter production pipelines.
          </p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-xs text-zinc-300 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold text-zinc-100 font-sans">Why We Built JSONDev Suite</h2>
        <p>
          Every day, millions of developers, DevOps engineers, and QA specialists paste confidential production payloads into ad-ridden, sluggish online tools. Most of these tools lack basic privacy guarantees, and many send data back to untracked backend endpoints.
        </p>
        <p>
          We engineered JSONDev Suite as an enterprise-grade, privacy-first single-page application. By combining the speed of modern React, Tailwind CSS, and client-side V8 computation, we deliver an ultra-fast experience with zero server transmission.
        </p>
      </div>

      <Accordion items={seoMeta.faqs} title="Frequently Asked Questions About JSONDev Suite" />

      <AdSenseBanner placement="bottom" />
    </div>
  );
};
