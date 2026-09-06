# Site Structure, v4

Component reference for `wireframe/v4`. What exists, what state it holds, and behaviour that is not obvious from the markup. For why anything is the way it is, read [README.md](README.md) and the content structure document in the workspace `docs/`.

Every page is standalone HTML with inline CSS and JavaScript. No build step, no dependencies. Shared components are duplicated across pages, and a change to one has to be applied to every page that carries it. The last section says which.

---

## Pages

| File | Type | `SECTION` | `INSTRUMENT` |
|---|---|---|---|
| `index.html` | Product page, the root | `instruments` | `one` |
| `tonefield.html` | Container (Tonefield) | `tonefield` | |
| `checkout.html` | Product page, second half | `instruments` | `one` |
| `anima.html` | Placeholder | `instruments` | `anima` |
| `treangle.html` | Placeholder | `instruments` | `treangle` |
| `bach-on-a-handpan.html` | Article | `tonefield` | |
| `transformation-alchemy-mystery.html` | Article | `tonefield` | |
| `updates.html` | Container (Updates), utility | none | |
| `manual.html` | Utility | none | |
| `manual-scales.html` | Utility | none | |
| `legal.html` | Utility | none | |

`SECTION` marks which nav item is current. Empty on pages that belong to no section; their bar never resolves and keeps all three names as it collapses.

Four page types: container, article, product page, utility. Updates is a container by type and utility by placement; those are different axes.

---

## Nav

Masthead above two sections.

```
              NEOTONE
      Instruments    Tonefield              Selection (2)
```

Selection appears at the right of the row on the instrument page only, and only when the selection is non-empty. Smaller and grey, no underline: the underline means "you are here" and Selection is not a place. It follows the row through the collapse.

The instruments are not in the nav. They are named in a row at the top of every instrument page (`.instrument-row`): One, Anima, Treangle, current one marked. The nav says Instruments; the page says which.

**The mark is identity, not a link.** A `div`, not an `a`. Once the bar has moved, clicking anywhere in it scrolls to the top and reopens the bar. At rest it does nothing.

**Instruments is a plain link** to `instrument.html`. A hover submenu was built and removed: it hung over page text, needed a background, had no touch equivalent, and was the nav doing the page's job.

**Everything in the bar is a function of scroll position.** No timed transitions on any moving value. The two ramps overlap:

| Constant | Value | Meaning |
|---|---|---|
| `FADE_FROM`, `FADE_TO` | 20, 220 | the sections you are not in fade out |
| `SHIFT_FROM`, `SHIFT_TO` | 60, 460 | mark and current section travel to the content boundary |
| `MARK_TOP` | 30 to 22 | mark's top edge |
| `SECT_TOP` | 86 to 62 | sections row's top edge |
| `MARK_SCALE` | 1 to 0.55 | mark size |

Both ramps are scaled by `k = min(1, scrollRange / SHIFT_TO)`, so a short page completes its collapse by its own bottom rather than stopping part way.

**Collapsed, the bar is the name alone.** Every section name fades over the fade range, the current one included, and only the mark travels to the content boundary. The page announces where you are, through its opening line, kicker or title, so the bar does not repeat it. Clicking the collapsed bar scrolls to the top and reopens the menu. An earlier version carried the current section name into the corner beside the mark; on instrument pages that put the word Instruments over a page whose name is One, and there was no honest word to swap in mid-travel.

**The current section is marked from the first frame**, on every page, with no arrival logic. A neutral cold-landing state with a scroll-resolve and a latch was built for a front page that belonged to no section; that page is gone, the root is Tonefield, and being on it is being on it. Removing the arrival state also removed a `sessionStorage` flag, the referrer test before it, and the fade machinery that had stranded the underline invisible in a non-painting document.

---

## Feed

Used by Tonefield and Updates. Items at 680px inside a `var(--max)` container.

One vertical rhythm, in pixels so it does not change with the window:

| | px |
|---|---|
| Heading text below the bar, or below the instrument row | 62 |
| Heading to first piece | 56 |
| Between Tonefield pieces | 96 |
| Between Updates entries | 64 |
| Last piece to the end block | 96 |
| Load more to the sign-up | 56 |

**Every piece is built the same way**: image, kicker, title, excerpt, link, 16:9 image, same gap. `.lead` and `.second` classes remain on the first two items as editorial markers and style nothing. A wider lead image and a reordered second piece were tried to force both titles into a 900px viewport and read as three different layouts.

A feed item is kicker, title, excerpt, continue link, media. The block is not an `<a>`, because media has to be clickable on its own; the title and the continue link are the anchors. Every item carries a continue link.

**Tonefield items have no date. Updates items do.** `.feed-date` sits above the title on `updates.html` only. That is the one visible difference between the two feeds, and it is the species difference: an update belongs to its week, a piece holds whenever it is read.

**Scroll restoration**, containers only:

```
neotone_scroll_<SECTION>   scrollY, written when a feed link is clicked
neotone_restore            the SECTION to restore, written by a piece's own section link
```

Restores only when `neotone_restore` names the page; arriving any other way lands at the top.

**Feed end**, Tonefield only: Load more (alert describing the JSON index), then the mailing list sign-up. Updates has no Load more; the archive is fully listed.

---

## Piece

Articles and utility pages share one layout. `.piece-head` and `.piece-body` at 680px; `.piece-media` at the full 1084px grid.

Width signals position: a lead image runs to the grid, anything inside the body sits at the measure.

**Read next** carries one item. The piece's own section link writes `neotone_restore` before navigating.

### Manual

`manual.html` is a contents page; `manual-scales.html` is one section. A section lays out three registers, Basics, Going deeper, Deeper still. Items in the third carry `.toc-out` reading **Tonefield** and link out of the manual. `openHashSection()` opens and centres the `<details>` matching `location.hash`, on load and on `hashchange`.

### Updates

`updates.html`: piece head, then the feed with dates. Linked from the footer and from beside the sign-up (`.subscribe-archive`).

### Placeholders

`anima.html`, `treangle.html`: one opening line, one block, no specification, no date, no image. They exist so the instrument row can carry the names and the site can be browsed in its future shape without promising anything.

---

## Opening

Tonefield, the instrument page and the placeholders open with one centred block, the name in a larger span: `.opening-wrap > .opening > .opening-name`. Tonefield's is the name over a subtitle (`.opening-sub`), the magazine form; the product and placeholder pages speak in a sentence, because a product page talks about the object and a masthead does not talk about itself. The block is in the flow of the document and scrolls with it, like a heading. An earlier version held it in place and faded it while the page slid underneath, which read as the heading arriving from somewhere other than the page. The wrapper keeps a once-only fade-in on load (`opening-in`, 760ms), the only animation outside the nav.

| Page | Line |
|---|---|
| `tonefield.html` | **Tonefield** / On handpan craft and culture |
| `instrument.html` | The **Neotone One** is handcrafted in Budapest, built to order |
| `anima.html`, `treangle.html` | **Anima** is in development |

---

## Product page

`instrument.html`, sections in order: opening, orientation, specs strip, **neOS**, order fork, read further, what happens next, play one first.

**neOS block.** Names the software on the instrument, because it ships with the instrument. One paragraph, links to the manual. When neOS ships standalone it becomes a product and the nav gains Software; the block stays.

**Read further** carries the section's own pieces, currently two: Who is the Neotone for?, and the workshop piece, Every instrument starts with a conversation. They are Instruments pieces, not Tonefield links: same tab, `SECTION = 'instruments'` when built. The footer's Workshop link points at the second.

### Purchase state

```js
var BASE_PRICE = 3150;
var state = {
  wood: "Mahogany", woodExtra: 90, discount: 0, orderMode: "build",
  stockSelection: "", stockPrice: 0, stockIsBstock: false
};
```

`orderMode` is `build` or `stock` and drives `switchFork()`. Material cards: five woods, each with an extra over `BASE_PRICE`. Stock cards: three serials; B-stock carries a badge and is not referral eligible.

### Accessories

One `ACCESSORIES` array rendered into both panels with `createElement` and `addEventListener`, never inline `onclick`: a name containing quotes breaks attribute parsing, and that failure occurred in v1.

| Field | Meaning |
|---|---|
| `name`, `desc` | displayed |
| `price` | omitted when `included` is true |
| `included` | renders Included in the price position |
| `vis` | `acc-fifth` at five across only; `acc-extra` behind show more |

### Referral code

`DANNY10`, `LENA`, `SOFIA`, all 5%. Eligibility is a property of the item: the instrument is eligible, accessories and B-stock are not. Checkout shows `Discount (0%)` on eligible items even with no code applied.

### Global VAT

```js
VAT_RATES = { HU: 0.27, DE: 0.19, FR: 0.20, US: null }
```

`localStorage['neotone_country']`, read by `instrument.html` and `checkout.html`. Every displayed price is VAT inclusive; the breakdown appears only at checkout.

### Selection

`localStorage['neotone_sel']`, a JSON array of `{ id, name, detail, price, rawBase, discountPct, discountEligible }`, the last three on the instrument only. A panel over the page, on the product page and checkout only. It is a component, not a page type.

### Checkout

Second half of the product page: `SECTION = 'instruments'`, `INSTRUMENT = 'one'`. `renderCheckout()` prints base, discount where eligible, VAT, total, per line. Removal is inline; there is no panel, because the selection is the page.

---

## Footer

Two bands, one hairline between.

| Band | Left | Right |
|---|---|---|
| Top | Tonefield, Instruments | Search, 260px |
| Bottom | Workshop, Manual, Updates, Contact, Legal | Budapest · visits by appointment / Instagram · YouTube · TikTok · Facebook |

The section links repeat the bar deliberately: at the bottom of a page a reader is choosing what is next, and they give search a left side. **They rise before they leave**: `scrollToTopThen()` scrolls up, waits for the scroll to land, then navigates, with a 1200ms timeout so the link can never dead-end. From the bottom of a page the bar is a collapsed label, so cutting straight to a page with the menu open would read as a jump.

Unbuilt destinations fire `alert()`: `utilityLink()`, `socialLink()`, `handleSearch()`, `loadMore()`, `handleSubscribe()`.

---

## Mobile

Page bodies carry their own responsive rules from v2. The bar has not been designed for a phone width and is the open problem: at 375px the masthead and two sections fit, but the collapse travel, the instrument row and the footer bands are untested.

---

## Known duplication

| Duplicated | Copies |
|---|---|
| Nav markup, CSS and script | 11 |
| Footer markup, CSS and script | 11 |
| `updateNav()`, `measure()`, `markSection()`, `scrollToTopThen()` | 11 |
| `.instrument-row` markup and CSS | 4 (instrument, anima, treangle, checkout) |
| `handleSearch()`, `socialLink()`, `utilityLink()` | 11 |
| Feed CSS | 2 (`tonefield.html`, `updates.html`) |
| Selection panel and its script | 2 |
| Background colour, on `body` and on `nav` | 2 per page |
