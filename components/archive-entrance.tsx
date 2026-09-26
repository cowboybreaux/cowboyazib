'use client';

import { useEffect } from 'react';

const TYPE_DURATION_MS = 1404;
const ARCHIVE_INTRO_PLAYED_KEY = 'archiveIntroPlayed';

function hasPlayedArchiveIntro() {
  try {
    return window.sessionStorage.getItem(ARCHIVE_INTRO_PLAYED_KEY) === 'true';
  } catch {
    return false;
  }
}

function isArchiveRefresh() {
  try {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;

    return navigationEntry?.type === 'reload';
  } catch {
    return false;
  }
}

function markArchiveIntroAsPlayed() {
  try {
    window.sessionStorage.setItem(ARCHIVE_INTRO_PLAYED_KEY, 'true');
  } catch {
    // Continue with the visual intro if session storage is unavailable.
  }
}

export function ArchiveEntrance() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const alreadyPlayed = hasPlayedArchiveIntro() && !isArchiveRefresh();

    if (alreadyPlayed) {
      root.dataset.archiveEntrance = 'done';
      return;
    }

    markArchiveIntroAsPlayed();

    if (reducedMotion.matches) {
      root.dataset.archiveEntrance = 'done';
      return;
    }

    root.dataset.archiveEntrance = 'typing';
    const revealTimer = window.setTimeout(() => {
      root.dataset.archiveEntrance = 'done';
    }, TYPE_DURATION_MS);

    return () => {
      window.clearTimeout(revealTimer);
      delete root.dataset.archiveEntrance;
    };
  }, []);

  return null;
}
