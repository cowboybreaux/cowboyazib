import { SectionHeading } from './site';

const categories = [
  ['Languages', ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'Python', 'Java']],
  ['Frameworks & Libraries', ['Next.js', 'React', 'Tailwind CSS']],
  ['Databases', ['MySQL', 'PostgreSQL']],
  [
    'AI & Machine Learning',
    ['Random Forest', 'Classification', 'RapidMiner', 'Model Evaluation'],
  ],
  [
    'Tools & Platforms',
    [
      'Git',
      'GitHub',
      'Vercel',
      'Linux',
      'Docker',
      'Podman',
      'Arduino',
      'ESP32',
      'Cisco Packet Tracer',
      'VMware',
    ],
  ],
  ['APIs & Data', ['Google Maps', 'GTFS', 'GTFS-Realtime', 'Blynk']],
] as const;

export function Skills() {
  return (
    <section id="skills" className="skills" aria-label="Skills">
      <div data-slide="out">
        <SectionHeading number="02" title="SKILLS" />
      </div>
      <dl className="skills-list">
        {categories.map(([category, names]) => (
          <div className="skills-row" key={category} data-slide="out">
            <dt className="eyebrow">{category}</dt>
            <dd>{names.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
