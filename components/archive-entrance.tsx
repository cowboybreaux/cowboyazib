'use client';

import { useEffect, useRef } from 'react';

const ARCHIVE_STAR_PLAYED_KEY = 'archiveHeadingStarPlayed';
const STAR_DURATION_MS = 650;

function hasPlayedHeadingStar() {
  try {
    return window.sessionStorage.getItem(ARCHIVE_STAR_PLAYED_KEY) === 'true';
  } catch {
    return false;
  }
}

function markHeadingStarAsPlayed() {
  try {
    window.sessionStorage.setItem(ARCHIVE_STAR_PLAYED_KEY, 'true');
  } catch {
    // The flourish can still play when session storage is unavailable.
  }
}

export function ArchiveHeadingStar() {
  const star = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = star.current;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!element || reducedMotion || hasPlayedHeadingStar()) return;

    markHeadingStarAsPlayed();
    const animation = element.animate(
      [
        {
          opacity: 0,
          transform: 'translate(-42%, 30%) scale(0.25) rotate(-36deg)',
        },
        {
          opacity: 1,
          transform: 'translate(8%, -12%) scale(1.35) rotate(18deg)',
          offset: 0.55,
        },
        { opacity: 1, transform: 'translate(0, 0) scale(1) rotate(0deg)' },
      ],
      {
        duration: STAR_DURATION_MS,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    );

    return () => animation.cancel();
  }, []);

  return (
    <span ref={star} className="archive-title-star" aria-hidden="true">
      ★
    </span>
  );
}
