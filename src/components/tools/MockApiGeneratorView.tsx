import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Play,
  Copy,
  Check,
  Plus,
  Trash2,
  Clock,
  Send,
  Layers,
  Code,
  Globe,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { MockEndpoint } from '../../types';
import { CodeEditor } from '../common/CodeEditor';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { Accordion } from '../common/Accordion';
import { PrivacyShieldBanner } from '../common/PrivacyShieldBanner';
import { ROUTES_SEO } from '../../lib/seo-config';
import { SAMPLE_JSONS, copyToClipboard } from '../../lib/utils';

const DEFAULT_ENDPOINTS: MockEndpoint[] = [
  {
    id: 'ep_1',
    name: 'Get Products Catalog',
    path: '/api/v1/products',
    method: 'GET',
    statusCode: 200,
    delayMs: 300,
    responsePayload: SAMPLE_JSONS.ecommerce.json,
    contentType: 'application/json',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ep_2',
    name: 'Get User Session & RBAC',
    path: '/api/v1/auth/me',
    method: 'GET',
    statusCode: 200,
    delayMs: 150,
    responsePayload: SAMPLE_JSONS.userProfile.json,
    contentType: 'application/json',
    createdAt: new Date().toISOString()
  }
];

export const MockApiGeneratorView: React.FC = () => {
  const [endpoints, setEndpoints] = useState<MockEndpoint[]>(() => {
    try {
      const saved = localStorage.getItem('jsonsuite_mock_endpoints');
      return saved ? JSON.parse(saved) : DEFAULT_ENDPOINTS;
    } catch {
      return DEFAULT_ENDPOINTS;
    }
  });

  const [activeId, setActiveId] = useState<string>(endpoints[0]?.id || 'ep_1');
  const [codeTab, setCodeTab] = useState<'curl' | 'fetch' | 'axios'>('curl');
  const [copiedCode, setCopiedCode] = useState(false);

  // Test client state
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    status: number;
    timeMs: number;
    body: string;
    headers: Record<string, string>;
  } | null>(null);

  const seoMeta = ROUTES_SEO['/mock-api-generator'];

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('jsonsuite_mock_endpoints', JSON.stringify(endpoints));
    } catch (e) {
      console.error(e);
    }
  }, [endpoints]);

  const activeEndpoint = endpoints.find((e) => e.id === activeId) || endpoints[0];

  const updateActiveEndpoint = (patch: Partial<MockEndpoint>) => {
    setEndpoints((prev) =>
      prev.map((ep) => (ep.id === activeId ? { ...ep, ...patch } : ep))
    );
  };

  const handleAddEndpoint = () => {
    const newId = 'ep_' + Date.now();
    const newEp: MockEndpoint = {
      id: newId,
      name: 'New Mock Endpoint',
      path: `/api/v1/resource-${endpoints.length + 1}`,
      method: 'GET',
      statusCode: 200,
      delayMs: 200,
      responsePayload: JSON.stringify({ message: "Success", status: 200, data: [] }, null, 2),
      contentType: 'application/json',
      createdAt: new Date().toISOString()
    };
    setEndpoints([...endpoints, newEp]);
    setActiveId(newId);
  };

  const handleDeleteEndpoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (endpoints.length <= 1) return;
    const remaining = endpoints.filter((ep) => ep.id !== id);
    setEndpoints(remaining);
    if (activeId === id) {
      setActiveId(remaining[0].id);
    }
  };

  // Simulate Request Execution
  const handleExecuteRequest = async () => {
    if (!activeEndpoint) return;
    setIsExecuting(true);
    const start = performance.now();

    // Simulate latency delay
    await new Promise((resolve) => setTimeout(resolve, activeEndpoint.delayMs));
    const duration = Math.round(performance.now() - start);

    setExecutionResult({
      status: activeEndpoint.statusCode,
      timeMs: duration,
      body: activeEndpoint.responsePayload,
      headers: {
        'content-type': activeEndpoint.contentType,
        'x-mock-server': 'JSONFlow Client Sandbox',
        'x-response-time': `${duration}ms`
      }
    });
    setIsExecuting(false);
  };

  // Code Snippets
  const getCodeSnippet = () => {
    if (!activeEndpoint) return '';
    const mockUrl = `https://mock.jsonflow.dev${activeEndpoint.path}`;

    if (codeTab === 'curl') {
      return `curl -X ${activeEndpoint.method} "${mockUrl}" \\
  -H "Accept: ${activeEndpoint.contentType}" \\
  -H "Content-Type: ${activeEndpoint.contentType}"`;
    }

    if (codeTab === 'fetch') {
      return `const response = await fetch("${mockUrl}", {
  method: "${activeEndpoint.method}",
  headers: {
    "Accept": "${activeEndpoint.contentType}",
    "Content-Type": "${activeEndpoint.contentType}"
  }
});
const data = await response.json();
console.log(data);`;
    }

    if (codeTab === 'axios') {
      return `import axios from 'axios';

const { data, status } = await axios({
  method: '${activeEndpoint.method.toLowerCase()}',
  url: '${mockUrl}',
  headers: {
    'Content-Type': '${activeEndpoint.contentType}'
  }
});
console.log(status, data);`;
    }

    return '';
  };

  const handleCopyCode = async () => {
    const code = getCodeSnippet();
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-6">
      <AdSenseBanner placement="top" />

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
            {seoMeta.badge}
          </span>
          <span className="text-xs text-zinc-400 font-mono">Simulated REST Endpoints</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Free Mock REST API Generator & Simulator
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Paste any JSON payload to create instantaneous, simulated REST API endpoints. Configure HTTP status codes (200, 201, 400, 500), customize response latency, test responses in real-time, and copy ready-to-use cURL and fetch scripts.
        </p>
      </div>

      <PrivacyShieldBanner />

      {/* Endpoint Selector Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5">
          {endpoints.map((ep) => {
            const isActive = ep.id === activeId;
            return (
              <button
                key={ep.id}
                onClick={() => setActiveId(ep.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border shrink-0 ${
                  isActive
                    ? 'bg-zinc-800 border-zinc-700 text-cyan-300 font-semibold'
                    : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span
                  className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                    ep.method === 'GET'
                      ? 'text-emerald-400 bg-emerald-950/60'
                      : ep.method === 'POST'
                      ? 'text-blue-400 bg-blue-950/60'
                      : 'text-amber-400 bg-amber-950/60'
                  }`}
                >
                  {ep.method}
                </span>
                <span>{ep.name}</span>
                {endpoints.length > 1 && (
                  <span
                    onClick={(e) => handleDeleteEndpoint(ep.id, e)}
                    className="text-zinc-600 hover:text-red-400 p-0.5"
                    title="Delete endpoint"
                  >
                    <Trash2 className="w-3 h-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleAddEndpoint}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-mono shrink-0 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>New Endpoint</span>
        </button>
      </div>

      {/* Endpoint Configuration Bar */}
      {activeEndpoint && (
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* HTTP Method */}
            <div className="sm:col-span-2">
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Method</label>
              <select
                value={activeEndpoint.method}
                onChange={(e) =>
                  updateActiveEndpoint({
                    method: e.target.value as MockEndpoint['method']
                  })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500 font-bold"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            {/* Path */}
            <div className="sm:col-span-5">
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Route Path</label>
              <input
                type="text"
                value={activeEndpoint.path}
                onChange={(e) => updateActiveEndpoint({ path: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Status Code */}
            <div className="sm:col-span-3">
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">HTTP Status</label>
              <select
                value={activeEndpoint.statusCode}
                onChange={(e) => updateActiveEndpoint({ statusCode: Number(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500"
              >
                <option value={200}>200 OK</option>
                <option value={201}>201 Created</option>
                <option value={204}>204 No Content</option>
                <option value={400}>400 Bad Request</option>
                <option value={401}>401 Unauthorized</option>
                <option value={404}>404 Not Found</option>
                <option value={422}>422 Unprocessable Entity</option>
                <option value={500}>500 Internal Server Error</option>
              </select>
            </div>

            {/* Latency */}
            <div className="sm:col-span-2">
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Latency</label>
              <select
                value={activeEndpoint.delayMs}
                onChange={(e) => updateActiveEndpoint({ delayMs: Number(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500"
              >
                <option value={0}>0ms (Instant)</option>
                <option value={150}>150ms</option>
                <option value={300}>300ms</option>
                <option value={800}>800ms (3G)</option>
                <option value={2000}>2000ms (Slow)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Editor & Live Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Payload Definition */}
        <div>
          <CodeEditor
            title="Mock Response Payload (JSON)"
            value={activeEndpoint ? activeEndpoint.responsePayload : ''}
            onChange={(val) => updateActiveEndpoint({ responsePayload: val })}
            placeholder="Paste mock response JSON..."
            heightClass="h-[460px]"
          />
        </div>

        {/* Right: Interactive Test Console & Code Snippets */}
        <div className="flex flex-col gap-4">
          {/* Test Runner Box */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">Interactive Client Test Console</span>
              </div>
              <button
                onClick={handleExecuteRequest}
                disabled={isExecuting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold font-mono transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isExecuting ? 'Simulating...' : 'Send Request'}</span>
              </button>
            </div>

            {/* Test result output */}
            <div className="rounded-lg bg-zinc-900/60 border border-zinc-800/80 p-3 text-xs font-mono min-h-[140px] flex flex-col justify-between">
              {executionResult ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        executionResult.status < 300
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                          : 'bg-red-950 text-red-400 border border-red-800/60'
                      }`}
                    >
                      Status: {executionResult.status}
                    </span>
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {executionResult.timeMs}ms
                    </span>
                  </div>
                  <pre className="text-zinc-300 text-[11px] max-h-32 overflow-auto whitespace-pre">
                    {executionResult.body.slice(0, 300)}
                    {executionResult.body.length > 300 ? '\n... (truncated preview)' : ''}
                  </pre>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-500 text-xs py-6 text-center">
                  Click "Send Request" to trigger simulated network latency and verify client response.
                </div>
              )}
            </div>
          </div>

          {/* Export Code Snippets */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs font-mono">
                <button
                  onClick={() => setCodeTab('curl')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    codeTab === 'curl' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setCodeTab('fetch')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    codeTab === 'fetch' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  fetch()
                </button>
                <button
                  onClick={() => setCodeTab('axios')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    codeTab === 'axios' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  axios
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
              </button>
            </div>

            <pre className="p-3 rounded-lg bg-zinc-900 border border-zinc-800/80 text-[11px] font-mono text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed">
              {getCodeSnippet()}
            </pre>
          </div>
        </div>
      </div>

      {/* High-Value SEO Content */}
      <section className="mt-12 pt-8 border-t border-zinc-800 space-y-8">
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <h2 className="text-xl font-bold text-zinc-100 font-sans tracking-tight">
            How Mock API Generators Accelerate Modern Web Engineering
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            In microservices architectures, waiting for backend services, database migrations, or authentication providers causes severe delays in frontend development cycles. By mocking the API contract with valid JSON payloads and status codes, client teams can develop components, loading skeletons, and error handling in complete isolation.
          </p>
        </div>

        <Accordion items={seoMeta.faqs} title="Frequently Asked Questions: Mock REST APIs" />
      </section>

      <AdSenseBanner placement="bottom" />
    </div>
  );
};
