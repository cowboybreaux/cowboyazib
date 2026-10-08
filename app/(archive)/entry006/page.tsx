import type { Metadata } from 'next';
import { ArchiveStandaloneEntry } from '@/components/archive-entry-view';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: 'ENTRY #003',
  alternates: { canonical: '/entry006/' },
};

export default function Entry006() {
  const entry = archiveEntries.find((item) => item.slug === 'entry006')!;
  return <ArchiveStandaloneEntry entry={entry} />;
}
