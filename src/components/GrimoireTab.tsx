import React, { useState, useMemo } from 'react';
import { MOTW_MOVES } from '../data/motwMoves';
import { MotWMove } from '../types/motw';
import { Search, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

interface GrimoireTabProps {
  onQuickRollMove?: (stat: any, moveName: string) => void;
}

export const GrimoireTab: React.FC<GrimoireTabProps> = ({ onQuickRollMove }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'basic' | 'combat' | 'investigative' | 'magic'>('all');
  const [expandedMoveId, setExpandedMoveId] = useState<string | null>('investigate-a-mystery');

  const filteredMoves = useMemo(() => {
    return MOTW_MOVES.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.trigger.toLowerCase().includes(search.toLowerCase()) ||
        (m.stat && m.stat.toLowerCase().includes(search.toLowerCase()));
      const matchesFilter = filter === 'all' || m.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const toggleExpand = (id: string) => {
    setExpandedMoveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
      {/* Search & Filter Header */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search moves, stats, or effects..."
            className="w-full bg-neutral-900 border border-neutral-700/80 rounded pl-8 pr-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
          {(
            [
              { id: 'all', label: 'All Moves' },
              { id: 'investigative', label: 'Investigate' },
              { id: 'combat', label: 'Combat' },
              { id: 'basic', label: 'Basic' },
              { id: 'magic', label: 'Magic' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                filter === tab.id
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Moves List Accordion */}
      <div className="space-y-1.5">
        {filteredMoves.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-500">
            No moves found matching "{search}".
          </div>
        ) : (
          filteredMoves.map((m) => {
            const isExpanded = expandedMoveId === m.id;
            return (
              <div
                key={m.id}
                className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden transition-all"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleExpand(m.id)}
                  className="w-full p-2.5 flex items-center justify-between text-left hover:bg-neutral-850 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-neutral-200">{m.name}</span>
                      {m.stat && (
                        <span className="ml-2 text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-neutral-950 text-amber-400/90 border border-neutral-800">
                          +{m.stat}
                        </span>
                      )}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-2.5 pt-0 border-t border-neutral-800/80 space-y-2 text-xs bg-neutral-950/40">
                    <p className="text-neutral-300 italic pt-1">{m.trigger}</p>

                    {/* Outcome Breakdown */}
                    <div className="space-y-1.5">
                      <div className="p-2 rounded bg-emerald-950/40 border border-emerald-900/60 text-emerald-200">
                        <strong className="text-emerald-300 block font-semibold text-[11px]">10+ (Success)</strong>
                        <span>{m.success10}</span>
                      </div>

                      <div className="p-2 rounded bg-amber-950/40 border border-amber-900/60 text-amber-200">
                        <strong className="text-amber-300 block font-semibold text-[11px]">7–9 (Mixed Success)</strong>
                        <span>{m.mixed79}</span>
                      </div>

                      <div className="p-2 rounded bg-rose-950/40 border border-rose-900/60 text-rose-200">
                        <strong className="text-rose-300 block font-semibold text-[11px]">Miss (6 or less)</strong>
                        <span>{m.miss6}</span>
                      </div>
                    </div>

                    {/* Question / Effect Checklist */}
                    {m.questions && (
                      <div className="pt-1">
                        <span className="text-[11px] font-semibold text-amber-400 block mb-1">
                          {m.category === 'magic' ? 'Magical Effects List:' : 'Questions to choose from:'}
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-neutral-300 text-[11px] bg-neutral-950 p-2 rounded border border-neutral-800">
                          {m.questions.map((q, idx) => (
                            <li key={idx} className="leading-snug">
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {m.notes && (
                      <div className="text-[10px] text-neutral-400 italic bg-neutral-900/80 p-2 rounded">
                        ℹ️ {m.notes}
                      </div>
                    )}

                    {onQuickRollMove && m.stat && (
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => onQuickRollMove(m.stat, m.name)}
                          className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Sparkles className="w-3 h-3" /> Roll this move (+{m.stat})
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
