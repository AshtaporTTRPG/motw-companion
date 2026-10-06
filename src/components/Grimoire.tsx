import React, { useState, useMemo } from 'react';
import { BASIC_MOVES, WEIRD_MOVES, PHENOMENA_REFERENCE, QUICK_RULES, HUNTER_AGENDA } from '../data/moves';
import { MotWMove, StatType } from '../types/motw';
import { Search, ChevronDown, ChevronRight, Dices, Shield, BookOpen, Sparkles, AlertOctagon, HelpCircle } from 'lucide-react';

interface GrimoireProps {
  onQuickRollMove: (stat: StatType | undefined, moveName: string) => void;
}

export const Grimoire: React.FC<GrimoireProps> = ({ onQuickRollMove }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'basic' | 'weird' | 'phenomena' | 'rules' | 'agenda'>('all');
  const [expandedMoveIds, setExpandedMoveIds] = useState<Record<string, boolean>>({
    'kick-some-ass': true,
    'investigate-a-mystery': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedMoveIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allIds: Record<string, boolean> = {};
    [...BASIC_MOVES, ...WEIRD_MOVES].forEach((m) => {
      allIds[m.id] = true;
    });
    setExpandedMoveIds(allIds);
  };

  const collapseAll = () => {
    setExpandedMoveIds({});
  };

  const query = searchQuery.toLowerCase().trim();

  // Filter Basic Moves
  const filteredBasic = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'basic') return [];
    if (!query) return BASIC_MOVES;
    return BASIC_MOVES.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.trigger.toLowerCase().includes(query) ||
        m.success10.toLowerCase().includes(query) ||
        m.mixed79.toLowerCase().includes(query) ||
        (m.stat && m.stat.includes(query))
    );
  }, [activeCategory, query]);

  // Filter Weird Moves
  const filteredWeird = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'weird') return [];
    if (!query) return WEIRD_MOVES;
    return WEIRD_MOVES.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.trigger.toLowerCase().includes(query) ||
        m.success10.toLowerCase().includes(query) ||
        m.mixed79.toLowerCase().includes(query)
    );
  }, [activeCategory, query]);

  // Filter Agenda
  const showAgenda = (activeCategory === 'all' || activeCategory === 'agenda') &&
    (!query || 'hunter agenda principles'.includes(query) || HUNTER_AGENDA.some(a => a.title.toLowerCase().includes(query) || a.desc.toLowerCase().includes(query)));

  // Filter Phenomena
  const showPhenomena = (activeCategory === 'all' || activeCategory === 'phenomena') &&
    (!query || 'phenomena mysteries threat moves'.includes(query) || PHENOMENA_REFERENCE.types.some(t => t.name.toLowerCase().includes(query)));

  // Filter Quick Rules
  const showRules = (activeCategory === 'all' || activeCategory === 'rules') &&
    (!query || 'quick rules harm armor luck recovery questions'.includes(query));

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-hidden">
      {/* Search Bar & Category Controls */}
      <div className="p-2.5 bg-neutral-900/90 border-b border-neutral-800 space-y-2 shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search moves, triggers, rules, phenomena..."
            className="w-full bg-neutral-950 border border-neutral-700 rounded-md pl-8 pr-7 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-xs text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-between text-[11px] gap-1 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'basic', label: 'Basic' },
              { id: 'weird', label: 'Weird' },
              { id: 'phenomena', label: 'Phenomena' },
              { id: 'rules', label: 'Rules' },
              { id: 'agenda', label: 'Agenda' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-2 py-0.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0 text-[10px] text-neutral-400">
            <button onClick={expandAll} className="hover:text-amber-300">Expand</button>
            <span>/</span>
            <button onClick={collapseAll} className="hover:text-amber-300">Collapse</button>
          </div>
        </div>
      </div>

      {/* Accordion Content Area */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
        {/* Hunter Agenda */}
        {showAgenda && (
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg overflow-hidden">
            <div className="bg-neutral-850 px-2.5 py-1.5 flex items-center gap-1.5 border-b border-neutral-800 text-xs font-bold text-amber-300">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Hunter Agenda (4 Principles)</span>
            </div>
            <div className="p-2.5 space-y-2">
              {HUNTER_AGENDA.map((item, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-neutral-200">{idx + 1}. {item.title}: </span>
                  <span className="text-neutral-300">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Basic Moves Section */}
        {filteredBasic.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider px-1">
              <span>Basic Moves ({filteredBasic.length})</span>
            </div>
            {filteredBasic.map((move) => renderMoveCard(move))}
          </div>
        )}

        {/* Alternative Weird Moves Section */}
        {filteredWeird.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-purple-400 uppercase tracking-wider px-1">
              <span>Alternative Weird Moves ({filteredWeird.length})</span>
            </div>
            {filteredWeird.map((move) => renderMoveCard(move, true))}
          </div>
        )}

        {/* Phenomena Reference Section */}
        {showPhenomena && (
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg overflow-hidden space-y-2.5 p-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 border-b border-neutral-800 pb-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
              <span>Phenomena Reference (Mysteries & Anomaly Moves)</span>
            </div>

            {/* 4 Questions */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wide">
                4 Phenomena Questions:
              </span>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-0.5">
                {PHENOMENA_REFERENCE.questions.map((q, i) => (
                  <li key={i} className="pl-1">{q}</li>
                ))}
              </ul>
            </div>

            {/* 12 Threat Moves */}
            <div className="space-y-1 pt-1 border-t border-neutral-800/80">
              <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wide">
                12 Phenomenon Threat Moves:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-neutral-300">
                {PHENOMENA_REFERENCE.threatMoves.map((m, i) => (
                  <div key={i} className="bg-neutral-950/60 p-1 rounded border border-neutral-850">
                    • {m}
                  </div>
                ))}
              </div>
            </div>

            {/* 12 Phenomenon Types */}
            <div className="space-y-1 pt-1 border-t border-neutral-800/80">
              <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wide">
                12 Phenomenon Types & Motivations:
              </span>
              <div className="space-y-1">
                {PHENOMENA_REFERENCE.types.map((t, i) => (
                  <div key={i} className="text-xs bg-neutral-950/60 p-1.5 rounded border border-neutral-850">
                    <span className="font-bold text-red-300">{t.name}: </span>
                    <span className="text-neutral-300">{t.motivation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Rules Section */}
        {showRules && (
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-2.5 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 border-b border-neutral-800 pb-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quick Rules Reference</span>
            </div>

            {/* Harm & Recovery */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-neutral-200">Harm & Recovery:</span>
              <div className="space-y-1 text-xs text-neutral-300">
                {QUICK_RULES.harmAndRecovery.map((r, i) => (
                  <div key={i} className="bg-neutral-950/50 p-1.5 rounded border border-neutral-850">
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Armor & Luck */}
            <div className="grid grid-cols-1 gap-2 pt-1 border-t border-neutral-800/80 text-xs">
              <div className="bg-neutral-950/50 p-2 rounded border border-neutral-850 space-y-1">
                <span className="font-bold text-amber-300 text-[11px]">Armor Rules:</span>
                {QUICK_RULES.armor.map((a, i) => (
                  <p key={i} className="text-neutral-300">{a}</p>
                ))}
              </div>

              <div className="bg-neutral-950/50 p-2 rounded border border-neutral-850 space-y-1">
                <span className="font-bold text-amber-300 text-[11px]">Luck Points:</span>
                {QUICK_RULES.luck.map((l, i) => (
                  <p key={i} className="text-neutral-300">{l}</p>
                ))}
              </div>
            </div>

            {/* End of session questions */}
            <div className="bg-neutral-950/50 p-2 rounded border border-neutral-850 space-y-1">
              <span className="font-bold text-indigo-300 text-[11px] flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> End of Session Questions:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-xs text-neutral-300">
                {QUICK_RULES.endOfSessionQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function renderMoveCard(move: MotWMove, isWeird: boolean = false) {
    const isExpanded = !!expandedMoveIds[move.id];
    return (
      <div
        key={move.id}
        className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden transition-all shadow-xs"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-2 hover:bg-neutral-850 transition-colors">
          <button
            onClick={() => toggleExpand(move.id)}
            className="flex-1 flex items-center gap-2 text-left cursor-pointer"
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            )}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-neutral-100">{move.name}</span>
              {move.stat && (
                <span
                  className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded border ${
                    isWeird
                      ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                      : 'bg-amber-950/60 text-amber-300 border-amber-800'
                  }`}
                >
                  +{move.stat}
                </span>
              )}
            </div>
          </button>

          {/* Inline "Roll This Move" dice button */}
          <button
            onClick={() => onQuickRollMove(move.stat, move.name)}
            title={`Roll ${move.name} in Dice tab`}
            className="px-2 py-1 rounded bg-amber-600/30 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 border border-amber-500/50 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs shrink-0 ml-1.5"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Roll</span>
          </button>
        </div>

        {/* Trigger preview line if collapsed */}
        {!isExpanded && (
          <div
            onClick={() => toggleExpand(move.id)}
            className="px-2.5 pb-2 text-[11px] text-neutral-400 truncate cursor-pointer"
          >
            {move.trigger}
          </div>
        )}

        {/* Expanded Details: Full 7-9, 10+, 12+ text & questions */}
        {isExpanded && (
          <div className="p-2.5 pt-0 border-t border-neutral-800/80 space-y-2 text-xs bg-neutral-950/40">
            <p className="italic text-neutral-300 pt-2">{move.trigger}</p>

            {/* 10+ Outcome */}
            <div className="bg-emerald-950/40 border border-emerald-800/50 rounded p-2 space-y-1">
              <div className="font-bold text-emerald-300 text-[11px]">10+ (Strong Hit):</div>
              <div className="text-emerald-100 whitespace-pre-line leading-relaxed">
                {move.success10}
              </div>
            </div>

            {/* 7-9 Outcome */}
            <div className="bg-yellow-950/40 border border-yellow-800/50 rounded p-2 space-y-1">
              <div className="font-bold text-yellow-300 text-[11px]">7–9 (Weak Hit):</div>
              <div className="text-yellow-100 whitespace-pre-line leading-relaxed">
                {move.mixed79}
              </div>
            </div>

            {/* Miss (<=6) Outcome */}
            <div className="bg-red-950/40 border border-red-800/50 rounded p-2 space-y-1">
              <div className="font-bold text-red-300 text-[11px]">Miss (6 or less):</div>
              <div className="text-red-100 leading-relaxed">{move.miss6}</div>
            </div>

            {/* Advanced 12+ Outcome */}
            {move.advanced12 && (
              <div className="bg-amber-950/50 border border-amber-600/60 rounded p-2 space-y-1">
                <div className="font-bold text-amber-300 text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Advanced Hit (12+):</span>
                </div>
                <div className="text-amber-100 leading-relaxed">{move.advanced12}</div>
              </div>
            )}

            {/* Questions list if available (e.g. Investigate a Mystery, Read a Bad Situation) */}
            {move.questions && move.questions.length > 0 && (
              <div className="bg-neutral-900 border border-neutral-800 rounded p-2 space-y-1">
                <span className="font-bold text-neutral-300 text-[11px]">Hold Questions / Options:</span>
                <ul className="list-disc list-inside space-y-0.5 text-neutral-300 pl-1">
                  {move.questions.map((q, i) => (
                    <li key={i} className="text-[11px]">{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional notes */}
            {move.notes && (
              <div className="text-[11px] text-neutral-400 italic bg-neutral-900/60 p-1.5 rounded">
                Note: {move.notes}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};
