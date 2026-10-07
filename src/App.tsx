/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import OBR from '@owlbear-rodeo/sdk';
import { Navigation } from './components/Navigation';
import { HunterTab } from './components/HunterTab';
import { DiceTray } from './components/DiceTray';
import { Grimoire } from './components/Grimoire';
import { NotesTab } from './components/NotesTab';
import {
  HunterProfile,
  RollResult,
  StatType,
  TableNotesData,
  BroadcastPayload,
} from './types/motw';
import { PLAYBOOKS, validatePlaybookIntegrity } from './data/playbooks';
import { executePbtaRoll } from './utils/rollEngine';
import { Eye, Bell, X, ShieldAlert } from 'lucide-react';

const METADATA_HUNTERS = 'com.motw.companion/hunters';
const METADATA_ROLL_FEED = 'com.motw.companion/roll-feed';
const METADATA_TABLE_NOTES = 'com.motw.companion/table-notes';
const METADATA_BROADCAST = 'com.motw.companion/broadcast';

const SEED_HUNTER: HunterProfile = {
  id: 'hunter-seed-1',
  ownerId: 'local-user-1',
  ownerName: 'Player One',
  name: 'Sam Winchester',
  playbook: 'The Expert',
  look: 'Dark canvas jacket, silver protection amulet, weathered research notebook',
  harm: 1,
  unstable: false,
  luck: 1,
  experience: 2,
  stats: {
    charm: 0,
    cool: 1,
    sharp: 2,
    tough: 1,
    weird: -1,
  },
  selectedMoves: ['expert-i-have-read-about-this', 'expert-preparedness'],
  gear: 'Shotgun (3-harm close reload messy)\nSilver hunting dagger\nOld occult library cards',
  luckSpecial: PLAYBOOKS.find((p) => p.id === 'the-expert')?.luckSpecial || PLAYBOOKS[0].luckSpecial,
  improvementsTaken: [],
  levelUpCount: 0,
  advancementsTaken: [],
  borrowedMoves: [],
  customMoves: [],
  createdAt: Date.now() - 86400000,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'hunter' | 'dice' | 'grimoire' | 'notes'>('hunter');
  const [role, setRole] = useState<'GM' | 'PLAYER'>('GM');
  const [currentUserId, setCurrentUserId] = useState<string>('local-user-1');
  const [currentUserName, setCurrentUserName] = useState<string>('Hunter');
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    try {
      return localStorage.getItem('motw_companion_pinned') === 'true';
    } catch {
      return false;
    }
  });

  // Pre-selected move to roll when jumping from Grimoire / Hunter tab to Dice tray
  const [selectedMoveForRoll, setSelectedMoveForRoll] = useState<string | null>(null);
  const [selectedMoveStatForRoll, setSelectedMoveStatForRoll] = useState<StatType | null>(null);

  // Hunters List (Synced to room metadata)
  const [allHunters, setAllHunters] = useState<HunterProfile[]>(() => {
    try {
      const saved = localStorage.getItem('motw_companion_hunters');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [SEED_HUNTER];
  });

  // Active Hunter ID
  const [activeHunterId, setActiveHunterId] = useState<string>(() => {
    try {
      return localStorage.getItem('motw_companion_active_hunter_id') || 'hunter-seed-1';
    } catch {
      return 'hunter-seed-1';
    }
  });

  // Roll Feed (Synced to room metadata)
  const [rollFeed, setRollFeed] = useState<RollResult[]>(() => {
    try {
      const saved = localStorage.getItem('motw_companion_roll_feed');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Shared Table Notes (Synced to room metadata)
  const [tableNotes, setTableNotes] = useState<TableNotesData>(() => {
    try {
      const saved = localStorage.getItem('motw_companion_table_notes');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      content: 'Case File: The Cold Lake Mystery\n- Witness report: Claw marks 8 feet high on old pines.\n- Evidence: Freezing temperatures near the abandoned cabin.\n- Suspects: Local cryptozoology researcher or supernatural phenomenon.',
      updatedAt: Date.now(),
      updatedBy: 'The Table',
    };
  });

  // Broadcast Note (Synced to room metadata)
  const [broadcast, setBroadcast] = useState<BroadcastPayload | null>(() => {
    try {
      const saved = localStorage.getItem('motw_companion_broadcast');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  // User dismissed broadcast local state
  const [dismissedBroadcastId, setDismissedBroadcastId] = useState<string | null>(null);

  // Active hunter profile object
  const activeHunter =
    allHunters.find((h) => h.id === activeHunterId) || allHunters[0] || null;

  // Deletion Tombstone Guard: stores hunterId -> expiry timestamp (1000ms)
  const deletedTombstoneRef = useRef<Map<string, number>>(new Map());

  // Debounce timers for room metadata writes (400ms debounce to prevent race conditions)
  const debounceTimersRef = useRef<Record<string, any>>({});

  // Automated Playbook Data Audit & Schema Integrity Check (Runs once when app mounts)
  useEffect(() => {
    validatePlaybookIntegrity(PLAYBOOKS);
  }, []);

  useEffect(() => {
    return () => {
      Object.values(debounceTimersRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Sync to room metadata helper (400ms debounce)
  const syncRoomMetadata = useCallback((key: string, value: any) => {
    if (debounceTimersRef.current[key]) {
      clearTimeout(debounceTimersRef.current[key]);
    }

    debounceTimersRef.current[key] = setTimeout(() => {
      if (OBR.isAvailable) {
        try {
          OBR.room.setMetadata({ [key]: value }).catch((err) => {
            console.warn(`Failed to set metadata ${key}:`, err);
          });
        } catch (err) {
          console.warn(`Error setting metadata ${key}:`, err);
        }
      }
    }, 400);
  }, []);

  // Owlbear Rodeo Integration
  useEffect(() => {
    if (OBR.isAvailable) {
      OBR.onReady(async () => {
        try {
          const userRole = await OBR.player.getRole();
          const userId = await OBR.player.getId();
          const userName = await OBR.player.getName();

          setRole(userRole === 'GM' ? 'GM' : 'PLAYER');
          setCurrentUserId(userId || 'player-' + Date.now());
          setCurrentUserName(userName || (userRole === 'GM' ? 'Keeper' : 'Hunter'));

          // Listen for player changes
          OBR.player.onChange((player) => {
            setRole(player.role === 'GM' ? 'GM' : 'PLAYER');
            if (player.name) setCurrentUserName(player.name);
          });

          // Fetch initial room metadata
          const metadata = await OBR.room.getMetadata();

          if (metadata[METADATA_HUNTERS]) {
            const incoming = metadata[METADATA_HUNTERS] as HunterProfile[];
            const now = Date.now();
            const guarded = incoming.filter((h) => {
              const expiry = deletedTombstoneRef.current.get(h.id);
              return !expiry || now > expiry;
            });
            setAllHunters(guarded);
          }
          if (metadata[METADATA_ROLL_FEED]) {
            setRollFeed(metadata[METADATA_ROLL_FEED] as RollResult[]);
          }
          if (metadata[METADATA_TABLE_NOTES]) {
            setTableNotes(metadata[METADATA_TABLE_NOTES] as TableNotesData);
          }
          if (metadata[METADATA_BROADCAST]) {
            setBroadcast(metadata[METADATA_BROADCAST] as BroadcastPayload);
          }

          // Subscribe to live room metadata updates
          OBR.room.onMetadataChange((updatedMetadata) => {
            if (updatedMetadata[METADATA_HUNTERS] !== undefined) {
              const incoming = (updatedMetadata[METADATA_HUNTERS] as HunterProfile[]) || [];
              const now = Date.now();
              const guarded = incoming.filter((h) => {
                const expiry = deletedTombstoneRef.current.get(h.id);
                return !expiry || now > expiry;
              });
              setAllHunters(guarded);
            }
            if (updatedMetadata[METADATA_ROLL_FEED] !== undefined) {
              setRollFeed((updatedMetadata[METADATA_ROLL_FEED] as RollResult[]) || []);
            }
            if (updatedMetadata[METADATA_TABLE_NOTES] !== undefined) {
              setTableNotes(
                (updatedMetadata[METADATA_TABLE_NOTES] as TableNotesData) || {
                  content: '',
                  updatedAt: Date.now(),
                  updatedBy: '',
                }
              );
            }
            if (updatedMetadata[METADATA_BROADCAST] !== undefined) {
              setBroadcast((updatedMetadata[METADATA_BROADCAST] as BroadcastPayload) || null);
            }
          });

          // Pin initialization
          const cachedPin = localStorage.getItem('motw_companion_pinned') === 'true';
          if (cachedPin && 'setProperties' in OBR.popover) {
            await (OBR.popover as any).setProperties({ disableClickAway: true });
          }
        } catch (err) {
          console.warn('OBR initialization error:', err);
        }
      });
    } else {
      // Standalone mode: retrieve simulated role
      const cachedRole = localStorage.getItem('motw_companion_role');
      if (cachedRole === 'GM' || cachedRole === 'PLAYER') {
        setRole(cachedRole);
      }
    }
  }, []);

  // Save states to local storage caching
  useEffect(() => {
    try {
      localStorage.setItem('motw_companion_hunters', JSON.stringify(allHunters));
    } catch {}
  }, [allHunters]);

  useEffect(() => {
    try {
      if (activeHunterId) {
        localStorage.setItem('motw_companion_active_hunter_id', activeHunterId);
      }
    } catch {}
  }, [activeHunterId]);

  useEffect(() => {
    try {
      localStorage.setItem('motw_companion_roll_feed', JSON.stringify(rollFeed));
    } catch {}
  }, [rollFeed]);

  useEffect(() => {
    try {
      localStorage.setItem('motw_companion_table_notes', JSON.stringify(tableNotes));
    } catch {}
  }, [tableNotes]);

  useEffect(() => {
    try {
      localStorage.setItem('motw_companion_broadcast', JSON.stringify(broadcast));
    } catch {}
  }, [broadcast]);

  // Handle Pin Toggle
  const handleTogglePin = async () => {
    const nextPin = !isPinned;
    setIsPinned(nextPin);
    try {
      localStorage.setItem('motw_companion_pinned', String(nextPin));
    } catch {}

    if (OBR.isAvailable) {
      try {
        if ('setProperties' in OBR.popover) {
          await (OBR.popover as any).setProperties({ disableClickAway: nextPin });
        } else if ('setProperties' in (OBR as any).action) {
          await (OBR as any).action.setProperties({ disableClickAway: nextPin });
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
      } catch {}
    }
  };

  // Hunter Handlers
  const handleUpdateHunter = (updated: HunterProfile) => {
    const nextHunters = allHunters.map((h) => (h.id === updated.id ? updated : h));
    setAllHunters(nextHunters);
    syncRoomMetadata(METADATA_HUNTERS, nextHunters);
  };

  const handleCreateHunter = (newHunter: HunterProfile) => {
    const nextHunters = [...allHunters, newHunter];
    setAllHunters(nextHunters);
    setActiveHunterId(newHunter.id);
    syncRoomMetadata(METADATA_HUNTERS, nextHunters);
  };

  const handleDeleteHunter = (hunterId: string) => {
    // Register tombstone for 1000ms to prevent room broadcasts from resurrecting the sheet
    deletedTombstoneRef.current.set(hunterId, Date.now() + 1000);
    setTimeout(() => {
      deletedTombstoneRef.current.delete(hunterId);
    }, 1000);

    const nextHunters = allHunters.filter((h) => h.id !== hunterId);
    setAllHunters(nextHunters);
    if (activeHunterId === hunterId) {
      setActiveHunterId(nextHunters[0]?.id || '');
    }
    syncRoomMetadata(METADATA_HUNTERS, nextHunters);
  };

  // Roll Feed Handlers
  const handleAddRoll = (roll: RollResult) => {
    // Strictly prevent self rolls from being broadcasted to room metadata
    if (roll.scope === 'self') return;
    // Keep latest 50 rolls to avoid bloated metadata
    const nextFeed = [roll, ...rollFeed].slice(0, 50);
    setRollFeed(nextFeed);
    syncRoomMetadata(METADATA_ROLL_FEED, nextFeed);
  };

  const handleClearFeed = () => {
    setRollFeed([]);
    syncRoomMetadata(METADATA_ROLL_FEED, []);
  };

  // Mark XP from DiceTray (e.g. on Miss)
  const handleMarkExperience = () => {
    if (!activeHunter) return;
    const nextExp = Math.min(5, activeHunter.experience + 1);
    handleUpdateHunter({
      ...activeHunter,
      experience: nextExp,
    });
  };

  // Spend Luck from DiceTray
  const handleSpendLuckFromDice = () => {
    if (!activeHunter || activeHunter.luck >= 7) return;
    handleUpdateHunter({
      ...activeHunter,
      luck: activeHunter.luck + 1,
    });
  };

  // Shared Table Notes Handler
  const handleUpdateTableNotes = (data: TableNotesData) => {
    setTableNotes(data);
    syncRoomMetadata(METADATA_TABLE_NOTES, data);
  };

  // Keeper Broadcast Handler
  const handleUpdateBroadcast = (payload: BroadcastPayload | null) => {
    setBroadcast(payload);
    // Reset dismiss state so all players see new broadcast
    if (payload?.active) {
      setDismissedBroadcastId(null);
    }
    syncRoomMetadata(METADATA_BROADCAST, payload);
  };

  // Quick Roll Trigger from Grimoire or Hunter sheet (Automatically executes roll with Hunter's stat)
  const handleQuickRollFromOtherTab = (stat: StatType | undefined, moveName: string) => {
    const rollData = executePbtaRoll({
      moveName,
      stat,
      hunter: activeHunter,
      rollerId: currentUserId,
      rollerName: currentUserName || (role === 'GM' ? 'Keeper' : 'Hunter'),
      scope: 'public',
    });

    handleAddRoll(rollData);
    setSelectedMoveForRoll(moveName);
    setSelectedMoveStatForRoll(stat || null);
    setActiveTab('dice');
  };

  const isBroadcastVisible =
    broadcast &&
    broadcast.active &&
    broadcast.id !== dismissedBroadcastId;

  return (
    <div className="w-full h-full min-h-screen bg-[#07090f] flex items-center justify-center p-0 sm:p-2 select-none">
      {/* High-density popover container locked to max-w-[480px] max-h-[820px] h-full */}
      <div className="w-full h-screen max-w-[480px] max-h-[820px] flex flex-col bg-neutral-950 text-neutral-100 overflow-hidden border border-neutral-800 shadow-2xl relative font-sans">
        {/* Core Sticky Navigation Header */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          role={role}
          onToggleRole={handleRoleToggle}
          isPinned={isPinned}
          onTogglePin={handleTogglePin}
        />

        {/* Tab Content Views */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'hunter' && (
            <HunterTab
              currentUserId={currentUserId}
              currentUserName={currentUserName}
              role={role}
              allHunters={allHunters}
              activeHunter={activeHunter}
              onSelectHunter={(h) => setActiveHunterId(h.id)}
              onUpdateHunter={handleUpdateHunter}
              onCreateHunter={handleCreateHunter}
              onDeleteHunter={handleDeleteHunter}
              onQuickRoll={(stat, moveName) => handleQuickRollFromOtherTab(stat, moveName)}
            />
          )}

          {activeTab === 'dice' && (
            <DiceTray
              activeHunter={activeHunter}
              role={role}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
              rollFeed={rollFeed}
              onAddRoll={handleAddRoll}
              onClearFeed={handleClearFeed}
              onMarkExperience={handleMarkExperience}
              onSpendLuck={handleSpendLuckFromDice}
              selectedMoveName={selectedMoveForRoll}
              onClearSelectedMove={() => {
                setSelectedMoveForRoll(null);
                setSelectedMoveStatForRoll(null);
              }}
              selectedMoveStat={selectedMoveStatForRoll}
            />
          )}

          {activeTab === 'grimoire' && (
            <Grimoire
              onQuickRollMove={(stat, moveName) =>
                handleQuickRollFromOtherTab(stat, moveName)
              }
            />
          )}

          {activeTab === 'notes' && (
            <NotesTab
              activeHunter={activeHunter}
              role={role}
              currentUserName={currentUserName}
              tableNotes={tableNotes}
              onUpdateTableNotes={handleUpdateTableNotes}
              activeBroadcast={broadcast}
              onUpdateBroadcast={handleUpdateBroadcast}
              onUpdateHunter={handleUpdateHunter}
            />
          )}
        </main>

        {/* Centered Modal Overlay for Keeper Broadcast (Appears on all players' screens) */}
        {isBroadcastVisible && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
            <div className="bg-neutral-900 border-2 border-amber-500 rounded-xl p-4 w-full max-w-sm space-y-3 shadow-2xl shadow-amber-950/80 text-neutral-100 flex flex-col max-h-[85%]">
              {/* Broadcast Header */}
              <div className="flex items-start justify-between border-b border-neutral-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-300">
                    <Eye className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      Keeper Broadcast 👁️
                    </span>
                    <h3 className="font-extrabold text-sm text-neutral-100 leading-tight">
                      {broadcast.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setDismissedBroadcastId(broadcast.id)}
                  className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-800 cursor-pointer"
                  title="Dismiss view"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Broadcast Content */}
              <div className="flex-1 overflow-y-auto pr-1">
                <p className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed font-sans">
                  {broadcast.content}
                </p>
              </div>

              {/* Broadcast Footer & Dismiss */}
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-neutral-500">
                  Shared by {broadcast.authorName || 'Keeper'}
                </span>
                <div className="flex items-center gap-2">
                  {role === 'GM' && (
                    <button
                      onClick={() => handleUpdateBroadcast(null)}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold cursor-pointer text-xs"
                    >
                      Close Broadcast
                    </button>
                  )}
                  <button
                    onClick={() => setDismissedBroadcastId(broadcast.id)}
                    className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold shadow cursor-pointer text-xs"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
