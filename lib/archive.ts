export type ArchiveEntry = {
  number: string;
  slug: string;
  displayTitle?: string;
  title?: string;
  posted: { iso: string; label: string };
  paragraphs: readonly string[];
  embed?: { src: string; title: string };
  attachment?: { src: string; width: number; height: number; alt: string };
  attachmentAfterParagraph?: number;
};

// Keep entry prose verbatim. Entries are ordered newest first by archive timestamp.
export const archiveEntries: readonly ArchiveEntry[] = [
  {
    number: '002',
    slug: 'entry002',
    posted: { iso: '2026-09-24', label: '24 SEPTEMBER 2026' },
    embed: {
      src: 'https://open.spotify.com/embed/track/01fzY6YKwKQ3LxCpIP6buB?utm_source=generator&si=e91dc92c491f4061',
      title: 'Spotify track player',
    },
    paragraphs: [
      "don't want to get too close i'm scared, do you hate me or do you care?\nthink about all the time i spent\nfeeling lost but i'm found again\nshould i jump in the unknown? is it better know how it unfolds?\nam i too young to be this mad? am i too old to blame my dad?",
      "i'm so confused.",
    ],
  },
  {
    number: '001',
    slug: 'entry001',
    posted: { iso: '2026-09-23', label: '23 SEPTEMBER 2026' },
    embed: {
      src: 'https://open.spotify.com/embed/track/4t9R5rbtovdvya28uMODDz?utm_source=generator&si=f8e73a56e2214fca',
      title: 'Spotify track player',
    },
    paragraphs: [
      'In a state of drainage by the constant failure of simple tasks on a daily, in bed I am defeated and deafen by the loud fan placed across from my room, fresh out the slammer and freshly constructed pavements that were soaked from the bits of not-so-heavy rain on the way home in a bike I called Cowboy. I had $70 in my name and it’s only the 21st and I don’t get paid until the 30th; I put $20 for some propane on Cowboy but the tank refused to cooperate with lines of bikes standing behind me, though I don’t feel pressured by some queue, I was, instead, filling myself up with a quite rage in me, rather the gas in the tank; apart from the card machine from the parking lot at the place I’m working at and the security guard who condescended me over the defect card machine. Sitting on my bike while the key still inside the tank opener, staring at the propane with an audible sigh, “what am I to do”.',
      'Opened the door to my room with one thing in mind: nothing in mind. Rose up at 3 in the morning, staring at the ceiling with a heavy heart and slight derealization and I thought, God, how miserable this life is! As much as I’ve been dismissed, I tried to do the same with such thoughts and distract myself with pornography only to find that, I’m still miserable. I look around to see the things that’s supposed to be bits of me, and it only made the feelings worse. I didn’t even give a single fuck to even pick up my guitar and sing me some melodies, let alone write. The lights from these devices fried my brain apart from these songs gave me headache. I tried to sleep it off, I woke up thinking what a fucking existential crisis I had last night. I spent the rest of the day pretending to be productive and full.',
      'Last week of my calendar was so full of bullshit that I thought I was doing myself a favor, or so I thought now that I’m on to the next one, practically even worse with this whole derealization hanging over me. What am I doing?',
    ],
    attachment: {
      src: '/images/archive/entry001-sky.jpg',
      width: 3024,
      height: 4032,
      alt: 'Pale blue sky with sunlight breaking through clouds',
    },
    attachmentAfterParagraph: 1,
  },
  {
    number: '003',
    slug: 'entry003',
    displayTitle: 'archive 260811 0031',
    posted: { iso: '2026-08-11T00:31:00', label: '11 AUGUST 2026' },
    paragraphs: [
      'a foreign touch never felt so familiar\nlike shadow you’ll go wherever i go\nslick is what you’re lacking for each time i catch you looking at me\nspeak your mind rest your head on my shoulder\na face so distant yet it seemed to be known for a lifetime\nlike moth to flames\nheadlights to deer\nsilence louder than a lover being lured',
    ],
  },
  {
    number: '004',
    slug: 'entry004',
    displayTitle: 'archive 260729 1138',
    posted: { iso: '2026-07-29T11:38:00', label: '29 JULY 2026' },
    paragraphs: [
      'take away my music my poetry\nshallow inside because i have nothing left inside of me\npersonalized souvenir seem deep in the sea\nyou look at me broken, so sad, so poorly\nin the end i always knew empathy will be the death of me\nso please\ntake away my music my manuscript\nwritten under the impression of dignity\ndisguised as poetry',
    ],
  },
  {
    number: '005',
    slug: 'entry005',
    displayTitle: 'archive 260702 0338',
    title: 'bunch of bullshit',
    posted: { iso: '2026-07-02T03:38:00', label: '2 JULY 2026' },
    paragraphs: [
      "put it to bed give it a rest soon you'll be healed glory be the mended but once was tortured heart glorious to and from the same heart that continues to love regardless with regards thee highest for what has been but yet rages with passion and contradictory is a fist filled with resentment that started off as tolerance as the mind plays supercuts to remind the soul that it wouldn't be as it is without... love. bracing for impact means death is imminent but not literal so would a little love be considered destructive or it's just the nature of something considered beautiful unless you know where you will land but if you fall i will catch you from where you stand.",
    ],
  },
] as const;
