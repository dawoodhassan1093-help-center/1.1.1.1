import type { CaseData, Difficulty } from '../types/game';
import { EASY_CASES } from './cases/easyCases';
import { HARD_CASES } from './cases/hardCases';
import { IMPOSSIBLE_CASES } from './cases/impossibleCases';

// Exactly 100 uniquely authored cases
export const ALL_CASES: CaseData[] = [
  ...EASY_CASES,       // Cases 1 to 30 (Easy)
  ...HARD_CASES,       // Cases 31 to 70 (Hard)
  ...IMPOSSIBLE_CASES, // Cases 71 to 100 (Impossible)
];

export const TOTAL_CASES = ALL_CASES.length; // 100

export function getCaseById(id: number): CaseData | undefined {
  return ALL_CASES.find((c) => c.id === id);
}

export function getCasesByDifficulty(difficulty: Difficulty): CaseData[] {
  return ALL_CASES.filter((c) => c.difficulty === difficulty);
}
