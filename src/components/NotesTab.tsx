import React, { useState } from 'react';
import { CaseNote, CountdownStep } from '../types/motw';
import { COUNTDOWN_STAGES } from '../data/motwMoves';
import { Plus, Trash2, Clock, Check, FileText, AlertTriangle } from 'lucide-react';

interface NotesTabProps {
  countdown: CountdownStep[];
  setCountdown: React.Dispatch<React.SetStateAction<CountdownStep[]>>;
  notes: CaseNote[];
  setNotes: React.Dispatch<React.SetStateAction<CaseNote[]>>;
}

export const NotesTab: React.FC<NotesTabProps> = ({
  countdown,
  setCountdown,
  notes,
  setNotes,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'countdown' | 'notes'>('countdown');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<CaseNote['category']>('lead');

  const toggleCountdownStep = (index: number) => {
    setCountdown((prev) =>
      prev.map((step, i) => (i === index ? { ...step, completed: !step.completed } : step))
    );
  };

  const handleUpdateCountdownDesc = (index: number, text: string) => {
    setCountdown((prev) =>
      prev.map((step, i) => (i === index ? { ...step, description: text } : step))
    );
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;

    const newNote: CaseNote = {
      id: `${Date.now()}-${Math.random()}`,
      title: newNoteTitle.trim() || 'Untitled Note',
      category: newNoteCategory,
      content: newNoteContent.trim(),
      updatedAt: Date.now(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {/* Subtab Toggle */}
      <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
        <button
          onClick={() => setActiveSubTab('countdown')}
          className={`flex-1 py-1 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeSubTab === 'countdown'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" /> Mystery Countdown
        </button>
        <button
          onClick={() => setActiveSubTab('notes')}
          className={`flex-1 py-1 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeSubTab === 'notes'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Casebook ({notes.length})
        </button>
      </div>

      {activeSubTab === 'countdown' ? (
        /* Mystery Countdown Tracker */
        <div className="space-y-2">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5">
            <h4 className="text-xs font-bold text-neutral-200 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Doomsday Clock (What happens if hunters don't intervene)
            </h4>
            <p className="text-[11px] text-neutral-400">
              Track the terrible escalation of the monster's scheme step by step.
            </p>
          </div>

          <div className="space-y-1.5">
            {countdown.map((step, idx) => {
              const stageMeta = COUNTDOWN_STAGES[idx];
              return (
                <div
                  key={step.stage}
                  className={`p-2 rounded-lg border transition-all ${
                    step.completed
                      ? 'bg-rose-950/30 border-rose-800/80'
                      : 'bg-neutral-900 border-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <button
                      onClick={() => toggleCountdownStep(idx)}
                      className={`flex items-center gap-1.5 text-xs font-bold ${
                        step.completed ? 'text-rose-400 line-through' : 'text-amber-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                          step.completed
                            ? 'bg-rose-600 border-rose-500 text-white'
                            : 'border-neutral-700 bg-neutral-950 text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                      <span>
                        {idx + 1}. {step.stage}
                      </span>
                    </button>
                    <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-wider">
                      {step.completed ? 'TRIGGERED' : 'PENDING'}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => handleUpdateCountdownDesc(idx, e.target.value)}
                    placeholder={stageMeta ? stageMeta.desc : 'What happens at this stage?'}
                    className="w-full bg-neutral-950/70 border border-neutral-800/90 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/80"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Casebook & Clues Notes */
        <div className="space-y-3">
          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-2">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Clue, NPC, or Location title..."
                className="flex-1 bg-neutral-950 border border-neutral-700/80 rounded px-2 py-1 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              />
              <select
                value={newNoteCategory}
                onChange={(e) => setNewNoteCategory(e.target.value as CaseNote['category'])}
                aria-label="Note category"
                className="bg-neutral-950 border border-neutral-700/80 rounded px-1.5 py-1 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
              >
                <option value="lead">Lead</option>
                <option value="monster">Monster</option>
                <option value="bystander">Bystander</option>
                <option value="location">Location</option>
                <option value="general">General</option>
              </select>
            </div>

            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Case details, weaknesses, quotes, notes..."
              rows={2}
              className="w-full bg-neutral-950 border border-neutral-700/80 rounded px-2 py-1 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Save Note
              </button>
            </div>
          </form>

          {/* Notes List */}
          <div className="space-y-1.5">
            {notes.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-500">
                No case notes yet. Add your first clue, monster weakness, or NPC lead above.
              </div>
            ) : (
              notes.map((n) => (
                <div
                  key={n.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                          n.category === 'monster'
                            ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                            : n.category === 'lead'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                            : n.category === 'bystander'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                            : n.category === 'location'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                        }`}
                      >
                        {n.category}
                      </span>
                      <h5 className="text-xs font-bold text-neutral-200">{n.title}</h5>
                    </div>
                    <button
                      onClick={() => handleDeleteNote(n.id)}
                      className="text-neutral-500 hover:text-rose-400 p-0.5"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {n.content && (
                    <p className="text-xs text-neutral-300 whitespace-pre-wrap">{n.content}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
