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
| **Utility** | Footer material. | Terms, privacy, contact, manual, workshop address |

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

### Page openings

**An opening exists to gloss a name the reader cannot yet decode.** It is one centred statement of what the page is for, with the page's own name set larger inside the sentence rather than above it as a heading. A separate headline would only repeat the nav: on One it read "Neotone One" directly beneath the Neotone and One wordmarks. The `<h1>` is the whole sentence with the name in a span, so the document keeps one heading and it is descriptive.

| Page | Opening |
|---|---|
| Neotone | none |
| One | The **Neotone One** is handcrafted in Budapest, built to order |
| neOS | **neOS** is the window into Neotone's musical intelligence |
| Anima | The next instrument |

**Neotone has no opening, and that is the rule working rather than an omission.** neOS is a coined word, One is a five-figure purchase, and Anima is a product nobody has heard of, so each needs a line. Neotone is on the masthead and the pieces beneath it say what it is better than a sentence can. The home page opens directly on its lead piece, so the running order is editorial rather than chronological: position one *is* the claim, and what sits there is a decision taken every time something is published.

Three registers failed and should not return: superlatives ("the world's most organic digital instrument"), coinages the reader has not yet earned ("a Linked Resonant Field"), and nameless slogans ("Redefining digital craftsmanship"). Each claims something the reader has not been shown. See `../../2026-08-11_🤖_why-three-destinations.md`, How it reads.

Copy is David's. Terminal periods are dropped: one is a fragment and cannot take one, and display statements read cleaner without. Apostrophes are typographic.

**Arrival and departure.** The opening fades in on load over 760ms after a 140ms delay, so a page transition lands in two beats rather than cutting: the wordmark settles, then the statement arrives. On scroll it holds position while the page moves under it and fades out by 120px, rather than being carried off the top. On Neotone, which has no opening, the feed itself carries the entry fade.

Those are two different opacities on two elements. The entry animation uses `fill: both`, so its final value keeps applying and would override anything set on the same element; it therefore sits on a wrapper while the scroll fade owns the heading. The entry fade is CSS rather than JS, so it cannot leave the heading invisible if scripting fails and does not depend on `requestAnimationFrame`, which throttles in a hidden document. Both respect `prefers-reduced-motion`.

### Container feeds

Blocks size to their content, not the viewport. They were `115vh`, inherited from the mockup where each article filled a screen during the colour-change scroll; without that mechanic the height only pushed the first article to 0.99 of the viewport, where it read as something still to arrive.

| Rule | Effect |
|---|---|
| `.feed-item + .feed-item { margin-top: 24vh }` | the next piece is off the bottom edge and must be scrolled to |
| `.feed { padding-top: 104px }` where there is no opening | the first piece starts where the opening's first line sat |
| `.feed { padding-bottom: 30vh }` | the last piece ends rather than running into the footer |

Space is applied between pieces only, never before the first, so piece one holds its position on load while the others stay a scroll apart. It is measured in vh so that holds at any screen height.

Feed blocks are whole click targets, per principle 14: no read-more button. The block itself is not an `<a>`, because a preview can carry media and clicking a video has to play it; the title carries the link.

---

## Current state

Five base pages: `index.html` (Neotone), `one.html`, `anima.html`, `neos.html`, `checkout.html`, plus article and utility pages listed under Files.

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

Neotone and neOS each carry three feed previews, whole-block links to real article pages. Anima carries three placeholder section blocks and is a reminder of a future product rather than a built page.

Three matches the readers actually named in the content list. Principle 23 says nothing goes in the wireframe without a reader, and the extra blocks on each page had none.

**Entry state is uniform across every page**, landing page included: the page's own mark is full size and every other mark sits at `BASE_SCALE`. Arriving from another page, that page's mark starts full size and shrinks as this one grows, so the marks stay continuous across navigation.

The landing page used to be special-cased, with all four marks rendered full size. That required an `inactiveScale` exception, a `targetScale` exception, a separate `ACTIVE === 0` entry branch, and a `prevIsLanding` flag carried through `sessionStorage`. Removing the exception removed all four.

Mobile is unbuilt and tracked as a parallel workstream below.

---

## The One page

Built first, because it is the only page with revenue and the only page with no dependency on unbuilt systems.

### Brief

One assumes intent. Someone arrives knowing what they want. The page does not argue for the instrument. Its learn-more stacks are depth for the already committed: reassurance and enrichment, not a case.

Roughly 900 words across eight units, most drafted. Items 1–7 in the principles document.

### Page structure

Seven sections, all real structure at real type scale holding placeholder words. There are no labelled boxes describing what will go where: dropping copy in should not require touching layout.

| # | Section | State |
|---|---|---|
| 1 | Opening | One centred statement, name set inline |
| 2 | Specs strip | Five cells, close to final |
| 3 | Orientation | One centred measure, ~120 words |
| 4 | Order fork | Real, ported from v1 |
| 5 | Read further | Three article cards, new tab |
| 6 | What happens next | Four steps plus purchase terms |
| 7 | Play one first | Workshop and artist sessions, as a fork |

Chrome appears only where it carries information. The specs strip and steps strip keep hairline dividers between cells because the dividers separate data, but their outer boxes are gone. Sections are separated by an 88px rhythm rather than borders. Bordered `.slot` boxes with uppercase labels were tried and removed: they described the section instead of being it.

The instrument imagery lives in the order fork's preview, so there is no hero image above it: two grey blocks on one screen would be weight without information. Whether a banner image eventually appears is still an open design-pass question.

**Read further sits after the purchase flow**, not before it. These are depth for the already committed, which is what the summary block's bookend note already says. All three carry `target="_blank"`: their parent is Neotone, so the masthead would otherwise carry someone mid-purchase back to culture.

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

## Article pages

**File:** `neos-note-names.html`, a worked sketch of the species.

Articles have their own URL and render identically to utility pages. The only difference is the mark in the masthead: an article carries its container's mark, a utility page carries the plain Neotone mark, because a utility page has no container to return to.

**The mark is the return.** On an article, `RETURN_TO` names the container and clicking the active mark navigates there rather than scrolling to the top. No breadcrumbs, no back link, per principle 11. The flag propagates, so future mode survives the trip.

**Layout.** Media runs to the content grid at 1084px; head and body stay at a 680px reading measure. Kicker, title, standfirst, media, prose, with quiet sub-heads.

**Format is independent of species.** The video box is a placeholder for a piece that may be prose, video, or prose built around video. That is a production decision, not a structural one, so the template carries media as a first-class element rather than an afterthought.

**Feed blocks are links**, per principle 14: the whole block is the click target, no read-more button.

### Utility pages

**Files:** `manual.html` (contents), `manual-scales.html` (one worked section).

Same template as an article, which is the point: they render identically. The difference is the mark. An article carries its container's mark and returns there. A utility page carries the plain Neotone mark and returns to root, because it has no container.

**The manual is a contents page onto section pages.** Every section has its own address, which is what lets a tooltip inside the software link straight to the part that answers the question in front of the player. Sections are grouped rather than listed flat: the instrument, getting started, the Interface, and troubleshooting.

**A section page shows the three registers.** `manual-scales.html` lays out Basics, Going deeper, and Deeper still. The third register's items carry a small neOS marker and leave for the container, which is the practical layer handing off to the intelligence layer at exactly the point the question turns into a why.

Structure taken from the real manual, version 3.2, fifty pages. Headings within Scales follow the walkthrough script.

### Returning, and going on

Three separate things, often confused with each other.

**Return is the masthead.** Clicking the container's mark goes back. No breadcrumb, no back link at the foot of the piece: the mark is visible the whole way down and a bottom link would be a weaker duplicate.

**Restoration is part of return.** Opening a piece stores the container's scroll position. The article's masthead return sets a flag naming the container, and only that flag triggers a restore, so arriving fresh from the nav still lands at the top. Verified both ways: returning from a piece restores 1400px, arriving from the nav with a stored position lands at 0.

The restore runs immediately rather than inside `requestAnimationFrame`, with the frame after used only as a re-apply. rAF is throttled in a hidden document, which silently defeated the first attempt.

**Propulsion is a third thing**, and it is what a piece needs at the end. `Read next` carries two items chosen for relevance, not recency. A neOS piece can point back down to the manual section it grew out of, which closes the loop between the intelligence layer and the practical one.

### Where articles come from

The manual is the practical layer and neOS the intelligence layer. The manual is written in three registers: basic walkthrough, deeper functionality, and the craft questions underneath. neOS material comes from the first and last of those, never the middle, and only when a piece holds for someone who will never touch the control it describes. See `../../2026-08-11_🤖_why-three-destinations.md`.

---

## Footer

Full-bleed black bar, white text, contents on the same `.page` grid as everything else (98–1182 at 1280). Present on all five pages, after the content.

Two bands, no column headings and a single hairline between them:

| Band | Left | Right |
|---|---|---|
| Top | Section links: Neotone, One, neOS (+ Anima in future mode) | Search: underlined field and an arrow |
| Bottom | Workshop, Manual, Contact, Legal | Place, then social |

The place line stays **Budapest · visits by appointment**. The social row names Instagram rather than Neotone Instagram, so "Budapest" is parallel to it and the reader supplies whose it is; putting the company name on only the first line breaks that pattern one line before it is established. "Neotone Budapest" also reads as a branch office, which is the opposite of what "by appointment" is telling people. "Budapest" alone loses the invitation, which is the only clause doing persuasive work.

Everything is text, sans-serif: sections at 13px solid white, utility at 12px and 55% white. Both bands wrap, so no breakpoints are needed.

**The right column of the bottom band is the places you can turn up**, most real first:

```
Budapest · visits by appointment
Instagram · YouTube · TikTok · Facebook
```

"Neotone, Budapest" was there first and is a colophon: it states a location and repeats a name the masthead already carries. "Visits by appointment" states access, which is the persuasive fact, and it quietly says the operation is small in a way that reads as confidence. Social sits under it because those are also places you can turn up, in order of how real they are. Ordering within them is by actual usage, not convention.

**Social is text, not brand icons**, for the same reason the footer carries no wordmarks. Four logos would put another company's branding at mark weight inside a black Neotone bar, and a place is named rather than badged. They are deliberately subordinate: the site's whole argument is that the good material is here, so social is how people find their way back rather than a destination being promoted.

**Terms and Privacy collapsed into one Legal link.** Two links were a high share of the utility row next to genuinely useful items, and nothing requires a link labelled "Privacy": the requirement is that the information be findable. `legal.html` holds three anchored sections, ordered privacy, terms of sale, terms of website use, because privacy applies to every reader and the other two only once someone orders.

`legal.html` is a wireframe scaffold, not the documents. Each section carries an editorial review list, cut and missing, against the real published policies. Findings in short: both current documents were written for other companies. The privacy policy is a Japanese manufacturer's template, citing the Personal Information Protection Law and Committee, with a GDPR section appended so obligations are stated twice under two regimes. The terms are US boilerplate with "the laws of the EU" as the governing law, covering message boards and registration that do not exist. The Submissions clause claims ownership of anything a user posts, which read against the Scale Gallery claims ownership of scales players made, and should be a licence. There are no terms of sale at all, which is the document with real consequences for a made-to-order instrument with a sixty day lead time. Not legal advice; the page exists so the brief is written down.

**The footer uses text, not the wordmarks.** The nav owns the marks and works them: they shrink into the masthead and act as the return mechanism. A footer cannot give them that job. Principle 9 makes the footer utility, and a wordmark is brand rather than utility.

All footer text names its font family explicitly rather than inheriting. The three container pages originally set no `font-family` on `body`, so the footer silently fell back to Times on them while `one.html` and `checkout.html` looked correct.

**Footer section links return to the top before switching page.** From the footer the masthead is collapsed; navigating straight away would land on a page whose entry animation begins from a full-size mark, so the wordmark would jump. Scrolling up first lets the mark expand, and the cross-page animation continues from the state actually on screen.

Clicking the current page's own link just returns to the top without navigating. That test compares the link's `href` against the current filename rather than `PAGE`, because checkout declares `PAGE = 'one'` for its masthead. Matching on `PAGE` would wrongly treat checkout's "One" link as a same-page scroll.

A 1200ms safety timeout fires the navigation regardless, covering smooth scrolling being disabled, instant, or interrupted mid-flight. The link can never become a dead end.

**Section links are a deliberate duplication of the nav.** Principle 9 reserves the footer for utility and search, so this is the one place the footer stretches that rule. They are kept visually subordinate to the utility columns, and they respect future mode: Anima is removed from the footer by the same selector that removes it from the nav, and the links carry `navQuery` so the mode survives.

**"Workshop" is an article, not a utility page**: the photographed workshop piece with everyone named. It sits in the footer because it is evergreen and earns a permalink, which is what the principles document specifies for the team page. Its `alert()` says so, to keep the species distinction visible in the wireframe.

Utility pages are not built yet; their links fire `alert()` describing the destination and the species rule (utility pages render identically to articles but carry the plain Neotone mark, having no container to return to). Search fires an `alert()` describing the JSON index mechanism, so the intended plumbing is documented where it will live rather than spelled out on the page.

`margin-top: 96px` keeps it clear of content. On short pages such as an empty checkout it falls below the fold and is reached by scrolling, rather than floating mid-viewport.

---

### End of feed

Pieces, then **Load more**, then **Updates**. On Neotone and neOS only.

**Load more before subscribe.** Load more continues the reading; subscribing is what you do once you have decided to stop, so a field above the button interrupts a reader who is still going. When the index is eventually exhausted the button is removed and Updates becomes the terminus, with nothing rearranged.

**The button is a solid black bar at the reading measure**, the only solid black in the white part of the page. It reads as the end of the run and rhymes with the footer arriving under it. It fetches the next page of previews from the JSON metadata index, the same index behind search, so the feed ships with three and grows on request.

**The list is Updates, not Tonefield.** Tonefield is a publication and would be its own subscription. This is a public notice board. "Stay in touch" promises a relationship from a company that will write four times a year; Updates says plainly what it is, the same move as "Budapest · visits by appointment".

The copy is four words: **News from the workshop**. An earlier version explained the frequency, listed what might arrive, and noted that owners are on a separate list. Explaining that you will not email much is the behaviour of a company expecting to be suspected of it, and "workshop" already tells the reader how often a room that size has news. The owners caveat belongs in the confirmation email, not in the ask.

**Not on One.** Someone mid-purchase is already going to hear from you, and an email field beside a five-figure order reads as a lead form. Resolves open decision 3.

Spacing puts the block at the bottom of the scroll rather than in the middle of it: 22vh below the last piece, 56px from button to field, 96px to the footer. The feed itself no longer carries bottom padding; the end block owns that space.

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
4. **Article system.** Mostly landed: feed blocks are whole click targets, article and utility pages have real URLs, the masthead returns, and scroll position is restored on return. Outstanding: the JSON metadata index behind search and load-more, which is currently an `alert()` describing the mechanism.
5. **Content.** Two real pieces exist. Everything the site argues for depends on there being six to ten.

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
4. **Questions contact form.** v1 has it on One; the principles document puts contact in the footer. Keep both, or footer only?
8. **"Built to order" in the One opening echoes lead time** three lines below it in the specs strip. Harmless, but the same fact is stated twice in different precision.
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

  neotone-golsa-nazari.html   article, Neotone container
  neos-note-names.html        article, neOS container
  manual.html                 utility, contents page
  manual-scales.html          utility, one worked section
  legal.html                  utility, privacy + terms of sale + terms of use
```

Assets resolve as `../../media/…` from any v2 page.
