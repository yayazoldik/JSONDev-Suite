import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import { ROUTES_SEO } from './lib/seo-config';
import { SEOHead } from './components/seo/SEOHead';
import { SchemaViewerModal } from './components/seo/SchemaViewerModal';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Tool Views
import { HomePage } from './components/pages/HomePage';
import { JsonFormatterView } from './components/tools/JsonFormatterView';
import { JsonValidatorView } from './components/tools/JsonValidatorView';
import { JsonTreeViewer } from './components/tools/JsonTreeViewer';
import { MockApiGeneratorView } from './components/tools/MockApiGeneratorView';

// Compliance & Legal Pages
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { RobotsSitemapPage } from './components/pages/RobotsSitemapPage';

function normalizePath(rawPath: string): RoutePath {
  const clean = rawPath.toLowerCase().replace(/\/$/, '') || '/';
  if (clean === '/sitemap.xml') return '/sitemap';
  if (clean === '/robots.txt') return '/robots';
  if (clean in ROUTES_SEO) {
    return clean as RoutePath;
  }
  // Check hash routing as fallback e.g. /#json-formatter
  const hash = window.location.hash.replace('#', '/');
  if (hash in ROUTES_SEO) {
    return hash as RoutePath;
  }
  return '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    return normalizePath(window.location.pathname);
  });
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: RoutePath) => {
    setCurrentPath(path);
    try {
      window.history.pushState(null, '', path);
    } catch {
      // In strict sandboxes where pushState might throw, use hash as fallback
      window.location.hash = path.replace('/', '');
    }
  };

  const currentMeta = ROUTES_SEO[currentPath] || ROUTES_SEO['/'];

  const isToolRoute = [
    '/json-formatter',
    '/json-validator',
    '/json-tree-viewer',
    '/mock-api-generator'
  ].includes(currentPath);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic SEO Head & Structured Data Schema Injector */}
      <SEOHead meta={currentMeta} />

      {/* Structured Data (JSON-LD) Inspector Modal */}
      <SchemaViewerModal
        meta={currentMeta}
        isOpen={schemaModalOpen}
        onClose={() => setSchemaModalOpen(false)}
      />

      {/* Global Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSchemaModal={() => setSchemaModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4 pb-8">
        {isToolRoute ? (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Tool Left Sidebar with Tools Switcher and 300x250 Ad Slot */}
            <Sidebar currentPath={currentPath} onNavigate={navigate} />

            {/* Main Tool Content */}
            <div className="flex-1 w-full min-w-0">
              {currentPath === '/json-formatter' && <JsonFormatterView />}
              {currentPath === '/json-validator' && <JsonValidatorView />}
              {currentPath === '/json-tree-viewer' && <JsonTreeViewer />}
              {currentPath === '/mock-api-generator' && <MockApiGeneratorView />}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {currentPath === '/' && <HomePage onNavigate={navigate} />}
            {currentPath === '/privacy-policy' && <PrivacyPolicyPage />}
            {currentPath === '/terms-of-service' && <TermsPage />}
            {currentPath === '/about' && <AboutPage />}
            {currentPath === '/contact' && <ContactPage />}
            {currentPath === '/sitemap' && <RobotsSitemapPage view="sitemap" />}
            {currentPath === '/robots' && <RobotsSitemapPage view="robots" />}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
