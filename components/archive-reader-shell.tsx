'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type ReaderPhase = 'opening' | 'expanded' | 'closing';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function ArchiveReaderShell({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const scrollPosition = useRef(0);
  const closeTimer = useRef<number | undefined>(undefined);
  const [phase, setPhase] = useState<ReaderPhase>('opening');

  const close = useCallback(() => {
    if (phase === 'closing') return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      router.back();
      return;
    }

    setPhase('closing');
    closeTimer.current = window.setTimeout(() => router.back(), 360);
  }, [phase, router]);

  useEffect(() => {
    const activeElement = document.activeElement;
    returnFocus.current =
      activeElement instanceof HTMLElement &&
      activeElement.matches('[data-archive-entry-link]')
        ? activeElement
        : null;
    scrollPosition.current = window.scrollY;

    const shell = document.querySelector<HTMLElement>('.archive-shell');
    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };

    document.documentElement.dataset.archiveReader = 'open';
    shell?.setAttribute('inert', '');
    shell?.setAttribute('aria-hidden', 'true');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    const modal = dialog.current;
    if (modal && !modal.open) modal.showModal();

    const frame = window.requestAnimationFrame(() => {
      setPhase('expanded');
      window.requestAnimationFrame(() => {
        dialog.current
          ?.querySelector<HTMLElement>('[data-reader-close]')
          ?.focus({ preventScroll: true });
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(closeTimer.current);
      delete document.documentElement.dataset.archiveReader;
      if (modal?.open) modal.close();
      shell?.removeAttribute('inert');
      shell?.removeAttribute('aria-hidden');
      Object.assign(document.body.style, previousBodyStyles);
      window.scrollTo(0, scrollPosition.current);
      const focusTarget = returnFocus.current;
      window.requestAnimationFrame(() =>
        focusTarget?.focus({ preventScroll: true }),
      );
    };
  }, []);

  useEffect(() => {
    const matchingTrigger = Array.from(
      document.querySelectorAll<HTMLElement>('[data-archive-entry-link]'),
    ).find((link) => {
      const href = link.getAttribute('href');
      return href
        ? new URL(href, window.location.origin).pathname === pathname
        : false;
    });

    if (!matchingTrigger) return;

    returnFocus.current = matchingTrigger;
    const rect = matchingTrigger.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty(
      '--archive-origin-x',
      `${rect.left + rect.width / 2}px`,
    );
    root.style.setProperty(
      '--archive-origin-y',
      `${rect.top + rect.height / 2}px`,
    );
    root.style.setProperty('--archive-origin-width', `${rect.width}px`);
    root.style.setProperty('--archive-origin-height', `${rect.height}px`);
  }, [pathname]);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== modal) return;

      const bounds = modal.getBoundingClientRect();
      const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (outside) close();
    };

    modal.addEventListener('click', handleBackdropClick);
    return () => modal.removeEventListener('click', handleBackdropClick);
  }, [close]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialog.current) return;

      const focusable = Array.from(
        dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute('disabled'));

      if (!focusable.length) {
        event.preventDefault();
        dialog.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  return (
    <div className="archive-reader" data-phase={phase}>
      <div className="archive-reader-backdrop" aria-hidden="true" />
      <dialog
        ref={dialog}
        className="archive-reader-frame"
        aria-modal="true"
        aria-labelledby="archive-reader-title"
        tabIndex={-1}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <header className="archive-reader-chrome">
          <span>
            <span aria-hidden="true">★</span> MANUSCRIPT
          </span>
          <button type="button" onClick={close} data-reader-close>
            CLOSE <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="archive-reader-scroll">{children}</div>
      </dialog>
    </div>
  );
}
