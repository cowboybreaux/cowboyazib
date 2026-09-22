'use client';

import { useEffect } from 'react';

const TYPE_DURATION_MS = 1404;

export function ArchiveEntrance() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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
