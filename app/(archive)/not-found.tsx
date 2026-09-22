import Link from 'next/link';

export default function ArchiveNotFound() {
  return (
    <main id="archive-main" className="archive-entry" tabIndex={-1}>
      <h1>PAGE NOT FOUND</h1>
      <p className="archive-deck">There is no entry at this address.</p>
      <Link href="/archive/">← BACK TO ARCHIVE</Link>
    </main>
  );
}
