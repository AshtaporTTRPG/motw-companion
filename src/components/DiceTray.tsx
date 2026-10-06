import React, { useState } from 'react';
import { HunterProfile, RollResult, RollScope, RollTier, StatType } from '../types/motw';
import { Sparkles, Trash2, Eye, EyeOff, ShieldAlert, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

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
  const [customMoveName, setCustomMoveName] = useState<string>('');
  const [modifier, setModifier] = useState<number>(0); // Range -3 to +3
  const [forwardMod, setForwardMod] = useState<number>(0);
  const [scope, setScope] = useState<RollScope>('public');
  const [latestRoll, setLatestRoll] = useState<RollResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  // Calculate stat value
  const statVal =
    selectedStat !== 'none' && activeHunter
      ? activeHunter.stats[selectedStat] ?? 0
      : 0;

  const totalMod = statVal + modifier + forwardMod;

  const getTier = (total: number): RollTier => {
    if (total <= 6) return 'miss';
    if (total <= 9) return 'weak';
    if (total <= 11) return 'strong';
    return 'advanced';
  };

  const handleRoll = () => {
    setIsRolling(true);

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const sumTotal = d1 + d2 + totalMod;
    const tier = getTier(sumTotal);

    const moveTitle =
      selectedMoveName ||
      customMoveName.trim() ||
      (selectedStat !== 'none'
        ? `Roll +${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)}`
        : 'Basic 2d6 Roll');

    const rollData: RollResult = {
      id: 'roll-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      rollerId: currentUserId,
      rollerName: currentUserName || (role === 'GM' ? 'Keeper' : 'Hunter'),
      hunterName: activeHunter ? activeHunter.name : 'Unknown Hunter',
      moveName: moveTitle,
      statUsed: selectedStat,
      d1,
      d2,
      modifier: statVal + modifier,
      forwardOngoingMod: forwardMod,
      total: sumTotal,
      tier,
      scope,
      timestamp: Date.now(),
    };

    setTimeout(() => {
      setLatestRoll(rollData);
      onAddRoll(rollData);
      setIsRolling(false);
      // Reset one-time forward if set
      if (forwardMod !== 0) {
        setForwardMod(0);
      }
    }, 180);
  };

  // Convert roll directly to 12 via Luck
  const handleTurnTo12WithLuck = () => {
    if (!latestRoll || !activeHunter) return;
    const updatedRoll: RollResult = {
      ...latestRoll,
      total: 12,
      tier: 'advanced',
      luckSpent: true,
      moveName: `${latestRoll.moveName} (Luck Spent)`,
    };
    setLatestRoll(updatedRoll);
    onAddRoll(updatedRoll);
    if (onSpendLuck) onSpendLuck();
  };

  // Live Formula description
  const statLabel =
    selectedStat !== 'none'
      ? `+ ${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)} (${statVal >= 0 ? `+${statVal}` : statVal})`
      : '+0';
  const modLabel =
    modifier !== 0 ? ` ${modifier > 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`}` : '';
  const forwardLabel =
    forwardMod !== 0 ? ` ${forwardMod > 0 ? `+ ${forwardMod}` : `- ${Math.abs(forwardMod)}`}` : '';
  const formulaString = `2d6 ${statLabel}${modLabel}${forwardLabel} = 2d6 ${totalMod >= 0 ? `+${totalMod}` : totalMod}`;

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-y-auto p-2.5 space-y-2.5">
      {/* Active Move Header if linked from Grimoire */}
      {selectedMoveName && (
        <div className="flex items-center justify-between bg-amber-950/40 border border-amber-600/40 rounded px-2.5 py-1.5 text-xs text-amber-200">
          <div className="flex items-center gap-1.5">
            <span className="font-bold">Active Move:</span>
            <span className="font-semibold">{selectedMoveName}</span>
          </div>
          <button
            onClick={onClearSelectedMove}
            className="text-amber-400/80 hover:text-amber-200 text-xs px-1.5 py-0.5 rounded hover:bg-amber-900/40"
          >
            ✕ Reset
          </button>
        </div>
      )}

      {/* 5 Quick-roll stat buttons linked to active hunter */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded p-2">
        <div className="flex items-center justify-between text-[11px] text-neutral-400 uppercase tracking-wider font-semibold mb-1.5">
          <span>Hunter Stats {activeHunter ? `(${activeHunter.name})` : ''}</span>
          <span className="text-[10px] text-neutral-500 font-normal">Select attribute</span>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {(['charm', 'cool', 'sharp', 'tough', 'weird'] as StatType[]).map((st) => {
            const val = activeHunter ? activeHunter.stats[st] ?? 0 : 0;
            const isSelected = selectedStat === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStat(st)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded border text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-xs'
                    : 'bg-neutral-950/80 border-neutral-800 text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <span className="capitalize text-[10px] text-neutral-400">{st}</span>
                <span className={`text-xs font-bold ${val > 0 ? 'text-amber-400' : val < 0 ? 'text-red-400' : 'text-neutral-300'}`}>
                  {val >= 0 ? `+${val}` : val}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modifier Stepper & Forward/Ongoing Chips */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded p-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-neutral-300">Modifier:</span>
            <div className="inline-flex items-center bg-neutral-950 border border-neutral-700 rounded">
              <button
                onClick={() => setModifier((m) => Math.max(-3, m - 1))}
                className="px-2 py-0.5 text-xs text-neutral-300 hover:bg-neutral-800 rounded-l cursor-pointer font-bold"
                title="Decrease modifier"
              >
                -
              </button>
              <span className="px-2.5 text-xs font-mono font-bold text-amber-300">
                {modifier >= 0 ? `+${modifier}` : modifier}
              </span>
              <button
                onClick={() => setModifier((m) => Math.min(3, m + 1))}
                className="px-2 py-0.5 text-xs text-neutral-300 hover:bg-neutral-800 rounded-r cursor-pointer font-bold"
                title="Increase modifier"
              >
                +
              </button>
            </div>
            {modifier !== 0 && (
              <button
                onClick={() => setModifier(0)}
                className="text-[10px] text-neutral-400 hover:text-neutral-200 underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Scope Selector: Public, Keeper, Self */}
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded p-0.5 text-[10px]">
            <button
              onClick={() => setScope('public')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                scope === 'public' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Visible to everyone"
            >
              Public
            </button>
            <button
              onClick={() => setScope('keeper')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                scope === 'keeper' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Secret to Keeper"
            >
              🔒 Keeper
            </button>
            <button
              onClick={() => setScope('self')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                scope === 'self' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Visible only to yourself"
            >
              Self
            </button>
          </div>
        </div>

        {/* Chips for [+1 Forward] [-1 Forward] [+1 Ongoing] */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-neutral-400 font-semibold uppercase">Condition Chips:</span>
          <button
            onClick={() => setForwardMod((f) => (f === 1 ? 0 : 1))}
            className={`px-2 py-0.5 text-[11px] rounded-full border transition-colors cursor-pointer ${
              forwardMod === 1
                ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold'
                : 'bg-neutral-950 border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
          >
            +1 Forward
          </button>
          <button
            onClick={() => setForwardMod((f) => (f === -1 ? 0 : -1))}
            className={`px-2 py-0.5 text-[11px] rounded-full border transition-colors cursor-pointer ${
              forwardMod === -1
                ? 'bg-red-500 text-neutral-950 border-red-400 font-bold'
                : 'bg-neutral-950 border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
          >
            -1 Forward
          </button>
          <button
            onClick={() => setForwardMod((f) => (f === 2 ? 0 : 2))}
            className={`px-2 py-0.5 text-[11px] rounded-full border transition-colors cursor-pointer ${
              forwardMod === 2
                ? 'bg-indigo-500 text-white border-indigo-400 font-bold'
                : 'bg-neutral-950 border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
          >
            +1 Ongoing (+1)
          </button>
          {forwardMod !== 0 && (
            <button
              onClick={() => setForwardMod(0)}
              className="text-[10px] text-neutral-400 hover:text-neutral-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Roll Button with Live Formula */}
      <button
        onClick={handleRoll}
        disabled={isRolling}
        className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 active:scale-[0.99] text-neutral-950 font-bold rounded shadow-md border border-amber-400/50 flex flex-col items-center justify-center transition-all cursor-pointer disabled:opacity-50"
      >
        <span className="text-sm flex items-center gap-1.5">
          <span>🎲</span>
          <span>
            Roll 2d6 {selectedStat !== 'none' ? `+ ${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)}` : ''}
            {totalMod !== 0 ? ` (${totalMod >= 0 ? `+${totalMod}` : totalMod})` : ''}
          </span>
        </span>
        <span className="text-[10px] font-mono opacity-85">{formulaString}</span>
      </button>

      {/* PbtA Narrative Outcome Banner for Latest Roll */}
      {latestRoll && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 shadow-lg space-y-2">
          {/* Header of outcome */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-neutral-200">{latestRoll.moveName}</span>
              {latestRoll.scope === 'keeper' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-700">
                  🔒 Keeper Only
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="w-6 h-6 rounded bg-neutral-950 border border-neutral-700 flex items-center justify-center text-xs font-bold text-amber-300">
                {latestRoll.d1}
              </span>
              <span>+</span>
              <span className="w-6 h-6 rounded bg-neutral-950 border border-neutral-700 flex items-center justify-center text-xs font-bold text-amber-300">
                {latestRoll.d2}
              </span>
              {latestRoll.modifier !== 0 && (
                <>
                  <span>+</span>
                  <span className="text-xs text-neutral-300">
                    {latestRoll.modifier >= 0 ? `(${latestRoll.modifier})` : `(${latestRoll.modifier})`}
                  </span>
                </>
              )}
              {latestRoll.forwardOngoingMod !== 0 && (
                <>
                  <span>+</span>
                  <span className="text-xs text-neutral-400">({latestRoll.forwardOngoingMod})</span>
                </>
              )}
              <span>=</span>
              <span className="text-sm font-extrabold text-white px-1.5 py-0.5 rounded bg-neutral-800">
                {latestRoll.total}
              </span>
            </div>
          </div>

          {/* Outcome Banners matching PbtA Narrative Outcome Bands */}
          {latestRoll.tier === 'miss' && (
            <div className="bg-red-950/80 border border-red-600/60 rounded p-2 text-red-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Miss (6 or less)</span>
                </div>
                {/* 1-click button to mark an XP box */}
                <button
                  onClick={onMarkExperience}
                  className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-[11px] shadow transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>+1 XP</span>
                </button>
              </div>
              <p className="text-xs text-red-100">
                Miss — Mark 1 Experience! The Keeper makes a move.
              </p>
              {activeHunter && (
                <div className="pt-1 flex items-center justify-between border-t border-red-800/40 text-[11px]">
                  <span className="text-red-300/80">Can spend Luck to avert disaster:</span>
                  <button
                    onClick={handleTurnTo12WithLuck}
                    className="text-amber-300 hover:text-amber-200 underline font-semibold cursor-pointer"
                  >
                    Spend 1 Luck (Turn into 12)
                  </button>
                </div>
              )}
            </div>
          )}

          {latestRoll.tier === 'weak' && (
            <div className="bg-yellow-950/80 border border-yellow-600/60 rounded p-2 text-yellow-200 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Weak Hit (7–9)</span>
                </div>
                {activeHunter && (
                  <button
                    onClick={handleTurnTo12WithLuck}
                    className="text-[10px] text-amber-300 hover:text-amber-100 underline cursor-pointer"
                  >
                    Spend Luck for 12+
                  </button>
                )}
              </div>
              <p className="text-xs text-yellow-100">
                Weak Hit — Success with a complication or cost.
              </p>
            </div>
          )}

          {latestRoll.tier === 'strong' && (
            <div className="bg-emerald-950/80 border border-emerald-600/60 rounded p-2 text-emerald-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Strong Hit (10–11)</span>
              </div>
              <p className="text-xs text-emerald-100">
                Strong Hit — Full success with complete effect.
              </p>
            </div>
          )}

          {latestRoll.tier === 'advanced' && (
            <div className="bg-gradient-to-r from-amber-950/90 to-yellow-950/90 border border-amber-500/70 rounded p-2 text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Advanced Hit (12+) {latestRoll.luckSpent ? '★ Luck Triggered' : ''}</span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Advanced Hit (12+) — Enhanced outcome applies!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Live Feed: Stored in room metadata ("com.motw.companion/roll-feed") */}
      <div className="flex-1 flex flex-col min-h-0 bg-neutral-900/60 border border-neutral-800 rounded p-2 space-y-1.5">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-neutral-300">Room Roll Feed</span>
            <span className="text-[10px] px-1.5 rounded-full bg-neutral-800 text-neutral-400">
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
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
          {rollFeed.length === 0 ? (
            <div className="py-6 text-center text-xs text-neutral-500 italic">
              No rolls recorded yet this session. Click the roll button above!
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
                  ? '7–9'
                  : roll.tier === 'strong'
                  ? '10–11'
                  : '12+';

              return (
                <div
                  key={roll.id}
                  className="p-1.5 rounded bg-neutral-950/90 border border-neutral-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-neutral-200">{roll.rollerName}</span>
                      <span className="text-neutral-400 font-normal">({roll.hunterName})</span>
                      {roll.scope === 'keeper' && (
                        <span className="text-[9px] px-1 bg-purple-950 border border-purple-800 text-purple-300 rounded">
                          Keeper 🔒
                        </span>
                      )}
                      {roll.scope === 'self' && (
                        <span className="text-[9px] px-1 bg-neutral-800 text-neutral-300 rounded">
                          Self Only
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-neutral-500 font-mono">
                      {new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-300 font-medium truncate max-w-[240px]">
                      {roll.moveName}
                    </span>
                    <div className="flex items-center gap-1.5">
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
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
