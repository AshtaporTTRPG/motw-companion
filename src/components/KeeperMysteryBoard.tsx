import React, { useState } from 'react';
import {
  CountdownClock,
  CountdownStage,
  Threat,
  ThreatType,
  KeeperMysteryData,
} from '../types/motw';
import {
  Clock,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Shield,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Radio,
  Flame,
  Check,
  Zap,
  Sword,
  Sliders,
  Sparkles,
} from 'lucide-react';

const STAGES: CountdownStage[] = ['Day', 'Shadows', 'Sunset', 'Dusk', 'Nightfall', 'Midnight'];

const THREAT_TYPES: ThreatType[] = [
  'Monster',
  'Minion',
  'Bystander',
  'Location',
  'Phenomenon',
  'Other',
];

const THREAT_TYPE_COLORS: Record<ThreatType, { bg: string; text: string; border: string }> = {
  Monster: { bg: 'bg-red-950/80', text: 'text-red-300', border: 'border-red-600/70' },
  Minion: { bg: 'bg-orange-950/80', text: 'text-orange-300', border: 'border-orange-600/70' },
  Bystander: { bg: 'bg-sky-950/80', text: 'text-sky-300', border: 'border-sky-600/70' },
  Location: { bg: 'bg-emerald-950/80', text: 'text-emerald-300', border: 'border-emerald-600/70' },
  Phenomenon: { bg: 'bg-purple-950/80', text: 'text-purple-300', border: 'border-purple-600/70' },
  Other: { bg: 'bg-neutral-800', text: 'text-neutral-300', border: 'border-neutral-600' },
};

interface KeeperMysteryBoardProps {
  data: KeeperMysteryData;
  onChange: (updated: KeeperMysteryData) => void;
  onBroadcastToTableNotes: (text: string) => void;
}

export const KeeperMysteryBoard: React.FC<KeeperMysteryBoardProps> = ({
  data,
  onChange,
  onBroadcastToTableNotes,
}) => {
  // Selected clock index: 0 or 1
  const [selectedClockIndex, setSelectedClockIndex] = useState<0 | 1>(0);

  // Stage being previewed/edited in the active stage note textarea
  const [viewingStageOverride, setViewingStageOverride] = useState<CountdownStage | null>(null);

  // Broadcast feedback toast state
  const [broadcastFeedback, setBroadcastFeedback] = useState<string | null>(null);

  // Threat filtering
  const [threatFilter, setThreatFilter] = useState<'All' | ThreatType>('All');

  // Expanded threats map
  const [expandedThreats, setExpandedThreats] = useState<Record<string, boolean>>({
    'threat-1': true,
  });

  // Editing max harm modal/toggle for a specific threat
  const [editingMaxHarmId, setEditingMaxHarmId] = useState<string | null>(null);

  const activeClock = data.clocks[selectedClockIndex] || data.clocks[0];

  // Resolve which stage note to edit/display
  const activeStageName: CountdownStage =
    viewingStageOverride ||
    (activeClock.currentStage > 0 ? STAGES[activeClock.currentStage - 1] : 'Day');

  // Update a clock
  const handleUpdateClock = (index: 0 | 1, updates: Partial<CountdownClock>) => {
    const updatedClocks: [CountdownClock, CountdownClock] = [
      index === 0 ? { ...data.clocks[0], ...updates } : data.clocks[0],
      index === 1 ? { ...data.clocks[1], ...updates } : data.clocks[1],
    ];
    onChange({
      ...data,
      clocks: updatedClocks,
    });
  };

  // Clock Stage Navigation
  const handleSetClockStage = (stageNum: number) => {
    const clamped = Math.max(0, Math.min(6, stageNum));
    handleUpdateClock(selectedClockIndex, { currentStage: clamped });
    if (clamped > 0) {
      setViewingStageOverride(STAGES[clamped - 1]);
    }
  };

  const handleAdvanceClock = () => {
    const next = Math.min(6, activeClock.currentStage + 1);
    handleSetClockStage(next);
  };

  const handleBackClock = () => {
    const prev = Math.max(0, activeClock.currentStage - 1);
    handleSetClockStage(prev);
  };

  const handleResetClock = () => {
    handleSetClockStage(0);
  };

  // Broadcast stage note to shared table notes
  const handleBroadcastStage = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const stageNote = activeClock.stageDescriptions[activeStageName] || '(No stage note provided)';
    const stageIdx = STAGES.indexOf(activeStageName) + 1;

    const broadcastMessage = `\n\n--- [⏱️ Mystery Countdown: ${activeClock.title}] ---\nStage: ${activeStageName.toUpperCase()} (${stageIdx}/6)\nEvent: ${stageNote}\nTime: ${timeStr}\n---------------------------------------------------`;

    onBroadcastToTableNotes(broadcastMessage);
    setBroadcastFeedback(`Broadcast ${activeStageName} stage to Table Notes!`);
    setTimeout(() => setBroadcastFeedback(null), 3500);
  };

  // Threat Management
  const handleAddThreat = () => {
    const newThreat: Threat = {
      id: 'threat-' + Date.now(),
      name: 'New Threat',
      threatType: 'Monster',
      motivation: 'To destroy, consume, or deceive',
      harm: 0,
      maxHarm: 10,
      isUnstable: false,
      armor: 0,
      weakness: '',
      attacks: 'Attacks: 2-harm hand messy',
      notes: '',
    };
    onChange({
      ...data,
      threats: [newThreat, ...data.threats],
    });
    setExpandedThreats((prev) => ({ ...prev, [newThreat.id]: true }));
  };

  const handleUpdateThreat = (id: string, updates: Partial<Threat>) => {
    const nextThreats = data.threats.map((t) => (t.id === id ? { ...t, ...updates } : t));
    onChange({
      ...data,
      threats: nextThreats,
    });
  };

  const handleDeleteThreat = (id: string) => {
    const nextThreats = data.threats.filter((t) => t.id !== id);
    onChange({
      ...data,
      threats: nextThreats,
    });
  };

  const toggleThreatExpand = (id: string) => {
    setExpandedThreats((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter threats
  const filteredThreats =
    threatFilter === 'All'
      ? data.threats
      : data.threats.filter((t) => t.threatType === threatFilter);

  // Stage glow calculator
  const getStageStyle = (stageIdx: number) => {
    const isActive = activeClock.currentStage === stageIdx;
    const isPast = activeClock.currentStage > stageIdx;

    if (isActive) {
      if (stageIdx <= 2) {
        return 'bg-amber-500 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-500/30 ring-1 ring-amber-300';
      }
      if (stageIdx <= 4) {
        return 'bg-orange-500 text-white font-bold border-orange-400 shadow-md shadow-orange-500/40 ring-1 ring-orange-300';
      }
      if (stageIdx === 5) {
        return 'bg-red-600 text-white font-bold border-red-400 shadow-md shadow-red-600/50 ring-1 ring-red-400';
      }
      // Midnight
      return 'bg-rose-700 text-white font-extrabold border-rose-400 shadow-lg shadow-rose-600/60 ring-2 ring-rose-400 animate-pulse';
    }

    if (isPast) {
      return 'bg-neutral-800 text-amber-300/80 border-amber-900/60 hover:bg-neutral-750';
    }

    return 'bg-neutral-900/90 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200';
  };

  return (
    <div className="space-y-3 pb-3">
      {/* ------------------------------------------------------------- */}
      {/* 1. DUAL MYSTERY COUNTDOWN CLOCKS PANEL                        */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-neutral-900/95 border border-amber-500/30 rounded-lg p-2.5 space-y-2.5 shadow-md">
        {/* Panel Header & Dual Tabs */}
        <div className="flex items-center justify-between gap-1 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Mystery Countdown Clocks
            </span>
          </div>

          {/* Clock Selector Tabs */}
          <div className="flex items-center gap-1 bg-neutral-950 p-0.5 rounded border border-neutral-800">
            <button
              onClick={() => {
                setSelectedClockIndex(0);
                setViewingStageOverride(null);
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer truncate max-w-[130px] ${
                selectedClockIndex === 0
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Clock 1: {data.clocks[0]?.title || 'Main'}
            </button>
            <button
              onClick={() => {
                setSelectedClockIndex(1);
                setViewingStageOverride(null);
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer truncate max-w-[130px] ${
                selectedClockIndex === 1
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Clock 2: {data.clocks[1]?.title || 'Sub-plot'}
            </button>
          </div>
        </div>

        {/* Selected Clock Details */}
        <div className="space-y-2 bg-neutral-950/70 p-2 rounded border border-neutral-800/90">
          {/* Editable Title */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-neutral-500 shrink-0">Title:</span>
            <input
              type="text"
              value={activeClock.title}
              onChange={(e) =>
                handleUpdateClock(selectedClockIndex, { title: e.target.value })
              }
              placeholder="e.g., Main Mystery: The Beast of Blackwood"
              className="text-xs font-semibold bg-transparent border-b border-neutral-700 focus:border-amber-500 text-amber-200 w-full focus:outline-none transition-colors py-0.5"
            />
          </div>

          {/* 6-Step Segmented Bar */}
          <div className="space-y-1">
            <div className="grid grid-cols-6 gap-1">
              {STAGES.map((stage, idx) => {
                const stageNum = idx + 1;
                const isCurrent = activeClock.currentStage === stageNum;
                const isViewing = activeStageName === stage;
                return (
                  <button
                    key={stage}
                    onClick={() => handleSetClockStage(stageNum)}
                    title={`Click to set stage to ${stage} (${stageNum}/6)`}
                    className={`h-7 px-0.5 rounded text-[10px] border flex flex-col items-center justify-center transition-all cursor-pointer relative ${getStageStyle(
                      stageNum
                    )} ${isViewing && !isCurrent ? 'ring-1 ring-amber-500/50' : ''}`}
                  >
                    <span className="truncate leading-none">{stage}</span>
                    <span className="text-[8px] opacity-75 font-mono">{stageNum}/6</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Row: Back | Stage Name: {currentStage} | Advance | Reset */}
          <div className="flex items-center justify-between gap-1 pt-1 border-t border-neutral-800/80 text-xs">
            <button
              onClick={handleBackClock}
              disabled={activeClock.currentStage <= 0}
              className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 rounded font-semibold text-[11px] cursor-pointer transition-colors"
            >
              ◀ Back
            </button>

            {/* Current Stage Indicator */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] text-neutral-400">Current:</span>
              <span
                className={`text-[11px] font-bold ${
                  activeClock.currentStage === 0
                    ? 'text-neutral-500 italic'
                    : activeClock.currentStage === 6
                    ? 'text-rose-400 animate-pulse'
                    : activeClock.currentStage >= 4
                    ? 'text-orange-400'
                    : 'text-amber-300'
                }`}
              >
                {activeClock.currentStage === 0
                  ? 'Not Started (0/6)'
                  : `${STAGES[activeClock.currentStage - 1]} (${activeClock.currentStage}/6)`}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleAdvanceClock}
                disabled={activeClock.currentStage >= 6}
                className="px-2 py-0.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-950 rounded font-bold text-[11px] cursor-pointer transition-colors shadow-xs"
              >
                Advance ▶
              </button>

              <button
                onClick={handleResetClock}
                title="Reset Clock to Not Started (0)"
                className="p-1 text-neutral-500 hover:text-neutral-300 rounded cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Active Stage Note Section */}
          <div className="space-y-1.5 pt-1 border-t border-neutral-800/80">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              {/* Stage Note Tabs to allow previewing/editing any stage */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Stage Note:
                </span>
                <div className="flex items-center gap-0.5 overflow-x-auto">
                  {STAGES.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setViewingStageOverride(s)}
                      className={`px-1.5 py-0.2 rounded text-[9px] font-semibold transition-colors cursor-pointer ${
                        activeStageName === s
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {s}
                      {activeClock.currentStage === i + 1 ? '•' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Broadcast Button */}
              <button
                onClick={handleBroadcastStage}
                className="px-2 py-0.5 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/60 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                title="Broadcast this stage note to Shared Table Notes"
              >
                <Radio className="w-3 h-3 text-indigo-400" />
                <span>📢 Broadcast Stage to Table Notes</span>
              </button>
            </div>

            {/* Broadcast Feedback Toast */}
            {broadcastFeedback && (
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                <Check className="w-3 h-3" />
                <span>{broadcastFeedback}</span>
              </div>
            )}

            {/* Stage Textarea */}
            <textarea
              value={activeClock.stageDescriptions[activeStageName] || ''}
              onChange={(e) => {
                const updatedDescriptions = {
                  ...activeClock.stageDescriptions,
                  [activeStageName]: e.target.value,
                };
                handleUpdateClock(selectedClockIndex, {
                  stageDescriptions: updatedDescriptions,
                });
              }}
              rows={2}
              placeholder={`What occurs at ${activeStageName}? (e.g., "The cult summons the avatar at the reservoir...")`}
              className="w-full bg-neutral-900/90 border border-neutral-800 rounded p-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/80 resize-none font-sans leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CUSTOMIZABLE THREAT BOARD PANEL                            */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-neutral-900/95 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-md">
        {/* Header with Title & Add Threat Button */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-bold text-neutral-200 uppercase tracking-wide">
              📋 Threat Board
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 font-mono text-neutral-400">
              {data.threats.length}
            </span>
          </div>

          <button
            onClick={handleAddThreat}
            className="px-2 py-1 bg-red-900/70 hover:bg-red-800 text-red-100 rounded text-xs font-semibold flex items-center gap-1 border border-red-700/60 cursor-pointer transition-colors shadow-xs"
          >
            <Plus className="w-3 h-3" />
            <span>+ Add Threat</span>
          </button>
        </div>

        {/* Threat Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px]">
          {(['All', ...THREAT_TYPES] as const).map((filter) => {
            const count =
              filter === 'All'
                ? data.threats.length
                : data.threats.filter((t) => t.threatType === filter).length;
            return (
              <button
                key={filter}
                onClick={() => setThreatFilter(filter)}
                className={`px-1.5 py-0.5 rounded font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  threatFilter === filter
                    ? 'bg-neutral-800 text-white border border-neutral-600 font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {filter} ({count})
              </button>
            );
          })}
        </div>

        {/* Threat Cards List */}
        <div className="space-y-2">
          {filteredThreats.length === 0 ? (
            <div className="py-6 text-center text-xs text-neutral-500 italic bg-neutral-950/40 rounded border border-neutral-850">
              No threats match this filter. Click "+ Add Threat" to register a monster, minion, or hazard.
            </div>
          ) : (
            filteredThreats.map((threat) => {
              const isExpanded = !!expandedThreats[threat.id];
              const typeStyle = THREAT_TYPE_COLORS[threat.threatType] || THREAT_TYPE_COLORS.Other;
              const isEditingMaxHarm = editingMaxHarmId === threat.id;

              return (
                <div
                  key={threat.id}
                  className={`bg-neutral-950/80 border rounded-lg overflow-hidden transition-all shadow-xs ${
                    threat.harm >= threat.maxHarm && threat.maxHarm > 0
                      ? 'border-neutral-800 opacity-80'
                      : threat.threatType === 'Monster'
                      ? 'border-red-950 hover:border-red-900/80'
                      : 'border-neutral-800'
                  }`}
                >
                  {/* Collapsed / Main Header */}
                  <div
                    onClick={() => toggleThreatExpand(threat.id)}
                    className="p-2 flex items-center justify-between gap-1.5 bg-neutral-900/90 cursor-pointer hover:bg-neutral-850 transition-colors select-none"
                  >
                    <div className="flex items-center gap-1.5 truncate flex-1 min-w-0">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      )}

                      {/* Threat Type Pill */}
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded border shrink-0 ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}
                      >
                        {threat.threatType}
                      </span>

                      {/* Threat Name */}
                      <span className="text-xs font-bold text-neutral-200 truncate">
                        {threat.name || 'Unnamed Threat'}
                      </span>
                    </div>

                    {/* Interactive Mini Harm Tracker & Action Buttons */}
                    <div
                      className="flex items-center gap-1.5 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {threat.maxHarm > 0 ? (
                        <div className="flex items-center gap-1 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
                          <button
                            onClick={() =>
                              handleUpdateThreat(threat.id, {
                                harm: Math.max(0, threat.harm - 1),
                              })
                            }
                            className="w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-white rounded hover:bg-neutral-800 text-[10px] cursor-pointer"
                            title="Decrease Harm"
                          >
                            -
                          </button>
                          <span
                            className={`text-[10px] font-mono font-bold ${
                              threat.harm >= threat.maxHarm
                                ? 'text-red-400'
                                : threat.harm >= 4
                                ? 'text-amber-400'
                                : 'text-neutral-300'
                            }`}
                          >
                            Harm: {threat.harm}/{threat.maxHarm}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateThreat(threat.id, {
                                harm: Math.min(threat.maxHarm, threat.harm + 1),
                              })
                            }
                            className="w-4 h-4 flex items-center justify-center text-red-400 hover:text-red-200 rounded hover:bg-neutral-800 text-[10px] cursor-pointer font-bold"
                            title="Increase Harm"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-[9px] text-neutral-500 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-850">
                          Non-combat
                        </span>
                      )}

                      {threat.armor > 0 && (
                        <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-sky-950/60 border border-sky-700/50 text-sky-300">
                          🛡️{threat.armor}
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteThreat(threat.id)}
                        className="p-1 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete threat"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body Details */}
                  {isExpanded && (
                    <div className="p-2.5 space-y-2.5 border-t border-neutral-800/80 bg-neutral-950/60 text-xs">
                      {/* Basic Info: Type, Name, Motivation */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {/* Threat Type Selector */}
                        <div>
                          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
                            Type:
                          </label>
                          <select
                            value={threat.threatType}
                            onChange={(e) => {
                              const newType = e.target.value as ThreatType;
                              const updates: Partial<Threat> = { threatType: newType };
                              // Auto-suggest default max harm if switching to combatant
                              if (threat.maxHarm === 0 && (newType === 'Monster' || newType === 'Minion')) {
                                updates.maxHarm = newType === 'Monster' ? 10 : 4;
                              }
                              handleUpdateThreat(threat.id, updates);
                            }}
                            className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded px-1.5 py-1 focus:outline-none focus:border-amber-500"
                          >
                            {THREAT_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Name */}
                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
                            Name:
                          </label>
                          <input
                            type="text"
                            value={threat.name}
                            onChange={(e) => handleUpdateThreat(threat.id, { name: e.target.value })}
                            placeholder="Threat name..."
                            className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded px-2 py-1 font-semibold focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      {/* Motivation / Role (Freeform text) */}
                      <div>
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
                          Motivation / Agenda:
                        </label>
                        <input
                          type="text"
                          value={threat.motivation}
                          onChange={(e) =>
                            handleUpdateThreat(threat.id, { motivation: e.target.value })
                          }
                          placeholder="e.g. To devour and terrorize; To obey master; To preserve secrets..."
                          className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded px-2 py-1 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Combat Stats Section */}
                      <div className="bg-neutral-900/80 border border-neutral-800/90 rounded-md p-2 space-y-2">
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1">
                            <Sword className="w-3 h-3 text-red-400" />
                            <span>Combat Stats</span>
                          </span>

                          {/* Toggle or Edit Max Harm */}
                          <div className="flex items-center gap-1.5">
                            {threat.maxHarm === 0 ? (
                              <button
                                onClick={() => handleUpdateThreat(threat.id, { maxHarm: 8 })}
                                className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px] font-semibold cursor-pointer"
                              >
                                + Enable Harm Track
                              </button>
                            ) : (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() =>
                                    setEditingMaxHarmId(isEditingMaxHarm ? null : threat.id)
                                  }
                                  className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px] font-semibold cursor-pointer border border-neutral-700 flex items-center gap-0.5"
                                >
                                  <Sliders className="w-2.5 h-2.5 text-amber-400" />
                                  <span>Edit Max: {threat.maxHarm}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Inline Max Harm Editor */}
                        {isEditingMaxHarm && (
                          <div className="p-1.5 bg-neutral-950 rounded border border-neutral-700 flex items-center justify-between gap-2 text-[11px]">
                            <span className="text-neutral-400">Total Harm Capacity:</span>
                            <div className="flex items-center gap-1">
                              {[3, 4, 7, 10, 12].map((preset) => (
                                <button
                                  key={preset}
                                  onClick={() =>
                                    handleUpdateThreat(threat.id, { maxHarm: preset })
                                  }
                                  className={`px-1.5 py-0.2 rounded text-[10px] font-mono cursor-pointer ${
                                    threat.maxHarm === preset
                                      ? 'bg-amber-500 text-neutral-950 font-bold'
                                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                  }`}
                                >
                                  {preset}
                                </button>
                              ))}
                              <button
                                onClick={() =>
                                  handleUpdateThreat(threat.id, {
                                    maxHarm: Math.max(1, threat.maxHarm - 1),
                                  })
                                }
                                className="w-5 h-5 bg-neutral-800 text-neutral-200 rounded flex items-center justify-center cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-bold text-amber-300 font-mono">
                                {threat.maxHarm}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateThreat(threat.id, {
                                    maxHarm: Math.min(20, threat.maxHarm + 1),
                                  })
                                }
                                className="w-5 h-5 bg-neutral-800 text-neutral-200 rounded flex items-center justify-center cursor-pointer"
                              >
                                +
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateThreat(threat.id, { maxHarm: 0, harm: 0 })
                                }
                                title="Remove harm track"
                                className="text-[10px] text-neutral-500 hover:text-red-400 ml-1 cursor-pointer"
                              >
                                Disable
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Interactive Harm Track */}
                        {threat.maxHarm > 0 && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-neutral-400">
                              <span>Harm Track:</span>
                              <div className="flex items-center gap-2">
                                {threat.harm >= threat.maxHarm && (
                                  <span className="text-red-400 font-bold">☠️ Defeated / Dying</span>
                                )}
                                {threat.harm >= 4 && threat.harm < threat.maxHarm && (
                                  <span className="text-amber-400 font-medium">⚠️ Severe Harm</span>
                                )}
                                <span className="font-mono font-bold text-neutral-200">
                                  {threat.harm}/{threat.maxHarm}
                                </span>
                              </div>
                            </div>

                            {/* Harm Boxes */}
                            <div className="flex flex-wrap gap-1">
                              {Array.from({ length: threat.maxHarm }, (_, i) => {
                                const boxNum = i + 1;
                                const isMarked = boxNum <= threat.harm;
                                const isSevere = boxNum >= 4;
                                return (
                                  <button
                                    key={boxNum}
                                    onClick={() => {
                                      // If clicked on current harm, decrement by 1; otherwise set to boxNum
                                      const nextHarm =
                                        threat.harm === boxNum ? boxNum - 1 : boxNum;
                                      handleUpdateThreat(threat.id, { harm: nextHarm });
                                    }}
                                    title={`Click to mark harm ${boxNum}`}
                                    className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                                      isMarked
                                        ? isSevere
                                          ? 'bg-red-600 border-red-400 text-white shadow-xs'
                                          : 'bg-amber-600 border-amber-400 text-white shadow-xs'
                                        : 'bg-neutral-950 border-neutral-750 text-neutral-500 hover:border-neutral-600'
                                    }`}
                                  >
                                    {isMarked ? '✕' : boxNum}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Secondary Combat Controls: Unstable & Armor Stepper */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-neutral-800/80 items-center">
                          {/* Unstable Checkbox */}
                          <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
                            <input
                              type="checkbox"
                              checked={threat.isUnstable}
                              onChange={(e) =>
                                handleUpdateThreat(threat.id, { isUnstable: e.target.checked })
                              }
                              className="accent-amber-500 rounded"
                            />
                            <span
                              className={`font-semibold ${
                                threat.isUnstable ? 'text-amber-400' : 'text-neutral-400'
                              }`}
                            >
                              ⚠️ Unstable (Injury Worsening)
                            </span>
                          </label>

                          {/* Armor Input Stepper */}
                          <div className="flex items-center justify-start sm:justify-end gap-1.5 text-xs">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase">
                              Armor:
                            </span>
                            <div className="flex items-center gap-1 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
                              <button
                                onClick={() =>
                                  handleUpdateThreat(threat.id, {
                                    armor: Math.max(0, threat.armor - 1),
                                  })
                                }
                                className="w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-white rounded hover:bg-neutral-800 text-[10px] cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-sky-300 w-4 text-center">
                                {threat.armor}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateThreat(threat.id, { armor: threat.armor + 1 })
                                }
                                className="w-4 h-4 flex items-center justify-center text-sky-400 hover:text-sky-200 rounded hover:bg-neutral-800 text-[10px] cursor-pointer font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Weakness Banner (Highlighted Red/Amber Text Field) */}
                        <div className="p-2 rounded bg-rose-950/40 border border-rose-500/40 space-y-1">
                          <label className="text-[10px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                            <Flame className="w-3 h-3 text-rose-400" />
                            <span>Monster Vulnerability / Weakness:</span>
                          </label>
                          <input
                            type="text"
                            value={threat.weakness}
                            onChange={(e) =>
                              handleUpdateThreat(threat.id, { weakness: e.target.value })
                            }
                            placeholder="e.g. Pure fire, blessed silver through the heart, running water..."
                            className="w-full bg-neutral-950/80 border border-rose-700/60 text-xs text-rose-200 placeholder-rose-500/50 rounded px-2 py-1 focus:outline-none focus:border-rose-400 font-medium"
                          />
                        </div>

                        {/* Attacks Input */}
                        <div>
                          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
                            Attacks & Custom Moves:
                          </label>
                          <input
                            type="text"
                            value={threat.attacks}
                            onChange={(e) =>
                              handleUpdateThreat(threat.id, { attacks: e.target.value })
                            }
                            placeholder="e.g. Rending Claws (3-harm hand messy); Venomous Sting (2-harm close poison)..."
                            className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded px-2 py-1 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      {/* Notes & Clues Freeform Textarea */}
                      <div>
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
                          Keeper Notes & Secret Lore:
                        </label>
                        <textarea
                          value={threat.notes}
                          onChange={(e) =>
                            handleUpdateThreat(threat.id, { notes: e.target.value })
                          }
                          rows={2}
                          placeholder="Secret habits, lair location, minions commanded, psychological triggers..."
                          className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded p-2 focus:outline-none focus:border-amber-500 resize-y leading-relaxed font-sans"
                        />
                      </div>
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
