# WALLBREAKER — The Living Wall

An experimental Three.js gallery of motivational speeches and legendary moments.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

Deploy the `dist` folder to Cloudflare Pages or Vercel. For Cloudflare Pages: framework preset Vite, build command `npm run build`, output directory `dist`. This repository being public does **not** automatically put the website online.

## Status

- Interactive Three.js stone monument gallery; drag, zoom, category filtering, search, random selection and fly-to navigation.
- 44 curated moments spanning sports, commencement speeches, history, film, animation, and real-life interviews.
- Selected monument opens scrollable quote popup and links to YouTube **search results**, not verified original source videos.
- Short titles/excerpts are explicitly identified. **Complete verified quotations have not been added.**
- **Auto portraits:** Wikimedia/Wikipedia article thumbnails are fetched in the browser where available, displayed on monuments and in popups. This depends on image availability and browser CORS. Other entries retain initials placeholders. No curated portrait files have been uploaded.
- Prototype only; browser build, runtime, and licensing review pending.

## Add portraits

Put appropriately sourced image files under `public/portraits/` (e.g., `kobe-bryant.webp`). In `src/data.js`, set each moment's `portrait` field to `/portraits/kobe-bryant.webp`. Reuse a portrait for multiple moments of the same speaker. The portrait is applied both to the monument and to the popup. Preserve a source/rights inventory alongside your art.

Use caution because the repository and future hosting are **public**. Personal experimentation does not automatically clear third-party image rights or speeches for redistribution.

## Complete quotations

Each moment in `src/data.js` has `fullQuote: null` until a verified, appropriately sourced quote is added. The popup supports long quotations and line breaks. Use `sourceUrl` for verified original video links when available.

## Next steps

1. Curate recognizable portraits and track source / usage terms.
2. Verify original video links and exact attributions.
3. Populate permitted full-quote text.
4. Improve real 3D stone geometry, material textures, and camera transitions.
5. Test WebGL performance and mobile usability before deployment.

## Portrait loading

The current site attempts an article-thumbnail lookup for each unique speaker using `wikiTitle` in `src/data.js`; these images are fetched at runtime rather than committed to the repository. This is best-effort and does not guarantee every character gets an image. For reliable portraits, store appropriately licensed image assets under `public/portraits/` and change `portrait` in `src/data.js` from `null` to the local URL. Review third-party image licensing and attributions before public use.

## Embedded speech videos

Click **WATCH ORIGINAL MOMENT** inside a speaker popup to open an in-page YouTube player. Linked videos play within a cinematic overlay and stop when closed (Escape, X, or click outside). Four original/related direct YouTube clips have been associated with Kobe Bryant, Ray Lewis, Mike Tyson, and Rocky Balboa. Remaining monuments display an in-page notice and an optional YouTube search link until a specific video URL has been checked and added. Some videos may block embedding at their uploader's discretion. Add vetted `sourceUrl` values in `src/data.js` to expand video coverage.

## Editorial Explore mode

WALLBREAKER now opens in an editorial Explore view: a featured story, browsable portrait cards, searchable archive, mentality filters, and direct video buttons. Use the **EXPLORE / THE WALL** switch in the header to enter the original interactive Three.js wall. Clicking **EXPLORE** on a moment flies to its monument and opens its speaker detail. **WATCH** opens the in-page video modal when a direct source is available, or explains that an original clip still needs curating. The editorial layout adapts to narrower/mobile displays.

## October 2026 archive expansion

17 new sourced moments were added, bringing the archive to **44 moments**. Each new entry has a contextual summary and a source/reference URL under the popup's **READ ORIGINAL QUOTE SOURCE** link. New additions include Goggins, Jocko Willink, Jim Valvano, McRaven, Steve Jobs, Jordan, Denzel Washington, Inky Johnson, Serena Williams, Brené Brown, Roosevelt, Kennedy, Yoda, Mufasa, Rengoku, All Might and Maya Angelou. Verified original/related YouTube clips were linked where a concrete ID was available; the remaining moments use video-search fallback.

The original 3D wall dynamically adapts to the 7-column gallery. Selected public-domain historical speech excerpts for Roosevelt and Kennedy are displayed in expanded form. Other quotations remain short sourced excerpts and themes rather than unauthorized speech transcripts.

### Editorial/source review

Some source references are event transcripts or credible coverage rather than a video hosted by the original speaker. Auto-loaded photographs are still provisional and should be reviewed for attribution and redistribution rights before broad publication.
