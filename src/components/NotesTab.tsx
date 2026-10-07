import React, { useState, useEffect, useRef } from 'react';
import {
  HunterProfile,
  HunterScopedNotes,
  TableNotesData,
  KeeperNoteCard,
  BroadcastPayload,
  KeeperMysteryData,
} from '../types/motw';
import {
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Save,
  Clock,
  Lock,
  Shield,
  FileText,
  HelpCircle,
  Award,
  CheckSquare,
  Square,
  RotateCcw,
  Skull,
} from 'lucide-react';
import { KeeperMysteryBoard } from './KeeperMysteryBoard';

interface NotesTabProps {
  activeHunter: HunterProfile | null;
  role: 'GM' | 'PLAYER';
  currentUserName: string;
  tableNotes: TableNotesData;
  onUpdateTableNotes: (data: TableNotesData) => void;
  activeBroadcast: BroadcastPayload | null;
  onUpdateBroadcast: (payload: BroadcastPayload | null) => void;
  onUpdateHunter?: (hunter: HunterProfile) => void;
  keeperMystery: KeeperMysteryData;
  onUpdateKeeperMystery: (data: KeeperMysteryData) => void;
}

const DEFAULT_HUNTER_NOTES: HunterScopedNotes = {
  general: 'Personal goals, motives, and cryptic hunches.',
  gear: 'Hunting equipment, spare ammo, silver talismans, and car keys.',
  contacts: 'Informants, occult librarians, and friendly coroners.',
  clues: 'Footprints in the cemetery, unusual sulfur residue.',
};

export const NotesTab: React.FC<NotesTabProps> = ({
  activeHunter,
  role,
  currentUserName,
  tableNotes,
  onUpdateTableNotes,
  activeBroadcast,
  onUpdateBroadcast,
  onUpdateHunter,
  keeperMystery,
  onUpdateKeeperMystery,
}) => {
  // Scope selector: hunter | table | keeper
  const [activeScope, setActiveScope] = useState<'hunter' | 'table' | 'keeper'>('hunter');

  // Keeper sub-view: 'mystery' (Clocks & Threat Board) | 'cards' (Secret Note Cards)
  const [keeperSubView, setKeeperSubView] = useState<'mystery' | 'cards'>('mystery');

  // Hunter sub-tabs: general | gear | contacts | clues
  const [hunterSubTab, setHunterSubTab] = useState<'general' | 'gear' | 'contacts' | 'clues'>('general');

  // Hunter notes state keyed to active hunter ID in localStorage
  const hunterId = activeHunter?.id || 'default_hunter';
  const [hunterNotes, setHunterNotes] = useState<HunterScopedNotes>(() => {
    try {
      const saved = localStorage.getItem(`motw_hunter_notes_${hunterId}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_HUNTER_NOTES;
  });

  // Reload hunter notes whenever activeHunter changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`motw_hunter_notes_${hunterId}`);
      if (saved) {
        setHunterNotes(JSON.parse(saved));
      } else {
        setHunterNotes(DEFAULT_HUNTER_NOTES);
      }
    } catch {
      setHunterNotes(DEFAULT_HUNTER_NOTES);
    }
  }, [hunterId]);

  // Save hunter notes on change
  const handleHunterNoteChange = (text: string) => {
    const updated = {
      ...hunterNotes,
      [hunterSubTab]: text,
    };
    setHunterNotes(updated);
    try {
      localStorage.setItem(`motw_hunter_notes_${hunterId}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // End of Session State
  const [isEndOfSessionOpen, setIsEndOfSessionOpen] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<Record<number, boolean>>({});
  const [awardedFeedback, setAwardedFeedback] = useState<string | null>(null);

  const officialQuestions = [
    'Did we conclude the current mystery?',
    'Did we save someone from certain death (or worse)?',
    'Did we learn something new and important about the world?',
    'Did we learn something new and important about one of the hunters?',
  ];

  const yesCount = [0, 1, 2, 3].filter((i) => sessionAnswers[i]).length;
  const xpToAward = yesCount === 0 ? 0 : yesCount <= 2 ? 1 : 2;
  const xpAwardLabel = yesCount === 0 ? '0 XP' : yesCount <= 2 ? 'Mark 1 Experience box' : 'Mark 2 Experience boxes';

  const handleApplyXpToHunter = () => {
    if (!activeHunter || !onUpdateHunter || xpToAward === 0) return;
    const currentXp = activeHunter.experience || 0;
    const newXp = Math.min(5, currentXp + xpToAward);
    onUpdateHunter({
      ...activeHunter,
      experience: newXp,
    });
    setAwardedFeedback(`Awarded +${xpToAward} XP to ${activeHunter.name}! (Now ${newXp}/5)`);
    setTimeout(() => setAwardedFeedback(null), 4000);
  };

  const handleLogReviewToTableNotes = () => {
    const formattedDate = new Date().toLocaleDateString();
    const summary = `\n\n--- [End of Session Review: ${formattedDate}] ---\nQuestions Answered YES: ${yesCount}/4\n• Concluded mystery? ${sessionAnswers[0] ? 'YES' : 'NO'}\n• Saved someone? ${sessionAnswers[1] ? 'YES' : 'NO'}\n• Learned about the world? ${sessionAnswers[2] ? 'YES' : 'NO'}\n• Learned about a hunter? ${sessionAnswers[3] ? 'YES' : 'NO'}\nOutcome: ${xpAwardLabel}\n---------------------------------------------`;
    handleTableTextChange(tableText + summary);
    setAwardedFeedback('Logged session debrief to Table Notes!');
    setTimeout(() => setAwardedFeedback(null), 4000);
  };

  // Table Notes local buffer + 400ms debounced autosave
  const [tableText, setTableText] = useState(tableNotes.content || '');
  const [isSavingTable, setIsSavingTable] = useState(false);
  const debounceTimerRef = useRef<any>(null);

  useEffect(() => {
    // If incoming table notes changed externally and we're not currently typing
    if (tableNotes.content !== tableText && !debounceTimerRef.current) {
      setTableText(tableNotes.content || '');
    }
  }, [tableNotes.content]);

  const handleTableTextChange = (newVal: string) => {
    setTableText(newVal);
    setIsSavingTable(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onUpdateTableNotes({
        content: newVal,
        updatedAt: Date.now(),
        updatedBy: currentUserName || 'Unknown',
      });
      setIsSavingTable(false);
      debounceTimerRef.current = null;
    }, 400); // 400ms debounced autosave as requested
  };

  // Keeper Notes state (Multi-note card system persisted to localStorage)
  const [keeperCards, setKeeperCards] = useState<KeeperNoteCard[]>(() => {
    try {
      const saved = localStorage.getItem('motw_keeper_cards');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'card-countdown',
        title: 'Mystery Countdown Tracker',
        category: 'countdown',
        content: 'Day: Disappearances along Blackwood Ridge.\nShadows: Ranger found drained of blood.\nSunset: Cell towers drop offline.\nDusk: Wendigo storms the lodge.\nNight: Blizzard locks in survivors.\nMidnight: The pack awakens completely.',
        isExpanded: true,
        createdAt: Date.now() - 3600000,
        updatedAt: Date.now() - 3600000,
      },
      {
        id: 'card-monster-stats',
        title: 'Monster: The Blackwood Wendigo',
        category: 'monster',
        content: 'Harm: 10/10\nArmor: 1 (supernatural hide)\nAttacks: Rending Claws (3-harm hand messy), Freezing Howl (1-harm area terror)\nWeakness: Fire and silver ash directly to the heart.',
        isExpanded: true,
        createdAt: Date.now() - 1800000,
        updatedAt: Date.now() - 1800000,
      },
      {
        id: 'card-clue-relic',
        title: 'Player Clue: The Carved Bone Charm',
        category: 'clue',
        content: 'An ancient talisman made from a deer antler, etched with warding runes against frostbite. Reading the runes reveals the creature cannot cross running water.',
        isExpanded: false,
        createdAt: Date.now() - 600000,
        updatedAt: Date.now() - 600000,
      },
    ];
  });

  const saveKeeperCards = (cards: KeeperNoteCard[]) => {
    setKeeperCards(cards);
    try {
      localStorage.setItem('motw_keeper_cards', JSON.stringify(cards));
    } catch {
      // ignore
    }
  };

  const handleAddKeeperCard = () => {
    const newCard: KeeperNoteCard = {
      id: 'kcard-' + Date.now(),
      title: 'New Keeper Note',
      category: 'general',
      content: '',
      isExpanded: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    saveKeeperCards([newCard, ...keeperCards]);
  };

  const handleDeleteKeeperCard = (id: string) => {
    // If deleted card was currently broadcasting, dismiss broadcast
    if (activeBroadcast?.id === id) {
      onUpdateBroadcast(null);
    }
    saveKeeperCards(keeperCards.filter((c) => c.id !== id));
  };

  const handleUpdateKeeperCard = (id: string, updates: Partial<KeeperNoteCard>) => {
    const nextCards = keeperCards.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c));
    saveKeeperCards(nextCards);

    // If this card is currently broadcasting, update broadcast content too
    if (activeBroadcast?.id === id && activeBroadcast.active) {
      const updatedCard = nextCards.find((c) => c.id === id);
      if (updatedCard) {
        onUpdateBroadcast({
          ...activeBroadcast,
          title: updatedCard.title,
          content: updatedCard.content,
          timestamp: Date.now(),
        });
      }
    }
  };

  const handleToggleBroadcastCard = (card: KeeperNoteCard) => {
    if (activeBroadcast?.id === card.id && activeBroadcast.active) {
      // Toggling OFF closes the broadcast
      onUpdateBroadcast(null);
    } else {
      // Toggling ON reveals it to table
      onUpdateBroadcast({
        id: card.id,
        title: card.title,
        content: card.content,
        authorName: currentUserName || 'The Keeper',
        timestamp: Date.now(),
        active: true,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-hidden">
      {/* 3-Tier Scope Selector */}
      <div className="p-2 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between gap-1 shrink-0">
        <div className="flex items-center gap-1 w-full">
          <button
            onClick={() => setActiveScope('hunter')}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
              activeScope === 'hunter'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-neutral-950/60 text-neutral-400 hover:text-white border border-transparent'
            }`}
          >
            <span>👤</span>
            <span className="truncate">Hunter Notes</span>
          </button>

          <button
            onClick={() => setActiveScope('table')}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
              activeScope === 'table'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-neutral-950/60 text-neutral-400 hover:text-white border border-transparent'
            }`}
          >
            <span>📜</span>
            <span className="truncate">Table Notes</span>
          </button>

          <button
            onClick={() => {
              if (role === 'GM') {
                setActiveScope('keeper');
              }
            }}
            disabled={role !== 'GM'}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
              role !== 'GM'
                ? 'opacity-40 text-neutral-500 cursor-not-allowed border border-transparent'
                : activeScope === 'keeper'
                ? 'bg-purple-950/60 text-purple-300 border border-purple-500/50 shadow-xs'
                : 'bg-neutral-950/60 text-neutral-400 hover:text-white border border-transparent'
            }`}
            title={role === 'GM' ? 'Keeper Only Notes' : 'Restricted to GM (Keeper)'}
          >
            <span>🔒</span>
            <span className="truncate">Keeper Notes</span>
          </button>
        </div>
      </div>

      {/* End of Session Review Quick Trigger Bar */}
      <div className="px-2.5 py-1 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs shrink-0">
        <button
          onClick={() => setIsEndOfSessionOpen(!isEndOfSessionOpen)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer border ${
            isEndOfSessionOpen
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-xs'
              : 'bg-indigo-950/60 text-indigo-300 border-indigo-700/50 hover:bg-indigo-900/60'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span>End of Session Questions & XP Tracker</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-950 font-mono text-amber-300">
            {yesCount}/4 YES ({xpAwardLabel})
          </span>
        </button>

        {awardedFeedback && (
          <span className="text-[11px] text-emerald-400 font-semibold animate-pulse">
            ✓ {awardedFeedback}
          </span>
        )}
      </div>

      {/* Interactive End of Session Review Panel */}
      {isEndOfSessionOpen && (
        <div className="bg-neutral-900 border-b border-indigo-800/80 p-3 space-y-2.5 shrink-0 max-h-[50%] overflow-y-auto text-neutral-100 shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs text-indigo-200">
                End of Session Official Ruling: The 4 Questions
              </span>
            </div>
            <button
              onClick={() => setIsEndOfSessionOpen(false)}
              className="text-neutral-400 hover:text-white text-xs px-1 cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          <p className="text-[11px] text-neutral-300 leading-relaxed">
            At the end of each session, the Keeper asks the 4 questions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {officialQuestions.map((q, idx) => {
              const checked = !!sessionAnswers[idx];
              return (
                <label
                  key={idx}
                  className={`p-2 rounded border flex items-start gap-2 cursor-pointer transition-colors text-xs ${
                    checked
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-100 font-medium'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setSessionAnswers((prev) => ({
                        ...prev,
                        [idx]: e.target.checked,
                      }))
                    }
                    className="accent-indigo-500 mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-neutral-200 block">{idx + 1}. {q}</span>
                  </div>
                  <span className="text-[10px] font-mono shrink-0 text-neutral-400">
                    {checked ? '✓ YES' : 'NO'}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Official Rule & Logic Breakdown */}
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                XP Award Logic:
              </span>
              <span className="text-[11px] text-neutral-300 block">
                • 0 "Yes" answers = 0 XP &nbsp;|&nbsp; • 1 or 2 "Yes" answers = Mark 1 Experience box &nbsp;|&nbsp; • 3 or 4 "Yes" answers = Mark 2 Experience boxes
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-600/50 px-2 py-1 rounded">
                Award: {xpAwardLabel}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-800 flex-wrap">
            <button
              onClick={() => setSessionAnswers({})}
              className="px-2 py-1 text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Questions</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLogReviewToTableNotes}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded text-xs font-medium cursor-pointer transition-colors"
              >
                Log to Table Notes
              </button>

              {activeHunter && onUpdateHunter && (
                <button
                  onClick={handleApplyXpToHunter}
                  disabled={xpToAward === 0}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-neutral-950 font-bold rounded text-xs cursor-pointer shadow transition-colors flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Award +{xpToAward} XP to {activeHunter.name}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Scope 1: Hunter Notes */}
      {activeScope === 'hunter' && (
        <div className="flex-1 flex flex-col min-h-0 p-2.5 space-y-2">
          {/* Sub-tabs: [General] [Gear] [Contacts] [Clues] */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 shrink-0">
            <div className="flex items-center gap-1">
              {(['general', 'gear', 'contacts', 'clues'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setHunterSubTab(tab)}
                  className={`px-2 py-0.5 rounded text-xs capitalize transition-colors cursor-pointer ${
                    hunterSubTab === tab
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-200 bg-neutral-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="text-[10px] text-neutral-500 truncate max-w-[150px]">
              {activeHunter ? activeHunter.name : 'Default'}
            </span>
          </div>

          {/* Text Editor */}
          <div className="flex-1 flex flex-col min-h-0 bg-neutral-900/60 border border-neutral-800 rounded-md p-2">
            <textarea
              value={hunterNotes[hunterSubTab]}
              onChange={(e) => handleHunterNoteChange(e.target.value)}
              placeholder={`Write your hunter ${hunterSubTab} notes here...`}
              className="w-full flex-1 min-h-0 bg-transparent text-xs text-neutral-200 placeholder-neutral-500 resize-none focus:outline-none leading-relaxed font-sans"
            />
            <div className="pt-1 text-[10px] text-neutral-500 flex items-center justify-between border-t border-neutral-800/80">
              <span>Saved locally for {activeHunter?.name || 'this hunter'}</span>
              <span>{hunterNotes[hunterSubTab].length} characters</span>
            </div>
          </div>
        </div>
      )}

      {/* Scope 2: Table Notes */}
      {activeScope === 'table' && (
        <div className="flex-1 flex flex-col min-h-0 p-2.5 space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-neutral-200">Shared Table Scratchpad</span>
              {isSavingTable && (
                <span className="text-[10px] text-amber-400 animate-pulse flex items-center gap-0.5">
                  <Save className="w-3 h-3" /> Syncing...
                </span>
              )}
            </div>
            {tableNotes.updatedAt > 0 && (
              <span className="text-[10px] text-neutral-500">
                Last edited by {tableNotes.updatedBy || 'Table'}
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col min-h-0 bg-neutral-900/60 border border-neutral-800 rounded-md p-2">
            <textarea
              value={tableText}
              onChange={(e) => handleTableTextChange(e.target.value)}
              placeholder="Shared clues, witness testimony, group plans, suspected monster weaknesses... Syncs automatically with everyone in the room."
              className="w-full flex-1 min-h-0 bg-transparent text-xs text-neutral-200 placeholder-neutral-500 resize-none focus:outline-none leading-relaxed font-sans"
            />
            <div className="pt-1 text-[10px] text-neutral-500 flex items-center justify-between border-t border-neutral-800/80">
              <span>Room sync (400ms debounced autosave)</span>
              <span>{tableText.length} characters</span>
            </div>
          </div>
        </div>
      )}

      {/* Scope 3: Keeper Notes (GM Only) */}
      {activeScope === 'keeper' && role === 'GM' && (
        <div className="flex-1 flex flex-col min-h-0 p-2.5 space-y-2">
          {/* Sub-view Navigation: Mystery Clocks & Threats vs Note Cards */}
          <div className="flex items-center justify-between gap-1 border-b border-neutral-800 pb-1.5 shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setKeeperSubView('mystery')}
                className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  keeperSubView === 'mystery'
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-xs'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border-neutral-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Mystery Clocks & Threats</span>
              </button>

              <button
                onClick={() => setKeeperSubView('cards')}
                className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  keeperSubView === 'cards'
                    ? 'bg-purple-900/80 text-purple-200 border-purple-500 shadow-xs'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border-neutral-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Note Cards ({keeperCards.length})</span>
              </button>
            </div>

            {keeperSubView === 'cards' && (
              <button
                onClick={handleAddKeeperCard}
                className="px-2 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded text-xs font-semibold flex items-center gap-1 border border-purple-700/60 cursor-pointer transition-colors shadow-xs"
              >
                <Plus className="w-3 h-3" />
                <span>New Card</span>
              </button>
            )}
          </div>

          {/* Active Broadcast Indicator */}
          {activeBroadcast?.active && (
            <div className="bg-amber-950/60 border border-amber-600/70 rounded p-2 text-xs flex items-center justify-between gap-2 shadow-xs shrink-0">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-amber-400 animate-pulse font-bold">👁️ Broadcast Active:</span>
                <span className="font-semibold text-amber-200 truncate">{activeBroadcast.title}</span>
              </div>
              <button
                onClick={() => onUpdateBroadcast(null)}
                className="px-2 py-0.5 bg-red-900/80 hover:bg-red-800 text-red-100 rounded text-[11px] font-bold shrink-0 cursor-pointer"
              >
                End Reveal
              </button>
            </div>
          )}

          {/* Sub-view Content */}
          {keeperSubView === 'mystery' ? (
            <div className="flex-1 overflow-y-auto pr-0.5 min-h-0">
              <KeeperMysteryBoard
                data={keeperMystery}
                onChange={onUpdateKeeperMystery}
                onBroadcastToTableNotes={(text) => handleTableTextChange(tableText + text)}
              />
            </div>
          ) : (
            /* Cards List */
            <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 min-h-0">
              {keeperCards.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-500 italic">
                  No Keeper cards created yet. Click "New Card" to begin staging your mystery!
                </div>
              ) : (
                keeperCards.map((card) => {
                  const isBroadcastingThis =
                    activeBroadcast?.id === card.id && activeBroadcast.active;
                  return (
                    <div
                      key={card.id}
                      className={`bg-neutral-900 border rounded-lg overflow-hidden transition-all shadow-xs ${
                        isBroadcastingThis ? 'border-amber-500 shadow-amber-950/50' : 'border-neutral-800'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="p-2 flex items-center justify-between bg-neutral-850 gap-2">
                        <div
                          onClick={() =>
                            handleUpdateKeeperCard(card.id, { isExpanded: !card.isExpanded })
                          }
                          className="flex-1 flex items-center gap-1.5 cursor-pointer truncate"
                        >
                          {card.isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          )}
                          <input
                            type="text"
                            value={card.title}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleUpdateKeeperCard(card.id, { title: e.target.value })
                            }
                            className="bg-transparent text-xs font-bold text-neutral-200 focus:outline-none focus:border-b border-amber-500 w-full"
                            placeholder="Note Title"
                          />
                        </div>

                        {/* Card Action Cluster */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* "👁️ Reveal to Table" toggle */}
                          <button
                            onClick={() => handleToggleBroadcastCard(card)}
                            title={
                              isBroadcastingThis
                                ? 'Hide from player screens'
                                : 'Broadcast this note directly to player screens'
                            }
                            className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                              isBroadcastingThis
                                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-xs'
                                : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white hover:bg-neutral-700'
                            }`}
                          >
                            {isBroadcastingThis ? (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>Hide</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>Reveal</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleDeleteKeeperCard(card.id)}
                            className="p-1 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Card Body */}
                      {card.isExpanded && (
                        <div className="p-2 border-t border-neutral-800/80 bg-neutral-950/40 space-y-1.5">
                          <textarea
                            value={card.content}
                            onChange={(e) =>
                              handleUpdateKeeperCard(card.id, { content: e.target.value })
                            }
                            rows={4}
                            placeholder="Note content, countdown stages, monster stats, clues to reveal..."
                            className="w-full bg-transparent text-xs text-neutral-200 placeholder-neutral-500 resize-y focus:outline-none leading-relaxed font-sans"
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
