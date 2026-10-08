import { ArchiveReaderDocument } from '@/components/archive-entry-view';
import ArchiveReaderShell from '@/components/archive-reader-shell';
import { archiveEntries } from '@/lib/archive';

export default function Entry004Reader() {
  const entry = archiveEntries.find((item) => item.slug === 'entry004')!;
  return (
    <ArchiveReaderShell>
      <ArchiveReaderDocument entry={entry} />
    </ArchiveReaderShell>
  );
}
