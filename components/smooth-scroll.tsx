'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __cowboyLenis?: Lenis;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    if (reducedMotion.matches) return;

    const touchDevice = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: touchDevice ? 0.16 : 0.1,
      smoothWheel: !touchDevice,
      syncTouch: false,
      touchMultiplier: 1,
      anchors: false,
    });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    window.__cowboyLenis = lenis;
    document.documentElement.classList.add('lenis');
    frame = window.requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.target === '_blank') return;
      const selector = anchor.getAttribute('href');
      if (!selector || selector === '#') return;
      const destination = document.querySelector(selector);
      if (!(destination instanceof HTMLElement)) return;

      event.preventDefault();
      lenis.scrollTo(destination, {
        offset: -(
          document.querySelector('.masthead')?.getBoundingClientRect().height ??
          0
        ),
        duration: 1.15,
      });
    };
    document.addEventListener('click', handleAnchorClick);

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        lenis.destroy();
        window.cancelAnimationFrame(frame);
        delete window.__cowboyLenis;
        document.documentElement.classList.remove('lenis');
      }
    };
    reducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      reducedMotion.removeEventListener('change', handleMotionChange);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__cowboyLenis;
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return null;
}
