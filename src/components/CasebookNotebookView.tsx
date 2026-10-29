import React, { useState } from 'react';
import type { CaseData } from '../types/game';
import { detectiveAudio } from '../utils/audio';
import { Clock, Book, FileText, CheckCircle2, AlertTriangle, Edit3 } from 'lucide-react';

interface CasebookNotebookViewProps {
  caseData: CaseData;
  discoveredHotspotsCount: number;
}

export const CasebookNotebookView: React.FC<CasebookNotebookViewProps> = ({
  caseData,
  discoveredHotspotsCount,
}) => {
  const [notebookTab, setNotebookTab] = useState<'timeline' | 'evidence_log' | 'suspects' | 'notes'>('timeline');
  const [scratchpadText, setScratchpadText] = useState(() => {
    return localStorage.getItem(`scratchpad_case_${caseData.id}`) || '';
  });

  const handleScratchpadChange = (text: string) => {
    setScratchpadText(text);
    try {
      localStorage.setItem(`scratchpad_case_${caseData.id}`, text);
    } catch {}
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0e] text-[#e2e0d8] overflow-hidden">
      
      {/* Notebook Leather Header */}
      <div className="p-3 bg-[#13141f] border-b border-[#25273b] flex flex-wrap items-center justify-between gap-3 px-4 shadow-md">
        <div className="flex items-center gap-2">
          <Book className="w-4 h-4 text-[#d4af37]" />
          <span className="font-serif font-bold text-sm text-white tracking-wide">
            OFFICIAL DETECTIVE CASEBOOK
          </span>
          <span className="text-xs text-gray-400 font-mono">
            // CASE #{caseData.id.toString().padStart(3, '0')}
          </span>
        </div>

        {/* Notebook Sub-Tabs */}
        <div className="flex items-center gap-1 bg-[#0a0b12] p-1 rounded-lg border border-[#232538]">
          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setNotebookTab('timeline');
            }}
            className={`px-3 py-1 rounded text-xs font-serif transition-colors ${
              notebookTab === 'timeline'
                ? 'bg-[#25283d] text-[#f1c40f] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Timeline & Alibis
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setNotebookTab('evidence_log');
            }}
            className={`px-3 py-1 rounded text-xs font-serif transition-colors ${
              notebookTab === 'evidence_log'
                ? 'bg-[#25283d] text-[#f1c40f] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Evidence Catalog
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setNotebookTab('suspects');
            }}
            className={`px-3 py-1 rounded text-xs font-serif transition-colors ${
              notebookTab === 'suspects'
                ? 'bg-[#25283d] text-[#f1c40f] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Suspect Matrix
          </button>

          <button
            onClick={() => {
              detectiveAudio.playTypewriterClick();
              setNotebookTab('notes');
            }}
            className={`px-3 py-1 rounded text-xs font-serif transition-colors ${
              notebookTab === 'notes'
                ? 'bg-[#25283d] text-[#f1c40f] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Scratchpad
          </button>
        </div>
      </div>

      {/* Notebook Body (Paper texture look) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d0e17]">
        <div className="max-w-4xl mx-auto bg-[#141521] border border-[#2b2d42] rounded-xl p-5 sm:p-7 shadow-2xl space-y-6">
          
          {/* TAB 1: Timeline & Alibis */}
          {notebookTab === 'timeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#25273b] pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h3 className="font-serif font-bold text-base text-white">
                    Chronological Timeline of the Crime
                  </h3>
                </div>
                <span className="text-xs font-mono text-gray-400">
                  EST. TIME OF DEATH: {caseData.victim.timeOfDeath}
                </span>
              </div>

              <div className="relative pl-6 border-l-2 border-[#d4af37]/50 space-y-4 my-4 font-mono text-xs">
                {caseData.timeline.map((entry, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node dot */}
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#d4af37] border-2 border-[#141521]" />
                    
                    <div className="p-3 rounded-lg bg-[#0c0d15] border border-[#212336] group-hover:border-[#d4af37]/60 transition-colors">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-[#d4af37]">{entry.time}</span>
                        {entry.verifiedBy && (
                          <span className="text-[10px] text-emerald-400 font-serif">
                            Verified by {entry.verifiedBy}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-200 font-serif text-xs sm:text-sm">
                        {entry.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Red Herring Clarification */}
              <div className="p-3.5 rounded-lg bg-[#181113] border border-red-900/40 text-xs font-serif text-gray-300">
                <span className="font-mono text-red-400 font-bold flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  Detective Advisory on False Leads:
                </span>
                {caseData.redHerring.description}
              </div>
            </div>
          )}

          {/* TAB 2: Evidence Catalog */}
          {notebookTab === 'evidence_log' && (
            <div className="space-y-4">
              <div className="border-b border-[#25273b] pb-3">
                <h3 className="font-serif font-bold text-base text-white">
                  Cataloged Evidence & Forensic Results
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  Items recovered from crime scene and witness interrogations
                </p>
              </div>

              <div className="space-y-3">
                {caseData.evidence.map((ev, idx) => (
                  <div key={ev.id} className="p-3.5 rounded-lg bg-[#0c0d15] border border-[#212336] flex gap-3.5 items-start">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-16 h-16 rounded object-cover border border-[#333] shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-white">
                          #{idx + 1}. {ev.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/60 border border-[#444] text-[#d4af37]">
                          {ev.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 font-serif">
                        {ev.description}
                      </p>
                      <div className="text-[11px] font-mono text-amber-300/90 pt-1">
                        <span className="font-bold text-amber-400">Forensics:</span> {ev.forensicNote}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Suspect Matrix */}
          {notebookTab === 'suspects' && (
            <div className="space-y-4">
              <div className="border-b border-[#25273b] pb-3">
                <h3 className="font-serif font-bold text-base text-white">
                  Suspect Motive & Alibi Comparison Table
                </h3>
              </div>

              <div className="space-y-3">
                {caseData.suspects.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-lg bg-[#0c0d15] border border-[#212336] space-y-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.portrait}
                        alt={s.name}
                        className="w-12 h-12 rounded object-cover border border-[#333]"
                      />
                      <div>
                        <div className="font-serif font-bold text-sm text-white">{s.name}</div>
                        <div className="text-xs text-[#d4af37] font-mono">{s.role} • {s.age} yrs</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif pt-1">
                      <div className="p-2 rounded bg-[#13141f] border border-[#1f2130]">
                        <span className="font-mono text-[10px] text-gray-400 uppercase font-bold block mb-0.5">
                          Alleged Motive:
                        </span>
                        <span className="text-gray-200">{s.motive}</span>
                      </div>
                      <div className="p-2 rounded bg-[#13141f] border border-[#1f2130]">
                        <span className="font-mono text-[10px] text-gray-400 uppercase font-bold block mb-0.5">
                          Reported Alibi:
                        </span>
                        <span className="text-gray-200">{s.alibi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Player Scratchpad */}
          {notebookTab === 'notes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#25273b] pb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#d4af37]" />
                  <h3 className="font-serif font-bold text-base text-white">
                    Detective's Personal Case Notes
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  Auto-saved
                </span>
              </div>

              <p className="text-xs text-gray-400 font-serif">
                Write down your hypothesis, suspect inconsistencies, or timeline deductions.
              </p>

              <textarea
                rows={10}
                value={scratchpadText}
                onChange={(e) => handleScratchpadChange(e.target.value)}
                placeholder="Type your deductions and suspect contradictions here..."
                className="w-full p-3.5 bg-[#0b0c14] border border-[#292b3d] rounded-lg text-xs sm:text-sm font-mono text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#d4af37] leading-relaxed"
              />
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
