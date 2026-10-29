import React, { useState } from 'react';
import type { CaseData, CorkboardNote, CorkboardConnection } from '../types/game';
import { REAL_ASSETS } from '../data/assetsManifest';
import { detectiveAudio } from '../utils/audio';
import { Pin, Plus, Trash2, Link2, Sparkles } from 'lucide-react';

interface DetectiveCorkboardViewProps {
  caseData: CaseData;
  pinnedItems: Array<{ id: string; type: 'suspect' | 'evidence'; title: string; image: string; subtitle: string }>;
  onUnpinItem: (id: string) => void;
  connections: CorkboardConnection[];
  onAddConnection: (fromId: string, toId: string) => void;
  onRemoveConnection: (id: string) => void;
  playerNotes: CorkboardNote[];
  onAddPlayerNote: (note: CorkboardNote) => void;
  onDeletePlayerNote: (id: string) => void;
}

export const DetectiveCorkboardView: React.FC<DetectiveCorkboardViewProps> = ({
  caseData,
  pinnedItems,
  onUnpinItem,
  connections,
  onAddConnection,
  onRemoveConnection,
  playerNotes,
  onAddPlayerNote,
  onDeletePlayerNote,
}) => {
  const [selectedForConnect, setSelectedForConnect] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleCardClick = (id: string) => {
    detectiveAudio.playTypewriterClick();
    if (!selectedForConnect) {
      setSelectedForConnect(id);
    } else {
      if (selectedForConnect !== id) {
        onAddConnection(selectedForConnect, id);
        detectiveAudio.playClueFound();
      }
      setSelectedForConnect(null);
    }
  };

  const handleCreateNote = () => {
    if (newNoteText.trim() === '') return;
    detectiveAudio.playTypewriterClick();
    const newNote: CorkboardNote = {
      id: `note_${Date.now()}`,
      x: 20 + Math.random() * 50,
      y: 20 + Math.random() * 50,
      title: 'Detective Note',
      content: newNoteText.trim(),
      color: 'aged',
    };
    onAddPlayerNote(newNote);
    setNewNoteText('');
    setIsAddingNote(false);
  };

  return (
    <div className="relative flex-1 flex flex-col h-full bg-[#120f0d] text-[#e2e0d8] overflow-hidden">
      
      {/* Corkboard Toolbar */}
      <div className="p-3 bg-[#181410] border-b border-[#30261f] flex flex-wrap items-center justify-between gap-3 px-4 z-20 shadow-md">
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4 text-red-500" />
          <span className="font-serif font-bold text-sm text-[#f5ecd8] tracking-wide">
            DETECTIVE CONSPIRACY CORKBOARD
          </span>
          <span className="text-xs text-amber-200/60 font-mono">
            ({pinnedItems.length} Pinned • {connections.length} Red Strings)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedForConnect && (
            <span className="text-xs text-red-400 font-mono animate-pulse">
              Click second item to link with red string...
            </span>
          )}

          <button
            onClick={() => setIsAddingNote(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2a2018] hover:bg-[#3a2c20] text-xs font-serif text-[#d4af37] border border-[#523e2c] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Sticky Note</span>
          </button>
        </div>
      </div>

      {/* Main Corkboard Surface with Photographic Texture */}
      <div
        className="relative flex-1 overflow-auto p-6"
        style={{
          backgroundImage: `url(${REAL_ASSETS.corkboardBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Vignette over Corkboard for Mood & Contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Red Yarn Strings Canvas / Connections Indicator */}
        <div className="relative z-10 max-w-6xl mx-auto space-y-6">
          {/* Active Red Strings Legend */}
          {connections.length > 0 && (
            <div className="p-2.5 rounded bg-black/80 border border-red-900/60 inline-flex flex-wrap items-center gap-2 text-xs font-mono text-red-300">
              <span className="font-bold text-red-400">RED STRINGS CONNECTED:</span>
              {connections.map((c) => (
                <span key={c.id} className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/80 border border-red-700">
                  <Link2 className="w-3 h-3" />
                  <span>Deduction Link #{c.id.slice(-4)}</span>
                  <button
                    onClick={() => onRemoveConnection(c.id)}
                    className="ml-1 text-red-400 hover:text-white"
                    title="Remove Red String"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Grid of Pinned Polaroid Clues and Notes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pinnedItems.map((item) => {
              const isConnecting = selectedForConnect === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className={`relative p-2.5 bg-[#f5ecd8] text-[#1a1815] rounded shadow-2xl border transition-all cursor-pointer transform hover:-translate-y-1 ${
                    isConnecting
                      ? 'ring-4 ring-red-600 scale-105 border-red-600'
                      : 'border-[#d4c5a9] hover:shadow-red-950/40'
                  }`}
                  style={{
                    transform: `rotate(${(item.id.charCodeAt(item.id.length - 1) % 5) - 2}deg)`,
                  }}
                >
                  {/* Pushpin at top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-red-600 border border-red-900 shadow-md flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>

                  {/* Photo Thumbnail */}
                  <div className="aspect-square bg-black overflow-hidden rounded mb-2 border border-[#b8ab91]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Polaroid Text */}
                  <div className="font-serif font-bold text-xs truncate text-[#1a1815]">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-mono text-[#574d3d] truncate">
                    {item.subtitle}
                  </div>

                  {/* Unpin button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      detectiveAudio.playTypewriterClick();
                      onUnpinItem(item.id);
                    }}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-red-700 opacity-60 hover:opacity-100 transition-opacity"
                    title="Remove from Corkboard"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })}

            {/* Custom Player Sticky Notes */}
            {playerNotes.map((note) => (
              <div
                key={note.id}
                className="relative p-3 bg-[#fff7d1] text-[#2b2408] rounded shadow-xl border border-[#ebd88d] transition-all transform hover:-translate-y-1"
                style={{
                  transform: `rotate(${(note.id.charCodeAt(note.id.length - 1) % 6) - 3}deg)`,
                }}
              >
                {/* Yellow Pushpin */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 w-3.5 h-3.5 rounded-full bg-amber-500 border border-amber-800 shadow-md" />

                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                  CASE LOG NOTE
                </div>
                <p className="text-xs font-serif leading-relaxed break-words">
                  {note.content}
                </p>

                <button
                  onClick={() => {
                    detectiveAudio.playTypewriterClick();
                    onDeletePlayerNote(note.id);
                  }}
                  className="absolute top-1 right-1 p-0.5 text-amber-800 hover:text-red-700"
                  title="Delete Note"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Empty State Callout if Board has no pins */}
          {pinnedItems.length === 0 && playerNotes.length === 0 && (
            <div className="p-8 bg-black/75 border border-[#4a3928] rounded-xl text-center max-w-md mx-auto space-y-3">
              <Sparkles className="w-6 h-6 text-[#d4af37] mx-auto" />
              <h3 className="font-serif font-bold text-base text-white">Your Corkboard is Empty</h3>
              <p className="text-xs text-gray-300 font-serif leading-relaxed">
                Pin suspect mugshots and evidence photographs here from the Locker or Interrogation room.
                Connect clues with red strings to formulate your deduction!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Note Modal Prompt */}
      {isAddingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#16120e] border border-[#4a3826] p-4 rounded-lg shadow-2xl space-y-3 text-[#f5ecd8]">
            <h4 className="font-serif font-bold text-sm text-[#d4af37]">Add Detective Note to Board</h4>
            <textarea
              rows={3}
              placeholder="e.g. Evelyn's mud prints match the 11:25 storm timeline..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              className="w-full p-2.5 text-xs bg-[#0c0a08] border border-[#382b1d] rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddingNote(false)}
                className="px-3 py-1.5 rounded text-xs font-serif text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                className="px-4 py-1.5 rounded bg-red-900 hover:bg-red-800 text-xs font-serif font-bold text-white border border-red-600"
              >
                Pin Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
