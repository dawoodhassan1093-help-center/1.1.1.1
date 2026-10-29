export type Difficulty = 'Easy' | 'Hard' | 'Impossible';

export type EvidenceCategory = 'physical' | 'document' | 'forensic' | 'testimony';

export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  clueId: string;
  description: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  category: EvidenceCategory;
  image: string;
  description: string;
  forensicNote: string;
  discovered?: boolean;
}

export interface SuspectQuestion {
  q: string;
  a: string;
  revealsClue?: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  portrait: string;
  age: number;
  personality: string;
  motive: string;
  alibi: string;
  relationship: string;
  questions: SuspectQuestion[];
}

export interface TimelineEntry {
  time: string;
  event: string;
  verifiedBy?: string;
  suspicious?: boolean;
}

export interface RedHerring {
  description: string;
  misledElement: string;
  debunkExplanation: string;
}

export interface CaseSolution {
  culpritId: string;
  culpritName: string;
  murderWeaponOrMethod: string;
  criticalEvidenceId: string;
  criticalClueSummary: string;
  motivesSummary: string;
  fullDeduction: string;
  endingStory: string;
}

export interface CaseData {
  id: number;
  title: string;
  difficulty: Difficulty;
  category: string;
  locationName: string;
  atmosphere: string;
  victim: {
    name: string;
    role: string;
    causeOfDeath: string;
    timeOfDeath: string;
  };
  synopsis: string;
  crimeSceneImage: string;
  hotspots: Hotspot[];
  evidence: EvidenceItem[];
  suspects: Suspect[];
  timeline: TimelineEntry[];
  redHerring: RedHerring;
  solution: CaseSolution;
  hints: string[];
}

export interface PlayerProgress {
  unlockedCases: number[];
  completedCases: Record<number, {
    score: number;
    stars: number;
    solvedAt: string;
    hintsUsed: number;
    timeSeconds: number;
  }>;
  totalScore: number;
  hintsRemaining: number;
  achievements: string[];
  settings: {
    soundEnabled: boolean;
    ambientRain: boolean;
    soundVolume: number;
    lowPerformanceMode: boolean;
    textSpeed: 'normal' | 'fast' | 'instant';
  };
}

export interface CorkboardNote {
  id: string;
  x: number;
  y: number;
  title: string;
  content: string;
  color: 'yellow' | 'red' | 'blue' | 'aged';
  pinnedEntityId?: string;
}

export interface CorkboardConnection {
  id: string;
  fromId: string;
  toId: string;
  label?: string;
}

export interface VerdictEvaluation {
  isCorrect: boolean;
  score: number;
  stars: number;
  accuracyBreakdown: {
    culpritCorrect: boolean;
    evidenceCorrect: boolean;
    methodCorrect: boolean;
  };
  culpritName: string;
  explanation: string;
  endingStory: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
