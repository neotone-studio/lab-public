# Neotone site

Working repository for the Neotone website: wireframes, mockups, and the documents that explain why the site is shaped the way it is.

Nothing here is production code. Every page is standalone HTML with inline CSS and JavaScript, no build step and no dependencies. Serve any directory and open a page:

```
python3 -m http.server 7899
```

---

## What is current

**`wireframe/current/`** is the live work. Masthead over Tonefield and Instruments, one publication feed with real pieces, an Instruments submenu, a dated Updates archive, the purchase flow, the manual and the legal page.

Everything else is kept for reference and stays browsable by URL, so a past version can be opened alongside the current one while working.

| Path | What it is |
|---|---|
| `wireframe/current/` | **Current.** Tonefield and Instruments under a masthead, Updates archive |
| `wireframe/v3/` | Masthead over Culture, Instrument, Craft. The step between v2 and v4 |
| `wireframe/v2/` | Three wordmark destinations: Neotone, One, neOS. The article system and purchase flow were built here |
| `wireframe/v1/` | Superseded structure. Its `site-structure.md` documents the purchase logic v2 ports |
| `design/v2/` | Visual mockup the current wireframe was built from |
| `design/v1/` | Original scroll-driven colour mockup |
| `archive/` | Early sketches, dead |
| `media/` | Wordmark SVGs and images, referenced as `../../media/…` from any page |

---

## Where to read

**Orientation is here.** Version specific detail is in a `README.md` inside each version folder.

### The documents, in `docs/`

- [A walk through the Neotone site](docs/2026-08-12_🤖_site-walkthrough.md). The design principles as a tour through the site. It walks v2, and most of it holds for v4; the navigation passages are due a rewrite.
- The content structure, the editorial test, and where pieces come from are in the workspace at `../docs/content-strategy-notes/6_neotone-content-structure-v3.md`. Where that and anything here disagree, that one wins.

### Per version

- [`wireframe/current/README.md`](wireframe/current/README.md). What changed from v3, growth, open questions.
- [`wireframe/current/site-structure.md`](wireframe/current/site-structure.md). Component reference for the current build: pages, nav, feed, purchase state, storage keys, what is duplicated. For whoever builds it.
- [`wireframe/v3/README.md`](wireframe/v3/README.md). The masthead decision and the scroll-linked bar.
- [`wireframe/v2/README.md`](wireframe/v2/README.md) and [`site-structure.md`](wireframe/v2/site-structure.md). Where most of the decisions were made; still the fullest record of the purchase flow.
- [`wireframe/v1/site-structure.md`](wireframe/v1/site-structure.md). Full component reference for the superseded build. Still the source for purchase logic.
- [`design/v2/README.md`](design/v2/README.md). The mockup the current wireframe was copied from.
- [`design/v1/README.md`](design/v1/README.md). Describes the original colour-scroll mockup.

---

## Conventions

Documents about the site live in `docs/` and outlive any one build. Documents about a build live with the build. The distinction matters: `site-structure.md` sat inside `wireframe/v1/` and is still referenced by v2, which is the situation this layout avoids repeating.

No em dashes anywhere, including code comments and commit messages.
