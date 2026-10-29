import React from 'react';
import { REAL_ASSETS } from '../data/assetsManifest';
import { detectiveAudio } from '../utils/audio';
import { Play, FolderOpen, Award, BookOpen, Settings, Volume2, VolumeX, ShieldAlert, Scale } from 'lucide-react';

interface TitleScreenProps {
  onStartGame: () => void;
  onOpenCaseSelect: () => void;
  onOpenAchievements: () => void;
  onOpenTutorial: () => void;
  onOpenSettings: () => void;
  onOpenTerms: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  completedCount: number;
  totalScore: number;
  totalStars: number;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onOpenCaseSelect,
  onOpenAchievements,
  onOpenTutorial,
  onOpenSettings,
  onOpenTerms,
  soundEnabled,
  onToggleSound,
  completedCount,
  totalScore,
  totalStars,
}) => {
  return (
    <div className="relative min-h-screen bg-[#07070a] text-[#e5e5e5] flex flex-col justify-between overflow-hidden select-none">
      
      {/* Background Cinematic Cover Image with Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={REAL_ASSETS.titleBanner}
          alt="Shadow Case Detective Desk Scene"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/70 to-[#07070a]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      </div>

      {/* Top Bar with Status / Sound */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] bg-black/60 px-3 py-1.5 rounded border border-[#d4af37]/30 backdrop-blur-sm">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>TOP SECRET // SCOTLAND YARD DIVISION</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/60 border border-[#333] hover:border-[#d4af37] text-xs font-serif text-[#d4af37] transition-all"
            aria-label={soundEnabled ? 'Disable procedural audio' : 'Enable procedural audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Audio Active' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Main Center Content: Title & Action Menu */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto my-auto py-8">
        {/* Subtle Stamp Badge */}
        <div className="mb-3 px-4 py-1 rounded bg-red-950/70 border border-red-700/60 text-red-400 font-mono text-xs uppercase tracking-widest animate-pulse">
          100 SOLVABLE CRIMINAL CASES
        </div>

        {/* Main Title */}
        <h1 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
          SHADOW CASE
        </h1>
        <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-3" />
        <p className="font-serif text-lg sm:text-xl text-[#d4af37] italic tracking-wider mb-8 drop-shadow">
          THE MYSTERY FILES
        </p>

        {/* Player Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md bg-[#11121a]/85 border border-[#2d2e40] p-3 rounded-lg backdrop-blur-md mb-8 text-center shadow-xl">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Solved</div>
            <div className="font-serif font-bold text-lg text-emerald-400">{completedCount} / 100</div>
          </div>
          <div className="border-x border-[#2d2e40]">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Score</div>
            <div className="font-serif font-bold text-lg text-[#d4af37]">{totalScore.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Stars</div>
            <div className="font-serif font-bold text-lg text-amber-400">★ {totalStars}</div>
          </div>
        </div>

        {/* Menu Actions */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => {
              detectiveAudio.playDramaticChord();
              onStartGame();
            }}
            className="group relative flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-md bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#991b1b] hover:from-[#b91c1c] hover:to-[#dc2626] text-white font-serif font-bold text-base tracking-widest shadow-[0_0_20px_rgba(185,28,28,0.4)] border border-red-500/50 transition-all transform active:scale-95"
          >
            <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
            <span>{completedCount > 0 ? 'CONTINUE INVESTIGATION' : 'START INVESTIGATION'}</span>
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onOpenCaseSelect();
            }}
            className="flex items-center justify-center gap-2.5 w-full py-3 px-5 rounded-md bg-[#141520]/90 hover:bg-[#1e2030] text-[#e2e0d8] hover:text-white font-serif text-sm tracking-wider border border-[#2b2d42] hover:border-[#d4af37]/60 transition-all"
          >
            <FolderOpen className="w-4 h-4 text-[#d4af37]" />
            <span>CASE DOSSIER (1 - 100)</span>
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onOpenAchievements();
            }}
            className="flex items-center justify-center gap-2.5 w-full py-2.5 px-5 rounded-md bg-[#141520]/80 hover:bg-[#1e2030] text-[#cbd5e1] font-serif text-xs tracking-wider border border-[#232536] hover:border-[#3d405b] transition-all"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>DETECTIVE ARCHIVE & AWARDS</span>
          </button>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => {
                detectiveAudio.playTypewriterClick();
                onOpenTutorial();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-[#0e0f17] hover:bg-[#171826] text-[#9ca3af] hover:text-[#e2e0d8] text-xs font-serif border border-[#20212e] transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>How to Play</span>
            </button>

            <button
              onClick={() => {
                detectiveAudio.playTypewriterClick();
                onOpenSettings();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-[#0e0f17] hover:bg-[#171826] text-[#9ca3af] hover:text-[#e2e0d8] text-xs font-serif border border-[#20212e] transition-all"
            >
              <Settings className="w-3.5 h-3.5 text-gray-400" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Footer with Terms & Conditions in the Corner */}
      <footer className="relative z-10 p-3 sm:p-4 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-2 border-t border-[#181926]/40 backdrop-blur-xs">
        <div>SHADOW CASE: THE MYSTERY FILES • HTML5 DETECTIVE NOIR • V1.0.0</div>
        
        <button
          onClick={() => {
            detectiveAudio.playTypewriterClick();
            onOpenTerms();
          }}
          className="group flex items-center gap-1.5 px-3 py-1 rounded bg-[#0f1018]/80 hover:bg-[#1c1d2b] border border-[#232538] hover:border-[#d4af37]/60 text-gray-400 hover:text-[#d4af37] transition-all cursor-pointer"
          title="Review Official Scotland Yard Terms & Conditions"
          aria-label="View Terms & Conditions"
        >
          <Scale className="w-3.5 h-3.5 text-[#d4af37] group-hover:rotate-12 transition-transform" />
          <span className="font-serif text-xs">Terms & Conditions</span>
        </button>
      </footer>
    </div>
  );
};
