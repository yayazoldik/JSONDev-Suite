import React, { useState } from 'react';
import { ShieldCheck, Lock, Cpu, EyeOff, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const PrivacyShieldBanner: React.FC<{ className?: string }> = ({ className }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div
      className={cn(
        'rounded-xl border border-emerald-900/40 bg-gradient-to-r from-emerald-950/20 via-zinc-900/40 to-cyan-950/20 p-3.5 backdrop-blur-sm shadow-sm transition-all',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> 100% Local Browser Execution
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-mono">
                Zero Cloud Egress
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5">
              Your confidential payloads, auth tokens, and API data never leave your browser sandbox.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="text-xs text-zinc-400 hover:text-cyan-300 font-mono underline underline-offset-4 transition-colors"
          >
            {detailsOpen ? 'Hide Security Specs' : 'Verify Privacy Architecture'}
          </button>
        </div>
      </div>

      {detailsOpen && (
        <div className="mt-3 pt-3 border-t border-emerald-900/30 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-zinc-400 animate-in fade-in duration-200">
          <div className="flex items-start gap-2 bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/60">
            <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-zinc-200">V8 Native Worker Execution</div>
              <div className="text-[11px] text-zinc-400">Parsing executes strictly in client memory threads.</div>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/60">
            <EyeOff className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-zinc-200">No Analytics Payloads</div>
              <div className="text-[11px] text-zinc-400">Input contents are never dispatched to telemetry or AI endpoints.</div>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-zinc-200">Offline Capable</div>
              <div className="text-[11px] text-zinc-400">Functions entirely offline without an active internet connection.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
