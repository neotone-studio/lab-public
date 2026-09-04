# Neotone Wireframe v4

Built from v3. One structural change, with its consequences.

**The nav is Instruments · Tonefield, and the site lands on the instrument.** Culture and Craft collapsed into one publication, named, standing second in the masthead. The instrument section became plural, with the instruments named in a row at the top of each instrument page.

```
              NEOTONE
      Instruments    Tonefield
```

Why, and the editorial rules that go with it, are in the content structure document in the workspace `docs/`. This file is what changed in the build. [site-structure.md](site-structure.md) is the component reference.

---

## What changed from v3

| v3 | v4 |
|---|---|
| Culture · Instrument · Craft | Instruments · Tonefield |
| `index.html` is Culture, `craft.html` is Craft | the root is the instrument page; the feed is `tonefield.html`; `craft.html` removed |
| Instrument is one link | Instruments is a link; the instruments are named in a row at the top of each instrument page |
| Anima page with placeholder sections | Anima and Treangle as placeholders that promise nothing |
| Manual's third register marked neOS | marked Tonefield |
| neOS unnamed anywhere | named on the instrument page |
| No updates archive | `updates.html`, dated, linked from footer and sign-up |
| Short pages stopped collapsing part way | ramps scale to the page's scroll range |

**Culture and craft survive as kickers**, and as a curation rule: alternate the registers near the top of the feed, so a reader of either kind meets their own within a scroll. An earlier rule wanted both on the first screen; meeting it meant giving the first two pieces different layouts from the rest, and the opening line does the orienting job instead.

**Updates carry dates; Tonefield pieces do not.** The one visible difference between the two feeds, and the species difference.

**The feed holds nine pieces, every one a row in the pieces table** (`docs/content-strategy-notes/9_pieces.md` in the workspace), sourced from the 1000th-instrument draft, the three artist interviews and the manual's third register. Two invented placeholders (hijaz tetrachord, made of wood) were removed: the feed claims only material that exists. Kickers are the registers, Culture, Craft, Studio. Quotation marks in a title mean somebody said it; titles without them are statements.

---

## Growth

| When | Nav |
|---|---|
| Now | Instruments (One) · Tonefield |
| Anima ships | Instruments (One, Anima) · Tonefield |
| neOS ships standalone | Instruments · Software · Tonefield |

No rename events. A name enters the nav when the thing ships. An ad landing page is the instrument page shown without the publication around it: not a page type, never in the nav.

---

## Open

- **Mobile.** The bar is undesigned below 980px. The collapse travel, the instrument row and the footer bands are untested at phone width.
- **Workshop page** is still an alert. It is a utility page carrying the team and the company boilerplate.
- **Tonefield opens with the name over a subtitle**: On handpan craft and culture. A sentence form ("Tonefield is...") was tried and read as the site narrating itself; the subtitle is the magazine form. A category word was tried and dropped, since journal read as scholarly and publication read as flat, and naming the territory rather than the genre commits to nothing before the first issue exists. "Quarterly" was tried and retired for the same reason: it promises a frequency the company has not yet met. Craft before culture, because that is the order the knowledge moves in. A "From the editor" link sits under the line: a masthead document, not a piece, so it never appears in the feed.
- **The wordmark choreography of v2 is gone**, traded for a structure that scales. Worth knowing what was traded.
