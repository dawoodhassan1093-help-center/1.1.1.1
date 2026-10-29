import React from 'react';
import type { CaseData } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { ShieldAlert, MapPin, User, Clock, ArrowRight, X } from 'lucide-react';

interface CaseBriefingModalProps {
  caseData: CaseData;
  isOpen: boolean;
  onClose: () => void;
  onCommence: () => void;
}

export const CaseBriefingModal: React.FC<CaseBriefingModalProps> = ({
  caseData,
  isOpen,
  onClose,
  onCommence,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Manila Folder Styling */}
      <div className="relative w-full max-w-3xl bg-[#151622] border-2 border-[#d4af37]/60 rounded-xl shadow-2xl overflow-hidden text-[#e2e0d8] flex flex-col">
        
        {/* Top Confidential Header */}
        <div className="bg-[#1f2133] p-4 border-b border-[#2d3047] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-red-950/80 border border-red-600 px-2.5 py-0.5 rounded text-red-400 font-mono text-xs font-bold tracking-widest uppercase">
              CONFIDENTIAL // DOSSIER #{caseData.id.toString().padStart(3, '0')}
            </div>
            <span className="font-mono text-xs text-[#d4af37]">DIFFICULTY: {caseData.difficulty.toUpperCase()}</span>
          </div>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="p-1 rounded bg-[#2a2d42] hover:bg-[#373a55] text-gray-400 hover:text-white"
            aria-label="Close Case Briefing"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Title & Location Banner */}
          <div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-white tracking-wide mb-1">
              {caseData.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#d4af37] font-mono">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{caseData.locationName}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{caseData.category}</span>
            </div>
          </div>

          {/* Atmosphere sensory quote */}
          <div className="p-3 bg-[#0d0e15] border-l-4 border-[#d4af37] rounded text-sm italic text-[#c5c8db] font-serif">
            "{caseData.atmosphere}"
          </div>

          {/* Victim Profile Card */}
          <div className="bg-[#0f101a] border border-[#232536] p-4 rounded-lg">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Victim Particulars</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-gray-500">Name:</span>{' '}
                <span className="text-white font-bold">{caseData.victim.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Occupation:</span>{' '}
                <span className="text-gray-200">{caseData.victim.role}</span>
              </div>
              <div>
                <span className="text-gray-500">Cause of Death:</span>{' '}
                <span className="text-rose-400 font-bold">{caseData.victim.causeOfDeath}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-500">Est. Time of Death:</span>{' '}
                <span className="text-amber-300 font-bold">{caseData.victim.timeOfDeath}</span>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Dispatched Case Memo</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#d1d5db] font-serif leading-relaxed">
              {caseData.synopsis}
            </p>
          </div>

          {/* Initial Suspects Thumbnail Roster */}
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] mb-2">
              Persons of Interest ({caseData.suspects.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {caseData.suspects.map((s) => (
                <div key={s.id} className="p-2 bg-[#0e0f17] border border-[#232536] rounded text-center">
                  <img
                    src={s.portrait}
                    alt={s.name}
                    className="w-16 h-16 mx-auto rounded object-cover mb-1.5 border border-[#333]"
                  />
                  <div className="font-serif font-bold text-xs text-white truncate">{s.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono truncate">{s.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#141521] border-t border-[#26283b] flex items-center justify-between">
          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="px-4 py-2 rounded text-xs font-serif text-gray-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              detectiveAudio.playDramaticChord();
              onCommence();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-white font-serif font-bold text-xs tracking-wider shadow-lg border border-red-500/60 transition-transform active:scale-95"
          >
            <span>ENTER CRIME SCENE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
