'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

const lead =
  '"Quick, quick, tell me something awful; like you are a poet trapped inside a body of an IT guy!"';
const detail =
  'Full-time IoT student, aspiring data scientist, and part-time retail ' +
  'worker, making everyday tools with software and data.';
let delay = 220;
const phrases = [lead, detail].map((text) =>
  text.split(' ').map((word) => {
    const letters = Array.from(word, (letter) => {
      const at = delay;
      delay += /[.,/]/.test(letter) ? 85 : 19;
      return { letter, at };
    });
    delay += 19;
    return letters;
  }),
);

export function HeroCopy() {
  const paragraph = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = paragraph.current;
    if (!element) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let started = false;
    const show = () => {
      started = true;
      element.dataset.typed = 'done';
    };
    const start = () => {
      if (started) return;
      if (motion.matches || !document.documentElement.dataset.entrance) {
        show();
      } else if (
        visible &&
        document.documentElement.dataset.entrance === 'done'
      ) {
        started = true;
        element.dataset.typed = 'running';
      }
    };
    const entrance = new MutationObserver(start);
    entrance.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-entrance'],
    });
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      visible = true;
      start();
      observer.disconnect();
    });
    observer.observe(element);
    const onMotionChange = () => {
      if (motion.matches) show();
    };
    motion.addEventListener('change', onMotionChange);
    start();
    return () => {
      observer.disconnect();
      entrance.disconnect();
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  const words = (phrase: (typeof phrases)[number]) =>
    phrase.map((letters, wordIndex) => (
      <span key={wordIndex}>
        {wordIndex > 0 ? ' ' : null}
        <span className="typewriter-word">
          {letters.map(({ letter, at }, index) => (
            <span
              key={index}
              className="typewriter-char"
              style={{ '--type-delay': `${at}ms` } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
    ));

  return (
    <p ref={paragraph} className="hero-copy">
      <span className="sr-only">
        <strong>
          <em>{lead}</em>
        </strong>
        <br />
        <br />
        {detail}
      </span>
      <span aria-hidden="true">
        <strong>
          <em>{words(phrases[0])}</em>
        </strong>
        <br />
        <br />
        {words(phrases[1])}
      </span>
    </p>
  );
}
