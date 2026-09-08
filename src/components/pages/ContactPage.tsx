import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { Accordion } from '../common/Accordion';
import { ROUTES_SEO } from '../../lib/seo-config';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('bug');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const seoMeta = ROUTES_SEO['/contact'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full space-y-8 max-w-4xl mx-auto">
      <AdSenseBanner placement="top" />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono">
          <Mail className="w-3.5 h-3.5" />
          <span>Developer Support & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
          Contact & Feature Requests
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Encountered an edge-case syntax bug? Have an idea for the mock API simulator? Let our engineering team know.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact info cards */}
        <div className="space-y-4 lg:col-span-1 text-xs">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-1.5">
            <div className="font-semibold text-zinc-200">Direct Engineering Email</div>
            <p className="text-zinc-400">support@jsondevsuite.com</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-1.5">
            <div className="font-semibold text-zinc-200">Security Inquiries</div>
            <p className="text-zinc-400">security@jsondevsuite.com</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-1.5">
            <div className="font-semibold text-zinc-200">Average Response SLA</div>
            <p className="text-emerald-400 font-mono">Within 24 business hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-zinc-100">Message Received</h2>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Thank you for contributing to the developer community! We review every bug report and feature request closely.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 mb-1 font-medium">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1 font-medium">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.io"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="bug">Bug Report / Parsing Error</option>
                  <option value="feature">New Feature Request</option>
                  <option value="partnership">Advertising & Partnerships</option>
                  <option value="general">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-medium">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your suggestion or include sample JSON snippet that caused unexpected behavior..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <Accordion items={seoMeta.faqs} title="Frequently Asked Questions: Support & Feedback" />

      <AdSenseBanner placement="bottom" />
    </div>
  );
};
