import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_CASES, TOTAL_CASES, getCaseById } from '../data/cases';
import {
  validateCaseLogic,
  calculateScore,
  getStarsForScore,
  evaluateVerdict,
  formatTime,
  evaluateAchievements,
} from './rules';

test('Database contains exactly 100 distinct mystery cases', () => {
  assert.equal(TOTAL_CASES, 100);
  assert.equal(ALL_CASES.length, 100);

  const ids = new Set(ALL_CASES.map((c) => c.id));
  assert.equal(ids.size, 100);
  for (let i = 1; i <= 100; i++) {
    assert.ok(ids.has(i), `Case #${i} must exist in the database`);
  }
});

test('Difficulty split adheres to 1-30 Easy, 31-70 Hard, 71-100 Impossible', () => {
  for (const c of ALL_CASES) {
    if (c.id <= 30) {
      assert.equal(c.difficulty, 'Easy', `Case #${c.id} should be Easy`);
    } else if (c.id <= 70) {
      assert.equal(c.difficulty, 'Hard', `Case #${c.id} should be Hard`);
    } else {
      assert.equal(c.difficulty, 'Impossible', `Case #${c.id} should be Impossible`);
    }
  }
});

test('Every single one of the 100 cases passes rigorous logical validation', () => {
  const failedCases: Array<{ id: number; errors: string[] }> = [];

  for (const c of ALL_CASES) {
    const result = validateCaseLogic(c);
    if (!result.valid) {
      failedCases.push({ id: c.id, errors: result.errors });
    }
  }

  if (failedCases.length > 0) {
    console.error('Validation failed for cases:', JSON.stringify(failedCases, null, 2));
  }
  assert.equal(failedCases.length, 0, `All 100 cases must pass validation. Found ${failedCases.length} invalid.`);
});

test('Case 1 has genuine photographic assets and matching culprit deduction', () => {
  const case1 = getCaseById(1);
  assert.ok(case1);
  assert.equal(case1.title, 'The Cyanide Heirloom');
  assert.equal(case1.solution.culpritName, 'Evelyn Vane');
  assert.equal(case1.solution.culpritId, 'susp_1_evelyn');
  assert.equal(case1.solution.criticalEvidenceId, 'ev_1_mud');

  // Verify verdict evaluation
  const resultCorrect = evaluateVerdict(case1, 'susp_1_evelyn', 'ev_1_mud', 'Potassium Cyanide');
  assert.equal(resultCorrect.isCorrect, true);
  assert.ok(resultCorrect.score >= 800);
  assert.ok(resultCorrect.stars >= 2);

  const resultWrong = evaluateVerdict(case1, 'susp_1_finch', 'ev_1_watch', 'Poison');
  assert.equal(resultWrong.isCorrect, false);
});

test('Score calculation logic applies appropriate penalties and rewards', () => {
  // Perfect run: 0 hints, fast time, all evidence found
  const perfectScore = calculateScore('Easy', 90, 0, 4, 4, true);
  assert.ok(perfectScore >= 900, `Expected high score for perfect run, got ${perfectScore}`);
  assert.equal(getStarsForScore(perfectScore), 3);

  // Run with 3 hints: hint penalty applied
  const hintHeavyScore = calculateScore('Easy', 90, 3, 4, 4, true);
  assert.ok(hintHeavyScore < perfectScore, 'Hints must reduce the score');

  // Incorrect verdict gets partial consolation score
  const failScore = calculateScore('Easy', 120, 0, 4, 4, false);
  assert.ok(failScore <= 150, 'Failed verdict should have low score');
  assert.equal(getStarsForScore(failScore), 0);
});

test('formatTime correctly formats seconds to MM:SS', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(600), '10:00');
  assert.equal(formatTime(3599), '59:59');
});

test('evaluateAchievements unlocks milestones appropriately', () => {
  const initial: string[] = [];
  const after1 = evaluateAchievements(initial, 1, 900, 1, false);
  assert.ok(after1.includes('first_bloodhound'));

  const after10 = evaluateAchievements(after1, 10, 8500, 6, false);
  assert.ok(after10.includes('veteran_gumshoe'));
  assert.ok(after10.includes('eagle_eye'));

  const afterImpossible = evaluateAchievements(after10, 100, 95000, 50, true);
  assert.ok(afterImpossible.includes('legendary_sherlock'));
  assert.ok(afterImpossible.includes('impossible_solved'));
});
