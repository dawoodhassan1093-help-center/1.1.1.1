import type { CaseData, Difficulty, VerdictEvaluation, PlayerProgress } from '../types/game';

/**
 * Validates a single mystery case for logical consistency, required fields, and solvability.
 */
export function validateCaseLogic(caseData: CaseData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!caseData.id || caseData.id < 1 || caseData.id > 100) {
    errors.push(`Case #${caseData.id}: ID must be between 1 and 100.`);
  }

  if (!caseData.title || caseData.title.trim().length < 3) {
    errors.push(`Case #${caseData.id}: Title is empty or too short.`);
  }

  if (!caseData.difficulty || !['Easy', 'Hard', 'Impossible'].includes(caseData.difficulty)) {
    errors.push(`Case #${caseData.id}: Invalid difficulty "${caseData.difficulty}".`);
  }

  if (!caseData.victim || !caseData.victim.name || !caseData.victim.causeOfDeath) {
    errors.push(`Case #${caseData.id}: Victim data missing or incomplete.`);
  }

  if (!caseData.suspects || caseData.suspects.length < 3) {
    errors.push(`Case #${caseData.id}: Must have at least 3 suspects, found ${caseData.suspects?.length || 0}.`);
  }

  const suspectIds = new Set<string>();
  for (const suspect of caseData.suspects || []) {
    if (!suspect.id || suspectIds.has(suspect.id)) {
      errors.push(`Case #${caseData.id}: Duplicate or missing suspect ID "${suspect.id}".`);
    }
    suspectIds.add(suspect.id);

    if (!suspect.name || suspect.name.trim() === '') {
      errors.push(`Case #${caseData.id}: Suspect has blank name.`);
    }
    if (!suspect.motive || suspect.motive.trim() === '') {
      errors.push(`Case #${caseData.id}: Suspect "${suspect.name}" has no motive recorded.`);
    }
    if (!suspect.alibi || suspect.alibi.trim() === '') {
      errors.push(`Case #${caseData.id}: Suspect "${suspect.name}" has no alibi recorded.`);
    }
    if (!suspect.questions || suspect.questions.length === 0) {
      errors.push(`Case #${caseData.id}: Suspect "${suspect.name}" has no interrogation questions.`);
    }
  }

  if (!caseData.evidence || caseData.evidence.length < 3) {
    errors.push(`Case #${caseData.id}: Must have at least 3 evidence items, found ${caseData.evidence?.length || 0}.`);
  }

  const evidenceIds = new Set<string>();
  for (const ev of caseData.evidence || []) {
    if (!ev.id || evidenceIds.has(ev.id)) {
      errors.push(`Case #${caseData.id}: Duplicate or missing evidence ID "${ev.id}".`);
    }
    evidenceIds.add(ev.id);
    if (!ev.title || !ev.description || !ev.forensicNote) {
      errors.push(`Case #${caseData.id}: Evidence "${ev.id}" missing title, description or forensicNote.`);
    }
  }

  if (!caseData.solution) {
    errors.push(`Case #${caseData.id}: Solution missing entirely.`);
  } else {
    if (!suspectIds.has(caseData.solution.culpritId)) {
      errors.push(`Case #${caseData.id}: Solution culpritId "${caseData.solution.culpritId}" does not match any suspect.`);
    }
    if (!evidenceIds.has(caseData.solution.criticalEvidenceId)) {
      errors.push(`Case #${caseData.id}: Solution criticalEvidenceId "${caseData.solution.criticalEvidenceId}" does not exist in evidence list.`);
    }
    if (!caseData.solution.fullDeduction || caseData.solution.fullDeduction.trim().length < 10) {
      errors.push(`Case #${caseData.id}: Full deduction explanation is missing or trivial.`);
    }
  }

  if (!caseData.hints || caseData.hints.length === 0) {
    errors.push(`Case #${caseData.id}: Hints array is empty.`);
  }

  if (!caseData.timeline || caseData.timeline.length < 2) {
    errors.push(`Case #${caseData.id}: Timeline needs at least 2 entries.`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculates player score (0 - 1000) based on difficulty, time elapsed, hints used, and evidence uncovered.
 */
export function calculateScore(
  difficulty: Difficulty,
  timeSeconds: number,
  hintsUsed: number,
  evidenceFoundCount: number,
  totalEvidenceCount: number,
  isCorrect: boolean
): number {
  if (!isCorrect) {
    // Partial consolation points for thorough investigation even if verdict was wrong
    const discoveryRatio = totalEvidenceCount > 0 ? evidenceFoundCount / totalEvidenceCount : 0;
    return Math.round(150 * discoveryRatio);
  }

  const basePoints = difficulty === 'Easy' ? 600 : difficulty === 'Hard' ? 800 : 1000;
  
  // Hint penalties (50 pts per hint)
  const hintPenalty = Math.min(hintsUsed * 60, 200);

  // Time bonus / penalty: target time 180s (3m). Extra time reduces score slightly
  let timeScore = 200;
  if (timeSeconds > 300) {
    const overtime = timeSeconds - 300;
    timeScore = Math.max(50, 200 - Math.floor(overtime / 10) * 5);
  } else if (timeSeconds < 120) {
    timeScore += 50; // Quick deduction speed bonus
  }

  // Evidence completeness bonus (up to 150 pts)
  const evidenceBonus = totalEvidenceCount > 0 
    ? Math.round((evidenceFoundCount / totalEvidenceCount) * 150)
    : 100;

  const finalScore = Math.max(250, basePoints - hintPenalty + timeScore + evidenceBonus);
  return Math.min(1000, finalScore);
}

/**
 * Translates score to 1, 2, or 3 stars.
 */
export function getStarsForScore(score: number): number {
  if (score >= 850) return 3;
  if (score >= 600) return 2;
  if (score >= 200) return 1;
  return 0;
}

/**
 * Evaluates the player's final accusation against the ground truth case solution.
 */
export function evaluateVerdict(
  caseData: CaseData,
  selectedCulpritId: string,
  selectedEvidenceId: string,
  selectedMethod?: string
): VerdictEvaluation {
  const culpritCorrect = selectedCulpritId === caseData.solution.culpritId;
  const evidenceCorrect = selectedEvidenceId === caseData.solution.criticalEvidenceId;
  
  // Method is considered correct if culprit is right, or if method substring matches
  let methodCorrect = false;
  if (selectedMethod && selectedMethod.trim().length > 0) {
    const cleanInput = selectedMethod.toLowerCase();
    const cleanGround = caseData.solution.murderWeaponOrMethod.toLowerCase();
    methodCorrect = cleanGround.includes(cleanInput) || cleanInput.includes(cleanGround) || culpritCorrect;
  } else {
    methodCorrect = culpritCorrect;
  }

  const isCorrect = culpritCorrect && evidenceCorrect;

  // Compute score
  const score = calculateScore(
    caseData.difficulty,
    180, // Default baseline for test evaluation
    0,
    caseData.evidence.length,
    caseData.evidence.length,
    isCorrect
  );

  const stars = getStarsForScore(score);

  return {
    isCorrect,
    score,
    stars,
    accuracyBreakdown: {
      culpritCorrect,
      evidenceCorrect,
      methodCorrect,
    },
    culpritName: caseData.solution.culpritName,
    explanation: caseData.solution.fullDeduction,
    endingStory: caseData.solution.endingStory,
  };
}

/**
 * Format elapsed seconds as MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Evaluates and returns any newly unlocked achievements based on current player progress.
 */
export function evaluateAchievements(
  currentAchievements: string[],
  completedCasesCount: number,
  totalScore: number,
  threeStarCount: number,
  solvedImpossible: boolean
): string[] {
  const unlocked = new Set<string>(currentAchievements);

  if (completedCasesCount >= 1) {
    unlocked.add('first_bloodhound');
  }
  if (completedCasesCount >= 10) {
    unlocked.add('veteran_gumshoe');
  }
  if (completedCasesCount >= 30) {
    unlocked.add('master_of_easy');
  }
  if (completedCasesCount >= 70) {
    unlocked.add('hardboiled_detective');
  }
  if (completedCasesCount >= 100) {
    unlocked.add('legendary_sherlock');
  }
  if (threeStarCount >= 5) {
    unlocked.add('eagle_eye');
  }
  if (solvedImpossible) {
    unlocked.add('impossible_solved');
  }
  if (totalScore >= 10000) {
    unlocked.add('point_collector');
  }

  return Array.from(unlocked);
}
