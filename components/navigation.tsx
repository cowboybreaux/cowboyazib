'use client';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { scrollToSection } from '@/lib/section-navigation';

const CLOSE_DURATION_MS = 420;
const CONTACT_FADE_DURATION_MS = 180;
const CONTACT_DODGE_DISTANCE = 96;
const CONTACT_DODGE_VERTICAL_DISTANCE = 28;
const CONTACT_DODGE_APPROACH_DISTANCE = 280;


export function Navigation() {
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const contactRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const contactCloseTimerRef = useRef<number | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const contactDodgeCooldownRef = useRef(0);
  const lastPointerTypeRef = useRef<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [contactOffset, setContactOffset] = useState({ x: 0, y: 0 });
  const [isContactReady, setIsContactReady] = useState(false);
  const [isContactWindowOpen, setIsContactWindowOpen] = useState(false);
  const [isContactWindowClosing, setIsContactWindowClosing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const closeMenu = useCallback(() => {
    if (!isMenuOpen) return;
    setIsClosing(true);
    setIsContactWindowOpen(false);
    setIsContactWindowClosing(false);
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
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motion.matches);
      if (motion.matches) {
        setIsContactReady(true);
        setContactOffset({ x: 0, y: 0 });
      }
    };
    updateMotionPreference();
    motion.addEventListener('change', updateMotionPreference);
    return () => motion.removeEventListener('change', updateMotionPreference);
  }, []);

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
      if (
        event.target instanceof Element &&
        event.target.closest('.contact-overlay')
      ) return;
      if (event.target instanceof Node && !menu.contains(event.target)) {
        closeMenu();
      }
    };
    const handleFocusOut = (event: FocusEvent) => {
      const menu = menuRef.current;
      if (!menu || !isMenuOpen) return;
      if (
        event.relatedTarget instanceof Element &&
        event.relatedTarget.closest('.contact-overlay')
      ) return;
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

  useEffect(() => {
    return () => {
      if (contactCloseTimerRef.current) {
        window.clearTimeout(contactCloseTimerRef.current);
      }
    };
  }, []);

  const resetContactEscape = () => {
    contactDodgeCooldownRef.current = 0;
    setContactOffset({ x: 0, y: 0 });
    setIsContactReady(prefersReducedMotion);
  };

  const markContactReady = () => {
    setIsContactReady(true);
    setContactOffset({ x: 0, y: 0 });
  };

  const openContactWindow = () => {
    if (contactCloseTimerRef.current) {
      window.clearTimeout(contactCloseTimerRef.current);
      contactCloseTimerRef.current = null;
    }
    setIsContactWindowClosing(false);
    setIsContactWindowOpen(true);
  };

  const closeContactWindow = () => {
    if (!isContactWindowOpen || isContactWindowClosing) return;
    if (prefersReducedMotion) {
      setIsContactWindowOpen(false);
      setIsContactWindowClosing(false);
      return;
    }
    setIsContactWindowClosing(true);
    if (contactCloseTimerRef.current) {
      window.clearTimeout(contactCloseTimerRef.current);
    }
    contactCloseTimerRef.current = window.setTimeout(() => {
      setIsContactWindowOpen(false);
      setIsContactWindowClosing(false);
      contactCloseTimerRef.current = null;
    }, CONTACT_FADE_DURATION_MS);
  };

  const dodgeContactFromPoint = (
    clientX: number,
    clientY: number,
    pointerType: string,
  ) => {
    if (prefersReducedMotion || isContactReady || pointerType !== 'mouse') return;
    const contact = contactRef.current;
    if (!contact) return;

    const bounds = contact.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const deltaX = centerX - clientX;
    const deltaY = centerY - clientY;
    const distance = Math.hypot(deltaX, deltaY) || 1;
    if (distance > CONTACT_DODGE_APPROACH_DISTANCE) return;

    const now = window.performance.now();
    if (now - contactDodgeCooldownRef.current < 95) return;
    contactDodgeCooldownRef.current = now;

    const x = (deltaX / distance) * CONTACT_DODGE_DISTANCE;
    const y = (deltaY / distance) * CONTACT_DODGE_VERTICAL_DISTANCE;

    setIsContactReady(false);
    setContactOffset({ x, y });
  };

  const dodgeContact = (event: ReactPointerEvent<HTMLElement>) => {
    dodgeContactFromPoint(event.clientX, event.clientY, event.pointerType);
  };

  const openMenu = () => {
    pendingSectionRef.current = null;
    resetContactEscape();
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

  const handleContactClick = () => {
    markContactReady();
    openContactWindow();
  };

  const handleContactKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isContactWindowOpen && event.key === 'Escape') {
      event.preventDefault();
      return;
    }
    closeOnEscape(event);
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    markContactReady();
    openContactWindow();
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
          onPointerMove={(event) => {
            lastPointerTypeRef.current = event.pointerType;
            dodgeContact(event);
          }}
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
            <button
              ref={contactRef}
              type="button"
              className="menu-link menu-contact"
              style={{
                '--contact-dodge-x': `${contactOffset.x}px`,
                '--contact-dodge-y': `${contactOffset.y}px`,
              } as CSSProperties}
              onPointerEnter={(event) => {
                lastPointerTypeRef.current = event.pointerType;
                dodgeContact(event);
              }}
              onPointerMove={(event) => {
                lastPointerTypeRef.current = event.pointerType;
                dodgeContact(event);
              }}
              onPointerLeave={() => {
                if (!isContactReady) setContactOffset({ x: 0, y: 0 });
              }}
              onClick={handleContactClick}
              onKeyDown={handleContactKeyDown}
              aria-haspopup="dialog"
              aria-expanded={isContactWindowOpen}
            >
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

      {isContactWindowOpen && (
        <div
          className="contact-overlay"
          data-state={isContactWindowClosing ? 'closing' : 'open'}
        >
          <button
            type="button"
            className="contact-backdrop"
            aria-label="Close contact window"
            onClick={closeContactWindow}
          />
          <div
            className="contact-window"
            role="dialog"
            aria-modal="false"
            aria-label="Contact"
          >
            <div className="contact-window-bar">
              <span className="contact-window-control contact-window-control-red" aria-hidden="true" />
              <span className="contact-window-control contact-window-control-yellow" aria-hidden="true" />
              <span className="contact-window-control contact-window-control-green" aria-hidden="true" />
            </div>
            <div className="contact-window-body">
              <p>NOT TAKING ON PROJECTS JUST YET. GIVE ME A MINUTE.</p>
              <p>
                HIT MY LINE THO... WHO KNOWS! AHA{' '}
                <a href="mailto:AJIBREAUX@GMAIL.COM">AJIBREAUX@GMAIL.COM</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
