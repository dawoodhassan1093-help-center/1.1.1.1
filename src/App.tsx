import React, { useState, useEffect, useRef } from 'react';
import type {
  CaseData,
  PlayerProgress,
  VerdictEvaluation,
  EvidenceItem,
  Suspect,
  CorkboardNote,
  CorkboardConnection,
} from './types/game';
import { ALL_CASES, getCaseById } from './data/cases';
import { loadPlayerProgress, savePlayerProgress, resetPlayerProgress } from './utils/storage';
import { evaluateVerdict, evaluateAchievements } from './game/rules';
import { detectiveAudio } from './utils/audio';

import { Header } from './components/Header';
import { TitleScreen } from './components/TitleScreen';
import { CaseSelectModal } from './components/CaseSelectModal';
import { CaseBriefingModal } from './components/CaseBriefingModal';
import { CrimeSceneView } from './components/CrimeSceneView';
import { EvidenceLockerView } from './components/EvidenceLockerView';
import { SuspectInterrogationView } from './components/SuspectInterrogationView';
import { DetectiveCorkboardView } from './components/DetectiveCorkboardView';
import { CasebookNotebookView } from './components/CasebookNotebookView';
import { VerdictModal } from './components/VerdictModal';
import { CaseResolutionModal } from './components/CaseResolutionModal';
import { SettingsModal } from './components/SettingsModal';
import { AchievementsModal } from './components/AchievementsModal';
import { TutorialModal } from './components/TutorialModal';
import { TermsModal } from './components/TermsModal';

export default function App() {
  // Player persistence
  const [progress, setProgress] = useState<PlayerProgress>(() => loadPlayerProgress());

  // Navigation & view states
  const [view, setView] = useState<'title' | 'investigation'>('title');
  const [activeTab, setActiveTab] = useState<'scene' | 'evidence' | 'suspects' | 'corkboard' | 'notebook'>('scene');
  const [currentCaseId, setCurrentCaseId] = useState<number>(1);

  // Modals state
  const [isCaseSelectOpen, setIsCaseSelectOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isVerdictOpen, setIsVerdictOpen] = useState(false);
  const [isResolutionOpen, setIsResolutionOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Active case gameplay state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [activeHintText, setActiveHintText] = useState<string | null>(null);
  const [discoveredHotspots, setDiscoveredHotspots] = useState<string[]>([]);
  const [pinnedItems, setPinnedItems] = useState<Array<{ id: string; type: 'suspect' | 'evidence'; title: string; image: string; subtitle: string }>>([]);
  const [corkboardConnections, setCorkboardConnections] = useState<CorkboardConnection[]>([]);
  const [playerNotes, setPlayerNotes] = useState<CorkboardNote[]>([]);
  const [evaluation, setEvaluation] = useState<VerdictEvaluation | null>(null);

  const currentCase = getCaseById(currentCaseId) || ALL_CASES[0];

  // Save progress changes
  useEffect(() => {
    savePlayerProgress(progress);
  }, [progress]);

  // Autostart parameter support for automated test suites and direct links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');
    const caseParam = params.get('case');

    if (caseParam) {
      const parsedId = parseInt(caseParam, 10);
      if (parsedId >= 1 && parsedId <= 100) {
        setCurrentCaseId(parsedId);
      }
    }

    if (autostart === '1' || autostart === 'true') {
      setView('investigation');
      setIsBriefingOpen(false);
      // Pre-mark hotspot 1 for test visibility
      if (currentCase.hotspots[0]) {
        setDiscoveredHotspots([currentCase.hotspots[0].id]);
      }
    }
  }, []);

  // Investigation timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    const isModalActive = isBriefingOpen || isVerdictOpen || isResolutionOpen || isCaseSelectOpen || isSettingsOpen || isTermsOpen;

    if (view === 'investigation' && !isModalActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [view, isBriefingOpen, isVerdictOpen, isResolutionOpen, isCaseSelectOpen, isSettingsOpen, isTermsOpen]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape') {
        setIsBriefingOpen(false);
        setIsVerdictOpen(false);
        setIsCaseSelectOpen(false);
        setIsSettingsOpen(false);
        setIsAchievementsOpen(false);
        setIsTutorialOpen(false);
        setIsTermsOpen(false);
        setActiveHintText(null);
      } else if (view === 'investigation') {
        if (e.key === '1') setActiveTab('scene');
        if (e.key === '2') setActiveTab('evidence');
        if (e.key === '3') setActiveTab('suspects');
        if (e.key === '4') setActiveTab('corkboard');
        if (e.key === '5') setActiveTab('notebook');
        if (e.key.toLowerCase() === 'h') handleUseHint();
        if (e.key.toLowerCase() === 'a') setIsVerdictOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Sound initialization on click / toggle
  const handleToggleSound = () => {
    const next = !progress.settings.soundEnabled;
    detectiveAudio.setEnabled(next);
    setProgress((prev) => ({
      ...prev,
      settings: { ...prev.settings, soundEnabled: next },
    }));
  };

  // Launch a case
  const startCase = (caseId: number) => {
    setCurrentCaseId(caseId);
    setTimerSeconds(0);
    setHintsUsed(0);
    setActiveHintText(null);
    setDiscoveredHotspots([]);
    setPinnedItems([]);
    setCorkboardConnections([]);
    setPlayerNotes([]);
    setEvaluation(null);
    setActiveTab('scene');
    setView('investigation');
    setIsCaseSelectOpen(false);
    setIsBriefingOpen(true);
  };

  // Hotspot discovered
  const handleDiscoverHotspot = (hsId: string) => {
    if (!discoveredHotspots.includes(hsId)) {
      setDiscoveredHotspots((prev) => [...prev, hsId]);
    }
  };

  // Corkboard pin helpers
  const handlePinEvidenceToCorkboard = (ev: EvidenceItem) => {
    if (!pinnedItems.some((item) => item.id === ev.id)) {
      setPinnedItems((prev) => [
        ...prev,
        {
          id: ev.id,
          type: 'evidence',
          title: ev.title,
          image: ev.image,
          subtitle: `Evidence (${ev.category})`,
        },
      ]);
    }
  };

  const handlePinSuspectToCorkboard = (s: Suspect) => {
    if (!pinnedItems.some((item) => item.id === s.id)) {
      setPinnedItems((prev) => [
        ...prev,
        {
          id: s.id,
          type: 'suspect',
          title: s.name,
          image: s.portrait,
          subtitle: `Suspect (${s.role})`,
        },
      ]);
    }
  };

  const handleUnpinItem = (id: string) => {
    setPinnedItems((prev) => prev.filter((item) => item.id !== id));
    setCorkboardConnections((prev) => prev.filter((c) => c.fromId !== id && c.toId !== id));
  };

  const handleAddConnection = (fromId: string, toId: string) => {
    const exists = corkboardConnections.some(
      (c) => (c.fromId === fromId && c.toId === toId) || (c.fromId === toId && c.toId === fromId)
    );
    if (!exists) {
      setCorkboardConnections((prev) => [
        ...prev,
        { id: `conn_${Date.now()}`, fromId, toId },
      ]);
    }
  };

  const handleRemoveConnection = (connId: string) => {
    setCorkboardConnections((prev) => prev.filter((c) => c.id !== connId));
  };

  const handleAddPlayerNote = (note: CorkboardNote) => {
    setPlayerNotes((prev) => [...prev, note]);
  };

  const handleDeletePlayerNote = (id: string) => {
    setPlayerNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Hint logic
  const handleUseHint = () => {
    if (hintsUsed < currentCase.hints.length) {
      const hint = currentCase.hints[hintsUsed];
      setActiveHintText(hint);
      setHintsUsed((prev) => prev + 1);
      detectiveAudio.playClueFound();
    } else {
      setActiveHintText('No more hints available for this case, Detective. Trust your deductions!');
    }
  };

  // Verdict submission
  const handleSubmitVerdict = (culpritId: string, evidenceId: string, method: string) => {
    setIsVerdictOpen(false);
    const evalResult = evaluateVerdict(currentCase, culpritId, evidenceId, method);
    setEvaluation(evalResult);

    if (evalResult.isCorrect) {
      detectiveAudio.playSolvedTriumph();

      // Update progress
      const prevCompleted = progress.completedCases[currentCase.id];
      const newScore = Math.max(prevCompleted?.score || 0, evalResult.score);
      const newStars = Math.max(prevCompleted?.stars || 0, evalResult.stars);

      const nextUnlocked = Array.from(
        new Set([...progress.unlockedCases, currentCase.id, Math.min(100, currentCase.id + 1)])
      );

      const updatedCompleted = {
        ...progress.completedCases,
        [currentCase.id]: {
          score: newScore,
          stars: newStars,
          solvedAt: new Date().toISOString(),
          hintsUsed,
          timeSeconds: timerSeconds,
        },
      };

      const totalSc = Object.values(updatedCompleted).reduce((sum, c) => sum + c.score, 0);
      const threeStarCount = Object.values(updatedCompleted).filter((c) => c.stars === 3).length;
      const solvedImp = Object.keys(updatedCompleted).some((id) => parseInt(id, 10) >= 71);

      const newAchievements = evaluateAchievements(
        progress.achievements,
        Object.keys(updatedCompleted).length,
        totalSc,
        threeStarCount,
        solvedImp
      );

      setProgress((prev) => ({
        ...prev,
        unlockedCases: nextUnlocked,
        completedCases: updatedCompleted,
        totalScore: totalSc,
        achievements: newAchievements,
      }));
    } else {
      detectiveAudio.playDramaticChord();
    }

    setIsResolutionOpen(true);
  };

  // Admin / Settings helper to unlock all cases
  const handleUnlockAllCases = () => {
    const allIds = Array.from({ length: 100 }, (_, i) => i + 1);
    setProgress((prev) => ({
      ...prev,
      unlockedCases: allIds,
    }));
    setIsSettingsOpen(false);
    setIsCaseSelectOpen(true);
  };

  // Reset progress
  const handleResetProgress = () => {
    const fresh = resetPlayerProgress();
    setProgress(fresh);
    setCurrentCaseId(1);
    setView('title');
    setIsSettingsOpen(false);
  };

  // Calculate statistics
  const completedCount = Object.keys(progress.completedCases).length;
  const totalStars = Object.values(progress.completedCases).reduce((sum, c) => sum + c.stars, 0);

  return (
    <div className={`min-h-screen bg-[#07070a] text-[#e5e5e5] flex flex-col ${progress.settings.lowPerformanceMode ? 'low-perf' : ''}`}>
      
      {/* VIEW 1: Cinematic Noir Title Screen */}
      {view === 'title' && (
        <TitleScreen
          onStartGame={() => startCase(currentCaseId)}
          onOpenCaseSelect={() => setIsCaseSelectOpen(true)}
          onOpenAchievements={() => setIsAchievementsOpen(true)}
          onOpenTutorial={() => setIsTutorialOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenTerms={() => setIsTermsOpen(true)}
          soundEnabled={progress.settings.soundEnabled}
          onToggleSound={handleToggleSound}
          completedCount={completedCount}
          totalScore={progress.totalScore}
          totalStars={totalStars}
        />
      )}

      {/* VIEW 2: Active Investigation Screen */}
      {view === 'investigation' && (
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Main Top Header */}
          <Header
            currentCase={currentCase}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            timerSeconds={timerSeconds}
            hintsUsed={hintsUsed}
            onUseHint={handleUseHint}
            onOpenVerdict={() => setIsVerdictOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenCaseSelect={() => setIsCaseSelectOpen(true)}
            soundEnabled={progress.settings.soundEnabled}
            onToggleSound={handleToggleSound}
            discoveredHotspotsCount={discoveredHotspots.length}
            totalHotspotsCount={currentCase.hotspots.length}
          />

          {/* Hint Notification Banner */}
          {activeHintText && (
            <div className="bg-amber-950/90 border-b border-amber-600/70 p-3 px-4 flex items-center justify-between text-xs text-amber-200 z-30 shadow-lg animate-in slide-in-from-top duration-200">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-400">DETECTIVE HINT #{hintsUsed}:</span>
                <span className="font-serif italic">{activeHintText}</span>
              </div>
              <button
                onClick={() => setActiveHintText(null)}
                className="text-amber-400 hover:text-white px-2 py-0.5 rounded bg-black/40 text-xs font-mono"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Main Viewport Content based on activeTab */}
          <main className="flex-1 flex flex-col overflow-hidden relative">
            {activeTab === 'scene' && (
              <CrimeSceneView
                caseData={currentCase}
                discoveredHotspots={discoveredHotspots}
                onDiscoverHotspot={handleDiscoverHotspot}
                onOpenEvidence={(evId) => {
                  setActiveTab('evidence');
                }}
              />
            )}

            {activeTab === 'evidence' && (
              <EvidenceLockerView
                caseData={currentCase}
                onPinToCorkboard={handlePinEvidenceToCorkboard}
                pinnedIds={pinnedItems.map((i) => i.id)}
              />
            )}

            {activeTab === 'suspects' && (
              <SuspectInterrogationView
                caseData={currentCase}
                onPinSuspectToCorkboard={handlePinSuspectToCorkboard}
                pinnedIds={pinnedItems.map((i) => i.id)}
              />
            )}

            {activeTab === 'corkboard' && (
              <DetectiveCorkboardView
                caseData={currentCase}
                pinnedItems={pinnedItems}
                onUnpinItem={handleUnpinItem}
                connections={corkboardConnections}
                onAddConnection={handleAddConnection}
                onRemoveConnection={handleRemoveConnection}
                playerNotes={playerNotes}
                onAddPlayerNote={handleAddPlayerNote}
                onDeletePlayerNote={handleDeletePlayerNote}
              />
            )}

            {activeTab === 'notebook' && (
              <CasebookNotebookView
                caseData={currentCase}
                discoveredHotspotsCount={discoveredHotspots.length}
              />
            )}
          </main>
        </div>
      )}

      {/* MODALS */}

      {/* Case Dossier Modal (Levels 1 to 100) */}
      <CaseSelectModal
        isOpen={isCaseSelectOpen}
        onClose={() => setIsCaseSelectOpen(false)}
        onSelectCase={(id) => startCase(id)}
        progress={progress}
      />

      {/* Case Briefing Dossier Modal */}
      <CaseBriefingModal
        caseData={currentCase}
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
        onCommence={() => setIsBriefingOpen(false)}
      />

      {/* Grand Verdict Accusation Modal */}
      <VerdictModal
        caseData={currentCase}
        isOpen={isVerdictOpen}
        onClose={() => setIsVerdictOpen(false)}
        onSubmitVerdict={handleSubmitVerdict}
      />

      {/* Case Resolution & Forensic Breakdown Modal */}
      {evaluation && (
        <CaseResolutionModal
          caseData={currentCase}
          evaluation={evaluation}
          timeSeconds={timerSeconds}
          hintsUsed={hintsUsed}
          evidenceFoundCount={discoveredHotspots.length}
          onNextCase={() => {
            setIsResolutionOpen(false);
            if (currentCaseId < 100) {
              startCase(currentCaseId + 1);
            }
          }}
          onReplayCase={() => {
            setIsResolutionOpen(false);
            startCase(currentCaseId);
          }}
          onReturnToDossier={() => {
            setIsResolutionOpen(false);
            setIsCaseSelectOpen(true);
          }}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        progress={progress}
        onUpdateSettings={(newSettings) =>
          setProgress((prev) => ({ ...prev, settings: newSettings }))
        }
        onUnlockAllCases={handleUnlockAllCases}
        onResetProgress={handleResetProgress}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        progress={progress}
      />

      {/* Tutorial Manual Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {/* Terms & Conditions Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

    </div>
  );
}
