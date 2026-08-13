# Neotone Wireframe v3

A sketch of one change: **Neotone becomes a masthead, and the sections are Culture, Instrument, Craft.**

Everything else is copied from v2 so the two can be compared directly. Where this and v2 differ in anything other than navigation, v2 is the more finished version.

For the reasoning behind the site as a whole, see [the walkthrough](../../docs/2026-08-12_🤖_site-walkthrough.md), which still describes v2.

---

## What changed

**The nav.** v2 has three wordmarks with the instrument centred, where the company name doubles as the culture section. v3 puts the Neotone mark above three sections that name what the company consists of.

```
              NEOTONE
   Culture  Instrument  Craft
```

**The mark is identity, not a destination.** It is not a link. Clicking it once the bar has moved reopens the bar; at rest it does nothing, because you are already at the top of wherever you are. Navigation is the three sections and nothing else, which is what ends the blur v2 had between the company and one of its sections.

**There is no front page.** One was built and removed. A page showing one item from each section repeats what the bar already says in one line, at more length and with less fidelity. The root is Culture.

**At rest the bar offers, in motion it locates.** Every value in it is a function of scroll position rather than a timed animation, so there is nothing to snap or stutter, and nudging the wheel moves it a little.

| scroll | what the bar is |
|---|---|
| 0 | three sections, centred under the mark |
| 20 to 220 | the two you are not in fade |
| 60 to 460 | the mark and your section travel to the content boundary |
| beyond | mark and section name on one left edge |

**Arriving by choosing marks you straight away**, with the underline fading in. Clicking Instrument means you chose it, so the bar marks it on arrival. Landing cold, which in practice means the root, is not a choice: the bar opens as a menu and resolves as you scroll, then stays resolved, so coming back up shows the three options with your position among them.

**How the page knows which of those happened.** The page you leave records the navigation in `sessionStorage`; the page you arrive at reads it. This began as a `document.referrer` test, which was wrong: browsers and privacy settings strip the referrer often enough that the bar marked correctly for some readers and, for others, stayed neutral until they scrolled. It looked like a marking bug and was a signal bug.

**The marked state is set outright, and the fade only decorates it.** A CSS transition in a document that is not painting continuously can sit in the running state indefinitely, which left the underline stranded invisible. So the resting state is always written directly, and animation never carries correctness. Second time this pattern has bitten in this codebase.

**Returning stopped being a mechanism.** With the sections on screen the whole way down there is nothing to return from, so `RETURN_TO`, the mark collapse, the entry animation, `prevActive` and `prevCollapsed` are gone. Around 150 lines of navigation script per page became about 60. Scroll position is still restored when a piece's own section is clicked.

**Future-products mode is gone.** `?future=show` existed because Anima needed a nav slot it had not earned. A section called Instrument holds any number of instruments.

**The footer keeps its section links**, named for the sections. They were removed on the grounds that a bar visible the whole way down makes them redundant, and put back: footers restate a site's structure because at the bottom of a page a reader is deciding what is next, and the links also give search a left side so it can sit right at its own size. Removing them produced a band holding one small thing, and then a full width search field to cover the hole, which was worse than the problem.

Footer section links still rise before they leave. From the bottom of a page the bar is collapsed to a label, so navigating straight away would cut to a page with the menu already open. Scrolling up first lets it unfold on the way out.

---

## Pages

| File | Section | Was, in v2 |
|---|---|---|
| `index.html` | Culture | `index.html`, then the culture feed |
| `instrument.html` | Instrument | `one.html` |
| `craft.html` | Craft | `neos.html` |
| `checkout.html` | Instrument | same |
| `anima.html` | Instrument | same |
| `neotone-golsa-nazari.html` | Culture | same |
| `neos-note-names.html` | Craft | same |
| `manual.html`, `manual-scales.html` | Craft | Neotone |
| `legal.html` | none | Neotone |

The manual moves to Craft, which is where it belongs once craft is a named section rather than the software's name. Legal belongs to no section, so its bar never resolves: it keeps all three and simply moves across.

---

## Open questions

**Where neOS is named.** This is the real cost of the change. In v2 the software has a slot in the menu, so it is named, explained and downloaded there. Here it lives inside Craft and needs a block of its own on that page. Not yet built.

**Whether the instrument's name is demoted.** The section says Instrument; the page says Neotone One. Somebody scanning the menu sees a category where v2 gave them a product name.

**Short pages never finish collapsing.** Checkout with an empty selection has too little scroll for the bar to reach the boundary. Inherent to a scroll-linked bar, and probably fine.

**The wordmark loses its choreography.** v2's three marks, the centred instrument and the collapse into a masthead are the most distinctive thing about the site. This is a conventional magazine masthead, and conventional is doing real work here, but it is worth knowing what was traded.
