import React from 'react';
import { Pin, PinOff } from 'lucide-react';

interface NavigationProps {
  activeTab: 'hunter' | 'dice' | 'grimoire' | 'notes';
  setActiveTab: (tab: 'hunter' | 'dice' | 'grimoire' | 'notes') => void;
  role: 'GM' | 'PLAYER';
  onToggleRole?: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  role,
  onToggleRole,
  isPinned,
  onTogglePin,
}) => {
  return (
    <header className="sticky top-0 h-11 shrink-0 z-40 bg-neutral-900 border-b border-neutral-800 px-2 flex items-center justify-between gap-1 select-none">
      {/* 4 compact icon tabs on a single line with zero horizontal scrollbars */}
      <nav className="flex items-center gap-1 overflow-hidden">
        <button
          onClick={() => setActiveTab('hunter')}
          className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap ${
            activeTab === 'hunter'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
          }`}
          title="Hunter Sheet"
        >
          <span>🏹</span>
          <span>Hunter</span>
        </button>

        <button
          onClick={() => setActiveTab('dice')}
          className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap ${
            activeTab === 'dice'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
          }`}
          title="Dice Tray"
        >
          <span>🎲</span>
          <span>Dice</span>
        </button>

        <button
          onClick={() => setActiveTab('grimoire')}
          className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap ${
            activeTab === 'grimoire'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
          }`}
          title="Grimoire & Moves Reference"
        >
          <span>📖</span>
          <span>Grimoire</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap ${
            activeTab === 'notes'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
          }`}
          title="Notes & Broadcast"
        >
          <span>📝</span>
          <span>Notes</span>
        </button>
      </nav>

      {/* Right side: Compact role badge & Pin toggle */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onToggleRole}
          title={
            role === 'GM'
              ? 'Role: Keeper (GM) - Click to toggle preview role'
              : 'Role: Hunter (Player) - Click to toggle preview role'
          }
          className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 border transition-colors cursor-pointer ${
            role === 'GM'
              ? 'bg-amber-950/80 text-amber-300 border-amber-600/60 hover:bg-amber-900/80'
              : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
          }`}
        >
          <span>{role === 'GM' ? '👑 Keeper' : '🏹 Hunter'}</span>
        </button>

        <button
          onClick={onTogglePin}
          title={isPinned ? 'Window Pinned (Click away won’t close)' : 'Window Unpinned (Click away closes)'}
          className={`w-7 h-7 flex items-center justify-center rounded border transition-colors cursor-pointer ${
            isPinned
              ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm shadow-amber-950'
              : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200 hover:bg-neutral-700'
          }`}
          aria-label={isPinned ? 'Unpin popover' : 'Pin popover'}
        >
          {isPinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};
