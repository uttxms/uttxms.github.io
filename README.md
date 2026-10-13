# uttamsharma.com

Uttam Sharma's personal website. Built with [Astro](https://astro.build) and hosted on GitHub Pages.

The site has a home page (name, portrait, about, a gallery preview and contact links) and a full `/gallery` page with a year filter and a full-screen photo viewer.

## Run it locally

You need Node.js 22 or newer.

```sh
npm install
npm run dev       # live preview at http://localhost:4321
npm run build     # builds the site into dist/
npm run preview   # serves the built site
```

## Change the text and links

Edit [src/data/site.ts](src/data/site.ts). It holds the tagline, the About paragraphs and the contact links. To add a link, add a line to `links`.

## Add a photo

1. Remove location data from the original first. Photos straight from a phone usually carry exact GPS coordinates, and the originals in this folder are public on GitHub.
   ```sh
   exiftool -all= photo.jpg
   ```
2. Copy the file into [src/photos/](src/photos/). Use lowercase names with hyphens, like `stanley-park.jpg`.
3. Add one entry to [src/data/photos.ts](src/data/photos.ts):
   ```ts
   { file: 'stanley-park.jpg', place: 'Stanley Park, Vancouver', date: '2025-11', alt: 'Describe the photo for screen readers', focus: '50% 40%' },
   ```
   - `place` and `date` (`YYYY-MM`) become the caption under the photo.
   - `alt` is the description read aloud to people using screen readers.
   - `focus` is optional. It sets which part of the photo stays in view when it is cropped to a square tile, for example `'25% 40%'` for left of centre. The full-screen viewer always shows the whole photo.

Photos sort newest first by `date`. The home page shows the 6 newest. The gallery page shows all of them and adds a filter button for each year.

The build resizes every photo to small webp files and removes all metadata from the published copies.

## Deploy

Pushing to `main` publishes the site through [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

One-time setup in the repo on GitHub: Settings, Pages, Source set to **GitHub Actions**. [public/CNAME](public/CNAME) points the site at uttamsharma.com.

## Where things are

| Path | What it holds |
| --- | --- |
| [src/data/site.ts](src/data/site.ts) | Tagline, About text, links |
| [src/data/photos.ts](src/data/photos.ts) | The list of photos and captions |
| [src/photos/](src/photos/) | Original photo files |
| [src/pages/index.astro](src/pages/index.astro) | Home page layout and styles |
| [src/pages/gallery.astro](src/pages/gallery.astro) | Gallery page and year filter |
| [src/components/](src/components/) | Photo tile and full-screen viewer |
| [src/styles/global.css](src/styles/global.css) | Colours, fonts and the photo hover effect |
| [public/](public/) | Favicon, CNAME, robots.txt |
| [public/og.jpg](public/og.jpg) | Preview image shown when the link is shared |

## Colours and fonts

Colours are defined at the top of [src/styles/global.css](src/styles/global.css): near-black oxblood background, crimson `#a30f26` for the name block, and a lighter coral for links and hover states. Headings use Big Shoulders Display and body text uses DM Sans, both installed through npm.
