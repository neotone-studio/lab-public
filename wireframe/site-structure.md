# Site Structure

Component reference for the Neotone site. Covers shared behavior, JS state, and non-obvious implementation details. Does not describe visual style.

---

## Component Index

| Component | Pages |
|---|---|
| Top Nav | all |
| Bottom Menu | all |
| Feature Block | home ×3 |
| Tonefield Stack | home ×3, One |
| Email Capture | home (Receive Tonefield); One (Receive Tonefield, Stock Notification) |
| Save Selection | all (in selection panel footer, visible when items present) |
| Hero Block | One |
| Specs Strip | One |
| Editorial Block | One |
| Order Fork | One |
| Material Card | One |
| Stock Card | One |
| Accessories | One |
| What Happens Next | One |
| Play One | One |
| Artists Grid | One (preview 6/9); Artists page (full, future) |
| Questions | One |
| Checkout | checkout.html |

---

## Top Nav

Site-wide shared component. Duplicated per page in the wireframe; treat as a single component in production.

Active state: `.active` on the current page's nav `<a>`.

All six items (One, Treangle, NeOS, Artists, Tonefield, Selection) are in a single `<ul class="nav-links">` using `display: grid; grid-template-columns: repeat(6, 1fr); width: 60%`, filling the space after the wordmark. Selection is the sixth `<li class="sel-item">`, visually separated from Tonefield by a `border-left: 1px solid var(--line)`.

**Mobile (≤768px):** Nav links are hidden; a hamburger button (three horizontal lines) appears at the right of the nav bar. Tapping it toggles `.open` on `.nav-links`, which displays as a full-width vertical stack. Opening the selection panel automatically closes the mobile menu.

---

## Bottom Menu

Site-wide shared component. Duplicated per page in the wireframe; treat as a single component in production.

Content: One, Treangle, NeOS, Artists, Tonefield / Terms, Privacy Policy, Contact, Workshop Address

Pins to the bottom of the viewport on short pages. Implemented via `.page { display: flex; flex-direction: column; min-height: calc(100vh - 60px); }` + `footer.block { margin-top: auto; }`. Body has no flex — adding flex to body corrupts child element sizing.

---

## Feature Block

Three instances on home. Each is followed by a Tonefield Stack. CTA is an italic text link.

| # | Kicker | CTA | Destination |
|---|---|---|---|
| 1 | Origins | Discover Neotone One | One |
| 2 | Expanding the Field | Discover Treangle | Treangle |
| 3 | Voices from the First Generation | Continue Reading | Artists |

---

## Tonefield Stack

Three article cards per instance, each linking to `/tonefield`. Always labeled "From Tonefield". No product CTA — that's the Feature Block's job.

Description line per instance:

| Instance | Description |
|---|---|
| Home / Feature 1 | Selected reading on the acoustic handpan tradition |
| Home / Feature 2 | Selected reading on the electronic perspective |
| Home / Feature 3 | Selected reading from the practitioner community |
| One | Selected reading on the Neotone One |

---

## Email Capture

Shared component. Three instances, independently configured.

Submit behavior (all instances):
1. `event.preventDefault()`
2. `alert()` describes the triggered backend function
3. Submit button hidden, confirmation text shown in its place. Email input stays visible.

| Instance | Label | Description | Button | Confirmation | Alert describes |
|---|---|---|---|---|---|
| Receive Tonefield | Receive Tonefield | Neotone's quarterly music, culture, and thought publication. | Subscribe | Subscribed! | Automatic welcome email with past article links |
| Stock Notification | Notify me when new stock becomes available | We'll email you when a new instrument is listed. No account required. | Notify me | You're on the list | Email sent when new stock instrument is listed |

Save Configuration has been removed. It is replaced by "Save this selection" in the selection panel footer (see Selection section).

---

## Selection

**Pages:** all (panel present everywhere; items can only be added from One, Treangle, Tonefield; "Save this selection" appears in panel footer when items are present)

A right-side drawer (360px wide, full viewport height) that accumulates items across the site before the buyer proceeds to payment. Called "Selection" throughout — not "cart" or "basket".

#### Nav Entry Point

"Selection" text link at the far right of the top nav on every page, as the sixth `<li>` in `.nav-links`. When items are present, a count appears inline: `Selection (2)`. Count element: `<span id="sel-count">`.

#### Editing a Selection Item

There is no in-place edit. To change a configuration, the buyer removes the item from the selection and adds it again from the product page. This is intentional: each item's price is baked in at add time (with VAT and discount already applied), so editing in-place would require re-running the full pricing flow from within the panel.

#### Panel Structure

- **Header** — "SELECTION" label + Close button
- **Body** (`#sel-body`) — scrollable item list, or empty state text when empty
- **Footer** — Total line (`#sel-total`, hidden when empty), "Save this selection" form (hidden when empty), "Proceed to Payment" button (`#sel-cta`, disabled when empty)

Clicking the overlay backdrop closes the panel. Clicking Close closes it.

#### Selection Item (panel)

Each item shows: product name (serif), configuration detail (muted sans), price. Remove button on the right. Price shown here is the stored value — see Checkout for the expanded breakdown.

#### JS

```javascript
// Persistence: all pages read/write localStorage key 'neotone_sel'
// Items survive page navigation. Panel on any page shows the full cross-page state.

// Item schema: { id, name, detail, price, rawBase, discountPct, discountEligible }
// rawBase: pre-discount, pre-VAT EUR amount (used by checkout for recalculation)
// discountPct: referral discount % applied at add time (0 if no code entered)
// discountEligible: true only for Neotone One non-B-stock — controls whether the
//   discount line appears on checkout (even if discountPct is 0)
// price: VAT-inclusive display string, baked in at add time using the current global vatCountry

getSelItems()         // reads and parses localStorage
saveSelItems(items)   // serializes and writes localStorage

addToSelection(name, detail, price, extras)
// Appends item (id: Date.now()), saves, calls renderSelection(), opens panel
// extras: optional { rawBase, discountPct, discountEligible }

removeFromSelection(id)
// Filters by id, saves, calls renderSelection()

renderSelection()
// Reads localStorage, rebuilds #sel-body innerHTML
// Updates #sel-count visibility and text
// Enables/disables #sel-cta
// Shows/hides #sel-save-section (visible when items present)
// Called on every page load to restore count badge

openSelectionPanel() / closeSelectionPanel()
// Toggles .open on #sel-overlay and #sel-panel
// openSelectionPanel() also closes the mobile nav menu

handleSaveSelection(event)
// Fires alert() describing selection URL generation and email delivery
```

#### Save This Selection

Compact email form in the selection panel footer, visible only when items are present. Sits between the Total line and "Proceed to Payment". Fires `handleSaveSelection()` on submit. Label: "Save this selection". Confirmation: "Saved!".

#### Add to Selection — per page

All prices stored as VAT-inclusive at add time, based on the current global `vatCountry`.

| Page | Function | Item name | Base price | Discount eligible |
|---|---|---|---|---|
| One (build) | `addBuildToSelection()` | Neotone One (Built to Order) | BASE_PRICE + woodExtra | Yes |
| One (stock, non-B-stock) | `addStockToSelection()` | Neotone One (From Stock) | stockPrice | Yes |
| One (stock, B-stock) | `addStockToSelection()` | Neotone One (From Stock) | stockPrice | No — discountPct forced to 0 |
| One (accessories) | `addAccToSelection(name, desc, rawBase)` | varies | 2–80 | No |
| Treangle | `addTreangleToSelection()` | Treangle | 150 | No |
| Treangle | `addCorToSelection()` | Cor | 300 | No |
| Tonefield | `addMerchToSelection()` | Tonefield merch | 12 | No |

`addStockToSelection()` guards against no selection: fires `alert()` if `state.stockSelection` is empty.

Index, NeOS, and Artists pages have no add functions — they only display and remove items from the shared selection.

#### Proceed to Payment

Navigates to `checkout.html`. Disabled when selection is empty.

---

## One Page

### Hero Block

Bounded grey block, 340px. Text (`position: absolute; bottom: 0; left: 0`): Kicker, Title, Subtitle.

---

### Specs Strip

Five-column grid. Content:

| Label | Value |
|---|---|
| Material | Hand selected instrument grade hardwood |
| Sound | Cor sound engine, samples from world-class instruments |
| Control | 20 tonefields, gesture resolution, fully assignable |
| Scales | Unlimited, including harmonics, crosstalk, and articulation |
| Lead time | ~60 days, or stock available immediately |

---

### Editorial Block

Centered column (`max-width: 640px`), no border. Para 1 (~150 words) / pull quote (`border-left: 1px solid var(--line)`, curly quotes) / Para 2 (~80 words). No JS.

---

### Order Fork

Not a reusable component. Container: `padding: 0; overflow: hidden`. Inner content `padding: 16px`. Default active tab: Built to Order.

**JS state:**
```javascript
var state = {
  wood: "Mahogany", woodExtra: 90,
  discount: 0,
  orderMode: "build",       // "build" | "stock"
  stockSelection: "",
  stockPrice: 0,
  stockIsBstock: false
};
var BASE_PRICE = 3150;
```

#### Instrument Preview

Caption (`#selection-caption`) updates on every selection:
- Build: `"Built to Order · {wood}"`
- Stock, nothing selected: `"From Stock · Select an instrument below"`
- Stock, selected: `"From Stock · {serialName}"`

#### Tabs

From Stock (left) / Built to Order (right, default active).

```javascript
switchFork("build" | "stock")
// Toggles .active on tabs, .hidden on panels, calls updateCaption()
```

#### Built to Order Panel (`#panel-build`)

Sequence: panel intro → material grid → instrument summary → accessories → questions form.

```javascript
selectWood(name, extra)
// Moves .active to selected card, sets state.wood + state.woodExtra
// Calls updateCaption(), updateBuildSummary()

applyCode()
// Valid codes: ["DANNY10","LENA","SOFIA"] → 5% discount
// Sets state.discount, updates #refmsg, calls updateBuildSummary()

changeVATCountry(val)
// Sets vatCountry, saves to localStorage 'neotone_country'
// Syncs both destination dropdowns, calls updateBuildSummary(), updateStockSummary(), updateAccPrices()

vatLine(subtotal)
// Returns { text, total } — text is the VAT breakdown string, total includes VAT
// USA: text = "No VAT (import duties may apply)", total unchanged

updateBuildSummary()
// subtotal = (BASE_PRICE + woodExtra) × (1 - discount/100)
// vat = vatLine(subtotal)
// Updates #sum-wood, #sum-disc, #sum-vat, #sum-total
```

"Your instrument" summary block (`#f2f2f2` background) uses a two-column layout:

**Left column** (`.sum-pre` → `.sum-post`):
- Wood line (`#sum-wood`)
- Base price (`#sum-base`) — BASE_PRICE + woodExtra, before discount
- Referral discount line (`#sum-disc`)
- VAT line (`#sum-vat`)
- Total (`#sum-total`, includes VAT)

**Right column** (`.sum-controls`), separated by a left border:
- Destination Country (`#vat-country-build`) — Hungary 27%, Germany 19%, France 20%, United States (no VAT → "No VAT (import duties may apply)"). Note "Used to calculate VAT" beneath the dropdown.
- Artist Referral Code — compact input `#refcode` + Apply button, same width as dropdown; feedback in `#refmsg`

On mobile (≤980px), the two-column layout collapses: controls column appears between Referral discount and VAT, so the buyer sets destination and code before seeing the VAT and total lines.

Add to Selection button below the layout, followed by the Accessories section.

#### From Stock Panel (`#panel-stock`)

Sequence: panel intro → stock grid → no-stock toggle → instrument summary → accessories → stock notification → questions form.

```javascript
selectStock(serialName, isBstock)
// Moves .selected to selected card, sets state.stockSelection, .stockPrice, .stockIsBstock
// Calls updateCaption(), updateStockSummary()

applyStockCode()
// Same as applyCode() but if state.stockIsBstock: ignores code, sets discount to 0

updateStockSummary()
// Returns early if no stock selection
// subtotal: B-stock gets no discount; otherwise stockPrice × (1 - discount/100)
// vat = vatLine(subtotal)
// Updates #stock-sum-item, #stock-sum-disc, #stock-sum-vat, #stock-sum-total
```

"Your instrument" summary block mirrors the build panel layout. Destination dropdown (`#vat-country-stock`) is synced to the same `vatCountry` state as the build panel via `changeVATCountry()`. Serial number shown without prefix (e.g. "Serial No. 821").

Current stock:

| Element ID | Serial | Wood | Price | B-stock |
|---|---|---|---|---|
| stock-a | 821 | Walnut | EUR 3,800 | No |
| stock-b | 873 | Cherry | EUR 3,980 | No |
| stock-c | 907 | Oak | EUR 3,100 | Yes |

**No-Stock Toggle (wireframe only):**

```javascript
var stockEmptyVisible = false;
toggleStockEmpty()
// Swaps #stock-available and #stock-empty-state
// Button: "Preview: no stock available ↑" / "Preview: show stock instruments ↑"
```

Empty state message: "No stock instruments available at this time. New stock is listed here as instruments become available. Built to order is always open."

---

### Material Card

Five cards (Ash, Oak, Mahogany, Cherry, Walnut). Mahogany active on load. Active state: `.active`. Click calls `selectWood(name, extra)`.

Price extras (EUR): Ash +0, Oak +0, Mahogany +90, Cherry +90, Walnut +190.

Mobile (≤980px): two columns (same as stock grid).

---

### Stock Card

Three cards. Selected state: `.selected`. Click calls `selectStock(serialName, isBstock)`. B-stock cards include an inline `.bstock-badge` span. Referral discount does not apply to B-stock.

---

### Accessories

Five-column grid (`repeat(5, 1fr)`) inside the instrument summary block, after the Add to Selection button in both Built to Order and From Stock panels. Content is identical in both panels.

**Grid:** Desktop: 5 columns, 1 visible row (5 items). Mobile (≤980px): 2 columns, 2 visible rows (4 items). "Show more accessories ↓" button below the grid reveals all remaining items. Toggle is per-panel and independent.

**Mobile truncation:** The 5th card (Headphone "L" Adapter) carries `.acc-fifth`. On mobile this class hides it by default and reveals it when `.acc-expanded` is present, so mobile shows exactly 4 items before "Show more".

**Item types:**
- **Included** — no price, no button. "Included" appears at the price line position (same style as the price). Signals value without requiring action.
- **Purchasable** — price shown VAT-inclusive (see Global VAT below). "Add to Selection" button.

**Prices on the card** are rendered dynamically via `data-raw` attributes and `updateAccPrices()` — they reflect the current global VAT country and update when the country changes.

```javascript
toggleAccessories(btn)
// Toggles .acc-expanded on the nearest .acc-grid
// Button label: "Show more accessories ↓" / "Show fewer accessories ↑"

addAccToSelection(name, desc, rawBase)
// Applies vatLine(rawBase) at current vatCountry, calls addToSelection() with discountPct: 0

formatWithVat(rawBase)
// Returns "EUR X" with VAT applied at current vatCountry (rounds to nearest integer)

updateAccPrices()
// Updates all [data-raw] elements on the page to the current VAT-inclusive price
```

**Current items:**

| Name | Base | Type | Desktop visible | Mobile visible |
|---|---|---|---|---|
| Neotone Semi-Rigid Case | — | Included | Yes | Yes |
| Donut Stand | — | Included | Yes | Yes |
| Desktop Stand | 12 | Purchasable | Yes | Yes |
| Intech Knot | 80 | Purchasable | Yes | Yes |
| Headphone "L" Adapter | 2 | Purchasable | Yes (`.acc-fifth`) | No → show more |
| MIDI DIN Adapter | 8 | Purchasable | No → show more | No → show more |
| Wood Care Kit | 9 | Purchasable | No → show more | No → show more |
| Neotone Carry Bag | 28 | Purchasable | No → show more | No → show more |

---

### What Happens Next

Four-column step strip. No JS. Steps: Confirmation → Workshop Contact → Build → Delivery.

Below the strip: "Can I change my mind?" with answer copy ("Yes, at any point. Before your instrument is built, during production, or within two weeks of delivery. Cancel or return for a full refund, no explanation required."), separated by a top border.

---

### Play One

Three separate HTML elements (no shared container):

1. **Editorial intro** — `.editorial` centered column. "The Neotone One can't fully explain itself on a page..."

2. **Workshop block** — `section.block`, `background: #f4f4f4`. "Write to us →" fires `alert()` in wireframe. Production: `<a href="mailto:...">`.

3. **Artists block** — `section.block`. Lead text flows directly into the Artists Grid — both are inside the same `<section>`, no break.

---

### Artists Grid

Filter row + 3-column card grid + "Show all" button.

**Data attributes per card:**
- `data-region` — `"europe"` | `"americas"` | `"asia"`
- `data-sessions` — `"true"` | `"false"` (in-person sessions)

**Initial visibility:**
- Desktop (>980px): artists 1–6 visible. Artists 7–9 have `.artist-extra` (`display: none`).
- Mobile (≤980px): artists 1–5 visible. Artist 6 additionally has `.artist-sixth` (hidden via media query).

```javascript
var showAllActive = false;
var currentFilter = "all";

filterArtists(filter, button)
// filter: "all" | "europe" | "americas" | "asia" | "sessions"
// When showAllActive is false: forces .artist-extra and (mobile) .artist-sixth to display:none
// Otherwise filters by data-region / data-sessions="true"

toggleShowAll(btn)
// Flips showAllActive, re-runs filterArtists(currentFilter)
// Button label: "Show all artists" / "Show fewer"

toggleArtist(id, btn)
// Toggles .open on the detail div, btn.textContent: "Expand" ↔ "Collapse"
```

**Note:** Switching filters does not reset `showAllActive`. Production should decide whether a filter change collapses the grid.

**In-person sessions badge:** shown only when `data-sessions="true"`. No badge for virtual-only artists.

**Current artists:**

| # | Name | Country | Region | In-person | Class |
|---|---|---|---|---|---|
| 1 | Lena Voss | Germany | europe | yes | — |
| 2 | Rafael Montes | Colombia | americas | no | — |
| 3 | Yuki Tanaka | Japan | asia | yes | — |
| 4 | Marta Hoffmann | Poland | europe | yes | — |
| 5 | Elena Vasquez | Argentina | americas | yes | — |
| 6 | Hiroshi Naka | South Korea | asia | no | artist-sixth |
| 7 | Anna Svensson | Sweden | europe | yes | artist-extra |
| 8 | Marco Ferretti | Italy | europe | no | artist-extra |
| 9 | Sung-Ah Kim | Taiwan | asia | yes | artist-extra |

---

### Questions

Catch-all contact form (name, email, textarea). No FAQ — all functional questions are answered inline by the page. No JS in wireframe.

---

## Design Considerations

### Order Fork: Always-Visible Content
No conditional display within the purchase flow. Buyer details and order summary are always visible. Mahogany is pre-selected on load so the summary is always populated.

### Order Fork: Tab Order and Default
From Stock left, Built to Order right and default. The order signals ascending commitment level. Built to Order default reflects the primary business model.

### Order Fork: Post-Summary Placement
Save Configuration (build) and Stock Notification (stock) are positioned after the Order Summary — the "not ready to commit" exit in each panel. In the empty-stock state, Stock Notification moves to primary position since the rest of the panel is moot.

### Material Cards vs. Stock Cards
Same visual pattern, different components. Material cards select within a set (generic swatches). Stock cards select a unique object (real photos, specific serial numbers). May or may not share a component in production.

### Accessories: Included Items in the Grid
Included items (case, donut stand) sit in the same grid as purchasable accessories rather than in a separate "in the box" list. The buyer sees they're receiving items for free alongside items they can add. "Included" replaces the price line (same visual weight — not italic or muted); no button is shown.

### Hero Block: Bounded vs. Full-Bleed
Currently bounded (same max-width as page). Full-bleed is an open option for the visual design pass.

### Play One: Workshop Block
Wireframe uses grey to mark it as a self-contained destination. Designer may place a workshop image behind it.

---

## Popup Behaviors

All wireframe popups use `alert()`.

| Trigger | Alert describes |
|---|---|
| Receive Tonefield submit | Welcome email sent; includes past article links |
| Stock Notification submit | Address added to stock list; email sent when new instrument listed |
| Save selection submit (selection panel) | Unique selection URL generated and emailed; no account created |
| "Write to us" click | Email client opened; pre-addressed to workshop, subject "Visit enquiry" |
| Checkout: Complete purchase | Delivery details + selection line items passed to payment processor; buyer completes payment on hosted page and returns to confirmation |

---

## Global VAT

**localStorage key:** `neotone_country` — persists across all pages. Default: `'HU'`.

**Rates:**

| Code | Country | Rate |
|---|---|---|
| HU | Hungary | 27% |
| DE | Germany | 19% |
| FR | France | 20% |
| US | United States | none |

**Where it's set:** `one.html` destination country dropdowns; `checkout.html` destination country dropdown. Both write to `neotone_country` and are initialized from it on load.

**How prices are displayed:** All product pages show VAT-inclusive prices. No breakdown is shown on product pages — only on checkout. Elements with a `data-raw` attribute (base EUR price as a number) are updated by `updateAccPrices()` / `updatePrices()` on load and whenever the country changes. Prices in the selection panel are baked in at add time.

---

## Checkout Page

**File:** `checkout.html`

Two-column layout (responsive: stacks on mobile):

**Left — Your Selection**
Expanded item display (richer than the selection panel). Each item shows:
- Product name (Georgia serif)
- Configuration detail
- Base: EUR X (pre-discount, pre-VAT)
- Discount (X%): EUR Y — shown for all `discountEligible` items even at 0% (incentivises code entry); minus sign only shown when Y > 0
- VAT: X% (Country): EUR Z — or "No VAT (import duties may apply)" for US (omitted when null)
- Total, calculated live from `rawBase`, `discountPct`, and `checkoutCountry`

Total line below items. Empty state shows a link back to browse.

**Right — Destination Country + Delivery Details + Payment**
- **Destination Country** block: full-width dropdown (`#checkout-country`), initialized from `neotone_country`. Changing it writes back to `neotone_country` and recalculates all item prices instantly.
- **Delivery Details** block: name, email, street, city, postal code.
- **Payment** block: descriptive text + "Complete purchase" CTA (fires alert in wireframe). Disabled when selection is empty.

**Selection panel on checkout.html:** Present for reviewing/removing items. "Proceed to Payment" button replaced with a static "You are at checkout" label — no recursive navigation. No "Save this selection" form.

**JS functions specific to checkout:**
```javascript
var checkoutCountry  // read from localStorage 'neotone_country', fallback 'HU'

calcItemTotal(item, country)
// Returns { baseStr, discountPct, vatText, total, totalStr }
// baseStr: "EUR {rawBase}" — shown on checkout as the pre-discount price
// Falls back to stored price string for items without rawBase

changeCheckoutCountry(val)
// Sets checkoutCountry, writes to localStorage 'neotone_country', calls renderCheckout()

renderCheckout()
// Reads localStorage, builds #checkout-items HTML with full per-item breakdown
// Sums totals via calcItemTotal(), updates #checkout-total
// Enables/disables #checkout-cta

removeFromSelection(id)
// Same as other pages — filters, saves, calls renderSelection() + renderCheckout()

handleCheckout()
// Fires alert() describing payment processor handoff
```
