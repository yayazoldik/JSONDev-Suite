import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Globe } from 'lucide-react';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { Accordion } from '../common/Accordion';
import { ROUTES_SEO } from '../../lib/seo-config';

export const PrivacyPolicyPage: React.FC = () => {
  const seoMeta = ROUTES_SEO['/privacy-policy'];

  return (
    <div className="w-full space-y-8 max-w-4xl mx-auto">
      <AdSenseBanner placement="top" />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Last Updated: September 2026 • GDPR & CCPA Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          At JSONFlow (jsonflow.dev), developer confidentiality and transparency are our highest engineering commitments. This policy describes how we handle information when you use our web utilities.
        </p>
      </div>

      {/* Core Privacy Summary */}
      <div className="p-5 rounded-xl border border-emerald-800/60 bg-emerald-950/20 space-y-2">
        <h2 className="text-base font-bold text-emerald-300 flex items-center gap-2">
          <Lock className="w-4 h-4" /> 100% In-Browser Computation Architecture
        </h2>
        <p className="text-xs text-zinc-300 leading-relaxed">
          All JSON payloads, API response bodies, authorization headers, and schemas pasted or loaded into JSONFlow are processed purely within your device’s local memory (RAM) and web browser JavaScript runtime. We do not transmit, log, inspect, or retain your JSON content on any remote server.
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-xs text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">1. Information We Do NOT Collect</h2>
          <p>
            When utilizing the JSON Formatter, JSON Validator, JSON Tree Viewer, or Mock API Generator, your source code and data payloads are never dispatched to our infrastructure. Even if your payload contains private API keys, proprietary database dumps, or Personally Identifiable Information (PII), it remains strictly inside your local browser sandbox.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">2. Google AdSense & Third-Party Advertising</h2>
          <p>
            To maintain JSONFlow as a 100% free developer utility, we partner with third-party advertising vendors, including Google AdSense.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>
              Google, as a third-party vendor, uses cookies to serve ads on this website based on a user's prior visits to this website or other websites.
            </li>
            <li>
              Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Google Ads Settings</a> or through the <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Network Advertising Initiative</a>.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">3. Cookies & Local Storage</h2>
          <p>
            We use standard browser <code>localStorage</code> solely to save your local UI preferences (such as selected indentation spaces, dark theme settings, and locally created mock endpoint definitions). This local storage data never leaves your device.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">4. GDPR & CCPA Compliance</h2>
          <p>
            Under the European Union General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have the right to access, delete, or restrict the processing of your personal data. Because we do not collect, store, or identify user identities with your tool payloads, we have no personal data records associated with your JSON files.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">5. Security of Local Computation</h2>
          <p>
            We implement strict Content Security Policies (CSP) and ensure all web assets are served exclusively over encrypted HTTPS connections to prevent man-in-the-middle tampering.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-100 font-sans">6. Contact Our Privacy Officer</h2>
          <p>
            If you have questions regarding this Privacy Policy or our client-side processing architecture, please submit an inquiry via our contact page or email <code>privacy@jsonflow.dev</code>.
          </p>
        </section>
      </div>

      <Accordion items={seoMeta.faqs} title="Frequently Asked Privacy Questions" />

      <AdSenseBanner placement="bottom" />
    </div>
  );
};
