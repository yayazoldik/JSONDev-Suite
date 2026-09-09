import React, { useState } from 'react';
import { FileCode, Copy, Check, Download, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { generateSitemapXml, generateRobotsTxt, ROUTES_SEO } from '../../lib/seo-config';
import { copyToClipboard, downloadJsonFile } from '../../lib/utils';
import { AdSenseBanner } from '../ads/AdSenseBanner';

interface RobotsSitemapPageProps {
  view: 'sitemap' | 'robots';
}

export const RobotsSitemapPage: React.FC<RobotsSitemapPageProps> = ({ view }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots'>(view);
  const [copied, setCopied] = useState(false);

  const sitemapContent = generateSitemapXml();
  const robotsContent = generateRobotsTxt();

  const currentContent = activeTab === 'sitemap' ? sitemapContent : robotsContent;
  const currentFilename = activeTab === 'sitemap' ? 'sitemap.xml' : 'robots.txt';

  const handleCopy = async () => {
    const ok = await copyToClipboard(currentContent);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], {
      type: activeTab === 'sitemap' ? 'application/xml' : 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-8 max-w-4xl mx-auto">
      <AdSenseBanner placement="top" />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono">
          <Globe className="w-3.5 h-3.5" />
          <span>Search Engine Crawler Directives</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
          {activeTab === 'sitemap' ? 'XML Sitemap (sitemap.xml)' : 'Robots.txt Directives'}
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Dynamic crawler indexing manifests configured for Googlebot, Bingbot, and modern search engine web crawlers.
        </p>
      </div>

      {/* Switcher & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-900/40">
        <div className="flex items-center rounded-lg bg-zinc-950 p-1 border border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'sitemap'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            sitemap.xml ({Object.keys(ROUTES_SEO).length} routes)
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'robots'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            robots.txt
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={activeTab === 'sitemap' ? '/sitemap.xml' : '/robots.txt'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-cyan-400 hover:text-cyan-300 text-xs font-mono border border-cyan-800/40 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open /{currentFilename} ↗</span>
          </a>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono border border-zinc-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Content'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {currentFilename}</span>
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs overflow-x-auto shadow-md">
        <pre className="text-zinc-300 selection:bg-cyan-500/30 leading-relaxed whitespace-pre">
          {currentContent}
        </pre>
      </div>

      <AdSenseBanner placement="bottom" />
    </div>
  );
};
