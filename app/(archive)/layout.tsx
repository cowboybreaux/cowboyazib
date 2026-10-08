import type { Metadata } from 'next';
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
  reader,
}: {
  children: React.ReactNode;
  reader: React.ReactNode;
}) {
  return (
    <html lang="en" className="archive-document" suppressHydrationWarning>
      <body>
        <a className="archive-skip" href="#archive-main">
          Skip to writing
        </a>
        <div className="archive-shell">
          <header className="archive-header">
            <a
              href="https://cowboyazib.com/"
              aria-label="Return to the Cowboy Azib main page"
            >
              <span aria-hidden="true">★</span>
              COWBOY AZIB
            </a>
            <span>PERSONAL WRITING / 2026</span>
          </header>
          {children}
          <footer className="archive-footer">
            <span>THE PERSONAL ARCHIVE</span>
            <span aria-hidden="true">★</span>
          </footer>
        </div>
        {reader}
      </body>
    </html>
  );
}
