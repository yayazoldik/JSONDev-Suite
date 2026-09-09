import React from 'react';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { Accordion } from '../common/Accordion';
import { ROUTES_SEO } from '../../lib/seo-config';

export const TermsPage: React.FC = () => {
  const seoMeta = ROUTES_SEO['/terms-of-service'];

  return (
    <div className="w-full space-y-8 max-w-4xl mx-auto">
      <AdSenseBanner placement="top" />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>Last Updated: September 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Please read these terms carefully before using JSONFlow (jsonflow.dev). By accessing or using our developer tools, you agree to be bound by these terms.
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-xs text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">1. License & Permitted Use</h2>
          <p>
            JSONFlow grants you a non-exclusive, worldwide, royalty-free license to use all formatting, validation, tree visualization, and mock API simulation tools for both personal, commercial, and enterprise software development workflows.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">2. Client-Side Processing Warranty</h2>
          <p>
            Our software runs client-side inside your browser sandbox. You retain 100% intellectual property, confidentiality, and ownership rights over any code or data formatted through our tools.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">3. Disclaimer of Warranty</h2>
          <p>
            JSONFlow is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. While our parsing logic enforces strict compliance with IETF RFC 8259, you are solely responsible for testing and verifying payloads in critical production systems.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">4. Prohibited Uses</h2>
          <p>
            You agree not to disrupt, overload, or reverse-engineer the delivery network or automated ad integrations of this application.
          </p>
        </section>
      </div>

      <Accordion items={seoMeta.faqs} title="Frequently Asked Questions: Terms of Service" />

      <AdSenseBanner placement="bottom" />
    </div>
  );
};
