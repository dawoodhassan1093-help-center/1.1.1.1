import React from 'react';
import type { PlayerProgress } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { Award, CheckCircle2, Lock, X, Star } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: PlayerProgress;
}

const ALL_ACHIEVEMENTS = [
  { id: 'first_bloodhound', title: 'First Bloodhound', desc: 'Successfully solve your very first criminal case.', icon: '🔍' },
  { id: 'veteran_gumshoe', title: 'Veteran Gumshoe', desc: 'Solve 10 criminal cases with distinction.', icon: '🕵️' },
  { id: 'master_of_easy', title: 'Master of the Beat', desc: 'Complete all 30 Easy cases (Levels 1 to 30).', icon: '📜' },
  { id: 'hardboiled_detective', title: 'Hardboiled Sleuth', desc: 'Solve 70 criminal mysteries across all districts.', icon: '⚖️' },
  { id: 'impossible_solved', title: 'Miracle Worker', desc: 'Solve at least one Impossible locked-room mystery.', icon: '🗝️' },
  { id: 'legendary_sherlock', title: 'Scotland Yard Legend', desc: 'Solve all 100 mystery files in the dossier.', icon: '👑' },
  { id: 'eagle_eye', title: 'Eagle Eye', desc: 'Achieve a 3-star rating on at least 5 different cases.', icon: '⭐' },
  { id: 'point_collector', title: 'Master Mind', desc: 'Accumulate over 10,000 total detective points.', icon: '🏆' },
];

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  const unlockedSet = new Set(progress.achievements);
  const unlockedCount = ALL_ACHIEVEMENTS.filter((a) => unlockedSet.has(a.id)).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#11121d] border border-[#2b2d42] rounded-xl shadow-2xl overflow-hidden text-[#e2e0d8] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-[#181a28] border-b border-[#26283b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-serif font-bold text-base text-white tracking-wide">
                DETECTIVE ARCHIVE & COMMENDATIONS
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                {unlockedCount} OF {ALL_ACHIEVEMENTS.length} COMMENDATIONS EARNED
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              onClose();
            }}
            className="p-1 rounded bg-[#25283c] hover:bg-[#323650] text-gray-400 hover:text-white"
            aria-label="Close Achievements"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-5 pt-4 bg-[#0d0e15]">
          <div className="w-full bg-[#1b1c2b] h-2 rounded-full overflow-hidden border border-[#2a2c42]">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / ALL_ACHIEVEMENTS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* List of Badges */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[65vh] bg-[#0d0e15]">
          {ALL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedSet.has(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-lg border flex items-center gap-3.5 transition-all ${
                  isUnlocked
                    ? 'bg-[#151724] border-amber-500/60 shadow-md'
                    : 'bg-[#0f1017] border-[#1f202e] opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl border shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-950/80 border-amber-600 shadow-inner'
                      : 'bg-black/60 border-[#333]'
                  }`}
                >
                  {isUnlocked ? ach.icon : '🔒'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-white">
                      {ach.title}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60">
                        Awarded
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    {ach.desc}
                  </p>
                </div>

                {isUnlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#161826] border-t border-[#232536] text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#25283b] hover:bg-[#323650] text-xs font-serif text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
