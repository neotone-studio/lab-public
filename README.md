# Neotone site

Working repository for the Neotone website: wireframes, mockups, and the documents that explain why the site is shaped the way it is.

Nothing here is production code. Every page is standalone HTML with inline CSS and JavaScript, no build step and no dependencies. Serve any directory and open a page:

```
python3 -m http.server 7899
```

---

## What is current

**`wireframe/v2/`** is the live work. Ten pages: three containers, the product page, checkout, two articles, two manual pages, and the legal page. It carries the purchase flow, the wordmark navigation, and the article system.

Everything else is kept for reference and stays browsable by URL, so a past version can be opened alongside the current one while working.

| Path | What it is |
|---|---|
| `wireframe/v2/` | **Current.** Three destinations, article system, purchase flow |
| `wireframe/v1/` | Superseded structure. Its `site-structure.md` documents the purchase logic v2 ports |
| `design/v2/` | Visual mockup the current wireframe was built from |
| `design/v1/` | Original scroll-driven colour mockup |
| `archive/` | Early sketches, dead |
| `media/` | Wordmark SVGs and images, referenced as `../../media/…` from any page |

---

## Where to read

**Orientation is here.** Version specific detail is in a `README.md` inside each version folder.

### The documents, in `docs/`

- [Why the site is built this way](docs/2026-08-11_🤖_why-three-destinations.md). The design position: three destinations, where the writing comes from, how the site talks, and six questions that can be asked of any music company's site. Read this first.
- [Wireframe principles](docs/2026-08-03_🤖_wireframe-principles.md). The numbered principles the wireframe is built against. Where it and any other document disagree, this one wins.
- [Three destinations, summary](docs/2026-08-12_🤖_three-destinations-summary.md). Short form of the argument.

### Per version

- [`wireframe/v2/README.md`](wireframe/v2/README.md). Why the current build is the way it is: decisions, rejected alternatives, open questions.
- [`wireframe/v2/site-structure.md`](wireframe/v2/site-structure.md). What the current build contains: component reference, state, storage keys, and behaviour that is not obvious from the markup. Read alongside the README.
- [`wireframe/v1/site-structure.md`](wireframe/v1/site-structure.md). Full component reference for the superseded build. Still the source for purchase logic.
- [`design/v1/README.md`](design/v1/README.md). Describes the original colour-scroll mockup.

---

## Conventions

Documents about the site live in `docs/` and outlive any one build. Documents about a build live with the build. The distinction matters: `site-structure.md` sat inside `wireframe/v1/` and is still referenced by v2, which is the situation this layout avoids repeating.

No em dashes anywhere, including code comments and commit messages.
