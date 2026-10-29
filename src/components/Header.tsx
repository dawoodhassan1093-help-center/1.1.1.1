import React from 'react';
import type { CaseData } from '../types/game';
import { formatTime } from '../game/rules';
import {
  Search,
  Users,
  Compass,
  BookOpen,
  HelpCircle,
  Gavel,
  Settings,
  Volume2,
  VolumeX,
  ChevronLeft,
  Pin
} from 'lucide-react';
import { detectiveAudio } from '../utils/audio';

interface HeaderProps {
  currentCase: CaseData;
  activeTab: 'scene' | 'evidence' | 'suspects' | 'corkboard' | 'notebook';
  setActiveTab: (tab: 'scene' | 'evidence' | 'suspects' | 'corkboard' | 'notebook') => void;
  timerSeconds: number;
  hintsUsed: number;
  onUseHint: () => void;
  onOpenVerdict: () => void;
  onOpenSettings: () => void;
  onOpenCaseSelect: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  discoveredHotspotsCount: number;
  totalHotspotsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCase,
  activeTab,
  setActiveTab,
  timerSeconds,
  hintsUsed,
  onUseHint,
  onOpenVerdict,
  onOpenSettings,
  onOpenCaseSelect,
  soundEnabled,
  onToggleSound,
  discoveredHotspotsCount,
  totalHotspotsCount,
}) => {
  const getDifficultyBadge = () => {
    switch (currentCase.difficulty) {
      case 'Easy':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60';
      case 'Hard':
        return 'bg-amber-950/80 text-amber-400 border-amber-700/60';
      case 'Impossible':
        return 'bg-rose-950/80 text-rose-400 border-rose-700/60';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d12]/95 backdrop-blur-md border-b border-[#282936] text-[#e2e0d8] px-3 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Case Info & Back Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onOpenCaseSelect();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#181924] hover:bg-[#232435] text-xs font-serif text-[#d4af37] border border-[#3b3c50] transition-colors"
            title="Return to Case Dossier (Levels 1-100)"
            aria-label="Return to Case Dossier"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Cases</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#d4af37] font-bold">CASE #{currentCase.id.toString().padStart(3, '0')}</span>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${getDifficultyBadge()}`}>
                {currentCase.difficulty}
              </span>
            </div>
            <h1 className="font-serif font-bold text-sm sm:text-base tracking-wide text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {currentCase.title}
            </h1>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="flex items-center bg-[#13141d] p-1 rounded-lg border border-[#232434] overflow-x-auto" aria-label="Investigation Navigation">
          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setActiveTab('scene');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'scene'
                ? 'bg-[#2b2d42] text-[#f1c40f] shadow font-bold'
                : 'text-[#9ca3af] hover:text-[#e2e0d8] hover:bg-[#1c1d2b]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Scene ({discoveredHotspotsCount}/{totalHotspotsCount})</span>
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setActiveTab('evidence');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'evidence'
                ? 'bg-[#2b2d42] text-[#f1c40f] shadow font-bold'
                : 'text-[#9ca3af] hover:text-[#e2e0d8] hover:bg-[#1c1d2b]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Evidence ({currentCase.evidence.length})</span>
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setActiveTab('suspects');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'suspects'
                ? 'bg-[#2b2d42] text-[#f1c40f] shadow font-bold'
                : 'text-[#9ca3af] hover:text-[#e2e0d8] hover:bg-[#1c1d2b]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Suspects ({currentCase.suspects.length})</span>
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setActiveTab('corkboard');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'corkboard'
                ? 'bg-[#2b2d42] text-[#f1c40f] shadow font-bold'
                : 'text-[#9ca3af] hover:text-[#e2e0d8] hover:bg-[#1c1d2b]'
            }`}
          >
            <Pin className="w-3.5 h-3.5 text-red-400" />
            <span>Corkboard</span>
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setActiveTab('notebook');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'notebook'
                ? 'bg-[#2b2d42] text-[#f1c40f] shadow font-bold'
                : 'text-[#9ca3af] hover:text-[#e2e0d8] hover:bg-[#1c1d2b]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Casebook</span>
          </button>
        </nav>

        {/* Right: Timer, Hint, Verdict, Controls */}
        <div className="flex items-center gap-2">
          {/* Timer */}
          <div className="hidden md:flex items-center px-2.5 py-1 rounded bg-[#14151f] border border-[#2b2c3d] font-mono text-xs text-[#a0a3bd]" title="Investigation Time">
            ⏱️ {formatTime(timerSeconds)}
          </div>

          {/* Hint Button */}
          <button
            onClick={onUseHint}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#1e202e] hover:bg-[#2b2e44] text-xs font-medium text-[#f59e0b] border border-[#3f3b25] transition-colors"
            title="Inspect Detective Clue / Hint"
            aria-label="Request Hint"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hint</span>
            {hintsUsed > 0 && <span className="text-[10px] text-amber-300">({hintsUsed}/3)</span>}
          </button>

          {/* Accusation / Verdict Button */}
          <button
            onClick={() => {
              detectiveAudio.playDramaticChord();
              onOpenVerdict();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-red-800 to-red-950 hover:from-red-700 hover:to-red-900 text-white font-serif font-bold text-xs tracking-wider shadow-lg border border-red-600/60 transition-transform active:scale-95"
            aria-label="File Formal Accusation"
          >
            <Gavel className="w-3.5 h-3.5" />
            <span>ACCUSE</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded bg-[#141520] hover:bg-[#202232] text-[#9ca3af] hover:text-white border border-[#2b2d40]"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#d4af37]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onOpenSettings();
            }}
            className="p-1.5 rounded bg-[#141520] hover:bg-[#202232] text-[#9ca3af] hover:text-white border border-[#2b2d40]"
            title="Game Settings"
            aria-label="Game Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
