import Link from 'next/link';
import { Arrow } from '@/components/site';
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="page-intro">
      <p className="eyebrow accent">404 / A loose page</p>
      <h1>Nothing here just yet.</h1>
      <p className="page-deck">This page has moved or doesn’t exist.</p>
      <Link className="text-link mt-8" href="/">
        Back to the homepage <Arrow />
      </Link>
    </main>
  );
}
