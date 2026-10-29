import React, { useState } from 'react';
import type { CaseData, Difficulty, PlayerProgress } from '../types/game';
import { ALL_CASES } from '../data/cases';
import { detectiveAudio } from '../utils/audio';
import { X, Search, Lock, CheckCircle2, Star, ShieldAlert } from 'lucide-react';

interface CaseSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (caseId: number) => void;
  progress: PlayerProgress;
}

export const CaseSelectModal: React.FC<CaseSelectModalProps> = ({
  isOpen,
  onClose,
  onSelectCase,
  progress,
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredCases = ALL_CASES.filter((c) => {
    if (filterDifficulty !== 'All' && c.difficulty !== filterDifficulty) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchLoc = c.locationName.toLowerCase().includes(q);
      const matchVictim = c.victim.name.toLowerCase().includes(q);
      const matchNum = c.id.toString() === q || `case ${c.id}` === q;
      if (!matchTitle && !matchLoc && !matchVictim && !matchNum) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0d0e15] border border-[#2d2f42] rounded-xl flex flex-col shadow-2xl overflow-hidden text-[#e2e0d8]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#252736] flex items-center justify-between bg-[#12131d]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-950/40 border border-amber-600/40 text-[#d4af37]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide">
                CASE DOSSIER ARCHIVE
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                SELECT AN INVESTIGATION • 100 ACTIVE MYSTERY FILES
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#1a1b26] hover:bg-[#252738] text-gray-400 hover:text-white transition-colors"
            aria-label="Close Case Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-3 sm:p-4 bg-[#10111a] border-b border-[#20212e] flex flex-wrap items-center justify-between gap-3">
          {/* Difficulty Tabs */}
          <div className="flex items-center gap-1.5 bg-[#0a0a0f] p-1 rounded-lg border border-[#20212f]">
            {(['All', 'Easy', 'Hard', 'Impossible'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  detectiveAudio.playTypewriterClick();
                  setFilterDifficulty(diff);
                }}
                className={`px-3 py-1.5 rounded text-xs font-serif transition-colors ${
                  filterDifficulty === diff
                    ? 'bg-[#25283b] text-[#f1c40f] font-bold shadow'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#151622]'
                }`}
              >
                {diff === 'All' ? 'All (100)' : diff === 'Easy' ? 'Easy (1-30)' : diff === 'Hard' ? 'Hard (31-70)' : 'Impossible (71-100)'}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search case, location, victim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#151622] border border-[#27293b] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Cases Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-[#0a0a0f]">
          {filteredCases.map((c) => {
            const isUnlocked = progress.unlockedCases.includes(c.id);
            const completion = progress.completedCases[c.id];
            const isSolved = Boolean(completion);

            return (
              <div
                key={c.id}
                onClick={() => {
                  if (isUnlocked) {
                    detectiveAudio.playTypewriterClick();
                    onSelectCase(c.id);
                  }
                }}
                className={`relative p-3.5 rounded-lg border transition-all flex flex-col justify-between ${
                  !isUnlocked
                    ? 'bg-[#0f1017]/60 border-[#1c1d29] opacity-60 cursor-not-allowed'
                    : isSolved
                    ? 'bg-[#121622] border-emerald-900/60 hover:border-emerald-500/80 cursor-pointer hover:shadow-lg'
                    : 'bg-[#13141f] border-[#25273b] hover:border-[#d4af37]/70 cursor-pointer hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#d4af37]">
                      FILE #{c.id.toString().padStart(3, '0')}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                        c.difficulty === 'Easy'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                          : c.difficulty === 'Hard'
                          ? 'bg-amber-950/60 text-amber-400 border-amber-800/40'
                          : 'bg-rose-950/60 text-rose-400 border-rose-800/40'
                      }`}
                    >
                      {c.difficulty}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-white line-clamp-1 mb-1">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-1 mb-2 font-mono">
                    📍 {c.locationName}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1e202f] flex items-center justify-between">
                  {isSolved ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Solved</span>
                      <div className="flex text-amber-400 ml-1">
                        {Array.from({ length: completion.stars }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  ) : isUnlocked ? (
                    <span className="text-xs text-amber-400 font-mono">Open Dossier →</span>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Classified</span>
                    </div>
                  )}

                  {isSolved && (
                    <span className="text-xs font-mono text-[#d4af37] font-bold">
                      {completion.score} pts
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#11121d] border-t border-[#20212e] text-center text-xs text-gray-500 font-mono">
          Showing {filteredCases.length} of 100 cases • Progress automatically saved
        </div>
      </div>
    </div>
  );
};
