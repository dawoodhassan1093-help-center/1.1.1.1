import React from 'react';
import { detectiveAudio } from '../utils/audio';
import { Scale, FileText, Shield, Database, AlertCircle, X, Check } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#11121d] border border-[#2b2d42] rounded-xl shadow-2xl overflow-hidden text-[#e2e0d8] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-[#181a28] border-b border-[#26283b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h2 className="font-serif font-bold text-base text-white tracking-wide">
                TERMS & CONDITIONS
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                SCOTLAND YARD DIVISION • USER SERVICE AGREEMENT
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="p-1 rounded bg-[#25283c] hover:bg-[#323650] text-gray-400 hover:text-white transition-colors"
            aria-label="Close Terms & Conditions"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Terms Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[70vh] bg-[#0c0d15] text-xs sm:text-sm font-serif leading-relaxed">
          
          {/* Section 1 */}
          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] space-y-1.5">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#d4af37]" />
              <span>1. Agreement & Fictional Disclaimer</span>
            </h3>
            <p className="text-gray-300">
              Welcome to <strong>Shadow Case: The Mystery Files</strong>. By launching, loading, or interacting with this software, you agree to these Terms & Conditions. All criminal investigations, victims, suspects, dialogues, locations, and forensic details portrayed within the game are strictly works of fiction. Any resemblance to real persons, living or deceased, or actual historical criminal proceedings is entirely coincidental.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] space-y-1.5">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>2. Intellectual Property & License</span>
            </h3>
            <p className="text-gray-300">
              All title graphics, case storylines, forensic puzzle designs, character portraits, procedural audio algorithms, and game software code are protected under intellectual property laws. Users are granted a personal, non-exclusive, non-transferable license to play the game for personal entertainment and puzzle-solving purposes.
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] space-y-1.5">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>3. Data Privacy & Local Storage</span>
            </h3>
            <p className="text-gray-300">
              Your privacy is paramount. <strong>Shadow Case</strong> does not collect, transmit, or sell personal identifying information. All gameplay data—including solved case levels, earned stars, detective scores, custom corkboard notes, and audio volume preferences—is stored exclusively client-side via your browser’s standard HTML5 <code>localStorage</code> API. Clearing your browser cache or site data will reset your local detective progress.
            </p>
          </div>

          {/* Section 4 */}
          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] space-y-1.5">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>4. Fair Play & Solver Integrity</span>
            </h3>
            <p className="text-gray-300">
              Players are encouraged to apply authentic deductive reasoning, timeline analysis, and evidence cross-examination. Exploitation of software anomalies, unauthorized automated scrapers, or reverse-engineering client scripts to spoil mystery solutions is prohibited in competitive or shared leaderboard settings.
            </p>
          </div>

          {/* Section 5 */}
          <div className="p-3.5 bg-[#131422] rounded-lg border border-[#222438] space-y-1.5">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>5. Platform & Web Audio Compliance</span>
            </h3>
            <p className="text-gray-300">
              The game operates in compliance with modern web standards and platforms (including CrazyGames and HTML5 gaming portals). Audio synthesis adheres to browser autoplay security policies, automatically suspending when tabs are hidden and unmuting upon user interaction. The game is provided "as is" without warranty of continuous uninterrupted availability.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#141521] border-t border-[#26283b] flex items-center justify-between">
          <span className="text-[11px] font-mono text-gray-500">
            Last Updated: October 2026 • Scotland Yard Division
          </span>
          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#25283b] hover:bg-[#323650] text-xs font-serif text-white font-bold transition-colors"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>I Accept & Understand</span>
          </button>
        </div>

      </div>
    </div>
  );
};
