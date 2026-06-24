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
| What Happens Next | One |
| Play One | One |
| Artists Grid | One (preview 6/9); Artists page (full, future) |
| Questions | One |
| Checkout | checkout.html |

---

## Top Nav

Site-wide shared component. Duplicated per page in the wireframe; treat as a single component in production.

Active state: `.active` on the current page's nav `<a>`.

All six items (One, Treangle, NeOS, Artists, Tonefield, Selection) are in a single `<ul class="nav-links">` using `display: grid; grid-template-columns: repeat(6, 1fr); width: 60%`, filling the space after the wordmark. Selection is the sixth `<li class="sel-item">`, visually separated from Tonefield by a `border-left: 1px solid var(--line)`. No padding-left on `.sel-item` — the border sits at the grid column boundary without pushing the text off-center.

---

## Bottom Menu

Site-wide shared component. Duplicated per page in the wireframe; treat as a single component in production.

Content: One, Treangle, NeOS, Artists, Tonefield / Terms, Privacy Policy, Contact, Workshop Address

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

Three article cards per instance, each linking to `/tonefield`. Always labeled "From Tonefield". No product CTA -- that's the Feature Block's job.

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

A right-side drawer (360px wide, full viewport height) that accumulates items across the site before the buyer proceeds to payment. Called "Selection" throughout -- not "cart" or "basket".

#### Nav Entry Point

"Selection" text link at the far right of the top nav on every page, outside the `<ul>` nav list. When items are present, a count appears inline: `Selection (2)`. Count element: `<span id="sel-count">`.

```javascript
// Count is hidden (display:none) when selection is empty,
// shown with content " (n)" when items are present.
```

#### Editing a Selection Item

There is no in-place edit. To change a configuration, the buyer removes the item from the selection and adds it again from the product page. This is intentional: each item's price is baked in at add time (with VAT and discount already applied), so editing in-place would require re-running the full pricing flow from within the panel.

#### Panel Structure

- **Header** -- "SELECTION" label + Close button
- **Body** (`#sel-body`) -- scrollable item list, or empty state text when empty
- **Footer** -- Total line (`#sel-total`, hidden when empty; shows "Total EUR X,XXX"), then "Proceed to Payment" button (`#sel-cta`, disabled when selection is empty)

Clicking the overlay backdrop closes the panel. Clicking Close closes it.

#### Selection Item (panel)

Each item shows: product name (serif), configuration detail (muted sans), price. Remove button on the right. Price shown here is the stored value — see Checkout for the expanded breakdown.

#### JS

```javascript
// Persistence: all pages read/write localStorage key 'neotone_sel'
// Items survive page navigation. Panel on any page shows the full cross-page state.

// Item schema: { id, name, detail, price, rawBase, discountPct, vatCountry }
// rawBase: pre-discount, pre-VAT EUR amount (used by checkout for recalculation)
// discountPct: referral discount applied at add time (0 for non-One items)
// vatCountry: country code used when item was added ("HU"|"DE"|"FR"|"US")
// price: stored display string, baked in at add time

getSelItems()         // reads and parses localStorage
saveSelItems(items)   // serializes and writes localStorage

addToSelection(name, detail, price, extras)
// Appends item (id: Date.now()), saves, calls renderSelection(), opens panel
// extras: optional { rawBase, discountPct, vatCountry }

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

handleSaveSelection(event)
// Fires alert() describing selection URL generation and email delivery
```

#### Save This Selection

Compact email form in the selection panel footer, visible only when items are present. Sits between the Total line and "Proceed to Payment". Fires `handleSaveSelection()` on submit. Label: "Save this selection". Confirmation: "Saved!". Moved here from the One page Built to Order panel — saving the full cross-page selection is more meaningful than saving a single product configuration.

#### Add to Selection -- per page

| Page | Function | Item name | Detail | Price |
|---|---|---|---|---|
| One (build) | `addBuildToSelection()` | Neotone One | `"Built to Order · {wood}"` | Calculated from state |
| One (stock) | `addStockToSelection()` | Neotone One | `"From Stock · {serialName}"` | Calculated from state; B-stock gets no discount |
| Treangle | `addTreangleToSelection()` | Treangle | Tonefield module | EUR 150 |
| Treangle | `addCorToSelection()` | Cor | Sound module | EUR 300 |
| Tonefield | `addMerchToSelection()` | Tonefield merch | Publications, prints, and objects | EUR 12 |

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

Sequence: panel intro → material grid → "Your Neotone One" summary → save configuration → questions form.

```javascript
selectWood(name, extra)
// Moves .active to selected card, sets state.wood + state.woodExtra
// Calls updateCaption(), updateBuildSummary()

applyCode()
// Valid codes: ["DANNY10","LENA","SOFIA"] → 5% discount
// Sets state.discount, updates #refmsg, calls updateBuildSummary()

changeVATCountry(val)
// Sets vatCountry, syncs both destination dropdowns, calls updateBuildSummary() + updateStockSummary()

vatLine(subtotal)
// Returns { text, total } where text is the VAT display string and total includes VAT
// USA: text = "No EU VAT — import duties may apply", total unchanged

updateBuildSummary()
// subtotal = (BASE_PRICE + woodExtra) × (1 - discount/100)
// vat = vatLine(subtotal)
// Updates #sum-wood, #sum-disc, #sum-vat, #sum-total
```

"Your Neotone One" summary block (`#f2f2f2` background) uses a two-column layout:

**Left column** (`.sum-pre` → `.sum-post`):
- Wood line (`#sum-wood`)
- Base price (`#sum-base`) — BASE_PRICE + woodExtra, before discount
- Referral discount line (`#sum-disc`)
- VAT line (`#sum-vat`)
- Total (`#sum-total`, includes VAT)

**Right column** (`.sum-controls`), separated by a left border:
- Destination Country (`#vat-country-build`) — Hungary 27%, Germany 19%, France 20%, United States (no EU VAT → "No VAT (import duties may apply)")
- Artist Referral Code — compact input `#refcode` + Apply button, same width as dropdown; feedback in `#refmsg`

On mobile (`≤980px`), the two-column layout collapses: controls column appears between Referral discount and VAT, so the buyer sets destination and code before seeing the VAT and total lines.

Add to Selection button below the layout.

Buyer Details have moved to `checkout.html`. Questions follow as supplementary. Save Configuration has moved to the selection panel as "Save this selection".

#### From Stock Panel (`#panel-stock`)

Sequence: panel intro → stock grid → no-stock toggle → "Your Neotone One" summary → stock notification → questions form.

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

"Your Neotone One" summary block mirrors the build panel layout. Destination dropdown (`#vat-country-stock`) is synced to the same `vatCountry` state as the build panel via `changeVATCountry()`.

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

---

### Stock Card

Three cards. Selected state: `.selected`. Click calls `selectStock(serialName, isBstock)`. B-stock cards include an inline `.bstock-badge` span. Referral discount does not apply to B-stock.

---

### What Happens Next

Four-column step strip. No JS. Steps: Confirmation → Workshop Contact → Build → Delivery.

Below the strip: "Can I change my mind?" with answer copy ("Yes, at any point. Before your instrument is built, during production, or within two weeks of delivery. Cancel or return for a full refund, no explanation required."), separated by a top border.

---

### Play One

Three separate HTML elements (no shared container):

1. **Editorial intro** -- `.editorial` centered column. "The Neotone One can't fully explain itself on a page..."

2. **Workshop block** -- `section.block`, `background: #f4f4f4`. "Write to us →" fires `alert()` in wireframe. Production: `<a href="mailto:...">`.

3. **Artists block** -- `section.block`. Lead text flows directly into the Artists Grid -- both are inside the same `<section>`, no break.

---

### Artists Grid

Filter row + 3-column card grid + "Show all" button.

**Data attributes per card:**
- `data-region` -- `"europe"` | `"americas"` | `"asia"`
- `data-sessions` -- `"true"` | `"false"` (in-person sessions)

**Initial visibility:**
- Desktop (> 980px): artists 1--6 visible. Artists 7--9 have `.artist-extra` (`display: none`).
- Mobile (≤ 980px): artists 1--5 visible. Artist 6 additionally has `.artist-sixth` (hidden via media query).

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
| 1 | Lena Voss | Germany | europe | yes | -- |
| 2 | Rafael Montes | Colombia | americas | no | -- |
| 3 | Yuki Tanaka | Japan | asia | yes | -- |
| 4 | Marta Hoffmann | Poland | europe | yes | -- |
| 5 | Elena Vasquez | Argentina | americas | yes | -- |
| 6 | Hiroshi Naka | South Korea | asia | no | artist-sixth |
| 7 | Anna Svensson | Sweden | europe | yes | artist-extra |
| 8 | Marco Ferretti | Italy | europe | no | artist-extra |
| 9 | Sung-Ah Kim | Taiwan | asia | yes | artist-extra |

---

### Questions

Catch-all contact form (name, email, textarea). No FAQ -- all functional questions are answered inline by the page. No JS in wireframe.

---

## Design Considerations

### Order Fork: Always-Visible Content
No conditional display within the purchase flow. Buyer details and order summary are always visible. Mahogany is pre-selected on load so the summary is always populated. Hiding content behind selection triggers was tried and removed.

### Order Fork: Tab Order and Default
From Stock left, Built to Order right and default. The order signals ascending commitment level. Built to Order default reflects the primary business model.

### Order Fork: Post-Summary Placement
Save Configuration (build) and Stock Notification (stock) are positioned after the Order Summary -- the "not ready to commit" exit in each panel. In the empty-stock state, Stock Notification moves to primary position since the rest of the panel is moot.

### Material Cards vs. Stock Cards
Same visual pattern, different components. Material cards select within a set (generic swatches). Stock cards select a unique object (real photos, specific serial numbers). May or may not share a component in production.

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

## Checkout Page

**File:** `checkout.html`

Two-column layout (responsive: stacks on mobile):

Two-column layout (responsive: stacks on mobile):

**Left — Your Selection**
Expanded item display (richer than the selection panel). Each item shows:
- Product name (Georgia serif)
- Configuration detail
- Discount: X%
- VAT: X% (Country): EUR X — or "No VAT (import duties may apply)" for US
- Total (calculated live from `rawBase`, `discountPct`, and `checkoutCountry`)

Total line below items. Empty state shows a link back to browse.

**Right — Destination Country + Delivery Details + Payment**
- **Destination Country** block (separate, above Delivery Details): full-width dropdown (`#checkout-country`), same country options as One page. Note: "VAT is calculated based on destination country, regardless of billing country." Changing this dropdown recalculates all item prices instantly.
- **Delivery Details** block: name, email, street, city, postal code. (Country is in the Destination block above.)
- **Payment** block: descriptive text + "Complete purchase" CTA (fires alert in wireframe). Disabled when selection is empty.

"Complete purchase" is disabled when selection is empty.

**Selection panel on checkout.html:** Present for reviewing/removing items. "Proceed to Payment" button replaced with a static "You are at checkout" label (disabled) — no recursive navigation. No "Save this selection" form (buyer is already at the end of the flow).

**JS functions specific to checkout:**
```javascript
var checkoutCountry  // detected from first item's vatCountry, fallback 'HU'

calcItemTotal(item, country)
// Computes { discountPct, vatText, total, totalStr } from item.rawBase and country
// Falls back to stored price for items without rawBase

changeCheckoutCountry(val)
// Sets checkoutCountry, calls renderCheckout()

renderCheckout()
// Reads localStorage, builds #checkout-items HTML with expanded per-item breakdown
// Sums totals via calcItemTotal(), updates #checkout-total
// Enables/disables #checkout-cta

removeFromSelection(id)
// Same as other pages — filters and saves, calls renderSelection() and renderCheckout()

handleCheckout()
// Fires alert() describing payment processor handoff
```

**VAT recalculation:** Checkout recalculates VAT live using `rawBase` and `discountPct` stored in each item. Changing the Destination Country dropdown updates all displayed prices. The stored `price` field (baked in at add time) is not used for checkout display — only for the selection panel sidebar.

#### Bottom Menu

Sits at the bottom of the viewport on all pages. Implemented via `body { display: flex; flex-direction: column; min-height: 100vh }` + `main { flex: 1 }` + `footer.block { margin-top: auto }`. On pages with little content the footer pins to the viewport bottom; on long pages it falls naturally after the content.
