import React from 'react';
import type { CaseData, VerdictEvaluation } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { Star, CheckCircle2, XCircle, ArrowRight, RotateCcw, FolderOpen, Award } from 'lucide-react';

interface CaseResolutionModalProps {
  caseData: CaseData;
  evaluation: VerdictEvaluation;
  timeSeconds: number;
  hintsUsed: number;
  evidenceFoundCount: number;
  onNextCase: () => void;
  onReplayCase: () => void;
  onReturnToDossier: () => void;
}

export const CaseResolutionModal: React.FC<CaseResolutionModalProps> = ({
  caseData,
  evaluation,
  timeSeconds,
  hintsUsed,
  evidenceFoundCount,
  onNextCase,
  onReplayCase,
  onReturnToDossier,
}) => {
  const isCorrect = evaluation.isCorrect;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-3xl rounded-xl border-2 shadow-2xl overflow-hidden flex flex-col text-[#e2e0d8] ${
          isCorrect
            ? 'bg-[#0f151e] border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.25)]'
            : 'bg-[#181116] border-rose-600/80 shadow-[0_0_50px_rgba(225,29,72,0.25)]'
        }`}
      >
        {/* Banner Header */}
        <div
          className={`p-6 text-center border-b ${
            isCorrect
              ? 'bg-gradient-to-b from-emerald-950/90 to-transparent border-emerald-800/60'
              : 'bg-gradient-to-b from-rose-950/90 to-transparent border-rose-800/60'
          }`}
        >
          <div className="inline-flex p-3 rounded-full mb-3 shadow-xl">
            {isCorrect ? (
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            ) : (
              <XCircle className="w-12 h-12 text-rose-500" />
            )}
          </div>

          <h2 className="font-serif font-black text-2xl sm:text-3xl tracking-widest uppercase text-white mb-1">
            {isCorrect ? 'CASE SOLVED • GUILTY CONVICTION' : 'MISTRIAL • WRONGFUL ACCUSATION'}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#d4af37]">
            CASE #{caseData.id.toString().padStart(3, '0')}: {caseData.title.toUpperCase()}
          </p>

          {/* Golden Stars Rating */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                className={`w-7 h-7 ${
                  i < evaluation.stars
                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                    : 'text-gray-600 fill-none'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[60vh] bg-[#0c0e14]">
          
          {/* Score Breakdown Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#13151f] p-3.5 rounded-lg border border-[#27293b] text-center font-mono text-xs">
            <div>
              <span className="text-gray-400 text-[10px] block uppercase">Final Score</span>
              <span className="font-bold text-lg text-[#d4af37]">{evaluation.score} pts</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block uppercase">Time Elapsed</span>
              <span className="font-bold text-base text-gray-200">
                {Math.floor(timeSeconds / 60)}m {timeSeconds % 60}s
              </span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block uppercase">Hints Consulted</span>
              <span className="font-bold text-base text-amber-400">{hintsUsed} / 3</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block uppercase">Evidence Found</span>
              <span className="font-bold text-base text-emerald-400">
                {evidenceFoundCount} / {caseData.evidence.length}
              </span>
            </div>
          </div>

          {/* Full Forensic Deduction Explanation */}
          <div className="p-4 bg-[#11131c] border border-[#252738] rounded-lg space-y-2">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>OFFICIAL FORENSIC DEDUCTION & RECONSTRUCTION</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 font-serif leading-relaxed">
              {evaluation.explanation}
            </p>
          </div>

          {/* Ending Story Narrative */}
          <div className="p-4 bg-[#0a0c12] border-l-4 border-[#d4af37] rounded space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#d4af37] font-bold">
              CASE CONCLUSION:
            </span>
            <p className="text-xs sm:text-sm text-gray-300 font-serif italic leading-relaxed">
              "{evaluation.endingStory}"
            </p>
          </div>

          {/* Red Herring explanation */}
          <div className="p-3 bg-[#141217] border border-[#31252f] rounded text-xs font-serif text-gray-400">
            <span className="text-rose-400 font-mono font-bold block mb-0.5">
              Red Herring Debunked:
            </span>
            {caseData.redHerring.debunkExplanation}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#11121d] border-t border-[#232536] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                detectiveAudio.playTypewriterClick();
                onReplayCase();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#1c1d2b] hover:bg-[#27293b] text-xs font-serif text-gray-300 hover:text-white border border-[#2f3144] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Investigation</span>
            </button>

            <button
              onClick={() => {
                detectiveAudio.playTypewriterClick();
                onReturnToDossier();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#1c1d2b] hover:bg-[#27293b] text-xs font-serif text-[#d4af37] border border-[#2f3144] transition-colors"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Case Dossier</span>
            </button>
          </div>

          {isCorrect && caseData.id < 100 && (
            <button
              onClick={() => {
                detectiveAudio.playDramaticChord();
                onNextCase();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 text-white font-serif font-bold text-xs tracking-wider shadow-lg border border-emerald-500/80 transition-transform active:scale-95"
            >
              <span>PROCEED TO CASE #{caseData.id + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
