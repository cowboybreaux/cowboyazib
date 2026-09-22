import type { Metadata } from 'next';
import Link from 'next/link';
import './archive.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://archive.cowboyazib.com'),
  title: {
    default: 'ARCHIVE',
    template: 'ARCHIVE – %s',
  },
  description: 'Personal entries by Cowboy Azib.',
  robots: { index: true, follow: true },
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="archive-document" suppressHydrationWarning>
      <body>
        <script
          id="archive-entrance-prepaint"
          dangerouslySetInnerHTML={{
            __html:
              "try{if((location.pathname==='/archive'||location.pathname==='/archive/')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.archiveEntrance='typing'}}catch(e){}",
          }}
        />
        <a className="archive-skip" href="#archive-main">
          Skip to writing
        </a>
        <div className="archive-shell">
          <header className="archive-header">
            <Link href="/" aria-label="Return to the Cowboy Azib main page">
              <span aria-hidden="true">★</span>
              COWBOY AZIB
              <span aria-hidden="true">★</span>
            </Link>
          </header>
          {children}
          <footer className="archive-footer">
            <span>THE PERSONAL ARCHIVE</span>
            <span aria-hidden="true">*</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
