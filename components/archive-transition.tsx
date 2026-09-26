'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';

type ArchiveTransitionDetails = {
  href: string;
  title: string;
  date: string;
  panel: ReactNode;
  origin: { x: number; y: number; width: number; height: number };
};

type ArchiveTransitionState = ArchiveTransitionDetails & {
  phase: 'opening' | 'expanded' | 'closing';
};

type ArchiveTransitionStart = (
  details: ArchiveTransitionDetails,
  event?: MouseEvent<HTMLAnchorElement>,
) => void;

type ArchiveTransitionController = {
  open: ArchiveTransitionStart;
  close: () => void;
};

const ArchiveTransitionContext =
  createContext<ArchiveTransitionController | null>(null);

export function useArchiveTransition() {
  return useContext(ArchiveTransitionContext);
}

export function ArchiveTransition({ children }: { children: ReactNode }) {
  const [transition, setTransition] = useState<ArchiveTransitionState | null>(
    null,
  );

  const startTransition = useCallback<ArchiveTransitionStart>(
    (details, event) => {
      if (
        event?.metaKey ||
        event?.ctrlKey ||
        event?.shiftKey ||
        event?.altKey
      ) {
        return;
      }

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (reducedMotion) {
        window.location.href = details.href;
        return;
      }

      document.documentElement.dataset.archiveTransition = 'open';
      setTransition({ ...details, phase: 'opening' });

      window.requestAnimationFrame(() => {
        setTransition((current) =>
          current?.phase === 'opening'
            ? { ...current, phase: 'expanded' }
            : current,
        );
      });
    },
    [],
  );

  const closeTransition = useCallback(() => {
    if (!transition || transition.phase === 'closing') {
      return;
    }

    document.documentElement.dataset.archiveTransition = 'closing';
    setTransition({ ...transition, phase: 'closing' });
  }, [transition]);

  useEffect(() => {
    if (!transition || transition.phase === 'closing') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTransition();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeTransition, transition]);

  useEffect(() => {
    if (!transition || transition.phase !== 'closing') return;

    const cleanupTimer = window.setTimeout(() => {
      delete document.documentElement.dataset.archiveTransition;
      setTransition(null);
    }, 560);

    return () => window.clearTimeout(cleanupTimer);
  }, [transition]);

  return (
    <ArchiveTransitionContext.Provider
      value={{ open: startTransition, close: closeTransition }}
    >
      {children}
      {transition && (
        <div
          className="archive-transition"
          data-phase={transition.phase}
          aria-hidden={transition.phase === 'closing'}
          style={
            {
              '--archive-origin-x': `${transition.origin.x}px`,
              '--archive-origin-y': `${transition.origin.y}px`,
              '--archive-origin-width': `${transition.origin.width}px`,
              '--archive-origin-height': `${transition.origin.height}px`,
            } as React.CSSProperties
          }
        >
          <button
            className="archive-transition-backdrop"
            type="button"
            aria-label="Close private entry"
            onClick={closeTransition}
          />
          <dialog
            className="archive-transition-window"
            aria-modal="true"
            aria-label={`${transition.title}, private entry`}
            open
          >
            <header className="archive-window-chrome">
              <span className="archive-window-status">
                <span aria-hidden="true">◌</span>
                PRIVATE NOTE
              </span>
              <button
                className="archive-window-close"
                type="button"
                onClick={closeTransition}
              >
                CLOSE <span aria-hidden="true">×</span>
              </button>
            </header>
            <div className="archive-window-content">
              <div className="archive-window-document">{transition.panel}</div>
            </div>
          </dialog>
        </div>
      )}
    </ArchiveTransitionContext.Provider>
  );
}
