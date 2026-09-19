// All replaceable content lives here. Illustrative records are explicitly labelled.
export type Project = {
  slug: string;
  name: string;
  liveUrl?: string;
  category: string;
  status: string;
  description: string;
  tech: string[];
  note: string;
  placeholder: boolean;
  question: string;
  approach: string;
  next: string;
};
export const projects: Project[] = [
  {
    slug: 'rapidkl-companion',
    name: 'RapidKL Companion',
    liveUrl: 'https://rapidkl-companion-git-main-cowboys5.vercel.app',
    category: 'Web application / Public transport',
    status: 'In progress · sample status',
    description:
      'A lightweight transit companion designed to make navigating RapidKL feel less fragmented, bringing buses, trains, nearby hubs, and the in-between parts of the journey into one simple experience.',
    tech: ['Next.js', 'Google Maps', 'GTFS-Realtime'],
    note: 'Open data, made useful.',
    placeholder: false,
    question: 'How can open transit data make everyday journeys easier?',
    approach:
      'Custom backend routes connect Malaysia’s open-data feeds and GTFS-Realtime to a Next.js interface with Google Maps.',
    next: 'Project story, screenshots, technical decisions, and links to come.',
  },
];
export type Writing = {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  kind: string;
  excerpt: string;
  body: string[];
};
export const writings: Writing[] = [
  {
    slug: 'self-help-books-published-under-pseudonym',
    title: 'self help books published under pseudonym',
    date: '06 Sep 2026',
    dateISO: '2026-09-06',
    kind: 'Poetry',
    excerpt: 'somewhere, someone is learning to begin again.',
    body: [
      'i leave the instructions\non the kitchen table\nunder a name\ni have not learned to answer to.',
      'somewhere, someone is learning\nto begin again.\ni hope they leave a little room\nin the margins.',
    ],
  },
  {
    slug: 'land-of-a-thousand-fires',
    title: 'land of a thousand fires',
    date: '28 Aug 2026',
    dateISO: '2026-08-28',
    kind: 'Poetry',
    excerpt: 'we kept a light on for the things that never came home.',
    body: [
      'the evening gathers\nwhat the afternoon forgot—\na window, a road,\nthe last small warmth of the day.',
      'we kept a light on\nfor the things\nthat never came home.',
    ],
  },
  {
    slug: 'notes-from-the-last-train',
    title: 'notes from the last train',
    date: '12 Aug 2026',
    dateISO: '2026-08-12',
    kind: 'Short prose',
    excerpt: 'A few thoughts between one station and the next.',
    body: [
      'The carriage is almost empty. Every window holds a second version of the person beside it, looking out at a city that keeps arriving in pieces.',
      'I make a note on my phone. It is not a good note yet. But there is something about the distance between stations that makes an unfinished thought feel like enough.',
    ],
  },
];
export type MediaRecord = {
  title: string;
  creator: string;
  note: string;
  state: string;
  date: string;
};
export const media: Record<string, MediaRecord[]> = {
  Listening: [
    {
      title: 'An album on repeat',
      creator: 'Artist to add',
      note: 'A record I keep returning to.',
      state: 'On repeat',
      date: 'Sep 2026',
    },
  ],
  Reading: [
    {
      title: 'A book with dog-eared pages',
      creator: 'Author to add',
      note: 'Sentences worth keeping.',
      state: 'Currently reading',
      date: 'Sep 2026',
    },
  ],
  Watching: [
    {
      title: 'The last film that stayed with me',
      creator: 'Director to add',
      note: 'What stayed after the credits.',
      state: 'Recently watched',
      date: 'Aug 2026',
    },
  ],
};
export const experience = [
  {
    dates: 'Current / dates to add',
    role: 'Retail / current role',
    company: 'Employer to add',
    description: 'Role and responsibilities to add.',
    lessons: [
      'Customer communication and day-to-day responsibilities',
      'A concrete example of what you learned',
    ],
  },
  {
    dates: 'Earlier / dates to add',
    role: 'Previous role or placement',
    company: 'Organisation to add',
    description: 'Earlier work details to add.',
    lessons: [
      'Your contribution and responsibilities',
      'A useful outcome or lesson',
    ],
  },
];
