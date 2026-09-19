import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/content';
import { Arrow } from '@/components/site';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.name ?? 'Project not found',
    description: project?.description,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next =
    projects.length > 1
      ? projects[(projects.indexOf(project) + 1) % projects.length]
      : null;
  return (
    <main id="main" tabIndex={-1}>
      <div className="back-link">
        <Link className="text-link" href="/#selected-work">
          <span aria-hidden="true">←</span> All work
        </Link>
      </div>
      <header className="case-header">
        <p className="eyebrow accent">{project.category}</p>
        <h1>{project.name}</h1>
        <p className="page-deck">{project.description}</p>
      </header>
      <div className="case-meta">
        <div>
          <span className="eyebrow">Status</span>
          <p>{project.status}</p>
        </div>
        <div>
          <span className="eyebrow">Toolkit</span>
          <p>{project.tech.join(' / ')}</p>
        </div>
        <div>
          <span className="eyebrow">Focus</span>
          <p>{project.note}</p>
        </div>
      </div>
      <article className="case-body">
        <p className="draft-note">
          {project.placeholder
            ? 'Illustrative project — replace with a real build.'
            : 'Case study draft · Full story to come.'}
        </p>
        <section>
          <span className="eyebrow accent">01 / The question</span>
          <h2>{project.question}</h2>
        </section>
        <section>
          <span className="eyebrow accent">02 / The approach</span>
          <h2>How it comes together</h2>
          <p>{project.approach}</p>
          {!project.placeholder && (
            <ol className="system-flow">
              <li>
                <strong>Data</strong>
                <span>Malaysia’s open-data feeds &amp; GTFS-Realtime</span>
              </li>
              <li>
                <strong>Backend</strong>
                <span>Custom routes connecting the data to the app</span>
              </li>
              <li>
                <strong>Interface</strong>
                <span>Next.js &amp; Google Maps</span>
              </li>
            </ol>
          )}
        </section>
        <section>
          <span className="eyebrow accent">03 / Next</span>
          <h2>Still to come</h2>
          <p>{project.next}</p>
        </section>
      </article>
      {next && (
        <div className="next-piece">
          <span className="eyebrow muted">Next project</span>
          <Link href={`/projects/${next.slug}`}>
            {next.name} <Arrow />
          </Link>
        </div>
      )}
    </main>
  );
}
