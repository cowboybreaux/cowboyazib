'use client';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const CLOSE_DURATION_MS = 420;

export function Navigation() {
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeMenu = useCallback(() => {
    if (!isMenuOpen) return;
    setIsClosing(true);
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, CLOSE_DURATION_MS);
  }, [isMenuOpen]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [path]);

  useEffect(() => {
    const header = headerRef.current;
    const brand = brandRef.current;
    const entrance = document.getElementById('hello');
    if (!header || !brand) return;
    header.dataset.compact = 'false';
    if (!entrance) return;

    let observedHeight = -1;
    let travelDistance = 1;
    let iconTravel = 0;
    const updateBrand = () => {
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / travelDistance),
      );
      header.style.setProperty(
        '--brand-shift',
        `${iconTravel * progress}px`,
      );
      header.dataset.compact = String(progress >= 0.98);
    };
    const measure = () => {
      const icon = brand.querySelector('img');
      if (icon) {
        header.style.setProperty('--icon-origin', `${icon.offsetLeft}px`);
        header.style.setProperty(
          '--icon-travel',
          `${-brand.offsetLeft - icon.offsetLeft}px`,
        );
        iconTravel = -brand.offsetLeft - icon.offsetLeft;
      }
      const height = header.getBoundingClientRect().height;
      if (height === observedHeight) return;
      observedHeight = height;
      travelDistance = Math.max(1, entrance.offsetHeight - height);
      updateBrand();
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(header);
    resize.observe(brand);
    window.addEventListener('scroll', updateBrand, { passive: true });

    return () => {
      resize.disconnect();
      window.removeEventListener('scroll', updateBrand);
    };
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen && !isClosing ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isClosing]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const menu = menuRef.current;
      if (!menu || !isMenuOpen) return;
      if (event.target instanceof Node && !menu.contains(event.target)) {
        closeMenu();
      }
    };
    const handleFocusOut = (event: FocusEvent) => {
      const menu = menuRef.current;
      if (!menu || !isMenuOpen) return;
      if (
        event.relatedTarget instanceof Node &&
        !menu.contains(event.relatedTarget)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('focusin', handleFocusOut);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('focusin', handleFocusOut);
    };
  }, [closeMenu, isMenuOpen]);

  const openMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    setIsClosing(false);
    setIsMenuOpen(true);
  };

  const closeOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return;
    closeMenu();
    event.currentTarget.closest('button')?.focus();
  };

  const handleActiveLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    selector: string,
  ) => {
    event.preventDefault();
    closeMenu();
    window.setTimeout(() => {
      const target = document.querySelector(selector);
      const lenis = window.__cowboyLenis;
      if (lenis && target instanceof HTMLElement) {
        lenis.scrollTo(target, {
          offset: -(headerRef.current?.getBoundingClientRect().height ?? 0),
          duration: 1.15,
        });
      } else {
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, CLOSE_DURATION_MS + 30);
  };

  return (
    <header ref={headerRef} className="masthead">
      <Link
        href="/"
        ref={brandRef}
        className="wordmark"
        aria-label="COWBOY AZIB — Home"
        aria-current={path === '/' ? 'page' : undefined}
      >
        <span className="wordmark-text">COWBOY AZIB</span>
        <Image
          src="/icon.png"
          alt="Cowboy riding a bucking horse"
          width={588}
          height={600}
          className="nav-logo"
          loading="eager"
        />
      </Link>

      <div
        ref={menuRef}
        className={['header-menu', isMenuOpen ? 'is-open' : '', isClosing ? 'is-closing' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <button
          type="button"
          className="menu-toggle"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
          onKeyDown={closeOnEscape}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          aria-label="Main navigation"
          className="menu-panel"
          aria-hidden={!isMenuOpen && !isClosing}
        >
          <div className="menu-inner">
            <button type="button" className="menu-link is-inactive" aria-label="About is not yet available">
              <span className="menu-index">01</span>
              <span className="menu-label">About</span>
            </button>
            <Link
              className="menu-link"
              href="/#selected-work"
              onClick={(event) => handleActiveLinkClick(event, '#selected-work')}
              onKeyDown={closeOnEscape}
            >
              <span className="menu-index">02</span>
              <span className="menu-label">Work</span>
              <span className="menu-arrow" aria-hidden="true" />
            </Link>
            <Link
              className="menu-link"
              href="/#skills"
              onClick={(event) => handleActiveLinkClick(event, '#skills')}
              onKeyDown={closeOnEscape}
            >
              <span className="menu-index">03</span>
              <span className="menu-label">Skills</span>
              <span className="menu-arrow" aria-hidden="true" />
            </Link>
            <button type="button" className="menu-link is-inactive" aria-label="Archive is not yet available">
              <span className="menu-index">04</span>
              <span className="menu-label">Archive</span>
            </button>
            <button type="button" className="menu-link is-inactive" aria-label="Contact is not yet available">
              <span className="menu-index">05</span>
              <span className="menu-label">Contact</span>
            </button>
          </div>

          <div className="menu-footer" aria-label="Site information">
            <span>KUALA LUMPUR, MY</span>
            <span>PORTFOLIO / ARCHIVE</span>
          </div>
        </nav>
      </div>

    </header>
  );
}
