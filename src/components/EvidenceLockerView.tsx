import React, { useState } from 'react';
import type { CaseData, EvidenceItem, EvidenceCategory } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { Eye, Pin, CheckCircle2, ShieldCheck, X, ZoomIn } from 'lucide-react';

interface EvidenceLockerViewProps {
  caseData: CaseData;
  onPinToCorkboard: (evidence: EvidenceItem) => void;
  pinnedIds: string[];
}

export const EvidenceLockerView: React.FC<EvidenceLockerViewProps> = ({
  caseData,
  onPinToCorkboard,
  pinnedIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EvidenceCategory | 'all'>('all');
  const [inspectingEvidence, setInspectingEvidence] = useState<EvidenceItem | null>(null);

  const filteredEvidence = caseData.evidence.filter((e) => {
    if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#08080c] text-[#e2e0d8] overflow-hidden">
      
      {/* Category Filter Bar */}
      <div className="p-3 bg-[#0e0f17] border-b border-[#232536] flex flex-wrap items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-sm text-white tracking-wide">
            EVIDENCE LOCKER & FORENSIC LAB
          </span>
          <span className="text-xs text-gray-400 font-mono">
            ({caseData.evidence.length} ITEMS SECURED)
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#0a0a0f] p-1 rounded-lg border border-[#20212f]">
          {(['all', 'physical', 'document', 'forensic'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                detectiveAudio.playTypewriterClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded text-xs font-serif capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#27293d] text-[#f1c40f] font-bold shadow'
                  : 'text-gray-400 hover:text-white hover:bg-[#141520]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#0a0a0f]">
        {filteredEvidence.map((ev) => {
          const isPinned = pinnedIds.includes(ev.id);

          return (
            <div
              key={ev.id}
              className="bg-[#12131d] border border-[#27293b] hover:border-[#d4af37]/60 rounded-lg overflow-hidden flex flex-col justify-between shadow-lg group transition-all"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-video bg-[#07070a] overflow-hidden border-b border-[#232433]">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-[#444] text-[10px] font-mono uppercase text-[#d4af37]">
                    {ev.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3.5 space-y-2">
                  <h3 className="font-serif font-bold text-sm text-white tracking-wide">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-serif leading-relaxed line-clamp-2">
                    {ev.description}
                  </p>
                  
                  {/* Forensic Note Callout */}
                  <div className="p-2 bg-[#090a10] border-l-2 border-amber-500/70 rounded text-[11px] font-mono text-amber-200/90 leading-tight">
                    <span className="text-amber-400 font-bold">LAB ANALYSIS:</span> {ev.forensicNote}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-[#0e0f17] border-t border-[#1c1d29] flex items-center justify-between">
                <button
                  onClick={() => {
                    detectiveAudio.playCameraShutter();
                    setInspectingEvidence(ev);
                  }}
                  className="flex items-center gap-1.5 text-xs font-serif text-[#d4af37] hover:text-amber-300 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Detail</span>
                </button>

                <button
                  onClick={() => {
                    detectiveAudio.playTypewriterClick();
                    onPinToCorkboard(ev);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-serif transition-colors border ${
                    isPinned
                      ? 'bg-red-950/80 text-red-300 border-red-700/80 font-bold'
                      : 'bg-[#181926] text-gray-300 border-[#2b2c3d] hover:border-red-500/70 hover:text-white'
                  }`}
                  title={isPinned ? 'Already on Corkboard' : 'Pin to Corkboard'}
                >
                  <Pin className="w-3.5 h-3.5" />
                  <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal Zoom for Evidence Item */}
      {inspectingEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#12131d] border-2 border-[#d4af37] rounded-xl shadow-2xl overflow-hidden flex flex-col text-[#e2e0d8]">
            {/* Header */}
            <div className="p-4 bg-[#181a26] border-b border-[#282a3c] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-[#d4af37]" />
                <span className="font-serif font-bold text-sm text-white uppercase tracking-wider">
                  FORENSIC EXAMINATION: {inspectingEvidence.title}
                </span>
              </div>
              <button
                onClick={() => setInspectingEvidence(null)}
                className="p-1 rounded bg-[#242636] hover:bg-[#303348] text-gray-400 hover:text-white"
                aria-label="Close Evidence Detail"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo & Zoom Surface */}
            <div className="p-4 bg-[#0a0a0f] flex justify-center border-b border-[#202230]">
              <div className="relative max-h-80 w-auto rounded overflow-hidden border border-[#333] shadow-inner">
                <img
                  src={inspectingEvidence.image}
                  alt={inspectingEvidence.title}
                  className="max-h-80 w-auto object-contain"
                />
              </div>
            </div>

            {/* Forensic Report */}
            <div className="p-5 space-y-3 bg-[#11121c]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                  CATEGORY: {inspectingEvidence.category.toUpperCase()}
                </span>
                <p className="text-xs sm:text-sm text-gray-200 font-serif leading-relaxed mt-1">
                  {inspectingEvidence.description}
                </p>
              </div>

              <div className="p-3.5 bg-[#090a10] border-l-4 border-amber-500 rounded text-xs font-mono text-amber-200">
                <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>OFFICIAL FORENSIC LABORATORY FINDING</span>
                </div>
                {inspectingEvidence.forensicNote}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-[#181926] border-t border-[#252738] flex items-center justify-between">
              <button
                onClick={() => {
                  detectiveAudio.playTypewriterClick();
                  onPinToCorkboard(inspectingEvidence);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded bg-red-950/80 hover:bg-red-900 border border-red-600 text-xs font-serif text-white transition-colors"
              >
                <Pin className="w-3.5 h-3.5" />
                <span>Pin To Detective Corkboard</span>
              </button>

              <button
                onClick={() => setInspectingEvidence(null)}
                className="px-4 py-2 rounded bg-[#242636] hover:bg-[#32354a] text-xs font-serif text-gray-300 hover:text-white"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
