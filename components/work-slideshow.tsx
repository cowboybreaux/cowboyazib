'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function WorkSlideshow({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const items = Array.from(scene.querySelectorAll<HTMLElement>('.project'));
    if (reducedMotion.matches || items.length < 2) return;

    let frame = 0;
    const update = () => {
      const total = Math.max(1, scene.offsetHeight - window.innerHeight);
      const progress = Math.min(
        1,
        Math.max(0, -scene.getBoundingClientRect().top / total),
      );
      // Use the first two intervals for the slideshow, then hold the final
      // project while the pinned WORKS section reaches its natural end.
      const position = progress * (items.length - 1 + 0.25);

      items.forEach((item, index) => {
        const local = position - index;
        const enter = Math.min(1, Math.max(0, (local + 0.18) / 0.22));
        const exit = Math.min(1, Math.max(0, (local - 0.68) / 0.32));
        const opacity = Math.min(enter, 1 - exit);
        const translateY = (1 - enter) * 28 - exit * 42;
        item.style.opacity = String(opacity);
        item.style.transform = `translate3d(0, ${translateY}px, 0)`;
        item.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      });
      frame = 0;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      items.forEach((item) => {
        item.style.removeProperty('opacity');
        item.style.removeProperty('transform');
        item.style.removeProperty('pointer-events');
      });
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      id="selected-work"
      className="selected-work work-scene"
    >
      <div className="work-pin">{children}</div>
    </section>
  );
}
