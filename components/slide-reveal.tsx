'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Reveals each slide once as it enters the viewport. Motion lives in CSS
// (`[data-slide]` in globals.css); this only flips the attribute.
export function SlideReveal() {
  const path = usePathname();
  useEffect(() => {
    const slides = document.querySelectorAll<HTMLElement>('[data-slide="out"]');
    if (slides.length === 0) return;
    const show = (element: Element) => element.setAttribute('data-slide', 'in');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) {
      slides.forEach(show);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    slides.forEach((slide) => observer.observe(slide));
    const onMotionChange = () => {
      if (!motion.matches) return;
      slides.forEach(show);
      observer.disconnect();
    };
    motion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', onMotionChange);
    };
  }, [path]);
  return null;
}
