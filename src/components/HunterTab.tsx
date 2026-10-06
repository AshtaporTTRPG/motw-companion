import React, { useState } from 'react';
import { HunterProfile, HunterStats, StatType } from '../types/motw';
import { PLAYBOOKS } from '../data/playbooks';
import { PlaybookSubPanel } from './PlaybookSubPanel';
import { detectStatFromMove } from '../utils/rollEngine';
import {
  Heart,
  Clover,
  Sparkles,
  Shield,
  Plus,
  Trash2,
  Users,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Award,
  CheckSquare,
  Square,
  Activity,
  Bed,
  Crosshair,
  Info,
  Dices,
  Crown
} from 'lucide-react';

interface HunterTabProps {
  currentUserId: string;
  currentUserName: string;
  role: 'GM' | 'PLAYER';
  allHunters: HunterProfile[];
  activeHunter: HunterProfile | null;
  onSelectHunter: (hunter: HunterProfile) => void;
  onUpdateHunter: (hunter: HunterProfile) => void;
  onCreateHunter: (hunter: HunterProfile) => void;
  onDeleteHunter: (hunterId: string) => void;
  onQuickRoll: (stat: StatType, moveName: string) => void;
}

export const HunterTab: React.FC<HunterTabProps> = ({
  currentUserId,
  currentUserName,
  role,
  allHunters,
  activeHunter,
  onSelectHunter,
  onUpdateHunter,
  onCreateHunter,
  onDeleteHunter,
  onQuickRoll,
}) => {
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  // New Hunter Creation Form State
  const [newName, setNewName] = useState('');
  const [newPlaybookId, setNewPlaybookId] = useState(PLAYBOOKS[0].id);
  const [newLook, setNewLook] = useState('');
  const [selectedStatPresetIndex, setSelectedStatPresetIndex] = useState(0);

  const selectedPlaybookDef = PLAYBOOKS.find(
    (p) => p.name.toLowerCase() === activeHunter?.playbook.toLowerCase() || p.id === activeHunter?.playbook.toLowerCase()
  ) || PLAYBOOKS[0];

  const creationPlaybookDef = PLAYBOOKS.find((p) => p.id === newPlaybookId) || PLAYBOOKS[0];

  // Filter hunters owned by current player
  const myHunters = allHunters.filter((h) => h.ownerId === currentUserId);

  // Level Up Trigger: Check if 5 XP reached
  const handleExpClick = (index: number) => {
    if (!activeHunter) return;
    const nextExp = activeHunter.experience === index ? index - 1 : index;
    const clamped = Math.max(0, Math.min(5, nextExp));
    const updated = { ...activeHunter, experience: clamped };
    onUpdateHunter(updated);

    if (clamped >= 5) {
      setIsLevelUpModalOpen(true);
    }
  };

  // Harm Handler
  const handleHarmClick = (boxNum: number) => {
    if (!activeHunter) return;
    const nextHarm = activeHunter.harm === boxNum ? boxNum - 1 : boxNum;
    const clamped = Math.max(0, Math.min(8, nextHarm));
    // Auto-checks Unstable if harm is 4 or higher
    const isUnstable = clamped >= 4 ? true : activeHunter.unstable;
    onUpdateHunter({
      ...activeHunter,
      harm: clamped,
      unstable: isUnstable,
    });
  };

  // First Aid: heals 1 harm, unchecks Unstable
  const handleFirstAid = () => {
    if (!activeHunter) return;
    onUpdateHunter({
      ...activeHunter,
      harm: Math.max(0, activeHunter.harm - 1),
      unstable: false,
    });
  };

  // Rest: clears minor harm or heals 2 harm
  const handleRest = () => {
    if (!activeHunter) return;
    onUpdateHunter({
      ...activeHunter,
      harm: Math.max(0, activeHunter.harm - 2),
      unstable: activeHunter.harm - 2 >= 4 ? activeHunter.unstable : false,
    });
  };

  // Spend Luck
  const handleSpendLuck = () => {
    if (!activeHunter || activeHunter.luck >= 7) return;
    onUpdateHunter({
      ...activeHunter,
      luck: activeHunter.luck + 1,
    });
  };

  // Toggle Playbook Move Selection
  const handleToggleMove = (moveId: string) => {
    if (!activeHunter) return;
    const currentMoves = activeHunter.selectedMoves || [];
    const exists = currentMoves.includes(moveId);
    const updatedMoves = exists
      ? currentMoves.filter((m) => m !== moveId)
      : [...currentMoves, moveId];
    onUpdateHunter({
      ...activeHunter,
      selectedMoves: updatedMoves,
    });
  };

  // Create Hunter Submit
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const stats = creationPlaybookDef.statOptions[selectedStatPresetIndex] || {
      charm: 0,
      cool: 0,
      sharp: 0,
      tough: 0,
      weird: 0,
    };

    const newHunter: HunterProfile = {
      id: 'hunter-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      ownerId: currentUserId,
      ownerName: currentUserName || 'Hunter',
      name: newName.trim(),
      playbook: creationPlaybookDef.name,
      look: newLook.trim() || 'Casual attire, vigilant gaze',
      harm: 0,
      unstable: false,
      luck: 0,
      experience: 0,
      stats: { ...stats },
      selectedMoves: creationPlaybookDef.moves.slice(0, 2).map((m) => m.id),
      gear: creationPlaybookDef.gearChoices.slice(0, 2).join('\n'),
      luckSpecial: creationPlaybookDef.luckSpecial,
      improvementsTaken: [],
      createdAt: Date.now(),
    };

    onCreateHunter(newHunter);
    onSelectHunter(newHunter);
    setIsCreateModalOpen(false);
    setNewName('');
    setNewLook('');
  };

  // Level Up Improvement Selected
  const handleSelectImprovement = (improvement: string) => {
    if (!activeHunter) return;
    onUpdateHunter({
      ...activeHunter,
      experience: Math.max(0, activeHunter.experience - 5),
      improvementsTaken: [...(activeHunter.improvementsTaken || []), improvement],
    });
    setIsLevelUpModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-hidden">
      {/* Top Bar: Multi-Hunter Switcher + Keeper Roster Toggle */}
      <div className="p-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between gap-1.5 shrink-0">
        {/* Hunter Selector Dropdown */}
        <div className="flex-1 flex items-center gap-1.5 min-w-0">
          <select
            value={activeHunter?.id || ''}
            onChange={(e) => {
              const found = allHunters.find((h) => h.id === e.target.value);
              if (found) onSelectHunter(found);
            }}
            className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-2 py-1 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500 truncate"
          >
            {allHunters.length === 0 ? (
              <option value="">No Hunters Created</option>
            ) : (
              allHunters.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} — {h.playbook} {h.ownerId === currentUserId ? '(You)' : `(${h.ownerName})`}
                </option>
              ))
            )}
          </select>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            title="Create New Hunter"
            className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        </div>

        {/* Keeper Roster Drawer Button for GM */}
        {role === 'GM' && (
          <button
            onClick={() => setIsRosterOpen(!isRosterOpen)}
            className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 border transition-colors cursor-pointer shrink-0 ${
              isRosterOpen
                ? 'bg-purple-950 text-purple-300 border-purple-600'
                : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
            }`}
            title="View All Table Hunters"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Roster ({allHunters.length})</span>
            {isRosterOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Keeper Roster Drawer for GM */}
      {role === 'GM' && (
        <div className="bg-neutral-900 border-b border-purple-900/60 p-2 space-y-1.5 shrink-0 shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-bold text-purple-300">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Keeper Party Roster ({allHunters.length})</span>
            </span>
            <button
              onClick={() => setIsRosterOpen(!isRosterOpen)}
              className="flex items-center gap-1 text-[10px] text-purple-300 hover:text-white cursor-pointer px-1 py-0.5 rounded hover:bg-neutral-800"
            >
              <span>{isRosterOpen ? 'Collapse Strip' : 'Expand Strip'}</span>
              {isRosterOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {isRosterOpen && (
            <div className="space-y-1 max-h-52 overflow-y-auto">
              {allHunters.length === 0 ? (
                <p className="text-[11px] text-neutral-500 italic py-1">No hunters at table.</p>
              ) : (
                allHunters.map((h) => {
                  const isSelected = activeHunter?.id === h.id;
                  const harmBadgeColor =
                    h.harm >= 8
                      ? 'bg-red-950 text-red-300 border-red-700'
                      : h.harm >= 4
                      ? 'bg-yellow-950 text-yellow-300 border-yellow-700'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700';

                  return (
                    <div
                      key={h.id}
                      className={`p-1.5 rounded border flex items-center justify-between gap-1 text-xs transition-colors ${
                        isSelected
                          ? 'bg-purple-950/80 border-purple-500 text-white'
                          : 'bg-neutral-950/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate min-w-0 mr-1">
                        <span className="font-bold truncate">{h.name}</span>
                        <span className="text-[10px] text-neutral-400 truncate">({h.playbook})</span>
                        <span className="text-[9px] text-neutral-500 truncate">[{h.ownerName}]</span>
                      </div>

                      {/* Mini status chips: [Name] | Harm: X/7 | Luck: X/7 | XP: X/5 | [Inspect] */}
                      <div className="flex items-center gap-1 shrink-0 text-[10px]">
                        <span className={`px-1.5 py-0.2 rounded border font-mono font-semibold ${harmBadgeColor}`}>
                          Harm: {h.harm}/7
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-neutral-800 text-amber-300 border border-neutral-700 font-mono">
                          Luck: {h.luck}/7
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-neutral-800 text-amber-400 border border-neutral-700 font-mono">
                          XP: {h.experience}/5
                        </span>
                        <button
                          onClick={() => onSelectHunter(h)}
                          className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-colors shadow-xs ${
                            isSelected
                              ? 'bg-purple-500 text-neutral-950 hover:bg-purple-400'
                              : 'bg-purple-900/60 text-purple-200 border border-purple-700 hover:bg-purple-800'
                          }`}
                        >
                          {isSelected ? 'Inspecting' : 'Inspect'}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Hunter Sheet Content */}
      {!activeHunter ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <Shield className="w-12 h-12 text-neutral-600 animate-pulse" />
          <h3 className="text-base font-bold text-neutral-200">No Hunter Selected</h3>
          <p className="text-xs text-neutral-400 max-w-xs">
            Create your Monster of the Week character sheet or select an existing hunter from the roster above.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded text-xs shadow-md cursor-pointer"
          >
            + Create First Hunter
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
          {/* Keeper Override Active Banner for GM */}
          {role === 'GM' && (
            <div className="bg-purple-950/40 border border-purple-600/70 rounded px-2.5 py-1.5 text-xs text-purple-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <Crown className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Keeper Inspection Active: {activeHunter.name}</span>
              </div>
              <span className="text-[10px] text-purple-300 font-mono">Full GM Override</span>
            </div>
          )}

          {/* Header Card: Name, Playbook, Look */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2 shadow-xs">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <input
                  type="text"
                  value={activeHunter.name}
                  onChange={(e) => onUpdateHunter({ ...activeHunter, name: e.target.value })}
                  placeholder="Hunter Name"
                  className="bg-transparent text-sm font-extrabold text-amber-300 focus:outline-none focus:border-b border-amber-500 w-full"
                />
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="font-semibold text-neutral-200">{activeHunter.playbook}</span>
                  <span>•</span>
                  <span className="text-[11px] text-neutral-400">Owner: {activeHunter.ownerName}</span>
                </div>
              </div>

              {/* Delete Hunter button for owner or GM */}
              {(activeHunter.ownerId === currentUserId || role === 'GM') && (
                <button
                  onClick={() => {
                    if (confirm(`Delete hunter "${activeHunter.name}"?`)) {
                      onDeleteHunter(activeHunter.id);
                    }
                  }}
                  className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                  title="Delete this hunter"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Look / Description */}
            <div>
              <input
                type="text"
                value={activeHunter.look || ''}
                onChange={(e) => onUpdateHunter({ ...activeHunter, look: e.target.value })}
                placeholder="Hunter Look: rugged coat, ancient talisman, scarred knuckles..."
                className="w-full bg-neutral-950/70 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          {/* Interactive Trackers: Harm, Luck, XP */}
          <div className="grid grid-cols-1 gap-2">
            {/* 1. HARM TRACKER (7 boxes) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500/30" />
                  <span className="text-xs font-bold text-neutral-200">Harm Tracker</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                      activeHunter.harm >= 8
                        ? 'bg-red-950 text-red-300 border-red-600'
                        : activeHunter.harm >= 4
                        ? 'bg-yellow-950 text-yellow-300 border-yellow-600'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}
                  >
                    {activeHunter.harm >= 8
                      ? 'Dying ☠️'
                      : activeHunter.harm >= 4
                      ? 'Serious'
                      : 'Minor'}
                  </span>
                </div>

                {/* Quick Medical Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleFirstAid}
                    className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer border border-neutral-700"
                    title="First Aid: Heals 1 harm and stabilizes"
                  >
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span>First Aid</span>
                  </button>
                  <button
                    onClick={handleRest}
                    className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer border border-neutral-700"
                    title="Rest: Clears 2 harm"
                  >
                    <Bed className="w-3 h-3 text-blue-400" />
                    <span>Rest</span>
                  </button>
                </div>
              </div>

              {/* 7 Harm Boxes + Dying Box */}
              <div className="flex items-center justify-between gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const isMarked = activeHunter.harm >= num;
                  const isSeriousZone = num >= 4;
                  return (
                    <button
                      key={num}
                      onClick={() => handleHarmClick(num)}
                      className={`flex-1 py-1.5 rounded flex flex-col items-center justify-center border transition-all cursor-pointer ${
                        isMarked
                          ? isSeriousZone
                            ? 'bg-red-600 border-red-400 text-white font-bold shadow-xs'
                            : 'bg-yellow-600 border-yellow-400 text-neutral-950 font-bold shadow-xs'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600'
                      }`}
                      title={isSeriousZone ? `Harm box ${num} (Serious)` : `Harm box ${num} (Minor)`}
                    >
                      <span className="text-[10px] leading-none">{num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Unstable condition toggle & status text */}
              <div className="flex items-center justify-between pt-1 border-t border-neutral-800 text-[11px]">
                <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={activeHunter.unstable}
                    onChange={(e) =>
                      onUpdateHunter({ ...activeHunter, unstable: e.target.checked })
                    }
                    className="rounded text-red-500 focus:ring-0 cursor-pointer accent-red-500"
                  />
                  <span className={activeHunter.unstable ? 'text-red-400 font-bold' : ''}>
                    Unstable Condition
                  </span>
                </label>
                <span className="text-[10px] text-neutral-500">
                  {activeHunter.harm >= 4 ? 'Wounds worsen without care' : '0-3 Minor, 4-7 Serious'}
                </span>
              </div>
            </div>

            {/* 2. LUCK TRACKER (7 boxes) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clover className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-neutral-200">Luck Tracker</span>
                  <span className="text-[10px] font-mono text-amber-300">
                    ({7 - activeHunter.luck} Left / 7 Spent)
                  </span>
                </div>

                <button
                  onClick={handleSpendLuck}
                  disabled={activeHunter.luck >= 7}
                  className="px-2 py-0.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-neutral-950 font-bold rounded text-[10px] cursor-pointer shadow-xs transition-colors"
                  title="Spend 1 Luck box to set roll to 12 or negate harm"
                >
                  Spend Luck
                </button>
              </div>

              {/* 7 Luck Boxes */}
              <div className="flex items-center justify-between gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const isSpent = activeHunter.luck >= num;
                  return (
                    <button
                      key={num}
                      onClick={() => {
                        const next = activeHunter.luck === num ? num - 1 : num;
                        onUpdateHunter({ ...activeHunter, luck: Math.max(0, Math.min(7, next)) });
                      }}
                      className={`flex-1 py-1.5 rounded flex flex-col items-center justify-center border transition-all cursor-pointer ${
                        isSpent
                          ? 'bg-amber-600/40 border-amber-500/60 text-amber-200 line-through font-mono'
                          : 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300 font-bold hover:bg-emerald-900/60'
                      }`}
                      title={isSpent ? `Luck box ${num} Spent` : `Luck box ${num} Available`}
                    >
                      <span className="text-[10px] leading-none">{num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Luck Special Info */}
              <div className="pt-1 border-t border-neutral-800 text-[11px] text-neutral-300 space-y-1">
                <div className="flex items-start gap-1 text-amber-300/90">
                  <Info className="w-3 h-3 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300">Luck Special: </strong>
                    {activeHunter.luckSpecial || selectedPlaybookDef.luckSpecial}
                  </span>
                </div>
                {activeHunter.luck >= 7 && (
                  <div className="bg-red-950/80 border border-red-600 rounded p-1.5 text-red-200 font-bold text-center text-[10px] animate-pulse">
                    ⚠️ Luck Exhausted! Your doom has arrived. The Keeper makes hard moves.
                  </div>
                )}
              </div>
            </div>

            {/* 3. EXPERIENCE TRACKER (5 boxes) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-neutral-200">Experience Tracker</span>
                  <span className="text-[10px] font-mono text-amber-400">
                    ({activeHunter.experience}/5 XP)
                  </span>
                </div>

                {activeHunter.experience >= 5 && (
                  <button
                    onClick={() => setIsLevelUpModalOpen(true)}
                    className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-extrabold rounded text-[10px] shadow cursor-pointer animate-bounce"
                  >
                    Level Up Available!
                  </button>
                )}
              </div>

              {/* 5 XP Boxes */}
              <div className="flex items-center justify-between gap-2">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isMarked = activeHunter.experience >= num;
                  return (
                    <button
                      key={num}
                      onClick={() => handleExpClick(num)}
                      className={`flex-1 py-1.5 rounded flex items-center justify-center border transition-all cursor-pointer ${
                        isMarked
                          ? 'bg-amber-500 border-amber-400 text-neutral-950 font-bold shadow-xs'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-500 hover:border-neutral-600'
                      }`}
                      title={`XP Box ${num} (Mark on Miss)`}
                    >
                      <span className="text-[11px] font-mono">{num}</span>
                    </button>
                  );
                })}
              </div>

              {activeHunter.improvementsTaken && activeHunter.improvementsTaken.length > 0 && (
                <div className="pt-1 border-t border-neutral-800 text-[10px] text-neutral-400">
                  <span className="font-semibold text-neutral-300">Improvements taken: </span>
                  {activeHunter.improvementsTaken.join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Hunter Stats Row with Quick Roll */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300 uppercase tracking-wide">
              <span>Attributes & Modifiers</span>
              <span className="text-[10px] text-neutral-400 font-normal">Click stat to roll</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {(['charm', 'cool', 'sharp', 'tough', 'weird'] as StatType[]).map((stat) => {
                const val = activeHunter.stats[stat] ?? 0;
                return (
                  <div
                    key={stat}
                    className="bg-neutral-950 border border-neutral-800 rounded p-1.5 flex flex-col items-center justify-between space-y-1"
                  >
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">{stat}</span>
                    <button
                      onClick={() => onQuickRoll(stat, `Roll +${stat.charAt(0).toUpperCase() + stat.slice(1)}`)}
                      className="w-full py-1 rounded bg-neutral-900 hover:bg-amber-500/20 text-amber-300 border border-neutral-700 hover:border-amber-500 text-xs font-mono font-bold transition-all cursor-pointer"
                      title={`Quick roll +${stat}`}
                    >
                      {val >= 0 ? `+${val}` : val}
                    </button>
                    {/* Stat Stepper for leveling up / tweaking */}
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                      <button
                        onClick={() =>
                          onUpdateHunter({
                            ...activeHunter,
                            stats: {
                              ...activeHunter.stats,
                              [stat]: Math.max(-2, val - 1),
                            },
                          })
                        }
                        className="hover:text-neutral-200 px-0.5"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          onUpdateHunter({
                            ...activeHunter,
                            stats: {
                              ...activeHunter.stats,
                              [stat]: Math.min(3, val + 1),
                            },
                          })
                        }
                        className="hover:text-neutral-200 px-0.5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Playbook-Specific Sub-System Panel */}
          <PlaybookSubPanel
            hunter={activeHunter}
            onUpdateSubFeatures={(updatedSub) =>
              onUpdateHunter({
                ...activeHunter,
                subFeatures: updatedSub,
              })
            }
            onQuickRoll={onQuickRoll}
          />

          {/* Playbook Moves Checklist */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
              <span>{selectedPlaybookDef.name} Playbook Moves</span>
              <span className="text-[10px] text-neutral-400 font-normal">
                {(activeHunter.selectedMoves || []).length} active
              </span>
            </div>

            <div className="space-y-1.5">
              {selectedPlaybookDef.moves.map((move) => {
                const isSelected = (activeHunter.selectedMoves || []).includes(move.id);
                const moveStat = move.stat || detectStatFromMove(undefined, move.name, move.description);

                return (
                  <div
                    key={move.id}
                    onClick={() => handleToggleMove(move.id)}
                    className={`p-2 rounded border transition-colors cursor-pointer text-xs space-y-1 ${
                      isSelected
                        ? 'bg-amber-950/30 border-amber-500/50 text-neutral-200'
                        : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 font-bold min-w-0 flex-wrap">
                        {isSelected ? (
                          <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        )}
                        <span className={isSelected ? 'text-amber-200' : 'text-neutral-300'}>
                          {move.name}
                        </span>
                        {moveStat && (
                          <span className="text-[9px] px-1 rounded bg-neutral-800 text-amber-400 uppercase font-mono">
                            +{moveStat}
                          </span>
                        )}
                      </div>

                      {moveStat && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickRoll(moveStat, move.name);
                          }}
                          title={`Roll ${move.name} (+${moveStat})`}
                          className="text-[10px] px-2 py-0.5 rounded bg-amber-600/30 hover:bg-amber-500 hover:text-neutral-950 text-amber-300 font-bold cursor-pointer border border-amber-500/50 flex items-center gap-1 shrink-0 ml-1 shadow-xs transition-colors"
                        >
                          <Dices className="w-3 h-3" />
                          <span>Roll</span>
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-5">
                      {move.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gear & Weapons Area */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
              <span className="flex items-center gap-1">
                <Crosshair className="w-3.5 h-3.5 text-amber-400" /> Weapons & Gear
              </span>
            </div>
            <textarea
              value={activeHunter.gear || ''}
              onChange={(e) => onUpdateHunter({ ...activeHunter, gear: e.target.value })}
              placeholder="e.g. Remington 12-gauge shotgun (3-harm close reload messy), silver knife (2-harm hand holy), flashlight..."
              rows={3}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded p-2 text-xs text-neutral-200 placeholder-neutral-500 resize-none focus:outline-none focus:border-neutral-600 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* CREATE HUNTER MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-3.5 w-full max-w-sm space-y-3 shadow-2xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h3 className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                <span>🏹</span> Create New Hunter
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-neutral-400 hover:text-white text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              {/* Hunter Name */}
              <div>
                <label className="font-bold text-neutral-300 block mb-1">Hunter Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Dean Winchester, Buffy, John Constantine"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-1.5 text-neutral-200 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              {/* Playbook Select */}
              <div>
                <label className="font-bold text-neutral-300 block mb-1">Playbook Archetype</label>
                <select
                  value={newPlaybookId}
                  onChange={(e) => {
                    setNewPlaybookId(e.target.value);
                    setSelectedStatPresetIndex(0);
                  }}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-1.5 text-neutral-200 focus:outline-none focus:border-amber-500 text-xs"
                >
                  {PLAYBOOKS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.tagline}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-400 mt-1 italic">
                  {creationPlaybookDef.description}
                </p>
              </div>

              {/* Stat Presets from Playbook */}
              <div>
                <label className="font-bold text-neutral-300 block mb-1">Choose Starting Stat Array</label>
                <div className="space-y-1">
                  {creationPlaybookDef.statOptions.map((stats, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 p-1.5 rounded border cursor-pointer transition-colors ${
                        selectedStatPresetIndex === idx
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="statPreset"
                        checked={selectedStatPresetIndex === idx}
                        onChange={() => setSelectedStatPresetIndex(idx)}
                        className="accent-amber-500"
                      />
                      <span className="font-mono text-[11px]">
                        Charm {stats.charm >= 0 ? `+${stats.charm}` : stats.charm}, Cool {stats.cool >= 0 ? `+${stats.cool}` : stats.cool}, Sharp {stats.sharp >= 0 ? `+${stats.sharp}` : stats.sharp}, Tough {stats.tough >= 0 ? `+${stats.tough}` : stats.tough}, Weird {stats.weird >= 0 ? `+${stats.weird}` : stats.weird}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Look */}
              <div>
                <label className="font-bold text-neutral-300 block mb-1">Hunter Look / Vibe</label>
                <input
                  type="text"
                  value={newLook}
                  onChange={(e) => setNewLook(e.target.value)}
                  placeholder="e.g. Leather jacket, weary eyes, shotgun in trunk"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-1.5 text-neutral-200 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold cursor-pointer"
                >
                  Create Hunter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEVEL UP MODAL */}
      {isLevelUpModalOpen && activeHunter && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-neutral-900 border border-amber-500 rounded-xl p-3.5 w-full max-w-sm space-y-3 shadow-2xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-sm">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Level Up! (5 XP Reached)</span>
              </div>
              <button
                onClick={() => setIsLevelUpModalOpen(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-neutral-300 text-xs">
              Select an improvement for <strong>{activeHunter.name}</strong>. Choosing an improvement clears 5 experience marks.
            </p>

            <div className="space-y-1.5">
              {selectedPlaybookDef.improvements.map((imp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectImprovement(imp)}
                  className="w-full text-left p-2 rounded bg-neutral-950 hover:bg-amber-500/20 text-neutral-200 hover:text-amber-200 border border-neutral-800 hover:border-amber-500/60 transition-colors cursor-pointer font-medium"
                >
                  ★ {imp}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
