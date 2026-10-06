/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import OBR from '@owlbear-rodeo/sdk';
import { HunterTab } from './components/HunterTab';
import { DiceTab } from './components/DiceTab';
import { GrimoireTab } from './components/GrimoireTab';
import { NotesTab } from './components/NotesTab';
import { HunterProfile, RollResult, StatType, CountdownStep, CaseNote } from './types/motw';
import { COUNTDOWN_STAGES } from './data/motwMoves';
import { Pin, PinOff } from 'lucide-react';

const DEFAULT_HUNTER: HunterProfile = {
  name: 'Sam Winchester',
  playbook: 'The Expert',
  look: 'Dark coat, hunter charm amulet, leather journal',
  harm: 0,
  unstable: false,
  luck: 0,
  experience: 0,
  stats: {
    charm: 0,
    cool: 1,
    sharp: 2,
    tough: 1,
    weird: -1,
  },
};

const DEFAULT_COUNTDOWN: CountdownStep[] = COUNTDOWN_STAGES.map((s) => ({
  stage: s.stage,
  description: s.desc,
  completed: false,
}));

export default function App() {
  const [activeTab, setActiveTab] = useState<'hunter' | 'dice' | 'grimoire' | 'notes'>('hunter');
  const [role, setRole] = useState<'GM' | 'PLAYER'>('GM');
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    try {
      return localStorage.getItem('motw_companion_pinned') === 'true';
    } catch {
      return false;
    }
  });

  // Hunter Sheet state with localStorage caching
  const [hunter, setHunter] = useState<HunterProfile>(() => {
    try {
      const saved = localStorage.getItem('motw_companion_hunter');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_HUNTER;
  });

  // Roll history state
  const [rollHistory, setRollHistory] = useState<RollResult[]>([]);

  // Notes and Countdown state with localStorage caching
  const [countdown, setCountdown] = useState<CountdownStep[]>(() => {
    try {
      const saved = localStorage.getItem('motw_companion_countdown');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_COUNTDOWN;
  });

  const [notes, setNotes] = useState<CaseNote[]>(() => {
    try {
      const saved = localStorage.getItem('motw_companion_notes');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'default-note-1',
        title: 'Sulfur in the abandoned chapel',
        category: 'lead',
        content: 'Traces of demonic brimstone found near the broken altar. Likely vulnerable to consecrated silver.',
        updatedAt: Date.now(),
      },
    ];
  });

  // Save states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('motw_companion_hunter', JSON.stringify(hunter));
    } catch {
      // ignore
    }
  }, [hunter]);

  useEffect(() => {
    try {
      localStorage.setItem('motw_companion_countdown', JSON.stringify(countdown));
    } catch {
      // ignore
    }
  }, [countdown]);

  useEffect(() => {
    try {
      localStorage.setItem('motw_companion_notes', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  // Owlbear Rodeo SDK integration
  useEffect(() => {
    if (OBR.isAvailable) {
      OBR.onReady(async () => {
        try {
          const currentRole = await OBR.player.getRole();
          setRole(currentRole === 'GM' ? 'GM' : 'PLAYER');

          OBR.player.onChange((player) => {
            setRole(player.role === 'GM' ? 'GM' : 'PLAYER');
          });

          // Sync initial pinned state
          const cachedPin = localStorage.getItem('motw_companion_pinned') === 'true';
          if (cachedPin && 'setProperties' in OBR.popover) {
            await (OBR.popover as any).setProperties({ disableClickAway: true });
          }
        } catch (err) {
          console.warn('OBR initialization warning:', err);
        }
      });
    } else {
      // If outside OBR (development / standalone preview), retrieve simulated role
      const cachedRole = localStorage.getItem('motw_companion_role');
      if (cachedRole === 'GM' || cachedRole === 'PLAYER') {
        setRole(cachedRole);
      }
    }
  }, []);

  // Handle window pin toggle controlling OBR.popover.setProperties({ disableClickAway })
  const handleTogglePin = async () => {
    const nextPinned = !isPinned;
    setIsPinned(nextPinned);
    try {
      localStorage.setItem('motw_companion_pinned', String(nextPinned));
    } catch {
      // ignore
    }

    if (OBR.isAvailable) {
      try {
        if ('setProperties' in OBR.popover) {
          await (OBR.popover as any).setProperties({ disableClickAway: nextPinned });
        } else if ('setProperties' in (OBR as any).action) {
          await (OBR as any).action.setProperties({ disableClickAway: nextPinned });
        }
      } catch (err) {
        console.warn('Failed to set popover properties in OBR:', err);
      }
    }
  };

  // Toggle role in standalone mode for testing
  const handleRoleToggle = () => {
    if (!OBR.isAvailable) {
      const nextRole = role === 'GM' ? 'PLAYER' : 'GM';
      setRole(nextRole);
      try {
        localStorage.setItem('motw_companion_role', nextRole);
      } catch {
        // ignore
      }
    }
  };

  const handleQuickRollFromTab = (stat: StatType, moveName: string) => {
    setActiveTab('dice');
    // The dice tab will immediately be displayed, letting the player roll
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#07090f] flex items-center justify-center p-0 sm:p-2">
      {/* High-density popover container locked to max-w-[480px] and max-h-[820px] */}
      <div className="w-full h-screen max-w-[480px] max-h-[820px] flex flex-col bg-neutral-950 text-neutral-100 overflow-hidden border border-neutral-800 shadow-2xl relative">
        {/* Top Navigation Bar: h-11 shrink-0 z-40 bg-neutral-900 border-b border-neutral-800 px-2 flex items-center justify-between */}
        <header className="h-11 shrink-0 z-40 bg-neutral-900 border-b border-neutral-800 px-2 flex items-center justify-between gap-1 select-none">
          {/* 4 primary tabs: [🏹 Hunter] [🎲 Dice] [📖 Grimoire] [📝 Notes] */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('hunter')}
              className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeTab === 'hunter'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
              title="Hunter Character Sheet"
            >
              <span>🏹</span> Hunter
            </button>
            <button
              onClick={() => setActiveTab('dice')}
              className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeTab === 'dice'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
              title="Dice Roller"
            >
              <span>🎲</span> Dice
            </button>
            <button
              onClick={() => setActiveTab('grimoire')}
              className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeTab === 'grimoire'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
              title="Grimoire & Moves Reference"
            >
              <span>📖</span> Grimoire
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeTab === 'notes'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
              title="Mystery Countdown & Casebook"
            >
              <span>📝</span> Notes
            </button>
          </nav>

          {/* Utility cluster: Keeper role badge & window pin button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Keeper role badge (👑 Keeper / Hunter based on OBR.player.getRole()) */}
            <button
              onClick={handleRoleToggle}
              title={
                OBR.isAvailable
                  ? `Active OBR Role: ${role === 'GM' ? 'Keeper (GM)' : 'Hunter (Player)'}`
                  : `Role: ${role === 'GM' ? 'Keeper' : 'Hunter'} (Click to toggle in preview mode)`
              }
              className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 border transition-colors ${
                role === 'GM'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600/60 hover:bg-amber-900/80 shadow-sm'
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-750'
              }`}
            >
              <span>{role === 'GM' ? '👑 Keeper' : '🏹 Hunter'}</span>
            </button>

            {/* Window pin button controlling OBR.popover.setProperties({ disableClickAway }) with localStorage caching */}
            <button
              onClick={handleTogglePin}
              title={isPinned ? 'Window Pinned (Click away won’t close)' : 'Window Unpinned (Click away closes)'}
              className={`w-7 h-7 flex items-center justify-center rounded border transition-colors ${
                isPinned
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm shadow-amber-950'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200 hover:bg-neutral-700'
              }`}
            >
              {isPinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>

        {/* Tab Content Views: Scaffold clean panels for each of the 4 tabs confirming active view */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'hunter' && (
            <HunterTab
              hunter={hunter}
              setHunter={setHunter}
              onQuickRoll={(stat, moveName) => handleQuickRollFromTab(stat, moveName)}
            />
          )}

          {activeTab === 'dice' && (
            <DiceTab
              hunter={hunter}
              rollHistory={rollHistory}
              setRollHistory={setRollHistory}
              onExperienceEarned={() => {
                setHunter((prev) => ({
                  ...prev,
                  experience: Math.min(5, prev.experience + 1),
                }));
              }}
            />
          )}

          {activeTab === 'grimoire' && (
            <GrimoireTab
              onQuickRollMove={(stat, moveName) => handleQuickRollFromTab(stat, moveName)}
            />
          )}

          {activeTab === 'notes' && (
            <NotesTab
              countdown={countdown}
              setCountdown={setCountdown}
              notes={notes}
              setNotes={setNotes}
            />
          )}
        </main>
      </div>
    </div>
  );
}
