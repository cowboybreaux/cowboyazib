import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { writings } from '@/lib/content';
import { Arrow } from '@/components/site';
export const dynamicParams = false;
export function generateStaticParams() {
  return writings.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const writing = writings.find((p) => p.slug === slug);
  return {
    title: writing?.title ?? 'Writing not found',
    description: writing?.excerpt,
  };
}
export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writing = writings.find((p) => p.slug === slug);
  if (!writing) notFound();
  const next = writings[(writings.indexOf(writing) + 1) % writings.length];
  return (
    <main id="main" tabIndex={-1}>
      <div className="back-link">
        <Link className="text-link" href="/media#writing">
          <span aria-hidden="true">←</span> Back to writing
        </Link>
      </div>
      <article className="reading-page">
        <header>
          <div className="writing-meta">
            <span>{writing.kind}</span>
            <time dateTime={writing.dateISO}>{writing.date}</time>
            <span>1 min read</span>
          </div>
          <h1>{writing.title}</h1>
          <p className="draft-note">
            Sample text and date · Not an original piece by Azib.
          </p>
        </header>
        <div
          className={
            writing.kind === 'Poetry' ? 'reading-body poem' : 'reading-body'
          }
        >
          {writing.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <span className="end-mark" aria-label="End of piece">
          ＊
        </span>
        <div className="next-piece">
          <span className="eyebrow muted">Next from the notebook</span>
          <Link href={`/media/writing/${next.slug}`}>
            {next.title} <Arrow />
          </Link>
        </div>
      </article>
    </main>
  );
}
