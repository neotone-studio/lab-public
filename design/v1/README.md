# Neotone Site Mockup

> **Superseded.** This describes the original scroll-driven colour mockup: four pages, a background colour that changes as you scroll, and a background photograph. That system was deliberately removed in `wireframe/v2`, which is flat white. Kept for reference and still browsable. See the repository README for what is current.


A scroll-driven, multi-page mockup for the Neotone site. Four pages correspond to the four brand sections (Neotone, One, Anima, neOS). Each page shares the same structure and behavior but with a different active nav item and starting color.

---

## Navigation

A full-width sticky nav contains four wordmark images spaced evenly with `justify-content: space-between`. Assets are PNGs in `/media`:

- `wordmark_JP.png` · Neotone
- `one.png` · One
- `ANIMA.png` · Anima
- `neos.png` · neOS

Nav height is 100px. Images are set to `height: 52px; width: auto`.

---

## Scroll Behavior

Driven by scroll position over a 90px range (`TRANSITION_PX`). Two things happen as the user scrolls:

On the landing page (`index.html`), all four items load at full size. On section pages, the active item loads at full size and the other three animate down to `scale(0.58)` over 0.5s · establishing which section you're on at a glance. The transition is removed after 600ms so scroll-driven updates remain instant.

As the user scrolls:

**Active item** scales down in place from `scale(1)` to `scale(0.58)`, remaining centered at its original nav position.

**Secondary items** exit upward (`translateY(-80px)`) while fading out (`opacity: 0`), maintaining their reduced `scale(0.58)` throughout. The nav has `overflow: hidden` to clip them cleanly.

Clicking the active (shrunk) wordmark scrolls smoothly back to the top, which reverses both animations.

---

## Background Color

Six article blocks (each `115vh` tall) each carry a `data-color` assigned by JS at load time. On each scroll event, the script checks which article's top edge has passed the nav bottom, and updates `document.body.backgroundColor`. A CSS `transition: background-color 0.4s ease` on the body makes this smooth.

Each page has a `COLOR_OFFSET` that rotates which color the first article gets:

| Page | Active item | Starting color |
|------|-------------|----------------|
| index.html | Neotone | `#D9521F` |
| one.html | One | `#396DC1` |
| anima.html | Anima | `#FFF4D3` |
| neos.html | neOS | `#FFE6FF` |

The six colors in rotation order: `#D9521F` `#396DC1` `#FFF4D3` `#270636` `#B5B5B5` `#FFE6FF`

---

## Page Transitions

Clicking a secondary nav item triggers a JS handler instead of direct navigation. The handler sets `document.body.backgroundColor` to the destination page's starting color, waits 420ms for the CSS transition to complete, then navigates. Since the destination page has the same color set as an inline body style, the arrival is seamless.

---

## Per-Page Configuration

Each page is a standalone HTML file generated from the same template. The only differences are three values in the inline script:

- `ACTIVE` · index (0–3) of which nav item is the active one
- `COLOR_OFFSET` · which color in the array the first article gets
- `<body style="background: ...">` · must match `COLORS[COLOR_OFFSET]`

Everything else · markup, styles, logic · is identical across pages.
