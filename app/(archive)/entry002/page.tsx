import type { Metadata } from 'next';
import { ArchiveStandaloneEntry } from '@/components/archive-entry-view';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: '#002',
  alternates: { canonical: '/entry002/' },
};

export default function Entry002() {
  const entry = archiveEntries.find((item) => item.slug === 'entry002')!;
  return <ArchiveStandaloneEntry entry={entry} />;
}
