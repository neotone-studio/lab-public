# Neotone Wireframe v2

Working documentation and build plan. Supersedes `v1/site-structure.md`, which remains the reference for purchase logic being ported forward.

Source of principles: `../../2026-08-03_🤖_wireframe-principles.md`. Where this document and that one disagree, that one wins.

---

## What v2 is

v1 was a complete site in one structure: home, One, Treangle, NeOS, Artists, Tonefield, checkout. Its purchase flow is built out and correct. Its information architecture has been superseded.

v2 rebuilds around three destinations ordered by reader state, four page species, and one return mechanism. The purchase machinery ports forward largely intact. The discovery and persuasion material on the old One page does not.

---

## Structure

### Four species of page

| Species | Definition | Instances |
|---|---|---|
| **Article** | An individual piece. Own URL. | All written content |
| **Container** | Holds articles. | Neotone, neOS |
| **Section page** | A page of sections. Carries purchase. | One, later Anima |
| **Utility** | Footer material. | Terms, privacy, contact, FAQ, workshop address |

Nothing is a fifth thing. A page that is none of these is either an article or it does not exist.

### Nav, ordered by reader state

- **Neotone**: you do not have a question
- **One** (later **Anima**): you want to buy one and know what you are buying
- **neOS**: you have a question

Species is how a page is built. Reader state is how the nav is ordered. These axes do not collapse into each other.

The nav is wordmark-only. Every item is a named thing with a mark. **This is a hard constraint with consequences for the port. See Selection below.**

### Nav layout

The nav bar is full-bleed for its background, but its contents sit in `.nav-inner`, which mirrors `.page` exactly: `max-width: var(--max)`, `margin: 0 auto`, `padding: 0 48px`. The marks therefore align to the same left and right boundaries as the bordered content blocks below them (98 and 1182 at a 1280 viewport).

**Default mode** holds three positions at once:

| Constraint | Result at 1280 |
|---|---|
| Neotone's left edge on the content-left boundary | 98 |
| One's centre on the page centre | 640 |
| neOS's right edge on the content-right boundary | 1182 |

One is absolutely centred, which takes it out of the flex flow so `space-between` pins Neotone and neOS to the two boundaries. The gaps are deliberately unequal, because the wordmarks are different widths and all three constraints cannot hold with even spacing. Alignment to the page grid wins over even rhythm.

**Future mode** leaves all four marks in flow with `space-between` across the same boundaries.

**Each mark scales about the edge it is anchored to**: Neotone left, neOS right, One centred. Its anchored edge therefore stays fixed at any scale, so a mark sits in the same place whether it is full size on its own page or reduced on another. Without this, Neotone scaled about its centre on the pages where it is not active and its left edge drifted ~70px inward.

**The active mark is overridden to a left origin**, because it collapses to the left boundary. This matters most for Neotone, which already sits on the content-left boundary and never slides: with a centre origin it drifted right as it shrank during the scale phase and then slid back, which read as a wobble. With a left origin it shrinks in place, measured at 98px across the whole scroll range with zero drift.

It also simplifies the slide. **The collapsed mark lands on the content-left boundary** in both modes, and because marks scale from the left that is just the distance between left edges:

```
slideDistance = leftOf(Neotone) − leftOf(activeMark)
```

Neotone resolves to 0, which is what keeps it anchored. `slideDistance` is cached on first use and reset on resize.

All five pages define `--max`; the three container pages originally did not, which silently made `max-width: var(--max)` invalid and let the nav run full width.

---

### Future-products mode

The nav ships **Neotone · One · neOS**. Anima has not shipped, so it is absent by default and the three remaining marks space across the full bar.

`?future=show` reinstates it, giving a browsable future state of the site:

| URL | Nav |
|---|---|
| `one.html` | Neotone · One · neOS |
| `one.html?future=show` | Neotone · One · Anima · neOS |

Three things make this hold together:

- **The flag propagates.** Every nav click, the checkout CTA, and the checkout back-link carry `?future=show` forward, so the mode survives navigation and the URL stays shareable. Without this it would be a single-page toggle rather than a version of the site.
- **`ACTIVE` is derived, not hardcoded.** Each nav link carries `data-page`, each page declares `const PAGE`, and `ACTIVE` is looked up from the rendered nav. Removing Anima shifts every index after it (neOS is 3 in future mode and 2 by default), so a hardcoded index would point at the wrong mark.
- **`anima.html` self-forces the mode.** A page's own mark must be in the nav or the return mechanism has nothing to return from, so visiting Anima turns future mode on regardless of the URL.

Accepted values: `?future=show` is canonical; any value except `hide`, `0`, or `false` also enables it.

### Return mechanism

Every page returns to its parent. Anything without a parent returns to root. Neotone is root.

The active wordmark shrinks to a masthead as you scroll; clicking it returns. No breadcrumbs, no back links. An article carries its container's mark, so it reads as *inside* its container.

**The exception, and it matters for One:** articles reached from a product-page learn-more stack open in a new tab. Their parent is Neotone, so the masthead would otherwise send someone mid-purchase back to culture. Enriching, not navigating.

This exception decouples One from the entire article system. One can be built to completion before containers, article pages, the JSON index, or scroll restoration exist.

---

## Current state

Four pages: `index.html` (Neotone), `one.html`, `anima.html`, `neos.html`.

Each is the same template with a different `ACTIVE` index. What exists is the nav and its scroll animation:

- Sticky nav, 100px, `overflow: hidden`, four SVG wordmarks at 52px
- Active wordmark scales `1 → 0.58` in place across a 90px scroll range
- Inactive wordmarks lift `-80px` and fade to `opacity: 0` across the same range
- Cross-page entry animation via `sessionStorage` (`prevActive`, `prevIsLanding`), so wordmark scale is continuous across navigation
- Clicking the active wordmark scrolls to top
- Background flat white `#fff`. The scroll-driven colour system and background photograph were removed.

**Background colours tried, kept for reference:**

| Value | Notes |
|---|---|
| `#fff` | current |
| `#f3f0df` | warm cream, used 2026-08-03 |

The nav carries the same value as an opaque background and must be changed with it. There are two occurrences per page.

Neotone, neOS and Anima each carry three placeholder blocks: articles on the two containers, sections on Anima. They are not yet click targets.

Three matches the readers actually named in the content list: neOS has *What is Spatial MIDI?* and *How to build a scale* plus one open slot, and Neotone has three. Principle 23 says nothing goes in the wireframe without a reader, and the extra three on each page had none.

**Entry state is uniform across every page**, landing page included: the page's own mark is full size and every other mark sits at `BASE_SCALE`. Arriving from another page, that page's mark starts full size and shrinks as this one grows, so the marks stay continuous across navigation.

The landing page used to be special-cased, with all four marks rendered full size. That required an `inactiveScale` exception, a `targetScale` exception, a separate `ACTIVE === 0` entry branch, and a `prevIsLanding` flag carried through `sessionStorage`. Removing the exception removed all four.

Mobile is unbuilt and tracked as a parallel workstream below.

---

## The One page

Built first, because it is the only page with revenue and the only page with no dependency on unbuilt systems.

### Brief

One assumes intent. Someone arrives knowing what they want. The page does not argue for the instrument. Its learn-more stacks are depth for the already committed: reassurance and enrichment, not a case.

Roughly 900 words across eight units, most drafted. Items 1–7 in the principles document.

### Ports forward from v1 essentially verbatim

This is working, correct logic. It should be moved, not rewritten.

| Component | v1 reference | Notes |
|---|---|---|
| Order fork | `site-structure.md` §Order Fork | Tabs, `state`, `switchFork()`, caption |
| Material cards | §Material Card | 5 woods, price extras, `selectWood()` |
| Stock cards | §Stock Card | 3 serials, B-stock badge, `selectStock()` |
| Empty-stock state | §From Stock Panel | Including the wireframe preview toggle |
| Instrument summary | §Built to Order Panel | Two-column, collapses at ≤980px |
| Referral code | `applyCode()` / `applyStockCode()` | `DANNY10`, `LENA`, `SOFIA` → 5% |
| Accessories | §Accessories | 5-col desktop / 4-then-more mobile, `data-raw` pricing |
| Global VAT | §Global VAT | `neotone_country`, 4 countries, VAT-inclusive display |
| Selection panel | §Selection | `neotone_sel`, item schema unchanged |
| Checkout | §Checkout Page | Base → discount → VAT → total breakdown |

Item schema is unchanged and `discountEligible` still earns its place: it distinguishes the instrument from accessories, not One from other products.

### Changes on port

**Nav and footer replacement.** v1's One page carries a six-item text nav and a `footer.block` bottom menu, with sticky-footer via `.page { display: flex; flex-direction: column; min-height: calc(100vh - 60px) }` + `footer.block { margin-top: auto }`. Both are replaced by the v2 wordmark nav. This is the largest mechanical piece of the port. Body must not receive `display: flex`, which corrupts child sizing.

**Selection is no longer a nav item.** In v1 it was the sixth nav entry with a count badge. The v2 nav is wordmark-only; a "Selection" text item breaks it exactly as a "Products" item would have. Recommendation: the selection panel lives on One and checkout only, opened from an in-page affordance. This is coherent because purchase happens only on One, and the new-tab rule means the flow is never interrupted by navigation. `localStorage` persistence is retained regardless.

**Three learn-more stack links, `target="_blank"`.** Replacing the old Tonefield stack: *On waiting for your instrument*, *Why an electronic instrument is made of wood*, *The workshop with everyone in it*. Placed where each is relevant. The wood piece reads right after a wood is chosen.

**Editorial block becomes the orientation paragraph.** v1's 150-word para + pull quote + 80-word para is replaced by a single ~120-word unit: shape, material, serial number.

**Play One becomes a fork.** Workshop visit and artist sessions as two paths. The artists grid it contained is cut.

### Cut

| Cut | Reason |
|---|---|
| Artists grid | Absorbed into culture; artists live in containers now |
| Tonefield stack on One | Replaced by the three stack articles, new tab |
| Hero block as persuasion | Becomes the banner: kicker, title, subtitle |
| ~6 pieces of connective tissue | Most expensive prose in v1, least reusable |
| Treangle page | Deferred with the product |
| Tonefield page | Tonefield is an article, not a page |
| Artists page | Same |

### Decoupling

Cleaner than expected. `one.html` has **no** references to `addTreangleToSelection()`, `addCorToSelection()`, or `addMerchToSelection()`. Each lives entirely inside its own page file. Decoupling is deletion of those files, not surgery on One.

Two cleanups follow:

- The `hasEnquiry` branch in `renderSelection()` handles non-numeric prices. Present in all seven v1 pages including `one.html`. Nothing in v2 produces a non-numeric price; it can go.
- The selection panel and its full JS block are duplicated across all seven v1 pages. In v2 it belongs on One and checkout only.

---

## Footer

Full-bleed black bar, white text, contents on the same `.page` grid as everything else (98–1182 at 1280). Present on all five pages, after the content.

Two bands, no column headings and a single hairline between them:

| Band | Left | Right |
|---|---|---|
| Top | Section links: Neotone, One, neOS (+ Anima in future mode) | Search: underlined field and an arrow |
| Bottom | About, Workshop, Contact, FAQ, Terms, Privacy | Budapest · visits by appointment |

Everything is text, sans-serif: sections at 13px solid white, utility at 12px and 55% white. Both bands wrap, so no breakpoints are needed.

**The wordmarks are deliberately not reused here.** They were tried and removed. The nav owns the marks and works them: they shrink into the masthead and act as the return mechanism. A footer cannot give them that job, so they became decoration, and at a footer-appropriate size they stopped being legible (neOS rendered 51×14). Mixing artwork with text also gave the footer two type systems. Principle 9 makes the footer utility, and a wordmark is brand rather than utility.

All footer text names its font family explicitly rather than inheriting. The three container pages originally set no `font-family` on `body`, so the footer silently fell back to Times on them while `one.html` and `checkout.html` looked correct.

**Footer section links return to the top before switching page.** From the footer the masthead is collapsed; navigating straight away would land on a page whose entry animation begins from a full-size mark, so the wordmark would jump. Scrolling up first lets the mark expand, and the cross-page animation continues from the state actually on screen.

Clicking the current page's own link just returns to the top without navigating. That test compares the link's `href` against the current filename rather than `PAGE`, because checkout declares `PAGE = 'one'` for its masthead. Matching on `PAGE` would wrongly treat checkout's "One" link as a same-page scroll.

A 1200ms safety timeout fires the navigation regardless, covering smooth scrolling being disabled, instant, or interrupted mid-flight. The link can never become a dead end.

**Section links are a deliberate duplication of the nav.** Principle 9 reserves the footer for utility and search, so this is the one place the footer stretches that rule. They are kept visually subordinate to the utility columns, and they respect future mode: Anima is removed from the footer by the same selector that removes it from the nav, and the links carry `navQuery` so the mode survives.

**"Workshop" is an article, not a utility page**: the photographed workshop piece with everyone named. It sits in the footer because it is evergreen and earns a permalink, which is what the principles document specifies for the team page. Its `alert()` says so, to keep the species distinction visible in the wireframe.

Utility pages are not built yet; their links fire `alert()` describing the destination and the species rule (utility pages render identically to articles but carry the plain Neotone mark, having no container to return to). Search fires an `alert()` describing the JSON index mechanism, so the intended plumbing is documented where it will live rather than spelled out on the page.

`margin-top: 96px` keeps it clear of content. On short pages such as an empty checkout it falls below the fold and is reached by scrolling, rather than floating mid-viewport.

---

## Mobile

v1 considered mobile throughout. The v2 wordmark nav does not, and this is the one place where v2 regresses against v1.

**The page body is not at risk.** v1's One page carries its responsive behaviour in the components being ported: material grid to 2 columns at ≤980px, accessories to 2-then-show-more, and the summary block collapsing so destination country and referral code sit *before* the VAT and total lines. Those are real decisions, already made. They come across with the port.

**The nav is the actual problem, and it is broken rather than unstyled.** Measured at 375px: the four wordmarks need 919px of bar. At rest the active mark lands at `left: 383px`, off-screen. No mobile width fits four marks at a legible size.

**The collapsed masthead is most of the answer.** Once collapsed there are 117px free to the right of the active mark at 375px. The state the scroll animation already ends in fits; the state it starts in cannot. So mobile likely begins where desktop's animation finishes.

Split accordingly:

- **Now, with step 1**: Selection's form, resolved against the 117px slot. It is the same component at both widths and it is being built into the masthead immediately.
- **Later, its own pass**: how the other three sections are reached once the bar holds one mark. This depends on whether people arrive at One directly or browse across from Neotone, and it wants to be judged against real content scrolling underneath. Designing it now would be designing for imagined behaviour.

---

## Build order

1. ~~**Scaffold**~~ **Done.** v2 nav on the One page, Selection in the collapsed masthead, section skeleton for items 1–7.
2. ~~**Port purchase machinery**~~ **Done.** Order fork through checkout. See below.
3. **Restructure to brief**: banner, specs strip, orientation paragraph, what-happens-next, purchase terms, play-one fork. Cut the discovery blocks. Add the three stack links, `target="_blank"`.
4. **Then, and not before, the article system**: container blocks as whole click targets, article pages with real URLs, JSON metadata index behind both search and load-more, scroll restoration on return.

Step 4 is second in importance and blocks everything except One. It should start as soon as step 3 is scoped, not after it finishes.

### What step 2 landed

Order fork with both panels, material cards, stock cards, empty-stock state and its preview toggle, instrument summary with destination country and referral code, accessories, stock notification, questions form, and `checkout.html`.

Two deliberate divergences from v1:

- **Accessories are data, not duplicated markup.** v1 repeated ~75 lines of card markup in each panel. v2 holds one `ACCESSORIES` array rendered into both grids. Cards are built with `createElement` and `addEventListener` rather than inline `onclick`, so a name containing quotes, such as `Headphone “L” Adapter`, cannot break attribute parsing. That exact failure occurred in v1.
- **Checkout has no Selection masthead item.** The selection *is* the page there, so a panel duplicating it would be noise. v1 carried the panel on checkout for review and removal; here removal happens inline on each line item.

`checkout.html` uses `ACTIVE = 1`, so its masthead returns to One. Checkout sits inside the One flow, and this is the return-to-parent rule applied to a page that is not itself a nav destination.

---

## Open decisions

Flagged rather than assumed.

1. **Selection affordance on One.** Recommendation above is One + checkout only. Needs a visual form now that it cannot be a nav item.
2. **Tonefield merch** (`EUR 12`) has no home, since Tonefield is an article now. Drop, or re-home later?
3. **"Receive Tonefield" email capture** is not in items 1–7. Does it appear on One at all?
4. **Questions contact form.** v1 has it on One; the principles document puts contact in the footer. Keep both, or footer only?
5. **Reaching other sections on mobile** once the bar holds one mark. See Mobile: deliberately deferred, not overlooked. v1's hamburger does not transfer to a wordmark-only nav.
6. ~~Subpage direct-load state~~ Resolved. Entry state is now uniform on every page; see Current state.

---

## Files

```
v1/                 reference implementation, superseded IA, correct purchase logic
  site-structure.md full component reference, the porting source
v2/
  README.md         this file
  index.html        Neotone, container and root
  one.html          One, section page, carries purchase
  anima.html        Anima, placeholder for future product
  neos.html         neOS, container
  checkout.html     purchase completion; not a nav destination
```

Assets resolve as `../../media/…` from any v2 page.
