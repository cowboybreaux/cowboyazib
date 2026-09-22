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
import { scrollToSection } from '@/lib/section-navigation';

const CLOSE_DURATION_MS = 420;

export function Navigation() {
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
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
      if (pendingSectionRef.current) {
        scrollToSection(pendingSectionRef.current);
        pendingSectionRef.current = null;
      }
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
    header.dataset.brandHidden = 'false';
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
      header.dataset.brandHidden = String(progress === 1);
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
      document.documentElement.style.setProperty('--header-offset', `${height}px`);
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
    pendingSectionRef.current = null;
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
    id: string,
  ) => {
    if (
      event.button !== 0 || event.metaKey || event.ctrlKey ||
      event.shiftKey || event.altKey || !document.getElementById(id)
    ) return;
    event.preventDefault();
    if (isMenuOpen) {
      pendingSectionRef.current = id;
      closeMenu();
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header ref={headerRef} className="masthead">
      <Link
        href="/"
        ref={brandRef}
        className="wordmark"
        aria-label="COWBOY AZIB — Home"
        aria-current={path === '/' ? 'page' : undefined}
        onClick={(event) => handleActiveLinkClick(event, 'hello')}
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
            <Link
              className="menu-link"
              href="/#about-me"
              onClick={(event) => handleActiveLinkClick(event, 'about-me')}
              onKeyDown={closeOnEscape}
            >
              <span className="menu-index">01</span>
              <span className="menu-label">About me</span>
              <span className="menu-arrow" aria-hidden="true" />
            </Link>
            <Link
              className="menu-link"
              href="/#selected-work"
              onClick={(event) => handleActiveLinkClick(event, 'selected-work')}
              onKeyDown={closeOnEscape}
            >
              <span className="menu-index">02</span>
              <span className="menu-label">Work</span>
              <span className="menu-arrow" aria-hidden="true" />
            </Link>
            <Link
              className="menu-link"
              href="/#skills"
              onClick={(event) => handleActiveLinkClick(event, 'skills')}
              onKeyDown={closeOnEscape}
            >
              <span className="menu-index">03</span>
              <span className="menu-label">Skills</span>
              <span className="menu-arrow" aria-hidden="true" />
            </Link>
            <Link href="/archive/" className="menu-link" onKeyDown={closeOnEscape}>
              <span className="menu-index">04</span>
              <span className="menu-label">Archive</span>
              <span className="menu-arrow" aria-hidden="true" />
            </Link>
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
