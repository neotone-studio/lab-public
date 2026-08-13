# Site Structure, v2

Component reference for `wireframe/v2`. Covers what exists, what state it holds, and behaviour that is not obvious from reading the markup. It does not explain why anything is the way it is: that is [README.md](README.md), and the two are meant to be read side by side.

Every page is standalone HTML with inline CSS and JavaScript. No build step, no dependencies, no shared files. Components are therefore duplicated across pages, and a change to a shared component has to be applied to each page that carries it. The tables below say which those are.

---

## Pages

| File | Species | `PAGE` | Masthead returns to |
|---|---|---|---|
| `index.html` | Container | `neotone` | top of page |
| `one.html` | Product page | `one` | top of page |
| `neos.html` | Container | `neos` | top of page |
| `anima.html` | Product page | `anima` | top of page |
| `checkout.html` | Purchase | `one` | `one.html` |
| `neotone-golsa-nazari.html` | Article | `neotone` | `index.html` |
| `neos-note-names.html` | Article | `neos` | `neos.html` |
| `manual.html` | Utility | `neotone` | `index.html` |
| `manual-scales.html` | Utility | `neotone` | `index.html` |
| `legal.html` | Utility | `neotone` | `index.html` |

`checkout.html` declares `PAGE = 'one'` so its masthead carries the One mark. Any test that compares the current page against `PAGE` will therefore treat checkout as One, which matters in the footer, where the same-page test compares filenames instead.

---

## Component index

| Component | Pages |
|---|---|
| Nav | all |
| Opening | one, neos, anima |
| Footer | all |
| Feed | index, neos |
| Feed end: load more and mailing list | index, neos |
| Piece: article and utility layout | golsa, note-names, manual, manual-scales, legal |
| Contents list | manual |
| Section list with registers | manual-scales |
| Review list | legal |
| Read next | golsa, note-names |
| Specs strip | one |
| Order fork | one |
| Material card | one |
| Stock card | one |
| Accessories | one |
| Instrument summary | one |
| Referral code | one |
| Selection panel | one |
| Global VAT | one, checkout |
| Steps strip | one |
| Paths fork | one |
| Checkout | checkout |

---

## Nav

Sticky, 100px, `overflow: hidden`, full bleed background with contents in `.nav-inner`, which mirrors `.page`: `max-width: var(--max)`, `padding: 0 48px`.

**Constants**

| Name | Value | Meaning |
|---|---|---|
| `TRANSITION_PX` | 90 | scroll distance over which marks scale |
| `SLIDE_PX` | 120 | scroll distance over which the active mark slides left |
| `BASE_SCALE` | 0.58 | size of an inactive or collapsed mark |
| `TRANSITION_MS` | 600 | cross-page entry animation |

**Two modes.** `MASTHEAD` is declared per page. Containers and product pages are hero pages: the active mark starts at full size and collapses as you scroll. Everything reached from inside one of those, articles, utility pages and checkout, is a masthead: `navProgress()` returns a fixed `{p: 1, q: 1}`, so the mark arrives collapsed and stays there.

A collapsed mark sits at the same size and position on every page, so moving from a scrolled container into a piece changes nothing at the top of the screen.

**Behaviour.** The active mark scales `1 → BASE_SCALE` in place and slides to the content-left boundary. Inactive marks lift `-80px` and fade out. `updateNav()` sets opacity on the active mark explicitly, because the entry state can paint it hidden when the previous page's active mark was a different one. Each mark scales about the edge it is anchored to (`neotone` left, `neos` right, `one` centre), and the active mark is overridden to a left origin in JS because it collapses leftwards.

`slideDistance` is computed once on first scroll as `leftOf(navLinks[0]) - leftOf(navLinks[ACTIVE])` and reset on resize. Neotone resolves to 0.

**`ACTIVE` is derived, never hardcoded.** Each link carries `data-page`; `ACTIVE` is the index of the link whose `data-page` matches `PAGE`, looked up from the rendered nav after Anima has been removed. Hardcoding it breaks in default mode, where indices shift.

**Clicking the active mark** scrolls to top, unless `RETURN_TO` is set, in which case it navigates there without scrolling first: the container restores the position it was left at, where its own mark is already collapsed.

**Entry continuity.** Every outbound click calls `rememberNavState()`, storing `prevActive` and `prevCollapsed`. On load, `paintEntry()` places the marks where the previous page left them, and `settleEntry()` attaches a transition and calls `updateNav()` to move them to this page's state.

| Leaving | Arriving | What is seen |
|---|---|---|
| Scrolled container | Article in it | Nothing moves |
| Container at the top | Article in it | The mark shrinks into the corner |
| Scrolled One or neOS | Manual, via the footer | The two marks exchange in place |
| Article | Its container, restored | Nothing moves |

`settleEntry()` flushes the arrival state with a synchronous reflow rather than waiting on `requestAnimationFrame`. rAF is throttled while the document is hidden, and an earlier version left the nav frozen at `BASE_SCALE` on every page because of it.

---

## Future-products mode

Anima is absent by default. `?future=show` reinstates it.

```
FUTURE = PAGE === 'anima' || (param !== null && !['hide','0','false'].includes(param))
```

Three things make it hold together:

- **The flag propagates.** `navQuery` is appended to every nav link, footer section link, the checkout CTA and the checkout back link.
- **`ACTIVE` is derived**, see above.
- **`anima.html` self-forces the mode**, because a page whose own mark is missing has nothing to return from.

When Anima is removed, `.nav-inner` gains `.centre-one`, which absolutely centres One and lets `space-between` pin the outer two marks to the content boundaries.

---

## Opening

One centred sentence with the page's own name in a `.opening-name` span at 34px against 21px body.

| Page | Opening |
|---|---|
| `index.html` | none |
| `one.html` | The **Neotone One** is handcrafted in Budapest, built to order |
| `neos.html` | **neOS** is the window into Neotone's musical intelligence |
| `anima.html` | The next instrument |

**Two opacities on two elements.** The entry fade is a CSS animation on `.opening-wrap` with `fill: both`; the scroll fade is set in JS on `.opening`. They must be separate elements or the animation's final value overrides the scroll fade.

`updateOpening()` holds the heading in place with `translateY(scrollY)` and fades it to zero over `OPENING_FADE_PX` (120). Respects `prefers-reduced-motion` for the transform. On `index.html`, which has no opening, `updateOpening()` returns early and `.feed` carries the entry animation instead.

---

## Feed

Containers only. `.feed` at `max-width: var(--max)`, items at 680px.

| Rule | Value |
|---|---|
| `.feed` padding top, where there is no opening | 104px |
| `.feed-item + .feed-item` | `margin-top: 24vh` |
| `.feed-item` | `scroll-margin-top: 140px` |

The block is not itself an `<a>`, because a preview can carry media and clicking a video has to play it. The title and the continue link are the anchors.

**Scroll restoration.** Three storage keys cooperate:

```
neotone_scroll_<PAGE>   scrollY, written when a feed link is clicked
neotone_restore         the PAGE to restore, written by an article's masthead
```

On load, a container restores only if `neotone_restore` names it, then clears the flag. So returning from a piece restores position and arriving from the nav lands at the top. The restore runs immediately with a `requestAnimationFrame` re-apply, never inside rAF alone: rAF is throttled in a hidden document, which silently defeats it.

---

## Feed end

Order is pieces, then load more, then the mailing list. `.feed-end` sits 22vh below the last piece and 96px above the footer.

- **Load more.** Full width of the 680px measure, solid black, uppercase 12px. `loadMore()` is an alert describing the intended mechanism: next page of previews from the JSON metadata index, the same index behind search, with the button removed when the index is exhausted.
- **Mailing list.** Label `MAILING LIST`, line `Updates from the Neotone workshop`, then a hairline email field. `handleSubscribe(e)` prevents default, alerts, and resets. Not present on `one.html`.

---

## Piece: article and utility layout

Articles and utility pages render identically. The only difference is the mark in the masthead and where it returns to.

| Element | Width |
|---|---|
| `.piece` | `var(--max)`, 48px padding |
| `.piece-media` | full content grid, 1084px |
| `.piece-head`, `.piece-body` | 680px |

Structure: `.piece-kicker`, `.piece-title`, `.piece-standfirst`, optional `.piece-media`, `.piece-body` with `.piece-sub` for quiet sub-heads.

**Width signals position.** A lead image runs to 1084px; anything inside the body sits at 680px with the prose. Only the lead slot exists so far.

**`markReturn()`** on article pages writes `neotone_restore` before the masthead navigates, so the container knows to restore.

---

## Utility variants

**`manual.html`.** Contents page. `.toc-group` blocks with `.toc-label`, hairline `.toc-list` rows. Groups: the instrument, getting started, the Interface, when something is wrong.

**`manual-scales.html`.** Section page for one manual section. Video box at content width, then `<details>` sections each with an `id`, grouped Basics, Going deeper, Deeper still. Third-register items carry a `.toc-out` marker and link out to neOS.

```js
openHashSection()   // opens and centres the <details> matching location.hash
```
Bound to load and to `hashchange`. The hash listener is required: a hash can arrive after the script has run.

**`legal.html`.** Three anchored sections, `#privacy`, `#sale`, `#site`, with a jump list. Each holds hairline `.legal-list` rows, lead phrase in ink and reasoning in muted grey on the same line. The rows are an editorial review of the currently published policies, not the policies themselves.

---

## Purchase, on `one.html`

### State

```js
var BASE_PRICE = 3150;
var state = {
  wood: "Mahogany", woodExtra: 90, discount: 0, orderMode: "build",
  stockSelection: "", stockPrice: 0, stockIsBstock: false
};
```

`orderMode` is `build` or `stock` and drives `switchFork()`.

### Order fork

Two panels, tabbed. Built to order shows material cards; from stock shows stock cards. `toggleStockEmpty()` swaps in the empty state, which retains a preview toggle so the populated state can still be inspected in the wireframe.

### Material card

Five woods, each with a price extra added to `BASE_PRICE`. `selectWood(name, extra)` writes state and calls `updateCaption()` and `updateBuildSummary()`.

### Stock card

Three serials. B-stock carries a badge and is **not** referral eligible: `state.stockIsBstock` suppresses the discount in `updateStockSummary()`.

### Accessories

One `ACCESSORIES` array rendered into both panels. Cards are built with `createElement` and `addEventListener`, never inline `onclick`: a name containing quotes, such as `Headphone “L” Adapter`, breaks attribute parsing, and that failure occurred in v1.

| Field | Meaning |
|---|---|
| `name`, `desc` | displayed |
| `price` | omitted when `included` is true |
| `included` | renders the word Included in the price position |
| `vis` | `acc-fifth` shows at 5-across desktop only, `acc-extra` behind show more |

Five across on desktop, four then show more on mobile. Prices carry `data-raw` so `updateAccPrices()` can re-render them when VAT changes.

### Referral code

Valid codes: `DANNY10`, `LENA`, `SOFIA`, all 5%. `applyCode()` and `applyStockCode()` write `state.discount`.

Eligibility is a property of the item, not of the page. The instrument is eligible; accessories and B-stock are not. Checkout shows a `Discount (0%)` line for eligible items even when no code is applied, so the reader can see the discount exists.

### Instrument summary

Shows base price, then discount, then VAT, then total. Collapses to one column at 980px, where destination country and referral code move above the VAT and total lines.

---

## Global VAT

```js
VAT_RATES = { HU: 0.27, DE: 0.19, FR: 0.20, US: null }
VAT_NAMES = { HU: "Hungary", DE: "Germany", FR: "France", US: "United States" }
```

Stored in `localStorage` under `neotone_country` and read on load by both `one.html` and `checkout.html`, so a country chosen in one place holds in the other. `formatWithVat(rawBase)` returns a VAT-inclusive integer, or the raw figure when the rate is null. Every displayed price is VAT inclusive; the breakdown appears only at checkout.

---

## Selection

```js
neotone_sel   // localStorage, JSON array
```

Item schema:

```js
{ id, name, detail, price,
  rawBase, discountPct, discountEligible }   // last three only on the instrument
```

`id` is `Date.now()`. `addToSelection(name, detail, price, extras)` pushes, saves, re-renders and opens the panel.

The panel lives on `one.html` and `checkout.html` only, because purchase happens only there and the v2 nav is wordmark-only, so Selection cannot be a nav item as it was in v1.

---

## Checkout

`renderCheckout()` prints, per line item: base price, discount where the item is eligible, then VAT, then total. `changeCheckoutCountry()` writes the same `neotone_country` key. `removeFromSelection(id)` removes inline; there is no selection panel here, because the selection is the page.

---

## Footer

Full bleed black, contents on the `.page` grid. Two bands separated by a single hairline.

| Band | Left | Right |
|---|---|---|
| Top | Neotone, One, neOS, plus Anima in future mode | Search field |
| Bottom | Workshop, Manual, Contact, Legal | Place, then social |

```
Budapest · visits by appointment
Instagram · YouTube · TikTok · Facebook
```

All footer text names its font family explicitly rather than inheriting, because the container pages originally set none on `body` and the footer fell back to Times on them.

**`scrollToTopThen(href)`** scrolls to the top, waits for the mark to expand, then navigates, so the cross-page animation continues from the state on screen instead of jumping. A 1200ms timeout fires the navigation regardless, covering smooth scrolling being disabled or interrupted. The same-page test compares the link's filename against the current one, not against `PAGE`, because checkout declares `PAGE = 'one'`.

**Unbuilt destinations** fire `alert()` describing what will be there: `utilityLink()`, `socialLink()`, `handleSearch()`, `loadMore()`.

---

## Mobile

Page bodies carry their responsive behaviour: material grid to 2 columns at 980px, accessories to 2-then-show-more, summary block collapsing.

The nav is the open problem. At 375px the four marks need 919px of bar and the active mark lands off screen at `left: 383px`. Once collapsed there are 117px free to the right of the active mark, so mobile likely begins in the state desktop's animation ends in. How the other sections are reached from there is deferred, and v1's hamburger does not transfer to a wordmark-only nav.

---

## Known duplication

Because pages are standalone, these are copied and must be changed in every file that carries them:

| Duplicated | Copies |
|---|---|
| Nav markup, CSS and script | 10 |
| Footer markup, CSS and script | 10 |
| `updateNav()`, `updateOpening()`, `scrollToTopThen()` | 10 |
| `handleSearch()`, `socialLink()`, `utilityLink()` | 10 |
| Selection panel and its script | 2 |
| Background colour, on `body` and on `nav` | 2 per page |
