import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  title?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  title = 'Frequently Asked Questions',
  className
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // Open first by default for quick scan

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={cn('w-full', className)}>
      {title && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight">{title}</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Verified answers to common technical queries, parsing edge-cases, and implementation details.
          </p>
        </div>
      )}

      <div className="space-y-2.5">
        {items.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div
              key={idx}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 overflow-hidden transition-colors hover:border-zinc-700/80"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left select-none group"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0',
                    isOpen && 'rotate-180 text-cyan-400'
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/40 animate-in fade-in duration-150">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
