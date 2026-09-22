import type { Metadata } from 'next';
import Link from 'next/link';
import { ArchiveEntryDocument } from '@/components/archive-entry-document';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: '#001',
  alternates: { canonical: '/entry001/' },
};

export default function Entry001() {
  const entry = archiveEntries.find((item) => item.slug === 'entry001')!;
  return (
    <main id="archive-main" className="archive-entry" tabIndex={-1}>
      <nav className="archive-back" aria-label="Archive navigation">
        <Link href="/archive/">← ALL ENTRIES</Link>
      </nav>
      <ArchiveEntryDocument entry={entry} />
      <Link className="archive-end" href="/archive/">
        ← BACK TO ARCHIVE
      </Link>
    </main>
  );
}
