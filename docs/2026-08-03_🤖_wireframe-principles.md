# Principles for the next wireframe pass

## Four species of page

**1. Article.** An individual piece. Has its own URL.
**2. Container.** Holds articles. Neotone, neOS.
**3. Section page.** A page of sections. One, and later Anima. Carries purchase.
**4. Utility.** Footer material. Terms, privacy, contact, FAQ, workshop address.

Nothing is a fifth thing. A page that is none of these is either an article or it does not exist. This is the rule to apply when someone asks for a new page.

## Two axes, kept separate

**5. The nav is organized by reader state, not by content type.**

- **Neotone** when you do not have a question
- **One**, and later **Anima**, when you want to buy one and know what you are buying
- **neOS** when you have a question

**6. Species is how a page is built. Reader state is how the nav is ordered.** These are different axes and they must not collapse into each other. Neotone and neOS are both containers and different destinations. A product page is not inside a container at all; it sits at the same level as one.

**7. A container appears only when a species outgrows the nav.** One, two or three products are simply three nav items. There is no grouping page until there are more products than the nav can carry, and that threshold is not close.

**8. When someone asks for a page, they are asking for a container.** Ask what species of thing it collects. One thing means it is an article.

**9. Nav holds containers and section pages. Footer holds utility and search.** The footer test: nobody arrives there by browsing. You get there by search or by need. That is why it can hold unrelated things without becoming a junk drawer, and why nothing interesting goes there.

## Navigation and reading

**10. Every page returns to its parent. Anything without a parent returns to root. Neotone is root.**
An article returns to its container. A neOS article returns to neOS. A utility page has no container, so it returns to Neotone, which is also the home page. One mechanism, no special cases.

The exception to watch: an article reached from a product page's learn-more stack. Its parent is Neotone, so the masthead would send someone mid-purchase back to culture. **Product-page stacks open in a new tab.** You are enriching, not navigating, and the purchase flow stays intact behind it.

**11. The nav is the return mechanism.** The active wordmark shrinks to a masthead in the corner as you scroll. On an article page that mark is still the container's mark, so an article is *inside* its container rather than away from it. Clicking the mark goes back. No breadcrumbs, no back links.

**12. Articles open as dedicated pages with real URLs.** Not modals, not in-place expansion. Decided by an earlier decision: copy is written for search and AI discoverability, and modal content is unreliable for that. Sharing needs a URL, the Tonefield roundup selects articles and selection needs addressable items, and a print edition later needs articles to be discrete objects.

**13. The container is skimmable. The article is not.** These look contradictory next to "here, read" and they are actually the resolution. An index is supposed to be skimmable. The article is where the pull quote as title and the absence of headings do their work.

**14. The whole block is the click target.** A block in a container carries a kicker, a title or pull quote, and an image. No "read more" button. No button, just the thing.

**15. Articles and utility pages render identically.** The difference between them is how you arrived, not what they look like. This costs nothing and it means the FAQ never has to be classified, which is the sign it is the right rule. The only distinction emerges on its own: an article carries its container's mark, a utility page carries the plain Neotone mark.

**16. A Tonefield issue is an article.** Not a nav item, not a container, not a page. A recurring piece that introduces and links what it collects. It is the home for the first-person maker's note, it is what the announcement email points at, and it is the manifest the print edition is made from. Four times a year a different kind of block appears in the same stack.

**17. The container does not need a second view.** It grows by load-more, and there are three paths into older material, all of which already exist: **load-more** for the recently curious, **search** for the specific, and **a Tonefield issue** for browsing, since an issue is a curated selection and therefore already the archive view. No archive page, no list mode, no fourth species.

Two things this requires, both specified now rather than discovered at build:

- **Search and load-more are one mechanism.** Both read a JSON index of article metadata: title, kicker, date, container, first line. Built once, scales to a few hundred articles client-side, and it is also what a Tonefield issue reads when one is assembled.
- **Scroll restoration on return.** With eighteen blocks loaded, the wordmark return would land at the top of the container. Session-stored position fixes it, and it needs to be in the wireframe because unfixed it reads as broken.

## Reading and voice

**18. Slow down the undecided. Get out of the way of the decided.** The impossible-to-skim principle belongs on Neotone. The One page is where someone arrives knowing what they want, so it assumes intent and does not argue for the instrument. Its learn-more stacks are depth for the already committed: reassurance and enrichment, not a case.

**19. Articles are read. Sections are moved through.** If a block on a product page is worth reading on its own, it is an article and belongs in a container, linked from the section where it is relevant.

**20. Every piece should do more than one job.** An article sits in a container, gets linked from a product section at the relevant moment, and is eligible for a Tonefield issue. Connective tissue written to hold a page narrative together does one job and is the most expensive prose to maintain.

**21. Talk about the workshop, not from it.** The voice is a musician engaged with the object, at slight remove. The one exception is designated and small: the first-person maker's note at the top of each Tonefield issue.

**22. No negative constructions. Ever.** Never say what it is not.

**23. Nothing goes in the wireframe without a reader.** A block that exists because the structure implies it should exist is what made the first wireframe a record of your structuring.

---

## The team page

The need is real and worth taking seriously. For a handmade object with a two-month wait, the people are a trust signal doing commercial work, not decoration.

The format is the problem. A grid of headshots and job titles is what a product company does, which is the read the site exists to interrupt, and it is the one format that can only be written from inside the workshop.

The version that satisfies the same need: **a photographed workshop piece, everyone named, written as an article.** Faces on the site, obeys the voice rule, evergreen, and permalinked from the footer where anyone looking for it will look. It is also a piece already on the list twice.

## Are Neotone and neOS legitimately separate

**Separate by reader, not by subject.** Neotone is where you go when you do not have a question. neOS is where you go when you do. The same subject appears in both in different registers: "how to build a scale" on neOS, procedural and looked up; "hijaz" on Neotone, cultural and browsed. That is the feedback loop, and a loop needs two ends.

Two things confirm it. neOS content has a search requirement and Neotone content does not, which is most of why search is in the footer. And neOS carries a job that is not articles: say what the software is, say what it does, let someone get it.

**The honest risk.** Documentation is the slowest-moving content and neOS currently has two sketched titles. If the stack stays thin, neOS is a download page holding a nav item on brand weight it has not earned. Survivable if it is wireframed short and allowed to grow. Not survivable if six blocks are drawn that never fill.

## What three destinations settles

**The wordmark-only nav survives.** Every item is a named thing with a mark. A Products item would have been the one word among marks.

**The One page fence is closed.** If the nav item means "you want to buy one and know what you are buying," discovery is not that page's job, and the purchase-flow version wins on navigation rather than preference. Lauren's flag and the eccentric instinct were both right about the old structure, where One had to persuade and transact in one scroll.

**It scales by adding products, not levels.** Neotone · One · neOS today. Neotone · One · Anima · neOS when Anima ships. Nothing restructures.

---

# Content to create

Order is by what blocks the build.

## First, because it blocks the designer

The One page is designed first and built first. Roughly 900 words across eight small units, most already drafted somewhere.

1. **Banner**: kicker, title, subtitle.
2. **Specs strip**: material, sound, control, scales, lead time, in that order. Drafted 6/22 and close to final.
3. **Orientation paragraph**, ~120 words. Shape, material, serial number. Not a case for the instrument, since the visitor arrived knowing.
4. **Order fork**: built-to-order and stock as a relationship choice, material cards, stock cards, the empty-stock state.
5. **What happens next**: four steps, no deposit and no final payment. Confirmation with serial, workshop contact, build, delivery. Second person, future tense.
6. **Purchase terms**: refund window and lead time in trust language.
7. **Play one first**: the workshop and artist sessions, as a fork.

## The three One-stack articles

Depth for the already committed. These are your three most-written subjects.

8. **On waiting for your instrument.** The workshop, the people, the wait as part of what was bought. Highest-leverage piece in the project, and the source text for "what happens next."
9. **Why an electronic instrument is made of wood.** Read right after someone chooses a wood.
10. **The workshop, with everyone in it.** This is the team page. Evergreen, so it also takes a footer permalink.

## The Neotone launch set

The three original home-page frames survive the death of the splashes, not as blurbs but as the anchor articles.

11. **You never play a single note.** The acoustic lineage frame. Roughly seventy percent written in the first paragraph of the 6/05 freewrite.
12. **Forty years of electronic music assumed a piano.** The electronic world frame, and the piece that most directly tests the editorial bet.
13. **The players who have no predecessors.** The community frame, and now the framing piece for the whole profile and interview category.

Then the lighter tier, which you arrived at by sketching rather than deciding:

14. **Two or three player pieces** in the register of your own mockup titles. A profile, an interview, a debut. This is the weekly flow and it is where artists now live. Commission the first interview now, since it is the only item depending on someone else's calendar. The three ambassadors who replied in May are the list.

15. **Tonefield 01, Origins.** The issue article. Maker's note plus what it collects. Ships once there are enough pieces to select from, not before.

## neOS

16. **The page itself**: what it is, what it does, how to get it. Short.
17. **Two articles to open the stack**: "how to build a scale" and "what is Spatial MIDI?", already in your mockup. Build the link from the scale piece to hijaz on day one, because a loop that exists in one place is more convincing than a loop described in a brief.

## Footer

18. **FAQ**, rewritten for search and AI discoverability. The current one is honest to the point of self-undermining in two places, the acoustic comparison and the custom scale caveat. Both need to become positive constructions without becoming dishonest, which is writing rather than cleanup.
19. **Terms, privacy, contact, workshop address.**

## What died

The three home splashes, since the component is gone. The Treangle page, deferred with Treangle. The Artists page copy, absorbed into culture. About six pieces of One-page connective tissue, which was the most expensive prose in the old wireframe and the least reusable.

## Rate

Nine writing pieces before launch, at the build plan's own one per week from mid-August, lands in late October. That clears NAMM with room. The constraint is not writing speed. It is that items 1 through 7 are waiting on a designer who is not hired.
