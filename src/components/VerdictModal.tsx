import React, { useState } from 'react';
import type { CaseData, Suspect, EvidenceItem } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { Gavel, X, AlertOctagon, Check } from 'lucide-react';

interface VerdictModalProps {
  caseData: CaseData;
  isOpen: boolean;
  onClose: () => void;
  onSubmitVerdict: (culpritId: string, evidenceId: string, method: string) => void;
}

export const VerdictModal: React.FC<VerdictModalProps> = ({
  caseData,
  isOpen,
  onClose,
  onSubmitVerdict,
}) => {
  const [selectedCulprit, setSelectedCulprit] = useState<string>(caseData.suspects[0]?.id || '');
  const [selectedEvidence, setSelectedEvidence] = useState<string>(caseData.evidence[0]?.id || '');
  const [selectedMethod, setSelectedMethod] = useState<string>(caseData.solution.murderWeaponOrMethod);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    detectiveAudio.playDramaticChord();
    onSubmitVerdict(selectedCulprit, selectedEvidence, selectedMethod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#12131f] border-2 border-red-700/80 rounded-xl shadow-[0_0_50px_rgba(185,28,28,0.3)] overflow-hidden text-[#e2e0d8] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-950 via-[#181926] to-red-950 border-b border-red-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-red-900 border border-red-500 text-white">
              <Gavel className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-black text-lg sm:text-xl text-white tracking-widest uppercase">
                FILE FORMAL ACCUSATION
              </h2>
              <p className="text-xs text-red-300 font-mono">
                SCOTLAND YARD DEDUCTIVE INDICTMENT • CASE #{caseData.id.toString().padStart(3, '0')}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="p-1 rounded bg-[#1f202e] hover:bg-[#2c2e42] text-gray-400 hover:text-white"
            aria-label="Cancel Accusation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          {/* STEP 1: Accuse the Primary Culprit */}
          <div>
            <label className="font-serif font-bold text-xs sm:text-sm text-[#d4af37] uppercase tracking-wider block mb-2">
              1. Name the Perpetrator
            </label>
            <p className="text-xs text-gray-400 font-serif mb-3">
              Select the suspect whose motive and timeline crumble under forensic scrutiny.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {caseData.suspects.map((s) => {
                const isSelected = selectedCulprit === s.id;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      detectiveAudio.playTypewriterClick();
                      setSelectedCulprit(s.id);
                    }}
                    className={`p-2.5 rounded-lg border flex flex-col items-center text-center transition-all ${
                      isSelected
                        ? 'bg-red-950/80 border-red-500 ring-2 ring-red-500/80 shadow-lg'
                        : 'bg-[#0f1019] border-[#25273b] hover:border-[#3d405b]'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={s.portrait}
                        alt={s.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover border border-[#444] mb-2"
                      />
                      {isSelected && (
                        <div className="absolute top-1 right-1 p-0.5 rounded-full bg-red-600 text-white">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <span className="font-serif font-bold text-xs text-white truncate max-w-full">
                      {s.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono truncate max-w-full">
                      {s.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Incontrovertible Evidence */}
          <div>
            <label className="font-serif font-bold text-xs sm:text-sm text-[#d4af37] uppercase tracking-wider block mb-2">
              2. Critical Smoking-Gun Evidence
            </label>
            <p className="text-xs text-gray-400 font-serif mb-3">
              Which piece of physical or forensic evidence completely disproves their alibi?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {caseData.evidence.map((ev) => {
                const isSelected = selectedEvidence === ev.id;

                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => {
                      detectiveAudio.playTypewriterClick();
                      setSelectedEvidence(ev.id);
                    }}
                    className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-red-950/70 border-red-500 ring-1 ring-red-500'
                        : 'bg-[#0e0f17] border-[#222435] hover:border-[#383a52]'
                    }`}
                  >
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-12 h-12 rounded object-cover border border-[#333] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-bold text-xs text-white truncate">
                        {ev.title}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono truncate">
                        {ev.category.toUpperCase()} • {ev.description}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-red-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Warning Note */}
          <div className="p-3 bg-red-950/30 border border-red-800/50 rounded-lg flex items-center gap-2.5 text-xs text-red-200 font-serif">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              Filing a premature or mistaken verdict will affect your detective rating and score. Review your evidence and corkboard carefully before submitting.
            </span>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-[#232536]">
            <button
              type="button"
              onClick={() => {
                detectiveAudio.playTypewriterClick();
                onClose();
              }}
              className="px-4 py-2 rounded text-xs font-serif text-gray-400 hover:text-white"
            >
              Back to Investigation
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:from-red-600 hover:to-red-900 text-white font-serif font-black text-sm tracking-widest shadow-xl border border-red-500/80 transition-transform active:scale-95"
            >
              <Gavel className="w-4 h-4" />
              <span>DELIVER VERDICT</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
