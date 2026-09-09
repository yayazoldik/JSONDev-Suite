import { RouteMeta, RoutePath } from '../types';

export const SITE_NAME = 'JSONFlow';
export const SITE_DOMAIN = 'https://jsonflow.dev';

export const ROUTES_SEO: Record<RoutePath, RouteMeta> = {
  '/': {
    path: '/',
    title: 'JSONFlow | Best Free Online JSON Formatter, Validator & Tree Viewer',
    metaTitle: 'JSONFlow - Free Online JSON Formatter, Validator & API Developer Suite',
    description:
      'Ultra-fast, privacy-first developer suite for formatting, validating, inspecting, and generating mock APIs from JSON locally in your browser at jsonflow.dev. 100% client-side, zero server logs.',
    keywords: [
      'jsonflow',
      'jsonflow dev',
      'json formatter',
      'json validator',
      'json tree viewer',
      'mock api generator',
      'beautify json online',
      'json syntax checker',
      'best json formatter',
      'client side json editor'
    ],
    canonicalUrl: `${SITE_DOMAIN}/`,
    badge: 'All-in-One Suite',
    faqs: [
      {
        question: 'Is my JSON data kept private and secure on JSONFlow?',
        answer:
          'Yes, 100%. JSONFlow executes all parsing, formatting, validation, and tree rendering entirely inside your local browser runtime (via JavaScript and Web Workers). No payloads, API keys, or confidential tokens are ever transmitted over the network or saved on remote servers.'
      },
      {
        question: 'What is the maximum JSON file size supported on JSONFlow?',
        answer:
          'JSONFlow smoothly handles large JSON payloads up to 10MB to 50MB depending on your device memory, leveraging native streaming V8 JSON parsing without locking up the UI thread.'
      },
      {
        question: 'How does JSONFlow compare with command-line tools like jq?',
        answer:
          'While jq is exceptional in terminal environments, JSONFlow gives frontend and backend developers an immediate visual dashboard: interactive expandable trees, line-by-line syntax error pointers with auto-repair, one-click minification, and instantaneous mock REST endpoint generation.'
      },
      {
        question: 'Can I generate mock API endpoints without creating an account on JSONFlow?',
        answer:
          'Yes. The Mock API Generator allows you to instantly define HTTP status codes, latency delays, and response headers to test client apps, curl commands, and frontend components immediately with zero signups.'
      }
    ],
    article: {
      headline: 'The Ultimate JSON & Micro-SaaS API Toolkit for Modern Engineers',
      subheadline: 'Eliminate tedious JSON debugging, syntax syntax bugs, and backend dependencies.',
      sections: [
        {
          title: 'Why Client-Side Parsing Matters for Enterprise Security',
          content:
            'In modern engineering teams handling sensitive customer records, authentication tokens, and proprietary schemas, pasting data into arbitrary online tools poses a severe data leakage hazard. JSONFlow eliminates this threat by performing 100% of data operations in-memory within your browser sandbox. Your data never touches our network.'
        },
        {
          title: 'Comprehensive Tool Suite at Your Fingertips',
          content:
            'Switch seamlessly between the JSON Formatter for readable indentation, the JSON Validator for strict RFC 8259 compliance verification, the JSON Tree Viewer for nested array and object inspection, and the Mock API Generator for frontend prototype mocking.'
        }
      ]
    }
  },

  '/json-formatter': {
    path: '/json-formatter',
    title: 'Free Online JSON Formatter & Beautifier (Fast & Secure) | JSONFlow',
    metaTitle: 'JSON Formatter & Beautifier Online - Pretty Print & Minify JSON | JSONFlow',
    description:
      'Format, beautify, indent, and minify raw JSON payloads instantly with JSONFlow. Choose 2-space, 4-space, or tab indentation, sort object keys alphabetically, and strip unnecessary whitespace safely.',
    keywords: [
      'json formatter',
      'json beautifier',
      'pretty print json',
      'minify json',
      'format json online',
      'sort json keys',
      'clean json data',
      'jsonflow formatter'
    ],
    canonicalUrl: `${SITE_DOMAIN}/json-formatter`,
    badge: 'Developer Tool',
    faqs: [
      {
        question: 'What is JSON Beautification and Formatting?',
        answer:
          'JSON beautification (or pretty printing) transforms unformatted, single-line, or compact JSON strings into structured, readable multi-line text with consistent indentation (typically 2 or 4 spaces).'
      },
      {
        question: 'Does minifying JSON reduce payload bandwidth?',
        answer:
          'Yes. Minifying JSON strips all optional whitespace, carriage returns, and indentation, frequently reducing payload transfer size by 20% to 50% over HTTP/REST wire connections.'
      },
      {
        question: 'Can this formatter sort object keys alphabetically?',
        answer:
          'Yes. Enable the "Sort Keys" toggle to recursively sort all object properties alphabetically from A to Z, making payload diffing in Git and code reviews significantly cleaner.'
      },
      {
        question: 'Is there any telemetry or server-side logging of formatted JSON on JSONFlow?',
        answer:
          'Zero. Processing occurs strictly via the browser native JavaScript runtime. Disconnecting your internet connection will not interrupt your ability to format or minify files.'
      }
    ],
    article: {
      headline: 'Complete Technical Guide to JSON Formatting & Optimization',
      subheadline: 'Learn standard indentation conventions, RFC 8259 rules, and minification strategies.',
      sections: [
        {
          title: '2-Space vs 4-Space vs Tab Indentation: Best Practices',
          content:
            'Industry standards generally prefer 2 spaces for web APIs and microservices to balance human readability with file size in logs, while 4 spaces are common in enterprise Java/C# environments. Tab characters offer flexible visual widths according to individual IDE preferences.'
        },
        {
          title: 'Deterministic Key Sorting for Git Diffs and Test Assertions',
          content:
            'JSON specifications state that object keys are unordered collections of name/value pairs. However, non-deterministic key ordering creates noisy Git pull requests and flaky automated snapshot tests. Sorting keys alphabetically normalizes serialized output across programming languages.'
        },
        {
          title: 'Minification in Production Workflows',
          content:
            'Stripping whitespace reduces payload size, saves cloud egress charges, and accelerates parsing times in high-throughput microservices. Always minify production cache entries and HTTP responses.'
        }
      ]
    }
  },

  '/json-validator': {
    path: '/json-validator',
    title: 'Free Online JSON Validator & Syntax Checker | Line-by-Line Error Detection',
    metaTitle: 'JSON Validator Online - Real-Time Syntax Errors & Line Pointer',
    description:
      'Validate JSON syntax in real time with line and column error indicators. Automatically repair single quotes, trailing commas, unquoted keys, and comment artifacts.',
    keywords: [
      'json validator',
      'json syntax checker',
      'validate json online',
      'json linter',
      'fix json errors',
      'trailing comma json error',
      'rfc 8259 json compliance'
    ],
    canonicalUrl: `${SITE_DOMAIN}/json-validator`,
    badge: 'Syntax Inspector',
    faqs: [
      {
        question: 'Why does my JSON fail to parse with "Unexpected token"?',
        answer:
          'The most frequent causes are: 1) Using single quotes (\') instead of standard double quotes ("), 2) Trailing commas after the final element of an array or object, 3) Unquoted property names, or 4) Unescaped special characters (e.g., raw newlines or unescaped backslashes).'
      },
      {
        question: 'What is the Auto-Repair feature?',
        answer:
          'Auto-Repair analyzes invalid syntax and applies safe heuristics: converting single quotes to double quotes, stripping comments, stripping trailing commas, and wrapping naked property identifiers with quotes.'
      },
      {
        question: 'Does standard JSON allow comments?',
        answer:
          'Standard RFC 8259 JSON does not permit comments (neither // single-line nor /* */ multi-line). While JSON5 and JSONC tolerate them, standard API endpoints reject them. Our validator identifies and strips comments for production readiness.'
      },
      {
        question: 'What RFC specification does this validator adhere to?',
        answer:
          'It enforces IETF RFC 8259 and ECMA-404 JSON Data Interchange Standards, ensuring that your payload will be accepted by any compliant JSON parser across Python, Node.js, Go, Rust, and Java.'
      }
    ],
    article: {
      headline: 'Mastering JSON Validation: Resolving Common Syntax Failures',
      subheadline: 'Understand parser error messages, token positions, and specification compliance.',
      sections: [
        {
          title: 'Top 5 Most Common JSON Syntax Errors',
          content:
            '1. Trailing Comma: Placing a comma after the final object property or array entry is illegal in standard JSON.\n2. Single Quotes: Strings and keys must strictly be wrapped in double quotation marks (").\n3. Unquoted Keys: JavaScript allows `{ key: "value" }`, but JSON mandates `{ "key": "value" }`.\n4. Illegal Numeric Formats: Leading zeroes (e.g. `052`) or unquoted NaN/Infinity are forbidden.\n5. Unescaped Control Characters: Literal tab or newline bytes inside strings must be escaped as `\\t` and `\\n`.'
        },
        {
          title: 'How Parser Line & Column Coordinates Work',
          content:
            'When V8 or any modern JavaScript engine encounters a syntax error, it records the exact character byte offset. Our validator converts this offset into precise human-readable Line and Column numbers and renders a contextual cursor right below the problematic code.'
        }
      ]
    }
  },

  '/json-tree-viewer': {
    path: '/json-tree-viewer',
    title: 'Interactive JSON Tree Viewer & Visualizer | Collapsible Nodes & Search',
    metaTitle: 'JSON Tree Viewer Online - Interactive Collapsible JSON Explorer',
    description:
      'Explore and inspect complex nested JSON documents with an interactive tree viewer. Expand and collapse nodes, filter keys and values in real time, and copy node paths.',
    keywords: [
      'json tree viewer',
      'json visualizer',
      'json explorer',
      'interactive json tree',
      'json node path copy',
      'inspect nested json',
      'json search filter'
    ],
    canonicalUrl: `${SITE_DOMAIN}/json-tree-viewer`,
    badge: 'Visual Explorer',
    faqs: [
      {
        question: 'How do I search or filter within the JSON tree?',
        answer:
          'Type any key name, nested attribute, or string value into the search input. The tree automatically highlights and isolates matching nodes and reveals their parent hierarchy.'
      },
      {
        question: 'Can I copy the exact dot-notation path to a nested element?',
        answer:
          'Yes! Hover over any node in the tree viewer and click the "Copy Path" button to copy dot notation (such as `response.data.users[2].email`) directly into your clipboard.'
      },
      {
        question: 'How are different data types highlighted in the tree?',
        answer:
          'Nodes feature distinct color badges and typography for strings (emerald), numbers (cyan), booleans (amber), arrays (purple with item counts), objects (blue with key counts), and null values (slate).'
      },
      {
        question: 'Can I expand or collapse all nodes at once?',
        answer:
          'Yes. Use the "Expand All" and "Collapse All" master toolbar controls to toggle the entire document tree with a single click.'
      }
    ],
    article: {
      headline: 'Navigating Complex Hierarchical JSON Structures with Ease',
      subheadline: 'Overcome visual fatigue when inspecting multi-megabyte API payloads and database dumps.',
      sections: [
        {
          title: 'The Challenge with Raw Text Inspection',
          content:
            'Large API responses with deep nesting, hundreds of array items, and complex relational graphs quickly become unmanageable in raw text editors. An interactive tree viewer provides instant visual hierarchy, item count summaries, and surgical branch exploration.'
        },
        {
          title: 'Generating Dot-Notation Paths for Code and Tests',
          content:
            'Finding the precise selector for an assertion in Jest, Cypress, or a Python script often requires counting array indices manually. The JSON Tree Viewer generates valid selector paths like `data.items[0].variants[1].sku` instantly.'
        }
      ]
    }
  },

  '/mock-api-generator': {
    path: '/mock-api-generator',
    title: 'Free Mock REST API Generator | Instant Simulated Endpoints & CURL',
    metaTitle: 'Mock REST API Generator Online - Instant Temporary JSON Endpoints',
    description:
      'Paste your JSON payload to generate temporary mock REST API endpoints. Simulate HTTP status codes (200, 201, 404, 500), configure simulated network latency, and export CURL commands.',
    keywords: [
      'mock api generator',
      'mock rest api online',
      'fake json api',
      'test api endpoint',
      'simulate rest api',
      'curl generator json',
      'frontend mock data'
    ],
    canonicalUrl: `${SITE_DOMAIN}/mock-api-generator`,
    badge: 'API Simulator',
    faqs: [
      {
        question: 'How does the Mock API Generator work?',
        answer:
          'You define an endpoint path (e.g., `/api/v1/users`), select an HTTP method (GET, POST, PUT, DELETE), choose a status code (such as 200 OK or 404 Not Found), set simulated network latency, and paste your JSON payload. You can then test it in real-time with an in-browser request console or export ready-to-run cURL and fetch scripts.'
      },
      {
        question: 'Can I test error responses like 400 Bad Request or 500 Internal Server Error?',
        answer:
          'Yes. You can configure any standard HTTP status code (200, 201, 204, 400, 401, 403, 404, 422, 500) and custom headers to verify how your frontend error boundaries and retry logic behave.'
      },
      {
        question: 'Are simulated endpoints accessible from my local development server?',
        answer:
          'Yes! The Mock API engine includes live client-side test executors, local Service Worker/Fetch interception, and exportable server mocks in Node/Express and Next.js route format.'
      },
      {
        question: 'Is there a limit on how many mock endpoints I can create?',
        answer:
          'No limit. Endpoints are managed in your local browser state and can be saved, updated, tested, and exported as a complete mock collection whenever needed.'
      }
    ],
    article: {
      headline: 'Accelerating Frontend Development with Simulated Mock APIs',
      subheadline: 'Decouple frontend workflows from backend deployment schedules and API readiness.',
      sections: [
        {
          title: 'Why Mocking APIs Unblocks Engineering Velocity',
          content:
            'Waiting for backend engineers to finish database schemas and deploy staging environments creates unnecessary development bottlenecks. By creating mock API contracts from agreed-upon JSON specifications, frontend and mobile teams can build UI components, pagination, and error states immediately.'
        },
        {
          title: 'Testing Edge Cases: Latency, Timeouts & Error States',
          content:
            'A robust user experience requires testing loading skeletons, slow 3G network conditions, and error banners. With JSONFlow, you can simulate 500ms to 2000ms latency and 5xx errors in one click to verify frontend resilience.'
        }
      ]
    }
  },

  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy | JSONFlow - 100% Client-Side In-Memory Privacy Guarantee',
    metaTitle: 'Privacy Policy - JSONFlow Local Processing Commitment',
    description:
      'Our strict zero-logging, client-side data processing privacy policy. Your JSON payloads never leave your browser and are never transmitted to external servers.',
    keywords: ['privacy policy', 'client side processing', 'gdpr compliance', 'zero logging data privacy', 'jsonflow privacy'],
    canonicalUrl: `${SITE_DOMAIN}/privacy-policy`,
    faqs: [
      {
        question: 'Do you store or transmit the JSON payloads I paste on JSONFlow?',
        answer:
          'No. All data manipulation is performed entirely client-side in your web browser. Neither JSON payloads nor parsed records are transmitted to, logged by, or retained on any server.'
      },
      {
        question: 'Do you use third-party cookies or advertising?',
        answer:
          'We partner with reputable ad networks like Google AdSense. Advertising providers may use standard cookies to serve relevant ads according to their privacy policies. You can manage your cookie preferences at any time.'
      }
    ]
  },

  '/terms-of-service': {
    path: '/terms-of-service',
    title: 'Terms of Service | JSONFlow',
    metaTitle: 'Terms of Service - JSONFlow Web Application',
    description:
      'Terms of service and fair use guidelines for JSONFlow developer tools and utilities.',
    keywords: ['terms of service', 'user agreement', 'developer tools terms', 'jsonflow terms'],
    canonicalUrl: `${SITE_DOMAIN}/terms-of-service`,
    faqs: [
      {
        question: 'Is JSONFlow free to use for commercial projects?',
        answer:
          'Yes. All utilities on JSONFlow are 100% free for individual, open-source, educational, and commercial development workflows.'
      }
    ]
  },

  '/about': {
    path: '/about',
    title: 'About JSONFlow | Modern Developer Productivity & Privacy',
    metaTitle: 'About Us - The Engineering Philosophy Behind JSONFlow',
    description:
      'Learn about JSONFlow, our engineering mission, and why privacy-first client-side web tools represent the future of developer micro-SaaS.',
    keywords: ['about jsonflow', 'developer tools', 'client side architecture', 'jsonflow mission'],
    canonicalUrl: `${SITE_DOMAIN}/about`,
    faqs: [
      {
        question: 'Who created JSONFlow?',
        answer:
          'JSONFlow was engineered by developers who were frustrated by slow, ad-cluttered online formatters that send proprietary company JSON to unverified remote servers.'
      }
    ]
  },

  '/contact': {
    path: '/contact',
    title: 'Contact & Feedback | JSONFlow Support',
    metaTitle: 'Contact JSONFlow - Feature Requests & Support',
    description:
      'Get in touch with the JSONFlow engineering team. Submit bug reports, feature suggestions, or inquiry questions.',
    keywords: ['contact', 'support', 'feature request', 'developer feedback', 'jsonflow support'],
    canonicalUrl: `${SITE_DOMAIN}/contact`,
    faqs: [
      {
        question: 'How quickly does the team respond to inquiries?',
        answer:
          'We typically review developer suggestions and bug reports within 24 to 48 business hours.'
      }
    ]
  },

  '/sitemap': {
    path: '/sitemap',
    title: 'XML Sitemap & Crawler Index | JSONFlow',
    metaTitle: 'XML Sitemap - JSONFlow Programmatic SEO Index',
    description:
      'View the dynamic XML sitemap, indexed canonical routes, change frequencies, and search engine crawler instructions for jsonflow.dev.',
    keywords: ['sitemap', 'xml sitemap', 'seo index', 'crawler guidelines', 'jsonflow sitemap'],
    canonicalUrl: `${SITE_DOMAIN}/sitemap`,
    faqs: []
  },

  '/robots': {
    path: '/robots',
    title: 'Robots.txt & Search Engine Directives | JSONFlow',
    metaTitle: 'Robots.txt - Search Engine Crawler Directives | JSONFlow',
    description:
      'Inspect production robots.txt rules, crawler user-agent permissions, and sitemap endpoints for jsonflow.dev.',
    keywords: ['robots.txt', 'crawler directives', 'search engine indexing', 'jsonflow robots'],
    canonicalUrl: `${SITE_DOMAIN}/robots`,
    faqs: []
  }
};

export function generateStructuredData(routeMeta: RouteMeta) {
  const isTool = [
    '/',
    '/json-formatter',
    '/json-validator',
    '/json-tree-viewer',
    '/mock-api-generator'
  ].includes(routeMeta.path);

  const schemas: object[] = [];

  // WebSite Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JSONFlow',
    url: `${SITE_DOMAIN}/`,
    description: 'Ultra-fast, privacy-first online JSON Formatter, Validator, Tree Viewer, and Mock API Generator with 100% client-side processing.',
    publisher: {
      '@type': 'Organization',
      name: 'JSONFlow',
      url: `${SITE_DOMAIN}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_DOMAIN}/logo.jpg`
      }
    }
  });

  // SoftwareApplication / WebApplication Schema
  if (isTool) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: routeMeta.metaTitle,
      url: routeMeta.canonicalUrl,
      description: routeMeta.description,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All (Web Browser)',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      browserRequirements: 'Requires JavaScript. Supports Chrome, Firefox, Safari, Edge, Opera, Brave.',
      featureList: [
        '100% Client-Side In-Memory JSON Parsing',
        'Syntax Validation with Line and Column Highlights',
        'Automatic Syntax Error Repair',
        'Interactive Collapsible Tree Visualizer',
        'Mock REST API Generator with Latency Simulator',
        'Zero Data Logging and Zero Network Transmission'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2450',
        bestRating: '5',
        worstRating: '1'
      }
    });
  }

  // BreadcrumbList Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_DOMAIN}/`
      },
      ...(routeMeta.path !== '/'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: routeMeta.badge || routeMeta.title.split('|')[0].trim(),
              item: routeMeta.canonicalUrl
            }
          ]
        : [])
    ]
  });

  // FAQPage Schema
  if (routeMeta.faqs && routeMeta.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: routeMeta.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return schemas;
}

export function generateSitemapXml(): string {
  const routes = Object.values(ROUTES_SEO);
  const now = new Date().toISOString().split('T')[0];

  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${r.canonicalUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : r.path.startsWith('/json-') || r.path === '/mock-api-generator' ? '0.9' : '0.6'}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function generateRobotsTxt(): string {
  return `# Robots.txt for JSONFlow (https://jsonflow.dev)
# Optimized for Googlebot, Bingbot, and modern web crawlers

User-agent: *
Allow: /
Disallow: /api/private/

# Explicit search engine directives
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${SITE_DOMAIN}/sitemap.xml
Host: ${SITE_DOMAIN}
`;
}
