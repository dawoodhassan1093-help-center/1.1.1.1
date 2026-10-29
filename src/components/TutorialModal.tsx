import React from 'react';
import { detectiveAudio } from '../utils/audio';
import { BookOpen, Search, Compass, Users, Pin, Gavel, X } from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#11121d] border border-[#2b2d42] rounded-xl shadow-2xl overflow-hidden text-[#e2e0d8] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-[#181a28] border-b border-[#26283b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <h2 className="font-serif font-bold text-base text-white tracking-wide">
              SCOTLAND YARD INVESTIGATION MANUAL
            </h2>
          </div>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="p-1 rounded bg-[#25283c] hover:bg-[#323650] text-gray-400 hover:text-white"
            aria-label="Close Manual"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Steps Body */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[70vh] bg-[#0c0d15] text-xs sm:text-sm font-serif">
          
          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] flex gap-3.5">
            <div className="p-2.5 rounded bg-amber-950/60 border border-amber-600/40 text-[#d4af37] shrink-0 h-fit">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-sm text-white">
                1. Inspect the Crime Scene
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Click yellow evidence markers (#1, #2, #3) scattered across the crime scene. Each marker reveals a crucial clue, weapon, or forensic footprint and registers it into your Locker.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] flex gap-3.5">
            <div className="p-2.5 rounded bg-blue-950/60 border border-blue-600/40 text-blue-400 shrink-0 h-fit">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-sm text-white">
                2. Forensic Lab & Evidence Inspection
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Examine collected photographs under the forensic microscope. Read chemical test reports, serial numbers, and pathology notes to identify contradictions.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] flex gap-3.5">
            <div className="p-2.5 rounded bg-purple-950/60 border border-purple-600/40 text-purple-400 shrink-0 h-fit">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-sm text-white">
                3. Interrogate Suspects
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Review each suspect’s background, motive, and alibi. Pose questions to see who panics or gives statements that conflict with physical weather or timeline evidence.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] flex gap-3.5">
            <div className="p-2.5 rounded bg-red-950/60 border border-red-600/40 text-red-400 shrink-0 h-fit">
              <Pin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-sm text-white">
                4. Connect the Dots on the Corkboard
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Pin suspect portraits and evidence items onto your investigation corkboard. Link related clues using red yarn strings to visualize the murder conspiracy.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] flex gap-3.5">
            <div className="p-2.5 rounded bg-rose-950/60 border border-rose-600/40 text-rose-400 shrink-0 h-fit">
              <Gavel className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-sm text-white">
                5. Deliver the Final Accusation
              </h3>
              <p className="text-gray-300 leading-relaxed">
                When you are confident, click ACCUSE. Select the true culprit and the undeniable smoking-gun evidence. Earn up to 3 gold stars and unlock the next case!
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#161826] border-t border-[#232536] text-right">
          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="px-5 py-2 rounded bg-[#25283b] hover:bg-[#323650] text-xs font-serif text-white font-bold"
          >
            Understood, Detective
          </button>
        </div>

      </div>
    </div>
  );
};
