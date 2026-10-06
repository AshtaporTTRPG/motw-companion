import React, { useState } from 'react';
import { HunterProfile, RollResult, StatType } from '../types/motw';
import { MOTW_MOVES } from '../data/motwMoves';
import { Dice5, RotateCcw, Sparkles, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import OBR from '@owlbear-rodeo/sdk';

interface DiceTabProps {
  hunter: HunterProfile;
  rollHistory: RollResult[];
  setRollHistory: React.Dispatch<React.SetStateAction<RollResult[]>>;
  onExperienceEarned?: () => void;
}

export const DiceTab: React.FC<DiceTabProps> = ({
  hunter,
  rollHistory,
  setRollHistory,
  onExperienceEarned,
}) => {
  const [selectedStat, setSelectedStat] = useState<StatType | 'none'>('sharp');
  const [customMod, setCustomMod] = useState<number>(0);
  const [rolling, setRolling] = useState(false);

  const latestRoll = rollHistory[0];

  const executeRoll = async (moveName: string, statKey: StatType | 'none', extraMod: number = 0) => {
    setRolling(true);

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const statMod = statKey !== 'none' ? hunter.stats[statKey] : 0;
    const totalMod = statMod + extraMod;
    const total = d1 + d2 + totalMod;

    let tier: RollResult['tier'] = 'miss';
    if (total >= 12) tier = 'advanced';
    else if (total >= 10) tier = 'success';
    else if (total >= 7) tier = 'mixed';
    else tier = 'miss';

    const newResult: RollResult = {
      id: `${Date.now()}-${Math.random()}`,
      moveName,
      statUsed: statKey === 'none' ? 'custom' : statKey,
      d1,
      d2,
      modifier: totalMod,
      total,
      tier,
      timestamp: Date.now(),
    };

    setTimeout(async () => {
      setRollHistory((prev) => [newResult, ...prev.slice(0, 19)]);
      setRolling(false);

      if (tier === 'miss' && onExperienceEarned) {
        onExperienceEarned();
      }

      // If Owlbear Rodeo is available, notify players in room
      if (OBR.isAvailable) {
        try {
          const outcomeText =
            tier === 'advanced'
              ? 'Advanced (12+)'
              : tier === 'success'
              ? 'Full Success (10+)'
              : tier === 'mixed'
              ? 'Mixed Success (7-9)'
              : 'Miss (6-)';
          await OBR.notification.show(
            `🎲 ${hunter.name || 'Hunter'} rolled ${total} (${d1}+${d2}${
              totalMod >= 0 ? `+${totalMod}` : `${totalMod}`
            }) on ${moveName}: ${outcomeText}`
          );
        } catch {
          // Ignore notification errors in test environments
        }
      }
    }, 250);
  };

  const handleCustomRoll = () => {
    executeRoll('Custom 2d6 Roll', selectedStat, customMod);
  };

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {/* Latest Roll Result Banner */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Latest Outcome</span>
          {latestRoll && (
            <span className="text-[10px] text-neutral-500 font-mono">
              {new Date(latestRoll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>

        {latestRoll ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-amber-300">{latestRoll.moveName}</h4>
                <div className="text-xs text-neutral-400">
                  Dice: <span className="text-white font-mono">{latestRoll.d1} + {latestRoll.d2}</span>
                  {' '}Mod: <span className="text-white font-mono">{latestRoll.modifier >= 0 ? `+${latestRoll.modifier}` : latestRoll.modifier}</span>
                </div>
              </div>

              {/* Total Number Badge */}
              <div
                className={`text-3xl font-black font-mono px-3.5 py-1 rounded-lg border flex items-center justify-center ${
                  latestRoll.tier === 'advanced' || latestRoll.tier === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950'
                    : latestRoll.tier === 'mixed'
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-lg shadow-amber-950'
                    : 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg shadow-rose-950'
                }`}
              >
                {latestRoll.total}
              </div>
            </div>

            {/* Outcome Tier Alert */}
            <div
              className={`p-2 rounded text-xs flex items-center justify-between ${
                latestRoll.tier === 'advanced' || latestRoll.tier === 'success'
                  ? 'bg-emerald-900/30 border border-emerald-700/50 text-emerald-300'
                  : latestRoll.tier === 'mixed'
                  ? 'bg-amber-900/30 border border-amber-700/50 text-amber-300'
                  : 'bg-rose-900/30 border border-rose-700/50 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold">
                {latestRoll.tier === 'success' || latestRoll.tier === 'advanced' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : latestRoll.tier === 'mixed' ? (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>
                  {latestRoll.tier === 'advanced' && 'Advanced Success (12+)'}
                  {latestRoll.tier === 'success' && 'Full Success (10+)'}
                  {latestRoll.tier === 'mixed' && 'Mixed Success (7–9): Trouble or hard choice!'}
                  {latestRoll.tier === 'miss' && 'Miss (6 or less): Trouble! Mark 1 EXP.'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-5 text-center text-xs text-neutral-500">
            Roll 2d6 or choose a basic hunter move below to see results.
          </div>
        )}
      </div>

      {/* Manual Roll Console */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Manual 2d6 Roll</span>
        <div className="flex items-center gap-1.5">
          <select
            value={selectedStat}
            onChange={(e) => setSelectedStat(e.target.value as StatType | 'none')}
            aria-label="Stat modifier"
            className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-2 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
          >
            <option value="none">No Stat (+0)</option>
            <option value="charm">Charm ({hunter.stats.charm >= 0 ? `+${hunter.stats.charm}` : hunter.stats.charm})</option>
            <option value="cool">Cool ({hunter.stats.cool >= 0 ? `+${hunter.stats.cool}` : hunter.stats.cool})</option>
            <option value="sharp">Sharp ({hunter.stats.sharp >= 0 ? `+${hunter.stats.sharp}` : hunter.stats.sharp})</option>
            <option value="tough">Tough ({hunter.stats.tough >= 0 ? `+${hunter.stats.tough}` : hunter.stats.tough})</option>
            <option value="weird">Weird ({hunter.stats.weird >= 0 ? `+${hunter.stats.weird}` : hunter.stats.weird})</option>
          </select>

          {/* Extra modifier */}
          <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-700 rounded px-1.5 py-1">
            <span className="text-[10px] text-neutral-400">Mod:</span>
            <button
              onClick={() => setCustomMod((m) => m - 1)}
              className="w-4 h-4 rounded bg-neutral-800 hover:bg-neutral-700 text-xs flex items-center justify-center"
            >
              -
            </button>
            <span className="text-xs font-mono font-bold w-5 text-center text-amber-300">
              {customMod >= 0 ? `+${customMod}` : customMod}
            </span>
            <button
              onClick={() => setCustomMod((m) => m + 1)}
              className="w-4 h-4 rounded bg-neutral-800 hover:bg-neutral-700 text-xs flex items-center justify-center"
            >
              +
            </button>
          </div>

          <button
            onClick={handleCustomRoll}
            disabled={rolling}
            className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-950"
          >
            <Dice5 className={`w-3.5 h-3.5 ${rolling ? 'animate-spin' : ''}`} /> Roll 2d6
          </button>
        </div>
      </div>

      {/* Quick Move Rolls */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block px-0.5">Quick Move Rolls</span>
        <div className="grid grid-cols-2 gap-1.5">
          {MOTW_MOVES.map((move) => {
            const statVal = move.stat ? hunter.stats[move.stat] : 0;
            return (
              <button
                key={move.id}
                onClick={() => move.stat && executeRoll(move.name, move.stat, 0)}
                disabled={rolling}
                className="p-2 rounded bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-850 text-left transition-colors group flex flex-col justify-between"
              >
                <div className="font-semibold text-xs text-neutral-200 group-hover:text-amber-300 truncate">
                  {move.name}
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-neutral-500">
                  <span className="capitalize">{move.stat}</span>
                  <span className="font-mono font-bold text-amber-400/90">
                    {statVal >= 0 ? `+${statVal}` : statVal}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Roll History */}
      {rollHistory.length > 0 && (
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">Recent Rolls</span>
            <button
              onClick={() => setRollHistory([])}
              className="text-[10px] text-neutral-500 hover:text-neutral-300 flex items-center gap-1"
            >
              <RotateCcw className="w-2.5 h-2.5" /> Clear
            </button>
          </div>
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {rollHistory.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between text-xs py-1 px-1.5 rounded bg-neutral-950/60 border border-neutral-800/50"
              >
                <span className="truncate text-neutral-300 font-medium">{r.moveName}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-neutral-500 font-mono">
                    ({r.d1}+{r.d2}{r.modifier >= 0 ? `+${r.modifier}` : r.modifier})
                  </span>
                  <span
                    className={`font-mono font-bold text-xs px-1.5 py-0.2 rounded ${
                      r.tier === 'advanced' || r.tier === 'success'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : r.tier === 'mixed'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {r.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
