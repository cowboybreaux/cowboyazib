'use client';
import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
export function Navigation() {
  const path = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const brand = brandRef.current;
    const entrance = document.getElementById('hello');
    if (!header || !brand) return;
    header.dataset.compact = 'false';
    if (!entrance) return;

    let boundary: IntersectionObserver | undefined;
    let observedHeight = -1;
    // Measure layout positions, which are unaffected by our transforms.
    const measure = () => {
      const icon = brand.querySelector('img');
      if (icon) {
        header.style.setProperty('--icon-origin', `${icon.offsetLeft}px`);
        header.style.setProperty(
          '--icon-travel',
          `${-brand.offsetLeft - icon.offsetLeft}px`,
        );
      }
      const height = header.getBoundingClientRect().height;
      if (height === observedHeight) return;
      observedHeight = height;
      boundary?.disconnect();
      // The entrance has passed once its bottom clears the sticky header.
      // This uses the visible content area, excluding the header itself.
      boundary = new IntersectionObserver(
        ([entry]) => {
          const compact = String(entry.boundingClientRect.bottom <= height);
          header.dataset.compact = compact;
        },
        { rootMargin: `-${height}px 0px 0px 0px` },
      );
      boundary.observe(entrance);
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(header);
    resize.observe(brand);

    return () => {
      resize.disconnect();
      boundary?.disconnect();
    };
  }, [path]);
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const closeOnFocusOut = (event: FocusEvent) => {
      if (
        event.relatedTarget instanceof Node &&
        !menu.contains(event.relatedTarget)
      ) {
        menu.open = false;
      }
    };
    // WebKit can blur the summary without focusing a clicked link. Closing
    // on that null focus target would remove the link before its click fires.
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false;
      }
    };
    menu.addEventListener('focusout', closeOnFocusOut);
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => {
      menu.removeEventListener('focusout', closeOnFocusOut);
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
    };
  }, []);
  const closeOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return;
    const menu = event.currentTarget.closest('details');
    if (!menu) return;
    menu.open = false;
    menu.querySelector('summary')?.focus();
  };
  const closeOnNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest('details')?.removeAttribute('open');
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
      <details className="header-menu" ref={menuRef}>
        <summary
          className="menu-toggle"
          aria-label="Navigation menu"
          onKeyDown={closeOnEscape}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </summary>
        <nav aria-label="Main navigation">
          <Link
            onKeyDown={closeOnEscape}
            onClick={closeOnNavigate}
            href="/#currently"
          >
            About
          </Link>
          <Link
            onKeyDown={closeOnEscape}
            onClick={closeOnNavigate}
            href="/#selected-work"
          >
            Work
          </Link>
        </nav>
      </details>
      <span className="masthead-note">A personal corner of the internet.</span>
    </header>
  );
}
