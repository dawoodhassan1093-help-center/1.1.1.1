import React from 'react';
import type { PlayerProgress } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { X, Volume2, CloudRain, Zap, KeyRound, RotateCcw, Sliders } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: PlayerProgress;
  onUpdateSettings: (newSettings: PlayerProgress['settings']) => void;
  onUnlockAllCases: () => void;
  onResetProgress: () => void;
  onOpenTerms?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  progress,
  onUpdateSettings,
  onUnlockAllCases,
  onResetProgress,
  onOpenTerms,
}) => {
  if (!isOpen) return null;

  const { settings } = progress;

  const handleVolumeChange = (val: number) => {
    detectiveAudio.setVolume(val);
    onUpdateSettings({ ...settings, soundVolume: val });
  };

  const handleToggleSound = () => {
    const next = !settings.soundEnabled;
    detectiveAudio.setEnabled(next);
    onUpdateSettings({ ...settings, soundEnabled: next });
  };

  const handleToggleRain = () => {
    const next = !settings.ambientRain;
    if (next) {
      detectiveAudio.startRain();
    } else {
      detectiveAudio.stopRain();
    }
    onUpdateSettings({ ...settings, ambientRain: next });
  };

  const handleToggleLowPerf = () => {
    onUpdateSettings({ ...settings, lowPerformanceMode: !settings.lowPerformanceMode });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#11121d] border border-[#2b2d42] rounded-xl shadow-2xl overflow-hidden text-[#e2e0d8] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-[#181a28] border-b border-[#26283b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#d4af37]" />
            <h2 className="font-serif font-bold text-base text-white tracking-wide">
              DETECTIVE SETTINGS & PREFERENCES
            </h2>
          </div>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="p-1 rounded bg-[#25283c] hover:bg-[#323650] text-gray-400 hover:text-white"
            aria-label="Close Settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[70vh]">
          
          {/* Audio Section */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37]">
              Procedural Audio & Atmosphere
            </h3>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg border border-[#1e202f]">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-xs font-serif font-bold text-white">Sound Effects (SFX)</div>
                  <div className="text-[10px] text-gray-400 font-mono">Typewriter keys, clue chimes, verdict gavel</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleSound}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.soundEnabled ? 'bg-emerald-600' : 'bg-gray-700'
                }`}
                aria-label="Toggle Sound Effects"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.soundEnabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Ambient Rain Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg border border-[#1e202f]">
              <div className="flex items-center gap-2.5">
                <CloudRain className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs font-serif font-bold text-white">Noir Rain Ambience</div>
                  <div className="text-[10px] text-gray-400 font-mono">Soft synthesized rainstorm and distant thunder</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleRain}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.ambientRain ? 'bg-emerald-600' : 'bg-gray-700'
                }`}
                aria-label="Toggle Rain Ambience"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.ambientRain ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Volume Slider */}
            <div className="p-3 bg-[#0a0a0f] rounded-lg border border-[#1e202f] space-y-1.5">
              <div className="flex justify-between text-xs font-serif">
                <span className="text-gray-300">Master Volume</span>
                <span className="font-mono text-[#d4af37]">{Math.round(settings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
            </div>
          </div>

          {/* Performance & Hardware */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37]">
              Hardware & Performance
            </h3>

            <div className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg border border-[#1e202f]">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-yellow-400" />
                <div>
                  <div className="text-xs font-serif font-bold text-white">Low-End PC / Mobile Mode</div>
                  <div className="text-[10px] text-gray-400 font-mono">Disables heavy blur effects and animations</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleLowPerf}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.lowPerformanceMode ? 'bg-amber-600' : 'bg-gray-700'
                }`}
                aria-label="Toggle Low Performance Mode"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.lowPerformanceMode ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Detective Developer & Progress Tools */}
          <div className="space-y-3 pt-2 border-t border-[#232536]">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37]">
              Case Progression Management
            </h3>

            {/* Master Key: Unlock All Cases */}
            <div className="flex items-center justify-between p-3 bg-[#16120b] rounded-lg border border-amber-900/40">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-4 h-4 text-amber-500" />
                <div>
                  <div className="text-xs font-serif font-bold text-amber-200">Master Detective Pass</div>
                  <div className="text-[10px] text-amber-400/80 font-mono">Unlock all 100 cases instantly for review</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  detectiveAudio.playDramaticChord();
                  onUnlockAllCases();
                }}
                className="px-3 py-1.5 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-600 text-xs font-serif font-bold text-amber-200"
              >
                Unlock All 100
              </button>
            </div>

            {/* Reset Progress */}
            <div className="flex items-center justify-between p-3 bg-[#180f12] rounded-lg border border-red-900/40">
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-xs font-serif font-bold text-red-200">Reset Local Progress</div>
                  <div className="text-[10px] text-red-400/80 font-mono">Clears solved cases, scores, and custom notes</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all game progress?')) {
                    onResetProgress();
                  }
                }}
                className="px-3 py-1.5 rounded bg-red-950 hover:bg-red-900 border border-red-700 text-xs font-serif font-bold text-red-300"
              >
                Reset
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#161826] border-t border-[#232536] flex items-center justify-between">
          {onOpenTerms ? (
            <button
              onClick={() => {
                detectiveAudio.playTypewriterClick();
                onOpenTerms();
              }}
              className="text-xs font-mono text-gray-400 hover:text-[#d4af37] underline underline-offset-4 cursor-pointer"
            >
              Terms & Conditions
            </button>
          ) : <div />}
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#25283b] hover:bg-[#323650] text-xs font-serif text-white cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
