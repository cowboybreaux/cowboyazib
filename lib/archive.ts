export type ArchiveEntry = {
  number: string;
  slug: string;
  posted: { iso: string; label: string };
  paragraphs: readonly string[];
  embed?: { src: string; title: string };
  attachment?: { src: string; width: number; height: number; alt: string };
  attachmentAfterParagraph?: number;
};

// Keep entry prose verbatim. New entries go first.
export const archiveEntries = [
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
] as const satisfies readonly ArchiveEntry[];
