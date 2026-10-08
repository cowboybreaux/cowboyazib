import type { Metadata } from 'next';
import { ArchiveStandaloneEntry } from '@/components/archive-entry-view';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: 'archive 260702 0338',
  alternates: { canonical: '/entry005/' },
};

export default function Entry005() {
  const entry = archiveEntries.find((item) => item.slug === 'entry005')!;
  return <ArchiveStandaloneEntry entry={entry} />;
}
