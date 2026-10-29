import React, { useState } from 'react';
import type { CaseData, Suspect } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { MessageSquare, AlertCircle, Pin, User, Clock, Heart } from 'lucide-react';

interface SuspectInterrogationViewProps {
  caseData: CaseData;
  onPinSuspectToCorkboard: (suspect: Suspect) => void;
  pinnedIds: string[];
}

export const SuspectInterrogationView: React.FC<SuspectInterrogationViewProps> = ({
  caseData,
  onPinSuspectToCorkboard,
  pinnedIds,
}) => {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect>(caseData.suspects[0]);
  const [askedQuestions, setAskedQuestions] = useState<Record<string, number[]>>({});

  const handleAskQuestion = (qIndex: number) => {
    detectiveAudio.playTypewriterClick();
    const current = askedQuestions[selectedSuspect.id] || [];
    if (!current.includes(qIndex)) {
      setAskedQuestions({
        ...askedQuestions,
        [selectedSuspect.id]: [...current, qIndex],
      });
      const q = selectedSuspect.questions[qIndex];
      if (q && q.revealsClue) {
        detectiveAudio.playClueFound();
      }
    }
  };

  const isPinned = pinnedIds.includes(selectedSuspect.id);
  const currentAsked = askedQuestions[selectedSuspect.id] || [];

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-[#08080c] text-[#e2e0d8] overflow-hidden">
      
      {/* Left Column: Suspects Selector List */}
      <div className="w-full md:w-80 bg-[#0e0f17] border-b md:border-b-0 md:border-r border-[#232536] flex flex-col overflow-y-auto">
        <div className="p-3.5 border-b border-[#20212e] bg-[#12131d]">
          <h2 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37]">
            PERSONS OF INTEREST ({caseData.suspects.length})
          </h2>
        </div>

        <div className="p-2 space-y-1.5 flex-1 overflow-y-auto">
          {caseData.suspects.map((s) => {
            const isSelected = selectedSuspect.id === s.id;
            const askedCount = (askedQuestions[s.id] || []).length;
            const totalQ = s.questions.length;

            return (
              <button
                key={s.id}
                onClick={() => {
                  detectiveAudio.playTypewriterClick();
                  setSelectedSuspect(s);
                }}
                className={`w-full p-2.5 rounded-lg flex items-center gap-3 transition-all text-left border ${
                  isSelected
                    ? 'bg-[#1e2030] border-[#d4af37] shadow-md'
                    : 'bg-[#11121c] border-[#1e202f] hover:bg-[#181926] hover:border-[#323447]'
                }`}
              >
                <img
                  src={s.portrait}
                  alt={s.name}
                  className="w-12 h-12 rounded object-cover border border-[#333] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-serif font-bold text-xs sm:text-sm text-white truncate">
                    {s.name}
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono truncate">
                    {s.role} ({s.age} yrs)
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                    Interrogated: {askedCount}/{totalQ}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Interrogation Room & Dossier Details */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#0a0a0f] p-4 sm:p-6 space-y-5">
        {/* Top Suspect Profile Header */}
        <div className="bg-[#12131d] border border-[#25273b] p-4 sm:p-5 rounded-xl shadow-lg flex flex-col sm:flex-row gap-5">
          <div className="shrink-0 flex flex-col items-center">
            <img
              src={selectedSuspect.portrait}
              alt={selectedSuspect.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg object-cover border-2 border-[#3b3d54] shadow-2xl"
            />
            <button
              onClick={() => {
                detectiveAudio.playTypewriterClick();
                onPinSuspectToCorkboard(selectedSuspect);
              }}
              className={`mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-serif border transition-all ${
                isPinned
                  ? 'bg-red-950/80 text-red-300 border-red-700/80 font-bold'
                  : 'bg-[#1c1e2d] text-gray-300 border-[#32354c] hover:border-red-500/70 hover:text-white'
              }`}
            >
              <Pin className="w-3.5 h-3.5 text-red-400" />
              <span>{isPinned ? 'Pinned to Board' : 'Pin to Board'}</span>
            </button>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-black text-xl sm:text-2xl text-white tracking-wide">
                  {selectedSuspect.name}
                </h3>
                <div className="text-xs text-[#d4af37] font-mono">
                  {selectedSuspect.role} • {selectedSuspect.age} Years Old
                </div>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#0a0a0f] border border-[#2d2f44] text-[10px] font-mono text-gray-400">
                TEMPERAMENT: {selectedSuspect.personality}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-serif">
              <div className="p-2.5 bg-[#0a0a0f] rounded border border-[#1e202f]">
                <span className="text-[#d4af37] font-mono font-bold flex items-center gap-1 mb-1">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Motive for Crime:
                </span>
                <p className="text-gray-300 leading-tight">{selectedSuspect.motive}</p>
              </div>

              <div className="p-2.5 bg-[#0a0a0f] rounded border border-[#1e202f]">
                <span className="text-[#d4af37] font-mono font-bold flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Claimed Alibi:
                </span>
                <p className="text-gray-300 leading-tight">{selectedSuspect.alibi}</p>
              </div>
            </div>

            <div className="text-xs text-gray-400 font-mono">
              <span className="text-gray-500">Relationship to Victim:</span> {selectedSuspect.relationship}
            </div>
          </div>
        </div>

        {/* Interrogation Transcript & Active Dialogue Tree */}
        <div className="bg-[#11121d] border border-[#232536] p-4 sm:p-5 rounded-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-[#20212f] pb-3">
            <MessageSquare className="w-4 h-4 text-[#d4af37]" />
            <h4 className="font-serif font-bold text-sm text-white tracking-wide">
              FORMAL INTERROGATION QUESTIONS
            </h4>
          </div>

          <div className="space-y-3">
            {selectedSuspect.questions.map((q, idx) => {
              const hasAsked = currentAsked.includes(idx);

              return (
                <div key={idx} className="bg-[#0b0c13] border border-[#1e202f] rounded-lg p-3.5 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-xs text-[#d4af37] font-bold mt-0.5">Q{idx + 1}:</span>
                      <p className="font-serif text-xs sm:text-sm text-gray-200 font-medium">
                        "{q.q}"
                      </p>
                    </div>

                    {!hasAsked && (
                      <button
                        onClick={() => handleAskQuestion(idx)}
                        className="shrink-0 px-3 py-1 rounded bg-[#1e2030] hover:bg-[#2c2f47] border border-[#373a55] text-xs font-serif text-[#d4af37] transition-colors"
                      >
                        Interrogate →
                      </button>
                    )}
                  </div>

                  {hasAsked && (
                    <div className="pl-6 border-l-2 border-[#d4af37]/60 mt-2 space-y-2 animate-in fade-in duration-200">
                      <div className="text-xs sm:text-sm font-serif italic text-amber-100/90 leading-relaxed">
                        "{q.a}"
                      </div>

                      {q.revealsClue && (
                        <div className="p-2 rounded bg-red-950/40 border border-red-700/60 text-[11px] font-mono text-red-300 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                          <span>FORENSIC CONTRADICTION: {q.revealsClue}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
