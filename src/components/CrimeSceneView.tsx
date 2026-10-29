import React, { useState } from 'react';
import type { CaseData, Hotspot } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { ZoomIn, ZoomOut, Check, Info } from 'lucide-react';

interface CrimeSceneViewProps {
  caseData: CaseData;
  discoveredHotspots: string[];
  onDiscoverHotspot: (hotspotId: string) => void;
  onOpenEvidence: (evidenceId: string) => void;
}

export const CrimeSceneView: React.FC<CrimeSceneViewProps> = ({
  caseData,
  discoveredHotspots,
  onDiscoverHotspot,
  onOpenEvidence,
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleHotspotClick = (hs: Hotspot) => {
    detectiveAudio.playClueFound();
    onDiscoverHotspot(hs.id);
    setSelectedHotspot(hs);
  };

  const total = caseData.hotspots.length;
  const discovered = discoveredHotspots.length;

  return (
    <div className="relative flex-1 flex flex-col h-full bg-[#07070a] text-[#e2e0d8] overflow-hidden">
      
      {/* Top Banner / Clue Counter */}
      <div className="p-3 bg-[#0d0e15] border-b border-[#232536] flex flex-wrap items-center justify-between gap-2 px-4 z-20">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-[#d4af37] font-bold">CRIME SCENE EXAMINATION:</span>
          <span className="font-serif text-white">{caseData.locationName}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161724] border border-[#2d2f45] text-xs font-mono">
            <span className="text-gray-400">Forensic Markers:</span>
            <span className="font-bold text-[#d4af37]">{discovered} / {total}</span>
            {discovered === total && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </div>

          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c1d2d] hover:bg-[#282a3f] text-xs font-serif text-[#d4af37] border border-[#3b3d57] transition-colors"
            title={isZoomed ? 'Reset Zoom' : 'Magnify Scene'}
            aria-label="Toggle crime scene zoom"
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isZoomed ? 'Reset View' : 'Magnify'}</span>
          </button>
        </div>
      </div>

      {/* Main Crime Scene Canvas Area */}
      <div className="relative flex-1 overflow-auto flex items-center justify-center p-2 sm:p-4 bg-[#0a0a0d]">
        <div
          className={`relative max-w-5xl w-full aspect-[16/9] rounded-lg overflow-hidden border border-[#2b2d3d] shadow-2xl transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-move' : ''
          }`}
        >
          {/* Crime Scene Photo */}
          <img
            src={caseData.crimeSceneImage}
            alt={`Crime Scene at ${caseData.locationName}`}
            className="w-full h-full object-cover filter contrast-110 brightness-95 select-none pointer-events-none"
          />

          {/* Vignette Shadow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

          {/* Interactive Evidence Hotspots */}
          {caseData.hotspots.map((hs, index) => {
            const isFound = discoveredHotspots.includes(hs.id);

            return (
              <button
                key={hs.id}
                onClick={() => handleHotspotClick(hs)}
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none z-10 transition-transform active:scale-95"
                title={`Marker #${index + 1}: ${hs.label}`}
                aria-label={`Evidence Marker #${index + 1}: ${hs.label}`}
              >
                {/* Yellow Police Evidence Marker Placard */}
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded font-mono font-black text-sm sm:text-base border-2 shadow-2xl transition-all ${
                    isFound
                      ? 'bg-amber-400 text-black border-amber-600 scale-100 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                      : 'bg-yellow-400/90 text-black border-yellow-200 animate-bounce shadow-[0_0_20px_rgba(250,204,21,0.8)]'
                  }`}
                >
                  #{index + 1}
                </div>

                {/* Hotspot Floating Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-xs font-serif px-2.5 py-1 rounded border border-[#d4af37] shadow-xl pointer-events-none z-30">
                  {hs.label}
                  <div className="text-[10px] text-amber-300 font-mono">
                    {isFound ? '✓ Examined' : 'Click to Inspect'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Hotspot Inspection Drawer / Modal */}
      {selectedHotspot && (
        <div className="p-4 bg-[#11121d] border-t border-[#26283b] flex flex-wrap items-center justify-between gap-3 px-6 z-20">
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="p-2 rounded bg-amber-950/60 border border-amber-500/60 text-amber-400 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#d4af37] font-bold">
                FORENSIC EVIDENCE RECOVERED: {selectedHotspot.label.toUpperCase()}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-serif mt-0.5">
                {selectedHotspot.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                detectiveAudio.playCameraShutter();
                onOpenEvidence(selectedHotspot.clueId);
              }}
              className="px-3.5 py-1.5 rounded bg-[#1e2133] hover:bg-[#2b2f48] text-xs font-serif text-[#d4af37] border border-[#3b3e5c] transition-colors"
            >
              Examine In Locker →
            </button>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="px-3 py-1.5 rounded text-xs font-serif text-gray-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
