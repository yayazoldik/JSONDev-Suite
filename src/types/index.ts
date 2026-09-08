export type RoutePath =
  | '/'
  | '/json-formatter'
  | '/json-validator'
  | '/json-tree-viewer'
  | '/mock-api-generator'
  | '/privacy-policy'
  | '/terms-of-service'
  | '/about'
  | '/contact'
  | '/sitemap'
  | '/robots';

export interface RouteMeta {
  path: RoutePath;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  badge?: string;
  faqs: Array<{ question: string; answer: string }>;
  article?: {
    headline: string;
    subheadline: string;
    sections: Array<{
      title: string;
      content: string;
      codeExample?: string;
    }>;
  };
}

export interface ParseStats {
  sizeBytes: number;
  sizeFormatted: string;
  charCount: number;
  lineCount: number;
  keyCount: number;
  depth: number;
  parseTimeMs: number;
  isValid: boolean;
}

export interface ParseErrorDetail {
  message: string;
  line: number;
  column: number;
  snippet?: string;
  suggestion?: string;
}

export interface MockEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  statusCode: number;
  delayMs: number;
  responsePayload: string;
  contentType: string;
  createdAt: string;
}

export type ViewMode = 'formatted' | 'minified' | 'tree' | 'raw';
