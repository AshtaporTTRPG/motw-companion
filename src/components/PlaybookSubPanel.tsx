import React, { useState } from 'react';
import {
  HunterProfile,
  PlaybookSubFeatures,
  RoteCard,
  StatType,
} from '../types/motw';
import { PLAYBOOKS } from '../data/playbooks';
import { getAttackRollStat, getAttackButtonLabel } from '../utils/rollEngine';
import {
  Sparkles,
  Shield,
  Skull,
  Heart,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Flame,
  Check,
  Dices,
  Lock,
  Unlock,
  AlertOctagon,
  BookOpen,
} from 'lucide-react';

interface PlaybookSubPanelProps {
  hunter: HunterProfile;
  onUpdateSubFeatures: (updated: PlaybookSubFeatures) => void;
  onQuickRoll: (stat: StatType, moveName: string) => void;
  onUpdateHunter?: (updated: HunterProfile) => void;
}

export const PlaybookSubPanel: React.FC<PlaybookSubPanelProps> = ({
  hunter,
  onUpdateSubFeatures,
  onQuickRoll,
  onUpdateHunter,
}) => {
  const [isRoteModalOpen, setIsRoteModalOpen] = useState(false);
  const [editingRote, setEditingRote] = useState<RoteCard | null>(null);
  const [newChecklistText, setNewChecklistText] = useState('');

  const sub = hunter.subFeatures || {};
  const playbookLower = (hunter.playbook || '').toLowerCase().trim();

  // Helper to toggle item in array
  const toggleArrayItem = (current: string[] | undefined, item: string, max?: number): string[] => {
    const list = current || [];
    if (list.includes(item)) {
      return list.filter((i) => i !== item);
    }
    if (max && list.length >= max) {
      // Replace oldest or prevent
      return [...list.slice(1), item];
    }
    return [...list, item];
  };

  // 1. THE CHOSEN
  if (playbookLower === 'the chosen' || playbookLower === 'chosen') {
    const heroicOptions = [
      'Sacrifice',
      'A normal life',
      'Destiny',
      'Cleansing',
      'Justice',
      'Divine aid',
      'Victory',
      'Revelation',
    ];
    const doomOptions = [
      'Death',
      'Destruction',
      'Despair',
      'Damnation',
      'Hubris',
      'Losing loved ones',
      'Treachery',
      'Corruption',
    ];

    const forms = ['Staff', 'Haft', 'Handle', 'Chain', 'Blade', 'Bow'];
    const businessEndTags = [
      '+1 harm',
      'close',
      'messy',
      'magic',
      'heavy',
      'fast',
      'reload',
      'ignore-armour',
      'stun',
      'holy',
      'silver',
      'area',
    ];
    const materials = [
      'Wood',
      'Bone',
      'Silver',
      'Cold Iron',
      'Blessed Steel',
      'Obsidian',
      'Celestial Gold',
    ];

    const selectedHeroic = sub.fateHeroic || [];
    const selectedDoom = sub.fateDoom || [];
    const currentWeapon = sub.specialWeapon || {
      form: 'Blade',
      tags: ['+1 harm', 'messy', 'silver'],
      material: 'Silver',
    };

    // Calculate computed profile
    const hasPlusHarm = currentWeapon.tags.includes('+1 harm');
    const baseHarm = hasPlusHarm ? 3 : 2;
    const isClose = currentWeapon.tags.includes('close');
    const range = isClose ? 'close' : 'hand';
    const otherTags = currentWeapon.tags.filter((t) => t !== '+1 harm');
    const computedProfile = `${currentWeapon.form} + ${currentWeapon.material}: ${baseHarm}-harm ${range} ${otherTags.join(
      ' '
    )} ${currentWeapon.material.toLowerCase()}`.trim();

    const hasDoomTagRemover = Boolean(
      (hunter.takenImprovements && hunter.takenImprovements.some(i => i.toLowerCase().includes('doom') || i.toLowerCase().includes('delete'))) ||
      (hunter.advancementsTaken && hunter.advancementsTaken.some(i => i.toLowerCase().includes('doom') || i.toLowerCase().includes('delete'))) ||
      (hunter.improvementsTaken && hunter.improvementsTaken.some(i => i.toLowerCase().includes('doom') || i.toLowerCase().includes('delete')))
    );

    const maxDoomTags = hasDoomTagRemover ? 1 : 2;

    const handleToggleDoomTag = (tag: string) => {
      if (selectedDoom.includes(tag)) {
        onUpdateSubFeatures({
          ...sub,
          fateDoom: selectedDoom.filter((t) => t !== tag),
        });
      } else {
        if (selectedDoom.length >= maxDoomTags) {
          onUpdateSubFeatures({
            ...sub,
            fateDoom: [...selectedDoom.slice(1), tag],
          });
        } else {
          onUpdateSubFeatures({
            ...sub,
            fateDoom: [...selectedDoom, tag],
          });
        }
      }
    };

    const handleToggleHeroicTag = (tag: string) => {
      if (selectedHeroic.includes(tag)) {
        if (hasDoomTagRemover) {
          onUpdateSubFeatures({
            ...sub,
            fateHeroic: selectedHeroic.filter((t) => t !== tag),
          });
        } else {
          onUpdateSubFeatures({
            ...sub,
            fateHeroic: toggleArrayItem(sub.fateHeroic, tag, 2),
          });
        }
      } else {
        onUpdateSubFeatures({
          ...sub,
          fateHeroic: toggleArrayItem(sub.fateHeroic, tag, 2),
        });
      }
    };

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            The Chosen: Fate & Special Weapon
          </span>
          <span className="text-[10px] text-amber-400/80 font-mono uppercase">
            {hasDoomTagRemover ? '⭐ Doom Remover Unlocked' : 'Playbook Sub-System'}
          </span>
        </div>

        {/* Interactive Tag Remover Banner when advanced improvement taken */}
        {hasDoomTagRemover && (
          <div className="p-2 rounded bg-red-950/40 border border-red-500/60 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-red-300 font-bold">
              <span className="flex items-center gap-1.5">
                <span>⭐</span> Fate Tag Remover Unlocked (Advanced Improvement)
              </span>
              <span className="text-[10px] font-mono uppercase bg-red-900/60 text-red-200 px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>
            <p className="text-[11px] text-neutral-300">
              You can now clear 1 Doom tag (and optionally 1 Heroic tag). Click any active tag below to remove it from your Fate.
            </p>
            {selectedDoom.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] text-red-400 font-semibold">Active Doom:</span>
                {selectedDoom.map((doom) => (
                  <button
                    key={doom}
                    type="button"
                    onClick={() => {
                      onUpdateSubFeatures({
                        ...sub,
                        fateDoom: selectedDoom.filter((d) => d !== doom),
                      });
                    }}
                    className="px-2 py-0.5 bg-red-900/80 hover:bg-red-800 text-red-100 rounded text-[10px] font-semibold border border-red-400/80 flex items-center gap-1 cursor-pointer"
                    title={`Delete Doom tag: ${doom}`}
                  >
                    <span>✕ Delete {doom}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Fate Selection: 2 Heroic & 2 Doom tags */}
        <div className="space-y-2 border-b border-neutral-800/80 pb-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-neutral-200">
              Fate — Heroic Tags ({selectedHeroic.length}/{hasDoomTagRemover ? 'up to 2' : '2'})
            </span>
            <span className="text-[10px] text-neutral-400">
              {hasDoomTagRemover ? 'Pick 1–2' : 'Pick 2'}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {heroicOptions.map((tag) => {
              const active = selectedHeroic.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleHeroicTag(tag)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                    active
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/70 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {tag} {active && '✓'}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="font-semibold text-neutral-200">
              Fate — Doom Tags ({selectedDoom.length}/{hasDoomTagRemover ? '1' : '2'})
            </span>
            <span className="text-[10px] text-neutral-400">
              {hasDoomTagRemover ? 'Max 1 (1 Deleted)' : 'Pick 2'}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {doomOptions.map((tag) => {
              const active = selectedDoom.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleDoomTag(tag)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                    active
                      ? 'bg-red-950/40 text-red-300 border-red-500/70 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {tag} {active && '☠'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Weapon Builder */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-amber-300">Destined Special Weapon Builder</span>
            <span className="text-[10px] text-neutral-400">Form + 3 Tags + Material</span>
          </div>

          {/* Form Selector */}
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Form:</span>
            <div className="flex flex-wrap gap-1">
              {forms.map((f) => (
                <button
                  key={f}
                  onClick={() =>
                    onUpdateSubFeatures({
                      ...sub,
                      specialWeapon: { ...currentWeapon, form: f },
                    })
                  }
                  className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                    currentWeapon.form === f
                      ? 'bg-neutral-800 text-amber-300 border-amber-500 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Business-end tags (pick 3) */}
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">
              Business-End Tags ({currentWeapon.tags.length}/3):
            </span>
            <div className="flex flex-wrap gap-1">
              {businessEndTags.map((tag) => {
                const active = currentWeapon.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      onUpdateSubFeatures({
                        ...sub,
                        specialWeapon: {
                          ...currentWeapon,
                          tags: toggleArrayItem(currentWeapon.tags, tag, 3),
                        },
                      })
                    }
                    className={`px-1.5 py-0.5 rounded text-[10px] border cursor-pointer ${
                      active
                        ? 'bg-amber-600/30 text-amber-200 border-amber-500 font-bold'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Material Selector */}
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Material:</span>
            <div className="flex flex-wrap gap-1">
              {materials.map((m) => (
                <button
                  key={m}
                  onClick={() =>
                    onUpdateSubFeatures({
                      ...sub,
                      specialWeapon: { ...currentWeapon, material: m },
                    })
                  }
                  className={`px-1.5 py-0.5 rounded text-[10px] border cursor-pointer ${
                    currentWeapon.material === m
                      ? 'bg-neutral-800 text-amber-300 border-amber-500 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Computed Weapon Callout */}
          <div className="bg-neutral-950 border border-amber-500/40 rounded p-2 text-xs">
            <span className="text-[10px] text-neutral-400 block uppercase font-mono">
              Computed Weapon Profile:
            </span>
            <span className="text-amber-300 font-mono font-bold">{computedProfile}</span>
          </div>
        </div>
      </div>
    );
  }

  // THE CHANGELING
  if (playbookLower === 'the changeling' || playbookLower === 'changeling') {
    const heritagePitfallOptions = [
      'Iron vulnerability',
      'Salt bound',
      'Cannot lie',
      'Fae debt',
      'True name known',
      'Threshold restricted',
    ];

    const hasRemovedHeritageTag = Boolean(
      (hunter.takenImprovements && hunter.takenImprovements.some(i => i.toLowerCase().includes('remove') && i.toLowerCase().includes('heritage'))) ||
      (hunter.advancementsTaken && hunter.advancementsTaken.some(i => i.toLowerCase().includes('remove') && i.toLowerCase().includes('heritage'))) ||
      (hunter.improvementsTaken && hunter.improvementsTaken.some(i => i.toLowerCase().includes('remove') && i.toLowerCase().includes('heritage')))
    );

    const requiredCount = hasRemovedHeritageTag ? 2 : 3;
    const selectedHeritage = sub.changelingHeritageTags || ['Iron vulnerability', 'Cannot lie', 'Fae debt'];

    const handleToggleHeritage = (tag: string) => {
      let next: string[];
      if (selectedHeritage.includes(tag)) {
        next = selectedHeritage.filter((t) => t !== tag);
      } else {
        if (selectedHeritage.length >= requiredCount) {
          next = [...selectedHeritage.slice(1), tag];
        } else {
          next = [...selectedHeritage, tag];
        }
      }
      onUpdateSubFeatures({
        ...sub,
        changelingHeritageTags: next,
      });
      if (onUpdateHunter) {
        onUpdateHunter({
          ...hunter,
          subFeatures: {
            ...sub,
            changelingHeritageTags: next,
          },
        });
      }
    };

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            The Changeling: Unknown Heritage
          </span>
          <span className="text-[10px] text-emerald-400/80 font-mono uppercase">
            {hasRemovedHeritageTag ? '⭐ Reduced to 2 Pitfalls' : 'Playbook Sub-System'}
          </span>
        </div>

        <p className="text-[11px] text-neutral-400">
          Your fae heritage grants uncanny capabilities but inflicts supernatural pitfalls.
          {hasRemovedHeritageTag
            ? ' (Advanced Unlock: One heritage pitfall removed! Required: 2 pitfalls).'
            : ' Select 3 pitfalls from the list below.'}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-neutral-200">
              Heritage Pitfalls ({selectedHeritage.length}/{requiredCount})
            </span>
            <span className="text-[10px] text-neutral-400">
              {hasRemovedHeritageTag ? 'Pick 2' : 'Pick 3'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {heritagePitfallOptions.map((tag) => {
              const active = selectedHeritage.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleHeritage(tag)}
                  className={`p-2 rounded text-[11px] font-medium border text-left transition-colors cursor-pointer flex items-center justify-between gap-1.5 ${
                    active
                      ? 'bg-emerald-950/40 text-emerald-200 border-emerald-500/70 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span>{tag}</span>
                  <span className="font-mono text-xs">{active ? '✓' : ''}</span>
                </button>
              );
            })}
          </div>
        </div>

        {hasRemovedHeritageTag && (
          <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/60 text-xs space-y-1">
            <div className="flex items-center justify-between text-emerald-300 font-bold text-[11px]">
              <span>⭐ Advanced Unlock: Heritage Pitfall Removed</span>
              <span className="text-[10px] font-mono uppercase bg-emerald-900/60 text-emerald-200 px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>
            <p className="text-[10px] text-neutral-300">
              You have purged an ancient curse of your heritage. You only require 2 pitfalls, and can uncheck any tag.
            </p>
          </div>
        )}
      </div>
    );
  }

  // 2. THE EXPERT
  if (playbookLower === 'the expert' || playbookLower === 'expert') {
    const havenChoices = [
      { id: 'lore-library', name: 'Lore Library', desc: 'Vast occult archives (+1 to investigate mysteries here)' },
      { id: 'armory', name: 'Armory', desc: 'Shotguns, rifles, and silver ammo stockpile' },
      { id: 'infirmary', name: 'Infirmary', desc: 'Medical supplies; heal 1 extra harm when resting here' },
      { id: 'workshop', name: 'Workshop', desc: 'Tools for building weird tech and repairing gear' },
      { id: 'oubliette', name: 'Oubliette / Prison Cell', desc: 'Reinforced holding cell for captured monsters' },
      { id: 'panic-room', name: 'Panic Room', desc: 'Reinforced safe room proof against monster breaches' },
      { id: 'mystical-wards', name: 'Mystical Wards', desc: 'Spells that alarm or damage intruders (+1 armor)' },
      { id: 'portal', name: 'Supernatural Portal', desc: 'Hidden gateway to the astral plane or another realm' },
    ];

    const selectedHaven = sub.havenOptions || ['lore-library', 'armory', 'workshop'];

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            The Expert: Haven Headquarters ({selectedHaven.length}/3)
          </span>
          <span className="text-[10px] text-amber-400/80 font-mono uppercase">Select 3 Options</span>
        </div>

        <p className="text-[11px] text-neutral-400">
          Your haven provides a sanctuary to prepare, analyze cryptid biology, and heal between hunts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {havenChoices.map((h) => {
            const active = selectedHaven.includes(h.id);
            return (
              <button
                key={h.id}
                onClick={() =>
                  onUpdateSubFeatures({
                    ...sub,
                    havenOptions: toggleArrayItem(sub.havenOptions, h.id, 3),
                  })
                }
                className={`p-2 rounded border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                  active
                    ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 shadow-xs'
                    : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{h.name}</span>
                  {active && <span className="text-amber-400 text-[10px]">✓ Selected</span>}
                </div>
                <span className="text-[10px] text-neutral-400 mt-0.5 leading-snug">{h.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. THE PROFESSIONAL
  if (playbookLower === 'the professional' || playbookLower === 'professional') {
    const resourceOptions = [
      'Well-armed (Specialized military ordnance & heavy weapons)',
      'Good intel (Classified dossiers, satellite imagery, tap logs)',
      'Covert transport (Black unmarked helicopters, armored SUVs)',
      'Forensic labs (DNA sequencing, chemical analysis teams)',
      'Safehouses (Network of bunkers and high-security lodgings)',
      'Bureaucratic muscle (Ability to clear police cordons and media)',
      'High-tech surveillance (Bugging kits, drones, thermal scans)',
      'Medical facilities (Field trauma units, emergency surgery)',
    ];

    const redTapeOptions = [
      'Bureaucratic delays (Paperwork holds up requests and authorizations)',
      'Dubious motives (Agency has dark secondary agendas for monsters)',
      'Inter-agency rivalry (Hostile federal agents monitor your operations)',
      'Surveillance oversight (Every move and bullet is audited by superiors)',
      'Strict hierarchy (Orders must be obeyed or you risk court-martial)',
      'Armed audits (Field inspections and mandatory psych debriefs)',
      'Hostile overseers (Directors prioritize containment over civilian lives)',
    ];

    const selectedResources = sub.agencyResources || [];
    const selectedRedTape = sub.agencyRedTape || [];

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            The Professional: Agency Profile
          </span>
          <span className="text-[10px] text-amber-400/80 font-mono uppercase">2 Resources & 2 Red Tape</span>
        </div>

        {/* Resources */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-200">
            <span>Agency Resources ({selectedResources.length}/2):</span>
            <span className="text-[10px] text-neutral-400">Select 2</span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {resourceOptions.map((opt) => {
              const active = selectedResources.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() =>
                    onUpdateSubFeatures({
                      ...sub,
                      agencyResources: toggleArrayItem(sub.agencyResources, opt, 2),
                    })
                  }
                  className={`px-2 py-1 rounded text-left text-xs border transition-colors cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 font-medium'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {active && <span className="text-amber-400 text-[10px] shrink-0 ml-1">✓ Active</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Red Tape */}
        <div className="space-y-1 pt-1 border-t border-neutral-800">
          <div className="flex items-center justify-between text-[11px] font-semibold text-red-300">
            <span>Red Tape & Complications ({selectedRedTape.length}/2):</span>
            <span className="text-[10px] text-neutral-400">Select 2</span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {redTapeOptions.map((opt) => {
              const active = selectedRedTape.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() =>
                    onUpdateSubFeatures({
                      ...sub,
                      agencyRedTape: toggleArrayItem(sub.agencyRedTape, opt, 2),
                    })
                  }
                  className={`px-2 py-1 rounded text-left text-xs border transition-colors cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-red-950/40 border-red-500/60 text-red-200 font-medium'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {active && <span className="text-red-400 text-[10px] shrink-0 ml-1">⚠️ Active</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 4. THE INITIATE
  if (playbookLower === 'the initiate' || playbookLower === 'initiate') {
    const goodTraditions = [
      'Ancient Lore (Vast occult archives)',
      'Wealthy Patrons (Abundant secret funding)',
      'Hidden Chapterhouses (Sanctuaries across cities)',
      'Esoteric Relics (Vault of enchanted artifacts)',
      'Martial Training (Combat and discipline expertise)',
    ];

    const badTraditions = [
      'Dogmatic Elders (Strict hierarchy & harsh punishment)',
      'Blood Debts (Hostile sects actively hunt members)',
      'Archaic Rituals (Dangerous, elaborate casting demands)',
      'Closed Minds (Forbids modern weapons or technology)',
      'Harsh Penance (Inflicts self-harm for failures)',
    ];

    const weaponChoices = [
      { name: 'Ceremonial Broadsword', tag: 'Old-Fashioned (3-harm hand heavy)' },
      { name: 'Ritual Halberd', tag: 'Old-Fashioned (3-harm hand/close heavy)' },
      { name: 'Warded Rapier', tag: 'Old-Fashioned (2-harm hand quick piercing)' },
      { name: 'Blessed Dagger', tag: 'Old-Fashioned (2-harm hand holy)' },
      { name: 'Concealed 9mm Pistol', tag: 'Modern (2-harm close loud)' },
      { name: 'Hunting Rifle', tag: 'Modern (3-harm far loud)' },
      { name: 'Tactical Shotgun', tag: 'Modern (3-harm close reload messy)' },
    ];

    const selectedGood = sub.goodTraditions || [];
    const selectedBad = sub.badTraditions || [];
    const selectedWeapons = sub.initiateWeapons || [];

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            The Initiate: Sect Traditions & Arsenal
          </span>
          <span className="text-[10px] text-amber-400/80 font-mono uppercase">2 Good & 1 Bad</span>
        </div>

        {/* Good Traditions */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-neutral-200">
            Good Traditions ({selectedGood.length}/2):
          </span>
          <div className="flex flex-wrap gap-1">
            {goodTraditions.map((t) => {
              const active = selectedGood.includes(t);
              return (
                <button
                  key={t}
                  onClick={() =>
                    onUpdateSubFeatures({
                      ...sub,
                      goodTraditions: toggleArrayItem(sub.goodTraditions, t, 2),
                    })
                  }
                  className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                    active
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                  }`}
                >
                  {t} {active && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bad Tradition */}
        <div className="space-y-1 pt-1 border-t border-neutral-800">
          <span className="text-[11px] font-semibold text-red-300">
            Bad Tradition ({selectedBad.length}/1):
          </span>
          <div className="flex flex-wrap gap-1">
            {badTraditions.map((t) => {
              const active = selectedBad.includes(t);
              return (
                <button
                  key={t}
                  onClick={() =>
                    onUpdateSubFeatures({
                      ...sub,
                      badTraditions: [t],
                    })
                  }
                  className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                    active
                      ? 'bg-red-950/40 text-red-300 border-red-500 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                  }`}
                >
                  {t} {active && '⚠️'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Old-fashioned vs Modern Weapons */}
        <div className="space-y-1 pt-1 border-t border-neutral-800">
          <span className="text-[11px] font-semibold text-neutral-200">
            Sect Arsenal (Old-fashioned vs Modern):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {weaponChoices.map((w) => {
              const active = selectedWeapons.includes(w.name);
              return (
                <button
                  key={w.name}
                  onClick={() =>
                    onUpdateSubFeatures({
                      ...sub,
                      initiateWeapons: toggleArrayItem(sub.initiateWeapons, w.name),
                    })
                  }
                  className={`p-1.5 rounded text-left text-[11px] border cursor-pointer ${
                    active
                      ? 'bg-neutral-800 text-amber-300 border-amber-500 font-semibold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{w.name}</span>
                    {active && <span className="text-amber-400 text-[10px]">✓</span>}
                  </div>
                  <span className="text-[9px] text-neutral-500">{w.tag}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 5. THE SPOOKY
  if (playbookLower === 'the spooky' || playbookLower === 'spooky') {
    const darkSideTags = [
      'Violence',
      'Secrets',
      'Paranoia',
      'Lust',
      'Greed',
      'Hallucinations',
      'Sadism',
      'Soullessness',
      'Depraved',
      'Dark Pact',
    ];
    const selectedTags = sub.darkSideTags || ['Violence', 'Secrets', 'Paranoia'];
    const showLeverage = sub.showKeeperLeverage ?? true;

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5">
            <Skull className="w-3.5 h-3.5 text-purple-400" />
            The Spooky: Dark Side ({selectedTags.length}/3)
          </span>
          <span className="text-[10px] text-purple-400 font-mono uppercase">Psychic Burden</span>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] text-neutral-300 font-semibold">Select 3 Dark Side Tags:</span>
          <div className="flex flex-wrap gap-1">
            {darkSideTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() =>
                    onUpdateSubFeatures({
                      ...sub,
                      darkSideTags: toggleArrayItem(sub.darkSideTags, tag, 3),
                    })
                  }
                  className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                    active
                      ? 'bg-purple-950/60 text-purple-200 border-purple-500 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                  }`}
                >
                  {tag} {active && '👁️'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggleable Keeper Leverage Reminder */}
        <div className="pt-1 border-t border-neutral-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-purple-300 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Keeper Leverage Reminder
            </span>
            <button
              onClick={() =>
                onUpdateSubFeatures({
                  ...sub,
                  showKeeperLeverage: !showLeverage,
                })
              }
              className="text-[10px] text-neutral-400 hover:text-neutral-200 underline cursor-pointer"
            >
              {showLeverage ? 'Hide reminder' : 'Show reminder'}
            </button>
          </div>

          {showLeverage && (
            <div className="bg-purple-950/30 border border-purple-800/60 rounded p-2 text-[11px] text-purple-200 space-y-1.5">
              <p className="leading-relaxed">
                <strong>Keeper Leverage:</strong> The dark power that gave you your gifts has its hooks in you. When you act under pressure or roll a miss, the Keeper can invoke your tags ({selectedTags.join(', ')}) to force dark bargains, manifest terrifying illusions, or compel erratic behavior.
              </p>
              <input
                type="text"
                value={sub.keeperLeverageNote || ''}
                onChange={(e) =>
                  onUpdateSubFeatures({
                    ...sub,
                    keeperLeverageNote: e.target.value,
                  })
                }
                placeholder="Log Keeper's current demands, entity names, or pact terms..."
                className="w-full bg-neutral-950 border border-purple-900/60 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 6. THE HEX
  if (playbookLower === 'the hex' || playbookLower === 'hex') {
    const temptations = [
      'Vengeance',
      'Power',
      'Addiction',
      'Callousness',
      'Carnage',
      'Secrets',
      'Glory',
    ];

    const currentTemptation = sub.temptation || 'Power';
    const rotesList: RoteCard[] = sub.rotes || [
      {
        id: 'rote-1',
        name: 'Hex of Ruin',
        requirements: ['Incantation', 'Gestures'],
        success10: 'The target suffers 3-harm ignore-armour messy and catches fire.',
        mixed79: 'The target suffers 2-harm, but you suffer 1-harm from arcane static backlash.',
        miss6: 'The hex backfires upon you or an ally for 2-harm. Mark 1 experience.',
      },
      {
        id: 'rote-2',
        name: 'Ward of Shadows',
        requirements: ['Components', 'Focus'],
        success10: 'You and nearby allies take +2 armor against magical attacks for the scene.',
        mixed79: 'The ward provides +1 armor, but suffocates natural light in the room.',
        miss6: 'The shadows twist hostile, blinding everyone. Mark 1 experience.',
      },
    ];

    const handleSaveRote = (rote: RoteCard) => {
      const exists = rotesList.some((r) => r.id === rote.id);
      const updated = exists ? rotesList.map((r) => (r.id === rote.id ? rote : r)) : [...rotesList, rote];
      onUpdateSubFeatures({
        ...sub,
        rotes: updated,
      });
      setIsRoteModalOpen(false);
      setEditingRote(null);
    };

    const handleDeleteRote = (id: string) => {
      onUpdateSubFeatures({
        ...sub,
        rotes: rotesList.filter((r) => r.id !== id),
      });
    };

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            The Hex: Temptation & Rotes Drawer
          </span>
          <span className="text-[10px] text-amber-400/80 font-mono uppercase">Volatile Sorcery</span>
        </div>

        {/* Temptation Radios */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-neutral-200">Active Temptation (Choose 1):</span>
          <div className="flex flex-wrap gap-1">
            {temptations.map((t) => (
              <label
                key={t}
                className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer flex items-center gap-1 ${
                  currentTemptation === t
                    ? 'bg-amber-600/30 text-amber-300 border-amber-500 font-bold'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="hex-temptation"
                  checked={currentTemptation === t}
                  onChange={() => onUpdateSubFeatures({ ...sub, temptation: t })}
                  className="hidden"
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
          <span className="text-[10px] text-neutral-400 italic block">
            When you give in to your temptation, mark experience!
          </span>
        </div>

        {/* Rotes Drawer */}
        <div className="space-y-1.5 pt-1 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-300">
              Rotes Cards ({rotesList.length})
            </span>
            <button
              onClick={() => {
                setEditingRote({
                  id: 'rote-' + Date.now(),
                  name: '',
                  requirements: ['Incantation', 'Gestures'],
                  success10: '',
                  mixed79: '',
                  miss6: '',
                });
                setIsRoteModalOpen(true);
              }}
              className="px-2 py-0.5 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded text-[10px] flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Rote</span>
            </button>
          </div>

          <div className="space-y-1.5">
            {rotesList.map((rote) => (
              <div
                key={rote.id}
                className="bg-neutral-950 border border-neutral-800 rounded p-2 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-amber-200">{rote.name || 'Unnamed Rote'}</span>
                    <span className="text-[9px] px-1 bg-neutral-800 text-neutral-400 rounded">
                      Reqs: {rote.requirements.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onQuickRoll('weird', `Cast Rote: ${rote.name}`)}
                      className="px-1.5 py-0.2 bg-amber-600/30 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 border border-amber-500/50 rounded text-[10px] font-bold cursor-pointer"
                    >
                      🎲 Roll
                    </button>
                    <button
                      onClick={() => {
                        setEditingRote(rote);
                        setIsRoteModalOpen(true);
                      }}
                      className="text-neutral-400 hover:text-white px-1 text-[10px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRote(rote.id)}
                      className="text-neutral-500 hover:text-red-400 px-1 text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1 text-[10px] text-neutral-300">
                  <div className="bg-emerald-950/30 p-1 rounded border border-emerald-900/40">
                    <strong className="text-emerald-400">10+: </strong>
                    {rote.success10}
                  </div>
                  <div className="bg-yellow-950/30 p-1 rounded border border-yellow-900/40">
                    <strong className="text-yellow-400">7–9: </strong>
                    {rote.mixed79}
                  </div>
                  <div className="bg-red-950/30 p-1 rounded border border-red-900/40">
                    <strong className="text-red-400">Miss: </strong>
                    {rote.miss6}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Add / Edit Rote */}
        {isRoteModalOpen && editingRote && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 animate-in fade-in duration-150">
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-3 w-full max-w-sm space-y-2 text-neutral-100 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                <span className="font-bold text-xs text-amber-300">Add / Edit Rote Card</span>
                <button
                  onClick={() => setIsRoteModalOpen(false)}
                  className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <div>
                  <label className="text-[10px] text-neutral-400 block">Rote Name:</label>
                  <input
                    type="text"
                    value={editingRote.name}
                    onChange={(e) => setEditingRote({ ...editingRote, name: e.target.value })}
                    placeholder="e.g. Abyssal Fireball"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-2 py-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 block">
                    Requirements (Select 2):
                  </label>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {['Incantation', 'Gestures', 'Components', 'Focus'].map((req) => {
                      const active = editingRote.requirements.includes(req);
                      return (
                        <button
                          key={req}
                          type="button"
                          onClick={() => {
                            const updated = toggleArrayItem(editingRote.requirements, req, 2);
                            setEditingRote({ ...editingRote, requirements: updated });
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                            active
                              ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                              : 'bg-neutral-950 text-neutral-400 border-neutral-700'
                          }`}
                        >
                          {req}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-400 block font-semibold">10+ Outcome:</label>
                  <textarea
                    rows={2}
                    value={editingRote.success10}
                    onChange={(e) => setEditingRote({ ...editingRote, success10: e.target.value })}
                    placeholder="Effect on full success (10+)..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-yellow-400 block font-semibold">7–9 Outcome:</label>
                  <textarea
                    rows={2}
                    value={editingRote.mixed79}
                    onChange={(e) => setEditingRote({ ...editingRote, mixed79: e.target.value })}
                    placeholder="Effect with complication or backlash (7-9)..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-red-400 block font-semibold">Miss Outcome:</label>
                  <textarea
                    rows={2}
                    value={editingRote.miss6}
                    onChange={(e) => setEditingRote({ ...editingRote, miss6: e.target.value })}
                    placeholder="Backlash or failure text on miss (6 or less)..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-1 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-neutral-800">
                <button
                  onClick={() => setIsRoteModalOpen(false)}
                  className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveRote(editingRote)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded text-xs cursor-pointer shadow"
                >
                  Save Rote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 7. THE CURSE-EATER
  if (playbookLower === 'the curse-eater' || playbookLower === 'curse-eater') {
    const currentCorruption = sub.corruption ?? 0;

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5">
            <Skull className="w-3.5 h-3.5 text-purple-400" />
            The Curse-Eater: Corruption Track & Ledger
          </span>
          <span className="text-[10px] text-purple-400 font-mono uppercase">
            {currentCorruption}/5 Corruption
          </span>
        </div>

        {/* 5-box Corruption Track */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-neutral-200">Corruption Track:</span>
            <span className="text-[10px] text-neutral-400">
              {currentCorruption >= 3 ? '🔥 High (+1 Tough, +1 Melee Harm)' : 'Controlled'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((num) => {
              const marked = currentCorruption >= num;
              return (
                <button
                  key={num}
                  onClick={() => {
                    const next = currentCorruption === num ? num - 1 : num;
                    onUpdateSubFeatures({ ...sub, corruption: Math.max(0, Math.min(5, next)) });
                  }}
                  className={`flex-1 py-1.5 rounded flex items-center justify-center border font-mono font-bold text-xs transition-colors cursor-pointer ${
                    marked
                      ? 'bg-purple-600 border-purple-400 text-white shadow-xs'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-500 hover:border-neutral-700'
                  }`}
                  title={`Corruption Box ${num}`}
                >
                  {marked ? '☠' : num}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400">
            <span>Box 1–2: Minor taint</span>
            <span>Box 3–4: Feel the Burn</span>
            <span>Box 5: Overflow peril!</span>
          </div>
        </div>

        {/* Consumed Magic Ledger */}
        <div className="space-y-2 pt-1 border-t border-neutral-800">
          <span className="text-[11px] font-semibold text-neutral-200 block">
            Consumed Magic Ledger:
          </span>

          <div className="space-y-1.5 text-xs">
            <div>
              <label className="text-[10px] text-neutral-400 block font-semibold">
                Absorbed Curses:
              </label>
              <input
                type="text"
                value={sub.absorbedCurses || ''}
                onChange={(e) => onUpdateSubFeatures({ ...sub, absorbedCurses: e.target.value })}
                placeholder="e.g. Vampiric blood taint, Ancient tomb rot, Cursed mirror hex..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 block font-semibold">
                Powers Gained:
              </label>
              <input
                type="text"
                value={sub.absorbedPowers || ''}
                onChange={(e) => onUpdateSubFeatures({ ...sub, absorbedPowers: e.target.value })}
                placeholder="e.g. Shadow-slip, Wall-crawl, Black witchfire blast..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 block font-semibold">
                Downsides & Twists:
              </label>
              <input
                type="text"
                value={sub.absorbedDownsides || ''}
                onChange={(e) => onUpdateSubFeatures({ ...sub, absorbedDownsides: e.target.value })}
                placeholder="e.g. Animals fear you, Ice-cold touch, Bleeding eyes under moonlight..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 8. THE PARAROMANTIC
  if (playbookLower === 'the pararomantic' || playbookLower === 'pararomantic') {
    const statuses = [
      { id: 0, label: 'Loving', desc: 'Harmonious — Lover risks all for you' },
      { id: 1, label: 'Strained', desc: 'Tension — Emotional friction between worlds' },
      { id: 2, label: 'Rocky', desc: 'Conflict — Competing instincts clash' },
      { id: 3, label: 'Bitter', desc: 'Rift — Heartbreak and broken promises' },
      { id: 4, label: 'Broken', desc: 'Hostile — Former lover turns dangerous' },
    ];

    const currentStatus = sub.relationshipStatus ?? 0;
    const giftTypes = ['Body part', 'Jewelry', 'Memento', 'Antique weapon'];

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-pink-400">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
            The Pararomantic: Relationship & Guide
          </span>
          <span className="text-[10px] text-pink-400 font-mono uppercase">
            Status: {statuses[currentStatus]?.label || 'Loving'}
          </span>
        </div>

        {/* 5-box Relationship Status Track */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-neutral-200">Relationship Status Track:</span>
            <span className="text-[10px] text-pink-300 font-medium">
              {statuses[currentStatus]?.desc}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {statuses.map((s) => {
              const active = currentStatus === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onUpdateSubFeatures({ ...sub, relationshipStatus: s.id })}
                  className={`flex-1 py-1 rounded text-center text-xs font-bold border transition-colors cursor-pointer ${
                    active
                      ? s.id === 0
                        ? 'bg-pink-600 border-pink-400 text-white'
                        : s.id <= 2
                        ? 'bg-amber-600 border-amber-400 text-white'
                        : 'bg-red-700 border-red-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-[10px] block">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guide Archetype & Gift Selector */}
        <div className="space-y-2 pt-1 border-t border-neutral-800 text-xs">
          <div>
            <label className="text-[10px] text-neutral-400 block font-semibold">
              Supernatural Guide Archetype:
            </label>
            <input
              type="text"
              value={sub.guideArchetype || ''}
              onChange={(e) => onUpdateSubFeatures({ ...sub, guideArchetype: e.target.value })}
              placeholder="e.g. Ancient Vampire Lord, Werewolf Alpha, Fae Prince, Demonic Consort..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-[10px] text-neutral-400 block font-semibold">
              Lover's Gift Type:
            </label>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {giftTypes.map((gt) => (
                <button
                  key={gt}
                  type="button"
                  onClick={() => onUpdateSubFeatures({ ...sub, guideGiftType: gt })}
                  className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                    sub.guideGiftType === gt
                      ? 'bg-pink-950/60 text-pink-300 border-pink-500 font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                  }`}
                >
                  {gt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] text-neutral-400 block font-semibold">
              Gift Details & Enchantment:
            </label>
            <input
              type="text"
              value={sub.guideGiftDesc || ''}
              onChange={(e) => onUpdateSubFeatures({ ...sub, guideGiftDesc: e.target.value })}
              placeholder="e.g. Silver ring that warms near danger; Preserved claw talisman..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>
      </div>
    );
  }

  // 9. THE MONSTROUS
  if (playbookLower === 'the monstrous' || playbookLower === 'monstrous') {
    const curses = [
      { id: 'Feed', desc: 'Feed (Craves fresh human blood, raw flesh, or souls)' },
      { id: 'Vulnerability', desc: 'Vulnerability (Takes lethal harm from Silver, Fire, or Holy water)' },
      { id: 'Pure Drive', desc: 'Pure Drive (Primal fury demands slaughter when cornered)' },
      { id: 'Dark Master', desc: 'Dark Master (Bound to serve an ancient demon or coven)' },
    ];

    const bases = [
      { id: 'teeth', name: 'Teeth', harm: 3, range: 'intimate', label: 'teeth (3-harm intimate)' },
      { id: 'claws', name: 'Claws', harm: 2, range: 'hand', label: 'claws (2-harm hand)' },
      { id: 'magical force', name: 'Magical force', harm: 1, range: 'magical close', label: 'magical force (1-harm magical close)' },
      { id: 'life-drain', name: 'Life-drain', harm: 1, range: 'intimate life-drain', label: 'life-drain (1-harm intimate life-drain)' },
    ];

    const extrasList = [
      { id: '+1 harm', label: 'Add +1 harm to a base' },
      { id: 'ignore-armour', label: 'Add ignore-armour to a base' },
      { id: 'extra range', label: 'Add an extra range to a base (add intimate, hand, or close)' },
    ];

    const selectedCurse = sub.monstrousCurse || 'Feed';

    // Parse selected bases (support naturalAttackBases array or fallback to naturalAttackBase)
    const selectedBases: string[] = Array.isArray(sub.naturalAttackBases) && sub.naturalAttackBases.length > 0
      ? sub.naturalAttackBases
      : sub.naturalAttackBase
      ? [sub.naturalAttackBase.toLowerCase()]
      : ['claws'];

    const selectedExtras: string[] = sub.naturalAttackExtras || [];
    const selectedExtraRange: string = sub.naturalAttackExtraRange || 'close';

    const handleToggleBase = (baseId: string) => {
      const lower = baseId.toLowerCase();
      let nextBases: string[];
      if (selectedBases.includes(lower)) {
        if (selectedBases.length > 1) {
          nextBases = selectedBases.filter((b) => b !== lower);
        } else {
          // Keep at least 1 base or allow toggling to another
          nextBases = [lower];
        }
      } else {
        if (selectedBases.length === 0) {
          nextBases = [lower];
        } else if (selectedBases.length === 1) {
          // Switch to Mode B (2 Bases)
          nextBases = [selectedBases[0], lower];
        } else {
          // Already 2 bases, replace the second base
          nextBases = [selectedBases[0], lower];
        }
      }

      // Selection Constraints:
      // Mode B (2 Bases) => disable all extras, clear extras array
      // Mode A (1 Base) => allow 1 extra
      const nextExtras = nextBases.length === 2 ? [] : selectedExtras.slice(0, 1);

      const updatedSub = {
        ...sub,
        naturalAttackBase: nextBases[0] || 'claws',
        naturalAttackBases: nextBases,
        naturalAttackExtras: nextExtras,
      };

      onUpdateSubFeatures(updatedSub);
      if (onUpdateHunter) {
        onUpdateHunter({
          ...hunter,
          subFeatures: updatedSub,
        });
      }
    };

    const handleToggleExtra = (extraId: string) => {
      // If 2 bases selected, extras are strictly disabled (0 extras allowed)
      if (selectedBases.length >= 2) return;

      let nextExtras: string[];
      if (selectedExtras.includes(extraId)) {
        nextExtras = [];
      } else {
        // Mode A: Allow exactly 1 Extra. Replace previous selection.
        nextExtras = [extraId];
      }

      const updatedSub = {
        ...sub,
        naturalAttackExtras: nextExtras,
      };

      onUpdateSubFeatures(updatedSub);
      if (onUpdateHunter) {
        onUpdateHunter({
          ...hunter,
          subFeatures: updatedSub,
        });
      }
    };

    const handleSelectExtraRange = (rangeVal: string) => {
      const updatedSub = {
        ...sub,
        naturalAttackExtraRange: rangeVal,
      };
      onUpdateSubFeatures(updatedSub);
      if (onUpdateHunter) {
        onUpdateHunter({
          ...hunter,
          subFeatures: updatedSub,
        });
      }
    };

    // Live natural attack profile summary generator
    const getSummary = () => {
      if (selectedBases.length === 0) return 'No base attack selected';

      // Mode B: 2 Bases
      if (selectedBases.length === 2) {
        const b1 = bases.find((b) => b.id.toLowerCase() === selectedBases[0].toLowerCase());
        const b2 = bases.find((b) => b.id.toLowerCase() === selectedBases[1].toLowerCase());
        const b1Text = b1 ? `${b1.name} (${b1.label.replace(/^.*?\((.*)\)$/, '$1')})` : selectedBases[0];
        const b2Text = b2 ? `${b2.name} (${b2.label.replace(/^.*?\((.*)\)$/, '$1')})` : selectedBases[1];
        return `${b1Text} & ${b2Text}`;
      }

      // Mode A: 1 Base + exactly 1 Extra
      const b = bases.find((base) => base.id.toLowerCase() === selectedBases[0].toLowerCase()) || bases[0];
      const baseStatInside = b.label.replace(/^.*?\((.*)\)$/, '$1');
      const activeExtra = selectedExtras[0];

      if (!activeExtra) {
        return `${b.name}: ${baseStatInside} (Pick 1 Extra, or pick a 2nd Base)`;
      }

      if (activeExtra === '+1 harm') {
        const boostedHarm = b.harm + 1;
        return `${b.name}: ${boostedHarm}-harm ${b.range} (+1 harm)`;
      }

      if (activeExtra === 'ignore-armour') {
        return `${b.name}: ${baseStatInside} + ignore-armour`;
      }

      if (activeExtra === 'extra range') {
        return `${b.name}: ${baseStatInside} + extra range (${selectedExtraRange})`;
      }

      return `${b.name}: ${baseStatInside} + ${activeExtra}`;
    };

    const isModeB = selectedBases.length === 2;
    const isExtraRangeActive = !isModeB && selectedExtras.includes('extra range');

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-red-400">
          <span className="flex items-center gap-1.5">
            <Skull className="w-3.5 h-3.5 text-red-500" />
            The Monstrous: Curse & Natural Attacks
          </span>
          <span className="text-[10px] text-red-400/80 font-mono uppercase">
            {isModeB ? 'Mode B: 2 Bases' : 'Mode A: 1 Base + 1 Extra'}
          </span>
        </div>

        {/* Curse Selection (Pick 1) */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-neutral-200">Monstrous Curse (Pick 1):</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {curses.map((c) => (
              <label
                key={c.id}
                className={`p-1.5 rounded text-xs border cursor-pointer flex items-center justify-between transition-colors ${
                  selectedCurse === c.id
                    ? 'bg-red-950/40 text-red-200 border-red-500 font-bold'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name="monstrous-curse"
                    checked={selectedCurse === c.id}
                    onChange={() => onUpdateSubFeatures({ ...sub, monstrousCurse: c.id })}
                    className="accent-red-500"
                  />
                  <span className="text-[11px]">{c.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Natural Attacks Builder with Strict Validation */}
        <div className="space-y-2 pt-1 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-red-300">
              Natural Attacks Builder: Pick a Base and 1 Extra, OR Two Bases
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              Bases: {selectedBases.length}/2 | Extras: {selectedExtras.length}/{isModeB ? 0 : 1}
            </span>
          </div>

          {/* Rule constraints banner */}
          <div className="text-[10px] p-1.5 rounded bg-neutral-950/70 border border-neutral-800 flex items-center justify-between text-neutral-300">
            <span>
              {isModeB ? (
                <strong className="text-amber-400">
                  Mode B active: 2 Bases selected. All Extras disabled (0 extras allowed).
                </strong>
              ) : (
                <span>
                  <strong className="text-red-400">Mode A active:</strong> 1 Base selected. You may choose <strong>exactly 1 Extra</strong>.
                </span>
              )}
            </span>
          </div>

          {/* Base selector (Pick 1 or 2) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase font-semibold">
              <span>Bases Available ({selectedBases.length}/2 selected):</span>
              <span>Click to toggle</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {bases.map((b) => {
                const isSelected = selectedBases.includes(b.id.toLowerCase());
                return (
                  <button
                    key={b.id}
                    onClick={() => handleToggleBase(b.id)}
                    className={`px-2 py-1.5 rounded text-left text-[11px] border cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-red-950/60 text-red-200 border-red-500 font-bold shadow-xs'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span>{b.label}</span>
                    <span className="text-[10px] font-mono">
                      {isSelected ? '✓ Base' : '+ Select'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extras selector (Disabled if 2 bases selected; exactly 1 allowed if 1 base) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase font-semibold">
              <span>Extras Available (1 allowed if 1 Base; 0 if 2 Bases):</span>
              {isModeB && <span className="text-amber-400 font-normal">Disabled (2 bases chosen)</span>}
            </div>
            <div className="grid grid-cols-1 gap-1">
              {extrasList.map((ex) => {
                const isActive = !isModeB && selectedExtras.includes(ex.id);
                return (
                  <button
                    key={ex.id}
                    disabled={isModeB}
                    onClick={() => handleToggleExtra(ex.id)}
                    className={`px-2 py-1 rounded text-left text-[11px] border transition-colors flex items-center justify-between ${
                      isModeB
                        ? 'bg-neutral-950/40 text-neutral-600 border-neutral-900 cursor-not-allowed opacity-50'
                        : isActive
                        ? 'bg-red-600/30 text-red-200 border-red-500 font-bold shadow-xs cursor-pointer'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 cursor-pointer'
                    }`}
                  >
                    <span>{ex.label}</span>
                    <span className="text-[10px] font-mono">
                      {isModeB ? 'Disabled' : isActive ? '✓ Extra' : '+ Pick Extra'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Extra Range Sub-Selector if "extra range" is selected */}
            {isExtraRangeActive && (
              <div className="p-1.5 rounded bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-[10px]">
                <span className="text-neutral-400 font-semibold uppercase">Choose extra range:</span>
                <div className="flex items-center gap-1">
                  {(['intimate', 'hand', 'close'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleSelectExtraRange(r)}
                      className={`px-2 py-0.5 rounded border transition-colors cursor-pointer capitalize ${
                        selectedExtraRange === r
                          ? 'bg-red-600 text-white font-bold border-red-500'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Live Resulting Natural Attack Profile Summary */}
          <div className="bg-neutral-950 border border-red-500/50 rounded-lg p-2 text-xs space-y-0.5">
            <span className="text-[10px] text-neutral-400 block uppercase font-mono tracking-wider">
              Resulting Natural Attack Profile:
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-red-300 font-mono font-bold text-sm tracking-tight truncate">
                {getSummary()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 10. THE ACTION SCIENTIST
  if (playbookLower === 'the action scientist' || playbookLower === 'action scientist') {
    const areasOfStudy = [
      {
        id: 'physics-cosmology',
        name: 'Physics and Cosmology',
        icon: '🌌',
        effect: 'Notice reality alterations. Grants 3 bonus investigate questions (What direction is the source? Is this static or changing? What equipment would tell me more?).',
      },
      {
        id: 'biology-chemistry',
        name: 'Biology and Chemistry',
        icon: '🧪',
        effect: 'Examine mysterious substances to determine biological/non-biological and mundane/supernatural/extraterrestrial/extra-dimensional origin.',
      },
      {
        id: 'neurology-psychology',
        name: 'Neurology and Psychology',
        icon: '🧠',
        stat: 'sharp' as StatType,
        effect: 'Assess motives with roll +Sharp (10+: human and alignment; 7-9: something off; miss: reveal too much).',
      },
      {
        id: 'computers-electronics',
        name: 'Computers and Electronics',
        icon: '💻',
        stat: 'cool' as StatType,
        effect: 'Hack/reprogram systems with roll +Cool (10+: full access/change; 7-9: delay or unexpected event; miss: catastrophe).',
      },
      {
        id: 'violence',
        name: 'Violence',
        icon: '⚡',
        effect: 'Roll +Sharp to kick some ass instead of +Tough. On scientific attacks: deal +1 harm or take +1 forward.',
      },
      {
        id: 'mechanics-engineering',
        name: 'Mechanics and Engineering',
        icon: '🔧',
        effect: 'Repair machines rapidly without full tools. Combine any two devices into one hybrid gadget.',
      },
      {
        id: 'space',
        name: 'Space',
        icon: '🚀',
        effect: '+1 ongoing with rocketry/astronaut tasks; access to a space launch facility and spacecraft.',
      },
    ];

    const hasSecondAreaAdvancement = Boolean(
      (hunter.maxAreasOfStudy && hunter.maxAreasOfStudy >= 2) ||
      (hunter.takenImprovements && hunter.takenImprovements.some(i => i.toLowerCase().includes('second area of study') || i.toLowerCase().includes('add a second area'))) ||
      (hunter.advancementsTaken && hunter.advancementsTaken.some(i => i.toLowerCase().includes('second area of study') || i.toLowerCase().includes('add a second area'))) ||
      (hunter.improvementsTaken && hunter.improvementsTaken.some(i => i.toLowerCase().includes('second area of study') || i.toLowerCase().includes('add a second area')))
    );

    const maxDisciplines = hasSecondAreaAdvancement ? 2 : 1;

    // Parse active focuses
    const currentFocuses: string[] = sub.actionScientistFocuses && sub.actionScientistFocuses.length > 0
      ? sub.actionScientistFocuses
      : (hunter.actionScientistFocus || sub.actionScientistFocus || 'Physics and Cosmology')
          .split(/,\s*/)
          .filter(Boolean);

    const handleToggleFocus = (focusName: string) => {
      let nextFocuses: string[];
      if (currentFocuses.includes(focusName)) {
        if (currentFocuses.length > 1) {
          nextFocuses = currentFocuses.filter((f) => f !== focusName);
        } else {
          nextFocuses = [focusName];
        }
      } else {
        if (maxDisciplines === 1) {
          nextFocuses = [focusName];
        } else if (currentFocuses.length < maxDisciplines) {
          nextFocuses = [...currentFocuses, focusName];
        } else {
          nextFocuses = [currentFocuses[currentFocuses.length - 1], focusName];
        }
      }

      const focusString = nextFocuses.join(', ');
      const updatedSub = {
        ...sub,
        actionScientistFocus: focusString,
        actionScientistFocuses: nextFocuses,
      };
      onUpdateSubFeatures(updatedSub);
      if (onUpdateHunter) {
        onUpdateHunter({
          ...hunter,
          maxAreasOfStudy: maxDisciplines,
          actionScientistFocus: focusString,
          subFeatures: updatedSub,
        });
      }
    };

    const activeAreaObjs = areasOfStudy.filter((a) => currentFocuses.includes(a.name));

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            The Action Scientist: Area of Study
          </span>
          <span className="text-[10px] text-cyan-400/80 font-mono uppercase">
            {maxDisciplines === 2 ? '⭐ 2 Disciplines Unlocked' : 'Pick One Specialization'}
          </span>
        </div>

        <p className="text-[11px] text-neutral-400">
          Select your {maxDisciplines === 2 ? 'up to 2 disciplines' : 'primary discipline'}. Your Area of Study grants unique analytical tools, bonus investigative options, or supernatural countermeasures.
          {maxDisciplines === 2 && ' (Advanced Improvement active: second area of study unlocked!).'}
        </p>

        {/* 7 Area of Study Selection Cards */}
        <div className="space-y-1.5">
          {areasOfStudy.map((area) => {
            const isSelected = currentFocuses.includes(area.name);
            return (
              <label
                key={area.id}
                onClick={() => handleToggleFocus(area.name)}
                className={`p-2 rounded-lg border text-left transition-colors cursor-pointer block ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/70 text-cyan-100 shadow-xs'
                    : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type={maxDisciplines > 1 ? 'checkbox' : 'radio'}
                      name="action-scientist-focus"
                      checked={isSelected}
                      onChange={() => handleToggleFocus(area.name)}
                      className="accent-cyan-400 shrink-0 mt-0.5"
                    />
                    <span className="text-base leading-none">{area.icon}</span>
                    <span className={`text-xs font-bold ${isSelected ? 'text-cyan-200' : 'text-neutral-200'}`}>
                      {area.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {area.stat && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-neutral-800 text-cyan-300 rounded font-mono font-bold">
                        +{area.stat}
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[10px] text-cyan-400 font-bold">✓ Active Focus</span>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-neutral-300 mt-1 pl-6 leading-relaxed">
                  {area.effect}
                </p>

                {isSelected && area.stat && (
                  <div className="mt-2 pl-6 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickRoll(area.stat!, `${area.name}: Research Roll`);
                      }}
                      className="px-2 py-0.5 bg-cyan-600/30 hover:bg-cyan-500 text-cyan-200 hover:text-neutral-950 border border-cyan-500/60 rounded text-[10px] font-bold cursor-pointer transition-colors"
                    >
                      🎲 Roll +{area.stat.toUpperCase()} ({area.name})
                    </button>
                  </div>
                )}
              </label>
            );
          })}
        </div>

        {/* Active Focus Callout Card */}
        <div className="bg-neutral-950 border border-cyan-500/40 rounded p-2 text-xs space-y-1">
          <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase font-mono">
            <span>Saved on Hunter Record ({currentFocuses.length}/{maxDisciplines} active):</span>
            <span className="text-cyan-400 font-bold">{currentFocuses.join(', ')}</span>
          </div>
          {activeAreaObjs.map((ao) => (
            <p key={ao.id} className="text-[11px] text-cyan-200">
              {ao.icon} <strong>{ao.name}:</strong> {ao.effect}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // 11. ALL OTHER PLAYBOOKS (Generic Special Features & Scratchpad)
  const currentDef = PLAYBOOKS.find(
    (p) => p.name.toLowerCase() === hunter.playbook.toLowerCase() || p.id === hunter.playbook.toLowerCase()
  );

  const checklistItems = sub.genericChecklist || [];

  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    onUpdateSubFeatures({
      ...sub,
      genericChecklist: [...checklistItems, newChecklistText.trim()],
    });
    setNewChecklistText('');
  };

  const handleRemoveChecklistItem = (index: number) => {
    onUpdateSubFeatures({
      ...sub,
      genericChecklist: checklistItems.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-xs">
      <div className="flex items-center justify-between text-xs font-bold text-amber-300">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {hunter.playbook} Features & Assets Scratchpad
        </span>
        <span className="text-[10px] text-amber-400/80 font-mono uppercase">Special Features</span>
      </div>

      {/* If subMechanics definition exists from playbooks data */}
      {currentDef?.subMechanics && (
        <div className="space-y-1.5 bg-neutral-950/70 p-2 rounded border border-neutral-800">
          <span className="text-[11px] font-bold text-amber-200">
            {currentDef.subMechanics.title}
          </span>
          <p className="text-[10px] text-neutral-300 leading-relaxed">
            {currentDef.subMechanics.description}
          </p>

          {currentDef.subMechanics.options && (
            <div className="flex flex-wrap gap-1 pt-1">
              {currentDef.subMechanics.options.map((opt, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300"
                >
                  {opt}
                </span>
              ))}
            </div>
          )}


        </div>
      )}

      {/* Interactive Feature Checklist */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-200">
          <span>Active Features & Assets:</span>
          <span className="text-[10px] text-neutral-400">{checklistItems.length} logged</span>
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={newChecklistText}
            onChange={(e) => setNewChecklistText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddChecklistItem();
              }
            }}
            placeholder="Add custom asset, contact, specialty, or condition..."
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleAddChecklistItem}
            className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded text-xs cursor-pointer shadow-xs"
          >
            Add
          </button>
        </div>

        {checklistItems.length > 0 && (
          <div className="space-y-1 pt-1">
            {checklistItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral-950/90 border border-neutral-800 rounded px-2 py-1 text-xs flex items-center justify-between text-neutral-300"
              >
                <span>• {item}</span>
                <button
                  onClick={() => handleRemoveChecklistItem(idx)}
                  className="text-neutral-500 hover:text-red-400 text-xs px-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scratchpad textarea */}
      <div className="space-y-1 pt-1 border-t border-neutral-800">
        <span className="text-[10px] text-neutral-400 uppercase font-semibold">
          Playbook Scratchpad & Special Notes:
        </span>
        <textarea
          rows={2}
          value={sub.genericNotes || ''}
          onChange={(e) => onUpdateSubFeatures({ ...sub, genericNotes: e.target.value })}
          placeholder="Log special tags, secrets, patron favors, or unique equipment..."
          className="w-full bg-neutral-950 border border-neutral-800 rounded p-1.5 text-xs text-neutral-200 placeholder-neutral-500 resize-none focus:outline-none focus:border-amber-500 leading-relaxed"
        />
      </div>
    </div>
  );
};
