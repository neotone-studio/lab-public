# Site Structure, v4

Component reference for `wireframe/v4`. What exists, what state it holds, and behaviour that is not obvious from the markup. For why anything is the way it is, read [README.md](README.md) and the content structure document in the workspace `docs/`.

Every page is standalone HTML with inline CSS and JavaScript. No build step, no dependencies. Shared components are duplicated across pages, and a change to one has to be applied to every page that carries it. The last section says which.

---

## Pages

| File | Type | `SECTION` | `INSTRUMENT` |
|---|---|---|---|
| `index.html` | Container (Tonefield), the root | `tonefield` | |
| `instrument.html` | Product page | `instruments` | `one` |
| `checkout.html` | Product page, second half | `instruments` | `one` |
| `anima.html` | Placeholder | `instruments` | `anima` |
| `treangle.html` | Placeholder | `instruments` | `treangle` |
| `neotone-golsa-nazari.html` | Article | `tonefield` | |
| `neos-note-names.html` | Article | `tonefield` | |
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
      Tonefield    Instruments
                   ├ One
                   ├ Anima
                   └ Treangle
```

**The mark is identity, not a link.** A `div`, not an `a`. Once the bar has moved, clicking anywhere in it scrolls to the top and reopens the bar. At rest it does nothing.

**Instruments is a group**: a parent link (`.section-parent`, goes to `instrument.html`) with a submenu (`.submenu`) of product names that opens on hover or focus. The current instrument carries `.current-instrument`. The submenu is hidden once the bar has collapsed (`.sections.is-label`), because the bar is a label then, not a menu.

**Everything in the bar is a function of scroll position.** No timed transitions on any moving value. The two ramps overlap:

| Constant | Value | Meaning |
|---|---|---|
| `FADE_FROM`, `FADE_TO` | 20, 220 | the sections you are not in fade out |
| `SHIFT_FROM`, `SHIFT_TO` | 60, 460 | mark and current section travel to the content boundary |
| `MARK_TOP` | 30 to 22 | mark's top edge |
| `SECT_TOP` | 86 to 62 | sections row's top edge |
| `MARK_SCALE` | 1 to 0.55 | mark size |

Both ramps are scaled by `k = min(1, scrollRange / SHIFT_TO)`, so a short page completes its collapse by its own bottom rather than stopping part way.

At the end of the travel the mark and the current section name share one left edge at the content boundary. Measured in `measure()` from rects with the row put at rest, not from `offsetLeft`, because the Instruments link sits inside a positioned group.

**Marking the current section.** Arriving by an internal link marks the section on arrival with a 420ms fade. Landing cold opens neutral and resolves as you scroll, then latches (`resolved`). Whether the arrival was internal is written by the page you leave into `sessionStorage['neotone_internal_nav']`, read and cleared on load. It was a `document.referrer` test first, which browsers strip often enough that the bar looked broken for some readers.

**The marked state is set outright; the fade only decorates it.** A CSS transition in a document that is not painting continuously can sit in `running` forever, which stranded the underline invisible. `markSection()` writes the resting values first and hard-resets after the fade.

---

## Feed

Used by Tonefield and Updates. Items at 680px inside a `var(--max)` container.

| Rule | Value |
|---|---|
| `.feed` top padding | 88px |
| `.feed-item + .feed-item` | `margin-top: 24vh` |
| `.feed-item.lead + .feed-item.second` | `margin-top: 6vh` |

**The first screen shows two.** The lead carries `.lead` and a 2:1 image; the second carries `.second` and puts its kicker and title before its image (`order` on a flex column), so both titles land inside the first viewport. Which two, and which registers they carry, is editorial. The classes are placed by hand.

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

`anima.html`, `treangle.html`: one opening line, one block, no specification, no date, no image. They exist so the submenu can carry the names and the site can be browsed in its future shape without promising anything.

---

## Product page

`instrument.html`, sections in order: opening, orientation, specs strip, **neOS**, order fork, read further, what happens next, play one first.

**neOS block.** Names the software on the instrument, because it ships with the instrument. One paragraph, links to the manual. When neOS ships standalone it becomes a product and the nav gains Software; the block stays.

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

Page bodies carry their own responsive rules from v2. The bar has not been designed for a phone width and is the open problem: at 375px the masthead and two sections fit, but the submenu, the collapse travel and the footer bands are untested.

---

## Known duplication

| Duplicated | Copies |
|---|---|
| Nav markup, CSS and script | 11 |
| Footer markup, CSS and script | 11 |
| `updateNav()`, `measure()`, `markSection()`, `scrollToTopThen()` | 11 |
| `handleSearch()`, `socialLink()`, `utilityLink()` | 11 |
| Feed CSS | 2 (`index.html`, `updates.html`) |
| Selection panel and its script | 2 |
| Background colour, on `body` and on `nav` | 2 per page |
