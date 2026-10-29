import type { PlayerProgress } from '../types/game';

const STORAGE_KEY = 'shadow_case_progress_v1';

const DEFAULT_PROGRESS: PlayerProgress = {
  unlockedCases: [1], // Case 1 is unlocked initially
  completedCases: {},
  totalScore: 0,
  hintsRemaining: 5,
  achievements: [],
  settings: {
    soundEnabled: true,
    ambientRain: true,
    soundVolume: 0.5,
    lowPerformanceMode: false,
    textSpeed: 'normal',
  },
};

export function loadPlayerProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      settings: {
        ...DEFAULT_PROGRESS.settings,
        ...(parsed.settings || {}),
      },
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function savePlayerProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Could not save progress to localStorage', err);
  }
}

export function resetPlayerProgress(): PlayerProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  return { ...DEFAULT_PROGRESS };
}
