# Tripadvancer frontend — agent context

## Project map

- This repository is the Tripadvancer web frontend (package `tripadvancer_frontend`), built with Next.js App Router, React, TypeScript, and Tailwind CSS.
- Its sibling backend repository is `../backend` (`tripadvancer-backend`), a NestJS API backed by Prisma, PostgreSQL/PostGIS, and Redis. For backend-related work, read `../backend/README.md`, the relevant module under `../backend/src/`, and `../backend/prisma/schema.prisma` before changing assumptions or contracts.
- The user has authorized changes in both the frontend and sibling backend repositories. Make coordinated changes across both when the task requires it, and keep backend schema and DTOs as the source of truth for API contracts.

## Frontend architecture

- Routes live in `src/app/`. Route groups `(portal)` provide the shared header/footer and cover the countries index, country, place, and user pages. `(maps)` contains the full-screen `/maps` experience. `(auth)` contains authentication callbacks and account recovery/deletion flows.
- Feature UI is organized under `src/components/features/` by domain; reusable primitives are in `src/components/ui/`; app-wide client providers are in `src/components/providers/` and `src/app/providers.tsx`.
- Backend-facing client queries use RTK Query. `src/utils/redux/services/api.ts` defines the shared base API; domain endpoints are injected from `src/utils/redux/services/*/*.api.ts`. `src/utils/redux/store.ts` configures the store and persists the `map`, `user`, and `widget` slices in browser storage. Internal Next.js routes use `internalAPI` and `src/app/api/`.
- Server-rendered data helpers are in `src/services/`. They call the backend directly using `NEXT_PUBLIC_API_URL`; authenticated server calls read the `sAccessToken` cookie.
- Auth uses SuperTokens on client and server. Shared configuration is in `src/utils/supertokens/`; account and callback routes are under `src/app/(auth)/auth/`. The backend also configures SuperTokens and its guards.
- Maps use MapLibre through `react-map-gl/maplibre`. Map state and UI state are in `src/utils/redux/features/map-slice.ts` and `widget-slice.ts`. Coordinate helpers and initial map settings are in `src/utils/helpers/maps.ts` and environment variables.
- The site is English-only. Keep user-facing copy directly in the relevant UI/metadata code; do not reintroduce locale routing, translation dictionaries, language switching, or translation libraries.
- `src/components/features/common/json-ld.tsx` safely renders structured data used by the root layout and indexable place/country pages.
- PWA support is configured in `next.config.ts`; global metadata, fonts, analytics, and providers are assembled in `src/app/layout.tsx`.

## Backend overview and integration

- The backend entry point is `../backend/src/main.ts`; it applies the `/api/v1` global prefix, CORS, global DTO validation, and SuperTokens exception handling. Controllers in `../backend/src/` define the actual HTTP behavior.
- Main API domains are `places`, `places-around`, `reviews`, `lists`, `visited`, `users`/`user`, `countries`, `latest`, `search`, `images`, `settings`, and `tasks`. Most business logic is in the corresponding Nest service and query files.
- Prisma models include users, places and photos, reviews and review photos, categories, lists and list-place links, visited places, ratings, countries, complaints, and mailing-list jobs. Place geometry uses PostGIS; migrations are under `../backend/prisma/migrations/`.
- The frontend uses `NEXT_PUBLIC_API_URL` (normally `http://localhost:3001/api/v1`) for the API and `NEXT_PUBLIC_INTERNAL_API_URL` (normally `http://localhost:3000/api`) for Next routes. Authenticated RTK Query calls include cookies; the backend verifies sessions with SuperTokens.
- Cross-check request/response types in `src/utils/redux/services/**/**.types.ts` and `src/utils/types/` against the backend DTOs and service results when changing an endpoint.

## Local workflow and conventions

- Frontend requires Node.js 18+ per README. Typical commands: `npm install`, `npm run dev` (port 3000), `npm run build`, `npm start`, and `npm run lint`.
- Copy `.env.example` to `.env.local` and configure the required variables. Do not commit `.env.local` or expose secret values. Public variables are embedded into the client bundle; only `SUPERTOKENS_CONNECTION_URI` and `SUPERTOKENS_API_KEY` are intended to remain server-side secrets.
- Frontend Docker Compose expects an external Docker network named `tripadvancer_net`; see `docker-compose.yml` and `Dockerfile`.
- Formatting is Prettier with 4 spaces, no semicolons, single quotes, 120-column print width, sorted imports, and Tailwind class sorting. Use the `@/*` alias for imports from `src/`.
- Keep UI changes in the corresponding feature folder and shared controls in `src/components/ui/`. Follow existing TypeScript types and RTK Query cache-tag/optimistic-update patterns when adding or changing data mutations.

## User's coding rules

- Follow the user's existing code style exactly. Inspect nearby code and repository formatting/lint rules before editing.
- Preserve the user's component naming, component decomposition, and ordering conventions for functions, props, and methods. Do not rename or reorganize for personal preference.
- Keep code simple, safe, and readable. Prefer the smallest clear change that solves the task.
- Clean up code touched or reviewed: remove dead code, stale comments, unused imports, and avoidable duplication. Point out worthwhile improvements; apply small, directly relevant improvements when they do not expand scope or complexity.
- Refactor only when needed to make the requested change safe, understandable, or maintainable. Do not refactor for its own sake.
- Check both repositories' Git status before work and preserve unrelated user edits. The user has explicitly authorized changes to both frontend and backend when the task calls for them.
- Do not add or run tests unless the user asks for testing or verification. If the task asks for an audit or verification, use focused checks and report what was and was not verified.

## Repository notes

- The backend README currently mentions the frontend at `http://localhost:5173`; the frontend's current Next.js scripts and Docker mapping use port `3000`.
- Before editing, inspect `git status` and preserve unrelated user changes. Existing local modifications may be present in files outside the scope of a task.
- Do not assume all old API tests remain active: many backend test files are named `*.spec.old.ts`. Inspect the specific test configuration and target before relying on them.

## Country preview illustrations

- Country preview assets are served from `public/images/countries/preview/{country-code-lowercase}.jpg`. Keep generated replacements at 512×512 px and JPEG so they remain compatible with existing paths and cards.
- Check the registry below before generating a country cover. Add a country to it only after its generated image has been saved to the preview directory. Never regenerate a country already marked complete unless the user asks for a revision.
- The country list is dynamic on `/countries`; use the country dictionary and existing preview assets to identify candidates. Work through European countries first, then continue by region.
- Keep each cover a standalone illustration with its landmark centered in the square composition. Do not reserve blank space for a title or caption: the website does not overlay text on these images.

### Corrected generation prompt

```text
Create one standalone illustrated country cover for the Tripadvancer travel catalog.

Country: [COUNTRY]
Landmark: [LANDMARK or AUTO]
Signature details: [1–3 recognizable features or AUTO]
Background colors, top to bottom: [LIGHT HEX] → [DEEP HEX]
Canvas: square 1:1, final asset 512×512 px

SUBJECT
Build the scene around one real landmark in the specified country. If Landmark is AUTO, choose a widely recognized architectural or natural landmark with a distinctive silhouette. Preserve the landmark's actual shape, proportions, and signature details, simplifying fine detail for thumbnail readability. If Signature details are provided, make them clearly visible. Add up to two small elements from the landmark's actual surroundings, such as a cypress tree, a strip of coast, or a rocky slope.

ART DIRECTION
Create a handcrafted miniature diorama with matte painted wood, glazed ceramic accents, and sculpted terrain. Use clean, rounded edges, broad color shapes, and restrained surface texture. Place the scene on a compact terrain base with an irregular outline. Use a three-quarter view from slightly above, near-orthographic perspective, soft studio lighting from the upper left, and a short, soft contact shadow.

COMPOSITION
Center the complete diorama in the middle of the square canvas, balanced on both axes, occupying approximately 62% of canvas width and 68% of its height. Keep a consistent modest margin around it. Fill the canvas edge to edge with a smooth vertical gradient using the supplied colors. This is a standalone illustration: do not reserve a blank area for a title or caption, and do not expect any text overlay. Make the landmark readable at 300 px card width.

SERIES CONSISTENCY
When a Tripadvancer reference cover is attached, match its camera angle, object scale, centered placement, lighting, and material finish. Use the new landmark's real silhouette and the specified background colors.

Output one finished illustration. No text or lettering, flags, logos, people, borders, watermarks, photo textures, photorealism, or collage of landmarks.
```

### Completed country covers

At the latest check, `/countries` displayed 42 country cards while its summary showed 44 countries. The registry also includes Greece from the initial trial and Luxembourg, Malta, and Slovakia requested separately; those four were not among the displayed cards at that check.

| Country | Code | Landmark | Asset |
| --- | --- | --- | --- |
| Armenia | AM | Khor Virap monastery | `public/images/countries/preview/am.jpg` |
| Austria | AT | Schönbrunn Palace | `public/images/countries/preview/at.jpg` |
| Bulgaria | BG | Alexander Nevsky Cathedral | `public/images/countries/preview/bg.jpg` |
| Belgium | BE | Atomium | `public/images/countries/preview/be.jpg` |
| Bahamas | BS | Pink Sands Beach on Harbour Island | `public/images/countries/preview/bs.jpg` |
| Bhutan | BT | Paro Taktsang (Tiger's Nest) | `public/images/countries/preview/bt.jpg` |
| Bosnia and Herzegovina | BA | Stari Most in Mostar | `public/images/countries/preview/ba.jpg` |
| Canada | CA | Moraine Lake in Banff National Park | `public/images/countries/preview/ca.jpg` |
| China | CN | Great Wall at Jinshanling | `public/images/countries/preview/cn.jpg` |
| Cyprus | CY | Petra tou Romiou (Aphrodite's Rock) | `public/images/countries/preview/cy.jpg` |
| Czech Republic | CZ | Charles Bridge | `public/images/countries/preview/cz.jpg` |
| Switzerland | CH | the Matterhorn | `public/images/countries/preview/ch.jpg` |
| Denmark | DK | Nyhavn harbor | `public/images/countries/preview/dk.jpg` |
| Estonia | EE | Tallinn Old Town Hall | `public/images/countries/preview/ee.jpg` |
| Finland | FI | Helsinki Cathedral | `public/images/countries/preview/fi.jpg` |
| Germany | DE | Brandenburg Gate | `public/images/countries/preview/de.jpg` |
| Georgia | GE | Gergeti Trinity Church | `public/images/countries/preview/ge.jpg` |
| Iceland | IS | Kirkjufell mountain and nearby waterfall | `public/images/countries/preview/is.jpg` |
| Ireland | IE | Cliffs of Moher | `public/images/countries/preview/ie.jpg` |
| Indonesia | ID | Borobudur Temple | `public/images/countries/preview/id.jpg` |
| Italy | IT | Colosseum | `public/images/countries/preview/it.jpg` |
| Lithuania | LT | Gediminas Tower | `public/images/countries/preview/lt.jpg` |
| Luxembourg | LU | Bock Casemates and old town of Luxembourg City | `public/images/countries/preview/lu.jpg` |
| Malta | MT | Valletta's Grand Harbour and fortified city walls | `public/images/countries/preview/mt.jpg` |
| Latvia | LV | House of the Black Heads in Riga | `public/images/countries/preview/lv.jpg` |
| Netherlands | NL | Kinderdijk windmills | `public/images/countries/preview/nl.jpg` |
| Norway | NO | Geirangerfjord | `public/images/countries/preview/no.jpg` |
| Poland | PL | Wawel Royal Castle | `public/images/countries/preview/pl.jpg` |
| Qatar | QA | Museum of Islamic Art in Doha | `public/images/countries/preview/qa.jpg` |
| Portugal | PT | Belém Tower | `public/images/countries/preview/pt.jpg` |
| Romania | RO | Peleș Castle | `public/images/countries/preview/ro.jpg` |
| France | FR | Eiffel Tower | `public/images/countries/preview/fr.jpg` |
| Greece | GR | Parthenon | `public/images/countries/preview/gr.jpg` |
| Hong Kong | HK | Victoria Harbour skyline viewed from the Peak | `public/images/countries/preview/hk.jpg` |
| Hungary | HU | Hungarian Parliament Building | `public/images/countries/preview/hu.jpg` |
| Croatia | HR | the Old City of Dubrovnik | `public/images/countries/preview/hr.jpg` |
| Spain | ES | Sagrada Família | `public/images/countries/preview/es.jpg` |
| Serbia | RS | Belgrade Fortress at Kalemegdan | `public/images/countries/preview/rs.jpg` |
| Slovakia | SK | Bratislava Castle | `public/images/countries/preview/sk.jpg` |
| Slovenia | SI | Lake Bled and its island church | `public/images/countries/preview/si.jpg` |
| Sweden | SE | Stockholm City Hall | `public/images/countries/preview/se.jpg` |
| United Kingdom | GB | Tower Bridge | `public/images/countries/preview/gb.jpg` |
| United States | US | Statue of Liberty | `public/images/countries/preview/us.jpg` |
| Turkey | TR | Hagia Sophia | `public/images/countries/preview/tr.jpg` |
| Ukraine | UA | Kyiv Pechersk Lavra | `public/images/countries/preview/ua.jpg` |
| Vatican City | VA | St. Peter's Basilica | `public/images/countries/preview/va.jpg` |

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
