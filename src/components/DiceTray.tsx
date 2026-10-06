import React, { useState, useEffect } from 'react';
import { HunterProfile, RollResult, RollScope, StatType } from '../types/motw';
import {
  Sparkles,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { executePbtaRoll, findMoveDetails, getOutcomeTextForMove } from '../utils/rollEngine';

interface DiceTrayProps {
  activeHunter: HunterProfile | null;
  role: 'GM' | 'PLAYER';
  currentUserId: string;
  currentUserName: string;
  rollFeed: RollResult[];
  onAddRoll: (roll: RollResult) => void;
  onClearFeed: () => void;
  onMarkExperience: () => void;
  onSpendLuck?: () => void;
  selectedMoveName?: string | null;
  onClearSelectedMove?: () => void;
}

export const DiceTray: React.FC<DiceTrayProps> = ({
  activeHunter,
  role,
  currentUserId,
  currentUserName,
  rollFeed,
  onAddRoll,
  onClearFeed,
  onMarkExperience,
  onSpendLuck,
  selectedMoveName,
  onClearSelectedMove,
}) => {
  const [selectedStat, setSelectedStat] = useState<StatType | 'none'>('sharp');
  const [modifier, setModifier] = useState<number>(0); // Range -3 to +3
  const [forwardMod, setForwardMod] = useState<number>(0);
  const [scope, setScope] = useState<RollScope>('public');
  const [latestRoll, setLatestRoll] = useState<RollResult | null>(() => rollFeed[0] || null);
  const [isRolling, setIsRolling] = useState(false);
  const [expandedOutcomeIds, setExpandedOutcomeIds] = useState<Record<string, boolean>>({});

  // Keep latestRoll in sync if rollFeed has newer top item
  useEffect(() => {
    if (rollFeed.length > 0 && (!latestRoll || latestRoll.id !== rollFeed[0].id)) {
      setLatestRoll(rollFeed[0]);
    }
  }, [rollFeed]);

  // If a move was selected from sheet or grimoire, pre-select its stat if possible
  useEffect(() => {
    if (selectedMoveName) {
      const details = findMoveDetails(selectedMoveName);
      if (details?.stat) {
        setSelectedStat(details.stat);
      }
    }
  }, [selectedMoveName]);

  // Calculate stat value
  const statVal =
    selectedStat !== 'none' && activeHunter
      ? activeHunter.stats[selectedStat] ?? 0
      : 0;

  const totalMod = statVal + modifier + forwardMod;

  const handleRoll = () => {
    setIsRolling(true);

    const moveTitle =
      selectedMoveName ||
      (selectedStat !== 'none'
        ? `Roll +${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)}`
        : 'Basic 2d6 Roll');

    const rollData = executePbtaRoll({
      moveName: moveTitle,
      stat: selectedStat !== 'none' ? selectedStat : undefined,
      hunter: activeHunter,
      rollerId: currentUserId,
      rollerName: currentUserName || (role === 'GM' ? 'Keeper' : 'Hunter'),
      scope,
      modifier,
      forwardMod,
    });

    setTimeout(() => {
      setLatestRoll(rollData);
      onAddRoll(rollData);
      setIsRolling(false);
      if (forwardMod !== 0) {
        setForwardMod(0);
      }
    }, 150);
  };

  // Convert roll directly to 12 via Luck
  const handleTurnTo12WithLuck = () => {
    if (!latestRoll || !activeHunter) return;
    const details = findMoveDetails(latestRoll.moveName);
    const updatedOutcome = getOutcomeTextForMove('advanced', details);

    const updatedRoll: RollResult = {
      ...latestRoll,
      total: 12,
      tier: 'advanced',
      luckSpent: true,
      outcomeText: updatedOutcome,
      moveName: latestRoll.moveName.includes('(Luck Spent)')
        ? latestRoll.moveName
        : `${latestRoll.moveName} (Luck Spent)`,
    };
    setLatestRoll(updatedRoll);
    onAddRoll(updatedRoll);
    if (onSpendLuck) onSpendLuck();
  };

  const toggleFeedOutcome = (id: string) => {
    setExpandedOutcomeIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const statFormattedName =
    selectedStat !== 'none'
      ? selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)
      : '';

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 p-2 space-y-2 overflow-hidden">
      {/* 1. Triggered Move Chip */}
      {selectedMoveName && (
        <div className="h-7 px-2 text-xs bg-amber-950/60 border border-amber-800/80 rounded flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 truncate mr-1 font-semibold text-amber-200">
            <span className="truncate">
              🎯 Move: {selectedMoveName}
              {selectedStat !== 'none' ? ` (+${statFormattedName})` : ''}
            </span>
          </div>
          <button
            onClick={onClearSelectedMove}
            className="text-amber-400 hover:text-amber-200 text-xs px-1 py-0.5 rounded hover:bg-amber-900/50 cursor-pointer shrink-0 font-medium"
            title="Clear move selection"
          >
            ✕ Clear
          </button>
        </div>
      )}

      {/* 2. Consolidated Controls: 5 Hunter Stat Pills (h-11) */}
      <div className="grid grid-cols-5 gap-1 shrink-0">
        {(['charm', 'cool', 'sharp', 'tough', 'weird'] as StatType[]).map((st) => {
          const val = activeHunter ? activeHunter.stats[st] ?? 0 : 0;
          const isSelected = selectedStat === st;
          return (
            <button
              key={st}
              onClick={() => setSelectedStat(st)}
              className={`h-11 flex flex-col items-center justify-center rounded border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-500/70 text-amber-300 shadow-xs ring-1 ring-amber-500/40'
                  : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <span className="capitalize text-[10px] text-neutral-400 leading-none">{st}</span>
              <span
                className={`text-xs font-bold leading-tight mt-0.5 ${
                  val > 0 ? 'text-amber-400' : val < 0 ? 'text-red-400' : 'text-neutral-300'
                }`}
              >
                {val >= 0 ? `+${val}` : val}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grouped Modifier, Conditions & Visibility row */}
      <div className="flex items-center justify-between gap-1 bg-neutral-900/90 border border-neutral-800 rounded p-1.5 shrink-0 text-xs">
        {/* Left: Mod: [-] +0 [+] */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[11px] font-semibold text-neutral-400">Mod:</span>
          <div className="inline-flex items-center bg-neutral-950 border border-neutral-700 rounded h-7">
            <button
              onClick={() => setModifier((m) => Math.max(-3, m - 1))}
              className="w-7 h-full flex items-center justify-center text-xs text-neutral-300 hover:bg-neutral-800 rounded-l cursor-pointer font-bold"
              title="Decrease modifier"
            >
              -
            </button>
            <span className="w-6 text-center text-xs font-mono font-bold text-amber-300">
              {modifier >= 0 ? `+${modifier}` : modifier}
            </span>
            <button
              onClick={() => setModifier((m) => Math.min(3, m + 1))}
              className="w-7 h-full flex items-center justify-center text-xs text-neutral-300 hover:bg-neutral-800 rounded-r cursor-pointer font-bold"
              title="Increase modifier"
            >
              +
            </button>
          </div>
        </div>

        {/* Center: Quick condition chips */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setForwardMod((f) => (f === 1 ? 0 : 1))}
            className={`px-1.5 h-7 rounded text-[11px] border transition-colors cursor-pointer flex items-center ${
              forwardMod === 1
                ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold'
                : 'bg-neutral-950 border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
            title="+1 Forward"
          >
            +1 Fwd
          </button>
          <button
            onClick={() => setForwardMod((f) => (f === -1 ? 0 : -1))}
            className={`px-1.5 h-7 rounded text-[11px] border transition-colors cursor-pointer flex items-center ${
              forwardMod === -1
                ? 'bg-red-500 text-neutral-950 border-red-400 font-bold'
                : 'bg-neutral-950 border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
            title="-1 Forward"
          >
            -1 Fwd
          </button>
          <button
            onClick={() => setForwardMod((f) => (f === 2 ? 0 : 2))}
            className={`px-1.5 h-7 rounded text-[11px] border transition-colors cursor-pointer flex items-center ${
              forwardMod === 2
                ? 'bg-indigo-500 text-white border-indigo-400 font-bold'
                : 'bg-neutral-950 border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
            title="+1 Ongoing"
          >
            +1 Ong
          </button>
        </div>

        {/* Right: Compact visibility pill */}
        <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded p-0.5 text-[10px] h-7 shrink-0">
          <button
            onClick={() => setScope('public')}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              scope === 'public'
                ? 'bg-amber-500/25 text-amber-300 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Visible to table"
          >
            Public
          </button>
          <button
            onClick={() => setScope('keeper')}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              scope === 'keeper'
                ? 'bg-purple-500/25 text-purple-300 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Keeper only"
          >
            Keeper
          </button>
          <button
            onClick={() => setScope('self')}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              scope === 'self'
                ? 'bg-neutral-700 text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Self only"
          >
            Self
          </button>
        </div>
      </div>

      {/* 3. Streamlined Roll Button (h-10) */}
      <button
        onClick={handleRoll}
        disabled={isRolling}
        className="w-full h-10 px-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 active:scale-[0.99] text-neutral-950 font-bold rounded shadow-md border border-amber-400/50 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 text-sm shrink-0"
      >
        <span className="flex items-center gap-1.5">
          <span>🎲</span>
          <span>
            Roll 2d6 {selectedStat !== 'none' ? `+ ${statFormattedName}` : ''} ({totalMod >= 0 ? `+${totalMod}` : totalMod})
          </span>
        </span>
      </button>

      {/* 4. Latest Roll Display: Compact Outcome Card */}
      {latestRoll && (
        <div className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/90 flex flex-col gap-1.5 shrink-0 shadow-md">
          {/* Header: [Move Name or Stat Roll]  [Dice 1] + [Dice 2] + [Mod] = [Total] */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-bold text-neutral-200 truncate">
                {latestRoll.moveName}
              </span>
              {latestRoll.scope === 'keeper' && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-700 shrink-0">
                  🔒 Keeper
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 font-mono shrink-0 text-xs">
              <span className="w-5 h-5 rounded bg-neutral-950 border border-neutral-700 flex items-center justify-center font-bold text-amber-300">
                {latestRoll.d1}
              </span>
              <span className="text-neutral-500">+</span>
              <span className="w-5 h-5 rounded bg-neutral-950 border border-neutral-700 flex items-center justify-center font-bold text-amber-300">
                {latestRoll.d2}
              </span>
              {latestRoll.modifier !== 0 && (
                <>
                  <span className="text-neutral-500">+</span>
                  <span className="text-neutral-300 font-semibold">
                    {latestRoll.modifier >= 0 ? `+${latestRoll.modifier}` : latestRoll.modifier}
                  </span>
                </>
              )}
              {latestRoll.forwardOngoingMod !== 0 && (
                <>
                  <span className="text-neutral-500">+</span>
                  <span className="text-neutral-400">
                    {latestRoll.forwardOngoingMod >= 0 ? `+${latestRoll.forwardOngoingMod}` : latestRoll.forwardOngoingMod}
                  </span>
                </>
              )}
              <span className="text-neutral-500">=</span>
              <span className="font-extrabold text-white px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700">
                {latestRoll.total}
              </span>
            </div>
          </div>

          {/* Outcome Badge & Rule Text */}
          <div className="flex items-start gap-2 pt-0.5">
            <span
              className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-bold border ${
                latestRoll.tier === 'miss'
                  ? 'bg-red-950/80 text-red-300 border-red-700/60'
                  : latestRoll.tier === 'weak'
                  ? 'bg-yellow-950/80 text-yellow-300 border-yellow-700/60'
                  : latestRoll.tier === 'strong'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                  : 'bg-amber-950/80 text-amber-300 border-amber-600/60'
              }`}
            >
              {latestRoll.tier === 'miss'
                ? 'Miss <=6'
                : latestRoll.tier === 'weak'
                ? 'Weak Hit 7-9'
                : latestRoll.tier === 'strong'
                ? 'Strong Hit 10-11'
                : 'Advanced Hit 12+'}
            </span>
            <div className="flex-1 text-[11px] leading-snug text-neutral-300">
              {latestRoll.outcomeText || 'Outcome resolved according to narrative rules.'}
            </div>
          </div>

          {/* Contextual actions: XP on Miss, Luck conversion */}
          {(latestRoll.tier === 'miss' || latestRoll.tier === 'weak') && activeHunter && (
            <div className="flex items-center justify-between pt-1 border-t border-neutral-800 text-[11px]">
              {latestRoll.tier === 'miss' ? (
                <button
                  onClick={onMarkExperience}
                  className="px-2 py-0.5 bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white rounded border border-red-500/50 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Mark +1 XP</span>
                </button>
              ) : (
                <span className="text-neutral-500 text-[10px]">Mixed result</span>
              )}
              <button
                onClick={handleTurnTo12WithLuck}
                className="text-amber-300 hover:text-amber-200 underline cursor-pointer text-[10px]"
              >
                Spend 1 Luck (Turn to 12)
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Expanded Roll Feed Container (flex-1 min-h-[220px] overflow-y-auto) */}
      <div className="flex-1 min-h-[220px] flex flex-col bg-neutral-900/60 border border-neutral-800 rounded p-2 overflow-hidden shadow-xs">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-neutral-300">Room Roll Feed</span>
            <span className="text-[10px] px-1.5 rounded-full bg-neutral-800 text-neutral-400 font-mono">
              {rollFeed.length}
            </span>
          </div>
          {rollFeed.length > 0 && (
            <button
              onClick={onClearFeed}
              className="text-[10px] text-neutral-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
              title="Clear Feed"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Scrollable feed list */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 mt-1.5">
          {rollFeed.length === 0 ? (
            <div className="py-6 text-center text-xs text-neutral-500 italic">
              No rolls recorded yet this session. Click any move roll button!
            </div>
          ) : (
            rollFeed.map((roll) => {
              // Mask keeper rolls for non-Keeper and non-roller
              const isMaskedForUser =
                roll.scope === 'keeper' && role !== 'GM' && roll.rollerId !== currentUserId;

              // Hide self rolls from other players
              if (roll.scope === 'self' && roll.rollerId !== currentUserId) {
                return null;
              }

              if (isMaskedForUser) {
                return (
                  <div
                    key={roll.id}
                    className="p-1.5 rounded bg-neutral-950/70 border border-purple-950 text-xs text-neutral-400 italic flex items-center justify-between"
                  >
                    <span>{roll.rollerName} rolled secretly to the Keeper 🔒</span>
                    <span className="text-[9px] text-neutral-600 font-mono">
                      {new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              }

              const tierBadgeColor =
                roll.tier === 'miss'
                  ? 'bg-red-900/40 text-red-300 border-red-700/50'
                  : roll.tier === 'weak'
                  ? 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50'
                  : roll.tier === 'strong'
                  ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50'
                  : 'bg-amber-900/40 text-amber-300 border-amber-600/50';

              const tierText =
                roll.tier === 'miss'
                  ? 'Miss'
                  : roll.tier === 'weak'
                  ? '7–9 Weak'
                  : roll.tier === 'strong'
                  ? '10–11 Strong'
                  : '12+ Advanced';

              const isOutcomeOpen = expandedOutcomeIds[roll.id] ?? false;

              return (
                <div
                  key={roll.id}
                  className="p-2 rounded bg-neutral-950/90 border border-neutral-800 text-xs space-y-1 shadow-xs"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-neutral-200 truncate">{roll.rollerName}</span>
                      <span className="text-neutral-400 font-normal truncate">({roll.hunterName})</span>
                      {roll.scope === 'keeper' && (
                        <span className="text-[9px] px-1 bg-purple-950 border border-purple-800 text-purple-300 rounded shrink-0">
                          Keeper 🔒
                        </span>
                      )}
                      {roll.scope === 'self' && (
                        <span className="text-[9px] px-1 bg-neutral-800 text-neutral-300 rounded shrink-0">
                          Self Only
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-neutral-500 font-mono shrink-0">
                      {new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs text-neutral-200 font-bold truncate">
                      {roll.moveName}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono text-neutral-400">
                        [{roll.d1}+{roll.d2}
                        {roll.modifier !== 0 ? (roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier) : ''}
                        {roll.forwardOngoingMod !== 0
                          ? roll.forwardOngoingMod > 0
                            ? `+${roll.forwardOngoingMod}`
                            : roll.forwardOngoingMod
                          : ''}
                        ]
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[11px] font-bold border ${tierBadgeColor}`}
                      >
                        {roll.total} ({tierText})
                      </span>
                    </div>
                  </div>

                  {/* Narrative rule outcome toggle */}
                  {roll.outcomeText && (
                    <div className="pt-0.5 border-t border-neutral-900 space-y-0.5">
                      <button
                        onClick={() => toggleFeedOutcome(roll.id)}
                        className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-neutral-200 cursor-pointer"
                      >
                        {isOutcomeOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        <span>Rule Outcome</span>
                      </button>
                      {isOutcomeOpen && (
                        <div
                          className={`p-1.5 rounded text-[11px] whitespace-pre-line leading-relaxed border ${
                            roll.tier === 'miss'
                              ? 'bg-red-950/40 text-red-200 border-red-900/60'
                              : roll.tier === 'weak'
                              ? 'bg-yellow-950/40 text-yellow-200 border-yellow-900/60'
                              : roll.tier === 'strong'
                              ? 'bg-emerald-950/40 text-emerald-200 border-emerald-900/60'
                              : 'bg-amber-950/40 text-amber-200 border-amber-900/60'
                          }`}
                        >
                          {roll.outcomeText}
                        </div>
                      )}
                    </div>
                  )}

                  {/* One-click XP on miss in feed */}
                  {roll.tier === 'miss' && (
                    <div className="flex items-center justify-between pt-0.5 text-[10px]">
                      <span className="text-red-400/80">Miss occurred</span>
                      <button
                        onClick={onMarkExperience}
                        className="px-1.5 py-0.2 bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white rounded border border-red-500/40 font-semibold cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Mark +1 XP</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
