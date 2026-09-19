'use client';

import { useLayoutEffect, useRef, useState } from 'react';

// Tune the entrance here. Durations are milliseconds; sizes are viewport units.
const ENTRANCE = {
  fadeIn: 650, // stars fade from 0 to 1 before they travel
  duration: 2000, // outward flight to the viewport edges
  easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
  starSize: 2.1, // vmin, clamped below
  spacing: 1, // cluster tightness, 1 = default
  edgeInset: 'clamp(12px, 2vmin, 24px)', // inset for the four resting stars
  handoff: 0.45, // flight fraction at which the hero begins
};
const EDGE_STARS = ['top', 'left', 'right', 'bottom'] as const;
const STAR =
  '50,0 61.23,34.55 97.55,34.55 68.16,55.9 79.39,90.45 ' +
  '50,69.1 20.61,90.45 31.84,55.9 2.45,34.55 38.77,34.55';
const starStyle = { width: `clamp(7px, ${ENTRANCE.starSize}vmin, 22px)` };
const insetStyle = {
  '--edge-star-inset': ENTRANCE.edgeInset,
} as React.CSSProperties;
const vertices = Array.from({ length: 10 }, (_, i) => {
  const angle = -Math.PI / 2 + (i * Math.PI) / 5;
  const radius = i % 2 === 0 ? 1 : 0.382;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
});
const stars = [1, 0.48].flatMap((radius, ring) =>
  vertices.flatMap((point, i) => {
    const next = vertices[(i + 1) % vertices.length];
    const count = ring === 0 ? 3 : 2;
    return Array.from({ length: count }, (_, j) => ({
      x: (point.x + ((next.x - point.x) * j) / count) * radius,
      y: (point.y + ((next.y - point.y) * j) / count) * radius,
    }));
  }),
);
// Lets the hero stagger begin once the stars have cleared the middle.
function releasePage() {
  document.documentElement.dataset.entrance = 'done';
}

export function StarEntrance() {
  const overlay = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    const element = overlay.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || typeof element.animate !== 'function') {
      releasePage();
      setFinished(true);
      return;
    }
    // Re-arm before paint so a client-side return to the homepage replays the
    // sequence instead of showing an already-settled hero.
    document.documentElement.dataset.entrance = 'pending';
    let animations: Animation[] = [];
    let timeout: ReturnType<typeof setTimeout>;
    let handoff: ReturnType<typeof setTimeout>;
    const finish = () => {
      releasePage();
      setFinished(true);
    };
    const onMotionChange = () => {
      if (motion.matches) finish();
    };
    motion.addEventListener('change', onMotionChange);
    const frame = requestAnimationFrame(() => {
      element.style.visibility = 'visible';
      const total = ENTRANCE.fadeIn + ENTRANCE.duration;
      const flight = {
        duration: ENTRANCE.duration,
        delay: ENTRANCE.fadeIn,
        easing: ENTRANCE.easing,
        // Hold the cluster's starting positions throughout the fade-in delay.
        fill: 'both' as const,
      };
      const stage = element.querySelector<HTMLElement>('.star-entrance-stage')!;
      const backdrop = element.querySelector<HTMLElement>(
        '.star-entrance-backdrop',
      )!;
      animations = [
        // Phase one: the cluster simply appears.
        stage.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: ENTRANCE.fadeIn,
          easing: 'ease-out',
          fill: 'forwards',
        }),
        // The cover clears while the stars are already on their way out.
        backdrop.animate(
          [
            { opacity: 1, offset: 0 },
            {
              opacity: 1,
              offset: (ENTRANCE.fadeIn + ENTRANCE.duration * 0.1) / total,
            },
            {
              opacity: 0,
              offset: (ENTRANCE.fadeIn + ENTRANCE.duration * 0.6) / total,
            },
            { opacity: 0, offset: 1 },
          ],
          { duration: total, easing: 'linear', fill: 'forwards' },
        ),
      ];
      element
        .querySelectorAll<SVGElement>('.entrance-star')
        .forEach((star, i) => {
          const { x, y } = stars[i];
          const length = Math.hypot(x, y);
          const start =
            `translate(calc(-50% + ${x * 18 * ENTRANCE.spacing}vmin), ` +
            `calc(-50% + ${y * 18 * ENTRANCE.spacing}vmin)) scale(1)`;
          const outward =
            `translate(calc(-50% + ${(x / length) * 85}vmax), ` +
            `calc(-50% + ${(y / length) * 85}vmax)) scale(1.65)`;
          // Four stars settle at the viewport midpoints; the others fly away.
          const destinations: Record<number, string> = {
            0: 'translate(-50%, calc(-50% - 50dvh + var(--edge-star-inset)))',
            24: 'translate(calc(-50% - 50vw + var(--edge-star-inset)), -50%)',
            6: 'translate(calc(-50% + 50vw - var(--edge-star-inset)), -50%)',
            15: 'translate(-50%, calc(-50% + 50dvh - var(--edge-star-inset)))',
          };
          const end = destinations[i] ?? outward;
          animations.push(
            star.animate([{ transform: start }, { transform: end }], flight),
          );
        });
      Promise.all(animations.map((animation) => animation.finished))
        .then(finish)
        .catch(() => {});
      handoff = setTimeout(
        releasePage,
        ENTRANCE.fadeIn + ENTRANCE.duration * ENTRANCE.handoff,
      );
      timeout = setTimeout(finish, total + 150);
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      clearTimeout(handoff);
      animations.forEach((animation) => animation.cancel());
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  if (finished)
    return (
      <div className="edge-stars" aria-hidden="true" style={insetStyle}>
        {EDGE_STARS.map((side) => (
          <svg
            key={side}
            className={`edge-star edge-star-${side}`}
            viewBox="0 0 100 100"
            focusable="false"
            style={starStyle}
          >
            <polygon points={STAR} fill="#D1001F" />
          </svg>
        ))}
      </div>
    );
  return (
    <div
      ref={overlay}
      className="star-entrance"
      aria-hidden="true"
      style={insetStyle}
    >
      <div className="star-entrance-backdrop" />
      <div className="star-entrance-stage">
        {stars.map((_, i) => (
          <svg
            key={i}
            className="entrance-star"
            viewBox="0 0 100 100"
            focusable="false"
            style={starStyle}
          >
            <polygon points={STAR} fill="#D1001F" />
          </svg>
        ))}
      </div>
    </div>
  );
}
