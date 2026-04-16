# Projects Gallery — Layout Experiments

Date: 2026-04-16
Status: Approved design, ready for implementation planning

## Goal

Give Ciara an experimental playground to compare six distinct gallery layouts for the Project Detail page, using her real project data. The existing `/projects/:id` route stays untouched. All experimentation happens behind a new, URL-only `/experiments/:projectId` route that can be pushed to `main` without affecting the public portfolio experience.

The six layouts are intentionally visually distinct so a winner can be chosen by seeing the work through each lens.

## Scope

In scope:

- A new route `/experiments/:projectId` that renders a chosen project through a chosen layout.
- Six layout components (A–F) described below.
- A sticky tab bar (A–F) for flipping layouts and a project dropdown for flipping projects, both reflected in the URL so state is linkable and refresh-safe.
- Mobile support for every layout.
- A `flattenImages` helper that dissolves the existing row-based `project.images` structure into a flat list the new layouts can consume.

Out of scope (for this iteration):

- Changes to `/projects` or `/projects/:id`.
- Auth or password protection on `/experiments`.
- Adding an "experiments" link to the public navbar.
- Analytics / telemetry on which layout performs best.
- Removing layouts once a winner is chosen — that is a follow-up cleanup task.

## Route design

- `/experiments/:projectId?layout=<key>` — primary route.
  - `:projectId` must match an `id` in `projectsData`. Unknown IDs render a not-found screen with a link back to `/experiments`.
  - `layout` is a query param, not a path segment, so the URL reads naturally and tab clicks can update it without a reload.
  - Valid `layout` values: `editorial`, `cinematic`, `runway`, `masonry`, `split-sticky`, `stage`. Anything else falls back to `editorial`.
- `/experiments` (no project) — redirects to `/experiments/<first-featured-project>?layout=editorial`.

The route is registered in `src/App.tsx` alongside the existing routes.

## UI

### Top tab bar (sticky)

Pinned to the top of the page. Contains, left to right:

- The site logo (matches existing `Navbar`) — clicking returns to `/`.
- Six layout tabs: A Editorial · B Cinematic · C Runway · D Masonry · E Split sticky · F Stage. The active tab is visually highlighted. Clicking a tab updates the `layout` query param in place (via `useNavigate({ replace: true })`), so the back button is not polluted.
- A project dropdown on the right listing every project in `projectsData` by title. Selecting a project navigates to `/experiments/<new-id>?layout=<current-layout>`.

On narrow screens (< 720px) the tab bar scrolls horizontally. The project dropdown becomes a compact icon-sized select.

### Layout area

Below the tab bar, one of the six layout components renders full-width. Each layout receives `{ project, images }` and is fully responsible for its own hero, description, and gallery arrangement. None of them share structural code beyond the helper.

## The six layouts

Each layout has both a desktop and a mobile arrangement. Mobile behaviour is described alongside the desktop description.

### A · Editorial magazine

Asymmetric magazine-style rhythm. Mixes split spreads (2-up), triptychs (3-up), full-bleed hero shots, and large italic pull-quotes between image groups.

- Desktop: max-width 1280px container, alternating row shapes — split, pull-quote, bleed, triptych, split — cycling through the image list.
- Mobile: rows collapse to single column. Pull-quotes shrink and stay. Rhythm preserved.

### B · Cinematic scroll-snap

Each image fills the viewport. `scroll-snap-type: y mandatory` snaps between them. Dark background. Caption overlaid at the bottom, progress dots on the right.

- Desktop: 100vh slides.
- Mobile: same behaviour — already built for full-screen. Swipe up advances.

### C · Horizontal runway

Horizontal scrolling strip of tall and wide panels. `scroll-snap-type: x mandatory` snaps each panel to centre. A persistent "drag / scroll →" hint signals interactivity.

- Desktop: panels are 380px tall-portrait and 640px landscape, mixed in sequence.
- Mobile: swipe sideways. Panels narrow to fit screen width. Arrow hint stays visible.

### D · Masonry wall

Pinterest-style staggered CSS columns. Every image visible at once in varied heights. Dense, browsable, portfolio-book feel. Subtle zoom-on-hover.

- Desktop: 3 columns at 1280px.
- Mobile: 2 columns under 900px, 1 column under 500px.

### E · Split sticky scroll

Two columns. Left holds the project title + description pinned sticky. Right streams images vertically.

- Desktop: 1fr / 1.4fr split, 60px gap, `position: sticky` on the aside.
- Mobile: collapses to single column (< 900px). Title and description move above the images; sticky is dropped.

### F · Stage spotlight

Dark theatrical backdrop. One image is centred with a soft radial spotlight and drop shadow. A thumbnail strip below lets viewers jump between images with crossfade. Active thumb has an accent border.

- Desktop: 560px hero area, 80×96px thumbs below.
- Mobile: hero shrinks to ~60vh, thumbnail strip remains horizontally scrollable, tap to switch.

## Component and file layout

- `src/pages/experiments/ExperimentalProjectPage.tsx` — route shell. Parses `:projectId` and `?layout`, renders the tab bar, project dropdown, and active layout.
- `src/pages/experiments/layouts/Editorial.tsx`
- `src/pages/experiments/layouts/Cinematic.tsx`
- `src/pages/experiments/layouts/Runway.tsx`
- `src/pages/experiments/layouts/Masonry.tsx`
- `src/pages/experiments/layouts/SplitSticky.tsx`
- `src/pages/experiments/layouts/Stage.tsx`
- `src/pages/experiments/flattenImages.ts` — helper.
- `src/designs/experiments.css` — shared styles for the tab bar and any cross-layout utilities. All class names prefixed `exp-` to avoid colliding with `Option1.css`.

Each layout file has a sibling `.css` file under `src/designs/experiments/` — one per layout (e.g. `Editorial.css`, `Cinematic.css`). All class names prefixed `.exp-<layout>-*` to prevent collisions.

## Data handling

`project.images` is a mix of `string`, `ProjectImage` objects, and `ProjectRow` objects (from `src/data/projects.ts:7-11`). The existing `buildImageRows` helper in `ProjectDetail.tsx:19-77` preserves the row structure. The new layouts instead receive a flat list.

`flattenImages(project)` returns `ProjectImage[]`:

- Strings become `{ url }`.
- `ProjectImage` objects pass through untouched (credits kept).
- `ProjectRow` objects have their `.images` flattened into the stream in order.
- The hero image (`topHorizontalImage || thumbnailUrl`) is always at index 0 of the returned array. Layouts that render a dedicated hero block (A, E, F) call `.slice(1)` to avoid duplicating it in the gallery. Layouts that don't (B, C, D) pass the full array through and treat the hero as just another image.

The helper lives at `src/pages/experiments/flattenImages.ts` and is pure — straight to unit test.

## Interactions and accessibility

- Tab bar buttons are real `<a>` tags (so Cmd-click opens a new tab) with `aria-current="page"` on the active one.
- The project dropdown is a native `<select>` — simple, keyboard-navigable, accessible out of the box.
- The cinematic layout listens for scroll position inside the snap container to update the active progress dot. Dots themselves are clickable `<button>`s that scroll the matching slide into view.
- The stage layout thumbnail strip uses `<button>` elements with `aria-pressed` for the active one; image transitions are CSS crossfade, no JS animation library.
- All images have `alt` text derived from `${project.title} — image ${i+1}` when no custom alt is provided.

## Edge cases

- Project with zero images: render the hero and description only, plus an "(no gallery yet)" muted note. Applies to Paper Couture and There's a Wocket in my pocket as of 2026-04-16.
- Project with exactly one image: editorial uses a single bleed row; masonry shows one tile full-width of its column; runway shows a single panel; cinematic shows one slide with no progress dots; split-sticky shows one image right of the aside; stage shows the one image with thumbs hidden.
- Unknown `projectId`: render the existing `/projects/:id` not-found style (project not found + link back to `/experiments`).
- Invalid `?layout` value: fall back to `editorial` silently. No error UI.
- Dark themes: layout B (cinematic) and F (stage) are always dark regardless of `project.theme`. Others inherit the project's theme when set.

## Mobile responsiveness checklist

For each layout, the implementation must verify:

- Touch scroll / swipe works smoothly (B, C, F all rely on it).
- No horizontal overflow on a 375px-wide viewport except where intentional (C runway).
- The sticky tab bar does not overlap content (`scroll-margin-top` applied to layout containers where relevant).
- Images never exceed the viewport width.

## Open non-questions

These were considered and explicitly decided:

- No auth or password protection — route is public but unlinked.
- No "experiments" entry in the public navbar — URL access only.
- No telemetry — reviewing layouts is a human decision made by sharing the link.
- Existing `/projects/:id` layout stays exactly as it is; none of this is a replacement until a winner is chosen.

## Success criteria

- Navigating to `/experiments/spaceship-earth?layout=cinematic` shows the Spaceship Earth project rendered through the cinematic scroll-snap layout.
- Clicking each of the six tabs renders the same project through a visually distinct layout, with the URL updating accordingly.
- Switching the project dropdown keeps the active layout and reloads with the new project's images.
- All six layouts render without overflow or broken scroll on a 375px-wide phone and a 1440px desktop.
- Existing `/projects/:id` route is unchanged.
- Nothing in the public navbar links to `/experiments`.
