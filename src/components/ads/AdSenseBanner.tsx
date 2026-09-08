import React, { useState } from 'react';
import { ShieldCheck, Info, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdSenseBannerProps {
  placement: 'top' | 'sidebar' | 'bottom' | 'in-feed';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ placement, className }) => {
  const [adLoaded, setAdLoaded] = useState(true);

  // Dimension mapping to ensure 0 Cumulative Layout Shift (CLS)
  const placementConfig = {
    top: {
      minHeight: 'min-h-[90px]',
      maxWidth: 'max-w-[728px]',
      title: 'Responsive Leaderboard (728x90)',
      code: 'ca-pub-XXXXXXXXXXXXXXXX / slot-top-leaderboard'
    },
    sidebar: {
      minHeight: 'min-h-[250px]',
      maxWidth: 'max-w-[300px]',
      title: 'Medium Rectangle (300x250)',
      code: 'ca-pub-XXXXXXXXXXXXXXXX / slot-sidebar-rectangle'
    },
    bottom: {
      minHeight: 'min-h-[90px]',
      maxWidth: 'max-w-[970px]',
      title: 'Large Leaderboard / Multiplex (970x90 / 728x90)',
      code: 'ca-pub-XXXXXXXXXXXXXXXX / slot-bottom-responsive'
    },
    'in-feed': {
      minHeight: 'min-h-[120px]',
      maxWidth: 'max-w-[800px]',
      title: 'In-Article Responsive Unit',
      code: 'ca-pub-XXXXXXXXXXXXXXXX / slot-in-article'
    }
  }[placement];

  return (
    <div
      className={cn(
        'mx-auto w-full my-4 flex flex-col items-center justify-center transition-all',
        className
      )}
      aria-label="Sponsored Advertisement Slot"
    >
      {/* Subtle AdSense Compliant Disclosure */}
      <div className="w-full flex items-center justify-between px-2 py-0.5 text-[11px] text-zinc-500 font-mono select-none">
        <span className="flex items-center gap-1 uppercase tracking-wider">
          <Info className="w-3 h-3 text-zinc-600" />
          Sponsored Advertisement
        </span>
        <span className="text-[10px] text-zinc-600">Google AdSense Partner Slot</span>
      </div>

      {/* CLS Reserved Container */}
      <div
        className={cn(
          'w-full rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3 relative overflow-hidden flex flex-col items-center justify-center text-center',
          placementConfig.minHeight,
          placementConfig.maxWidth
        )}
      >
        {/* Ambient subtle background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-1.5 px-4 py-2">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400/90 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AdSense Auto-Responsive Unit</span>
          </div>
          <p className="text-xs text-zinc-400 max-w-md font-sans">
            Reserved placement for high-visibility contextual developer tools sponsorship.
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500 mt-1">
            <span>Size: {placementConfig.title.split('(')[1]?.replace(')', '') || 'Responsive'}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400/80">
              <ShieldCheck className="w-3 h-3" /> CLS Protected (0.00)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
