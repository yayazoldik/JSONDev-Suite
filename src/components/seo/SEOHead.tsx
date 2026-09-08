import React, { useEffect } from 'react';
import { RouteMeta } from '../../types';
import { generateStructuredData, SITE_DOMAIN } from '../../lib/seo-config';

interface SEOHeadProps {
  meta: RouteMeta;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ meta }) => {
  useEffect(() => {
    // 1. Update Title
    document.title = meta.title;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attribute: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords.join(', '));
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // OpenGraph
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', meta.canonicalUrl);
    setMetaTag('property', 'og:site_name', 'JSONDev Suite');
    setMetaTag('property', 'og:type', 'website');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.metaTitle);
    setMetaTag('name', 'twitter:description', meta.description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonicalUrl);

    // 3. Inject JSON-LD Structured Data Schema
    const structuredData = generateStructuredData(meta);
    let scriptTag = document.getElementById('structured-data-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(structuredData, null, 2);

    // Scroll to top on route change smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [meta]);

  return null;
};
