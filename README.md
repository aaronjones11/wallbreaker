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
- 25 moments, covering 21 unique people or characters.
- Selected monument opens scrollable quote popup and links to YouTube **search results**, not verified original source videos.
- Short titles/excerpts are explicitly identified. **Complete verified quotations have not been added.**
- **Portraits have not been added**: visual initials remain until images are individually sourced.
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
