import type { ImageMetadata } from 'astro';

// To add a photo: drop the file in src/photos/ and add one entry below.
// `date` is YYYY-MM (used for sorting and shown as "Month Year").
// `focus` (optional) is the point kept in view when the photo is cropped to a tile, e.g. '25% 40%'.
const files = import.meta.glob<{ default: ImageMetadata }>('../photos/*.{jpg,jpeg,png,webp}', { eager: true });

type Entry = { file: string; place: string; date: string; alt: string; focus?: string };

const entries: Entry[] = [
  { file: 'niagara.jpg', place: 'Niagara Falls, Canada', date: '2026-07', alt: 'Selfie in a red poncho in front of Horseshoe Falls', focus: '35% 40%' },
  { file: 'porteau-cove.jpg', place: 'Porteau Cove, Canada', date: '2026-07', alt: 'Smiling selfie on a rock above turquoise water and forest', focus: '25% 40%' },
  { file: 'toronto.jpg', place: 'Toronto, Canada', date: '2026-07', alt: 'Selfie in front of a window high above the Toronto skyline', focus: '28% 40%' },
  { file: 'shannon-falls.jpg', place: 'Shannon Falls, BC', date: '2026-04', alt: 'Shannon Falls dropping down a granite cliff behind tall cedar trees', focus: '45% 40%' },
  { file: 'sfu-concert-orchestra.jpg', place: 'SFU Concert Orchestra', date: '2024-04', alt: 'The SFU Concert Orchestra posing together on stage with their instruments', focus: '50% 60%' },
  { file: 'kushiro-park.jpg', place: 'Kushiro Park, Burnaby', date: '2024-04', alt: 'View over Burrard Inlet and the North Shore mountains through the trees', focus: '50% 45%' },
  { file: 'fhss-band-award.jpg', place: 'FHSS Band Award', date: '2023-06', alt: 'Holding a Directors Leadership Award plaque and a medal at the Frank Hurt Secondary band concert', focus: '40% 30%' },
  { file: 'brandywine-falls.jpg', place: 'Brandywine Falls, BC', date: '2022-07', alt: 'Brandywine Falls plunging into a misty pool, seen from above', focus: '55% 50%' },
  { file: 'portrait.png', place: 'Stanley Park, Vancouver', date: '2025-11', alt: 'Portrait in a navy jacket and maroon sweater' },
];

const fmt = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const photos = entries
  .map((e) => {
    const mod = files[`../photos/${e.file}`];
    if (!mod) throw new Error(`Missing photo file: src/photos/${e.file}`);
    return { ...e, src: mod.default, year: e.date.slice(0, 4), label: fmt.format(new Date(e.date + '-01')) };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const years = [...new Set(photos.map((p) => p.year))];
