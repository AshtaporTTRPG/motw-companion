import React from 'react';
import { HunterProfile, StatType } from '../types/motw';
import { MOTW_PLAYBOOKS } from '../data/motwMoves';
import { ShieldAlert, Sparkles, Heart, Clover, Plus, Minus, UserCheck, AlertTriangle } from 'lucide-react';

interface HunterTabProps {
  hunter: HunterProfile;
  setHunter: React.Dispatch<React.SetStateAction<HunterProfile>>;
  onQuickRoll: (stat: StatType, moveName: string) => void;
}

export const HunterTab: React.FC<HunterTabProps> = ({ hunter, setHunter, onQuickRoll }) => {
  const handleStatChange = (stat: StatType, delta: number) => {
    setHunter((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: Math.max(-2, Math.min(3, prev.stats[stat] + delta)),
      },
    }));
  };

  const handleHarmChange = (delta: number) => {
    setHunter((prev) => {
      const nextHarm = Math.max(0, Math.min(7, prev.harm + delta));
      return {
        ...prev,
        harm: nextHarm,
        unstable: nextHarm >= 4 ? prev.unstable : false,
      };
    });
  };

  const handleLuckChange = (delta: number) => {
    setHunter((prev) => ({
      ...prev,
      luck: Math.max(0, Math.min(7, prev.luck + delta)),
    }));
  };

  const handleExpChange = (delta: number) => {
    setHunter((prev) => ({
      ...prev,
      experience: Math.max(0, Math.min(5, prev.experience + delta)),
    }));
  };

  const statsList: { key: StatType; label: string; desc: string }[] = [
    { key: 'charm', label: 'Charm', desc: 'Manipulate, persuade, befriend' },
    { key: 'cool', label: 'Cool', desc: 'Act under pressure, keep calm' },
    { key: 'sharp', label: 'Sharp', desc: 'Investigate, read situations' },
    { key: 'tough', label: 'Tough', desc: 'Fight, protect, take a beating' },
    { key: 'weird', label: 'Weird', desc: 'Use magic, psychic, occult' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {/* Header Profile */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-3 space-y-2.5">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={hunter.name}
            onChange={(e) => setHunter((p) => ({ ...p, name: e.target.value }))}
            placeholder="Hunter Name..."
            className="flex-1 bg-neutral-950 border border-neutral-700/80 rounded px-2.5 py-1 text-sm font-semibold text-amber-300 focus:outline-none focus:border-amber-500"
          />
          <select
            value={hunter.playbook}
            onChange={(e) => setHunter((p) => ({ ...p, playbook: e.target.value }))}
            aria-label="Select Hunter Playbook"
            className="bg-neutral-950 border border-neutral-700/80 rounded px-2 py-1 text-xs font-medium text-neutral-200 focus:outline-none focus:border-amber-500"
          >
            {MOTW_PLAYBOOKS.map((pb) => (
              <option key={pb} value={pb}>
                {pb}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          value={hunter.look}
          onChange={(e) => setHunter((p) => ({ ...p, look: e.target.value }))}
          placeholder="Look & description (e.g. Leather jacket, weary eyes, shotgun)"
          className="w-full bg-neutral-950/60 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-400 focus:outline-none focus:border-amber-500/60"
        />
      </div>

      {/* Vital Tracks: Harm & Luck */}
      <div className="grid grid-cols-2 gap-2">
        {/* Harm Tracker */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1 text-xs font-semibold text-rose-400">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Harm ({hunter.harm}/7)
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleHarmChange(-1)}
                className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                title="Heal 1 Harm"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleHarmChange(1)}
                className="w-5 h-5 flex items-center justify-center rounded bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs border border-rose-800/40"
                title="Take 1 Harm"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Harm Boxes */}
          <div className="grid grid-cols-7 gap-1 my-1">
            {Array.from({ length: 7 }).map((_, i) => {
              const isFilled = i < hunter.harm;
              const isCritical = i >= 4;
              return (
                <button
                  key={i}
                  onClick={() => setHunter((p) => ({ ...p, harm: i + 1 === p.harm ? i : i + 1 }))}
                  className={`h-5 rounded text-[10px] font-mono font-bold transition-colors ${
                    isFilled
                      ? isCritical
                        ? 'bg-rose-600 text-white shadow-sm shadow-rose-900'
                        : 'bg-red-500 text-white'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-600 hover:border-neutral-700'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] mt-1 pt-1 border-t border-neutral-800/60">
            <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
              <input
                type="checkbox"
                checked={hunter.unstable}
                onChange={(e) => setHunter((p) => ({ ...p, unstable: e.target.checked }))}
                className="rounded bg-neutral-950 border-neutral-700 text-rose-500 focus:ring-0 w-3 h-3"
              />
              <span className={hunter.unstable ? 'text-rose-400 font-semibold' : ''}>Unstable</span>
            </label>
            {hunter.harm >= 4 && (
              <span className="text-[10px] text-rose-400 font-medium">Badly Hurt (4+)</span>
            )}
            {hunter.harm >= 7 && (
              <span className="text-[10px] text-red-500 font-bold animate-pulse">Dying!</span>
            )}
          </div>
        </div>

        {/* Luck Tracker */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <Clover className="w-3.5 h-3.5 text-emerald-400" /> Luck ({7 - hunter.luck}/7 left)
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleLuckChange(-1)}
                className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                title="Regain 1 Luck point"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleLuckChange(1)}
                className="w-5 h-5 flex items-center justify-center rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 text-xs border border-emerald-800/40"
                title="Burn 1 Luck point"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Luck Boxes (Spent) */}
          <div className="grid grid-cols-7 gap-1 my-1">
            {Array.from({ length: 7 }).map((_, i) => {
              const isSpent = i < hunter.luck;
              return (
                <button
                  key={i}
                  onClick={() => setHunter((p) => ({ ...p, luck: i + 1 === p.luck ? i : i + 1 }))}
                  className={`h-5 rounded text-[10px] font-mono font-bold transition-colors ${
                    isSpent
                      ? 'bg-neutral-800 border border-neutral-700 text-neutral-500 line-through'
                      : 'bg-emerald-600 text-white shadow-sm shadow-emerald-950'
                  }`}
                  title={isSpent ? 'Spent' : 'Available'}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="text-[10px] text-right mt-1 pt-1 border-t border-neutral-800/60">
            {hunter.luck >= 7 ? (
              <span className="text-red-400 font-bold flex items-center justify-end gap-1">
                <AlertTriangle className="w-3 h-3" /> Doomed! (No luck left)
              </span>
            ) : hunter.luck >= 5 ? (
              <span className="text-amber-400 font-medium">Fate approaching...</span>
            ) : (
              <span className="text-neutral-400">Change any roll to 12</span>
            )}
          </div>
        </div>
      </div>

      {/* Experience Track */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Experience Track</span>
            {hunter.experience >= 5 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                Level Up Ready!
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleExpChange(-1)}
              className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleExpChange(1)}
              className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs border border-amber-500/40 font-medium"
            >
              + Mark EXP
            </button>
            {hunter.experience >= 5 && (
              <button
                onClick={() => setHunter((p) => ({ ...p, experience: 0 }))}
                className="px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-bold text-xs hover:bg-amber-400 shadow-sm"
              >
                Level Up
              </button>
            )}
          </div>
        </div>

        {/* EXP Boxes */}
        <div className="grid grid-cols-5 gap-1.5 mt-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const marked = i < hunter.experience;
            return (
              <button
                key={i}
                onClick={() => setHunter((p) => ({ ...p, experience: i + 1 === p.experience ? i : i + 1 }))}
                className={`h-6 rounded text-xs font-bold transition-all ${
                  marked
                    ? 'bg-amber-500 text-neutral-950 font-mono shadow-sm shadow-amber-950'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-600 hover:border-neutral-700'
                }`}
              >
                {marked ? '✓' : i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hunter Ratings / Stats */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-2.5 space-y-2">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Hunter Ratings</span>
          <span className="text-[11px] text-neutral-400">Click to Roll +Stat</span>
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {statsList.map(({ key, label, desc }) => {
            const val = hunter.stats[key];
            const displayVal = val >= 0 ? `+${val}` : `${val}`;
            return (
              <div
                key={key}
                className="flex items-center justify-between p-1.5 bg-neutral-950/80 rounded border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <button
                    onClick={() => onQuickRoll(key, `Roll +${label}`)}
                    className="w-14 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors shrink-0 text-center"
                    title={`Roll 2d6 + ${label}`}
                  >
                    🎲 {label}
                  </button>
                  <span className="text-[11px] text-neutral-400 truncate">{desc}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={() => handleStatChange(key, -1)}
                    className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                  >
                    -
                  </button>
                  <span
                    className={`w-7 text-center font-mono font-bold text-xs ${
                      val > 0 ? 'text-amber-300' : val < 0 ? 'text-rose-400' : 'text-neutral-300'
                    }`}
                  >
                    {displayVal}
                  </span>
                  <button
                    onClick={() => handleStatChange(key, 1)}
                    className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
