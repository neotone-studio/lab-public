/* Design context.

   Scaffolding, not part of the design. It exists because much of what this
   structure does is invisible: the refusals are not in the files, so a reader
   fills them with convention. Kept in its own file for that reason, and because
   the text then lives in one place rather than in eleven pages.

   Delete this file and the one script tag per page to remove it entirely. */

"use strict";

(function () {

  var KEY = "neotone_design_context_scroll";
  var OPEN = "neotone_design_context_open";
  var L = "index.html";

  var DOC =
    '<h2>Product &times; Editorial</h2>' +

    '<p>This wireframe is an artifact of our work over the past months to articulate the company&rsquo;s values and direction. Some of the thinking it embeds warrants saying out loud as we begin to consider visual design, and to develop Neotone&rsquo;s brand system more generally.</p>' +
    '<p>The high level design principle is that the site leans more toward the vocabulary of an art and culture magazine, a site that itself feels like a high value material object with valuable thinking inside of it, rather than toward the vocabulary of an e-commerce or product site, with its feature and spec focus, marketing headlines, and shopping cart.</p>' +
    '<p>The principle beneath this is to interrupt the default perception of the instrument as another high-end, boutique controller with interesting sensor tech, and to instead establish Neotone as uniquely positioned to produce knowledge in its field as well as instruments.</p>' +

    '<hr class="dc-rule">' +

    '<h3>Positioning background</h3>' +
    '<p>The basis for this opportunity is rooted in the history and culture of the acoustic handpan specifically.</p>' +
    '<p>Neotone began as the world&rsquo;s leading digital handpan, and its site is currently digitalhandpan.com. But gradually the company has discovered that &ldquo;digital handpan&rdquo; is too narrow a framing for what it creates. The instrument is not quite an electronic translation of an acoustic instrument, in the category of the EWI, nor is it quite an ergonomic MIDI keyboard, in the category of the Linnstrument or other isomorphic controllers. The distinction is between adding further information and variation to an established format, and introducing a frame that is not otherwise represented.</p>' +

    '<p>That frame is available because of the particular state of the acoustic handpan itself.</p>' +

    '<p>On one hand, the handpan is a relatively new instrument, about twenty-five years old, with a rapidly growing base of makers and players, so the rate at which this community creates genuinely new terminology, designs and concepts is unusually high. It is watching a new instrument come into being in culture in real time, establishing itself. This happens very rarely. The nearest kin is the steelpan, which is less a comparison than an ancestor, since the Hang came out of PanART&rsquo;s work with steel drums. Past that, the last instance at this magnitude and trajectory might be the saxophone in the 1930s.</p>' +

    '<p>On another, the knowledge around it is cloaked in a long history of materiality, alchemy and craft. It is a harmonic metal instrument, which reaches back to the origin myth of music theory: Pythagoras walking past a blacksmith&rsquo;s shop and hearing the harmonic ratios in the hammers. The detail worth noticing is that the myth describes a physical impossibility. Metal is inharmonic. And a handpan is an instrument where an artificial fundamental and its harmonics are literally hammered into a piece of metal and tuned so as to emulate natural harmonic resonance. The same myth founds music theory and alchemical mysticism both, and the instrument sits at that junction in a completely literal way. The transformation of material runs the length of the lineage: the secret ore of the Zildjian cymbal company, the anodized steel of the original PanART Hang, and the embodied craft knowledge of tuners hammering harmonicity into inharmonic material.</p>' +

    '<p>And third, it offers a genuinely different frame on established musical practice: theory, ways of interacting with an instrument, approaches to learning, all of which could generalize beyond the handpan. The handpan gained popularity in part because it immediately sounds good when an absolute beginner plays it, and it also has a very high ceiling for developing skill. That combination is powerful and rare in an instrument. A violin has an enormous ceiling and a steep barrier to entry. A piano is more approachable than a violin, and still asks you to parse which of its notes will sound good together, what will make a song, what will make a harmonious improvisational space. The handpan is positioned to function the way pentatonic instruments function in Orff pedagogy, as an immediate experiential opening, except in a fully diatonic form. It is a unique experiential and narrative opening into established musical traditions, and importantly not only into the Western tradition where it originated.</p>' +

    '<p>Neotone is positioned to curate and develop this discourse because by its nature it is a study of the acoustic handpan, not a variation of it. Rebuilding an instrument in another medium is an act of study, and it created different information: about sensing, about what a hand is actually doing, about how one note changes with the position and force of a strike and with how it is damped. And the instrument that came out of it generalizes. The scale leaves the object and becomes a catalog applied to it. Many of the choices that belonged to the instrument maker now belong to the player, and a choice you make constantly needs knowledge to make it with.</p>' +

    '<p>So the writing is not a blog supplemental to the instrument. It is the positioning vehicle for the instrument.</p>' +

    '<p>That cannot be achieved in product headlines. It can only be achieved by genuinely establishing a hub where this kind of craft discourse can centralize. No individual handpan maker can own that discourse, Neotone included. But Neotone&rsquo;s position to host it, and to embody and extend it in a singular way, is the principle underneath the design.</p>' +

    '<hr class="dc-rule">' +

    '<h3>Walking the site</h3>' +
    '<p>Much of what the wireframe does is invisible, because the structure is defined as much by what it declines. It is easier to show that by walking it.</p>' +
    '<p><a href="' + L + '">You land on the instrument</a>. Above it, the name, and under the name two words: Instruments and Tonefield. That is the entire navigation. There is no about page, no blog, no news section and no shop, and nothing else will be added to those two words until something ships that deserves one.</p>' +
    '<p>The name itself is not a link. Anywhere it could go would define what Neotone is as one of its own parts. Send it to the publication and the company is the publication; send it to the instrument and the company is the instrument. So it sits above its two halves and goes nowhere, and as you scroll the section names fade and the name alone travels into the corner, small, staying present.</p>' +
    '<p>The page reads like a piece. An opening line, then the instrument at full width, then prose, then the specifications with a diagram you can interrogate, then neOS, which is the software and is given the one inverted block on the page, because the instrument and its interface are two parts of one thing.</p>' +
    '<p>Then you buy it, without going anywhere. There is no shop, and <a href="checkout.html">checkout</a> is the second half of this page rather than a destination. A shop is a comparison surface, a grid of many things with filters and a price sort, and Neotone has one instrument, so that surface would be empty. Splitting the page would also put a boundary between reading about the wood and choosing the wood. What a reader actually needs from a shop is that their choices survive leaving the page, so the Selection is held in the browser and they can go and read three pieces with the wood still chosen. It is a Selection and not a cart, deliberately.</p>' +
    '<p>Then the terms, and then two ways to play one before ordering. Neotone sells directly, so the people below are the retail network: the workshop in Budapest, and artists around the world who host sessions in their studios and homes, some of whom simply take a call and answer questions in your language. Sessions are free, and a host&rsquo;s referral code takes five percent off. Shops will join the same grid when a partnership is real, and not before.</p>' +
    '<p><a href="tonefield.html">Tonefield is the publication</a>, and it stands beside the instrument in the masthead rather than under it in a footer. Its pieces carry no dates, because a piece is written to hold whenever it is read; the <a href="updates.html">mailing list archive</a> carries dates, because an update belongs to its week. One test decides what belongs there: remove Neotone from it, and see whether anything is left. If what remains is a real question about making music, making instruments or being a musician, it is a piece. If nothing remains, it is news or utility. There is no third place, and that is deliberate, because the middle register is where mediocre company writing accumulates.</p>' +
    '<p><a href="manual.html">The manual</a> is written in three registers: the basic walkthrough, deeper functionality, and the craft questions underneath. The first two are manual content. The third crosses out of the manual and into Tonefield. Writing the manual properly is what surfaces those pieces, which is why documentation is the method here rather than the overhead.</p>' +

    '<hr class="dc-rule">' +

    '<h3>Four page types</h3>' +
    '<p>Everything here is one of four things, which is also what there is to design.</p>' +
    '<p>The <a href="' + L + '">instrument page</a> is the root and carries the purchase, with <a href="checkout.html">checkout</a> as its second half. A container is a feed of pieces: <a href="tonefield.html">Tonefield</a>, and <a href="updates.html">Updates</a> with dates. An article is one piece at reading measure, like <a href="neotone-golsa-nazari.html">this interview</a> or <a href="neos-note-names.html">this craft piece</a>. A utility page renders like an article but belongs to no section, so its bar never resolves: the <a href="manual.html">manual</a> and <a href="manual-scales.html">a section of it</a>, and <a href="legal.html">legal</a>.</p>';

  var CSS =
    '.dc-tab{position:fixed;left:0;bottom:0;z-index:80;font:11px/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;' +
      'letter-spacing:.04em;color:#5b5b5b;background:#f2f0ec;border:1px solid #d4d1cb;border-left:none;border-bottom:none;' +
      'padding:8px 12px;cursor:pointer;}' +
    '.dc-tab:hover{color:#111;background:#eae7e1;}' +
    '.dc-overlay{position:fixed;inset:0;background:rgba(0,0,0,.10);z-index:90;display:none;}' +
    '.dc-overlay.open{display:block;}' +
    '.dc-panel{position:fixed;left:0;top:0;bottom:0;width:640px;max-width:100%;background:#fcfcfb;z-index:91;' +
      'border-right:1px solid #d9d5ce;transform:translateX(-100%);transition:transform .28s ease;' +
      'display:flex;flex-direction:column;}' +
    '.dc-panel.open{transform:translateX(0);}' +
    '.dc-panel.dc-instant{transition:none;}' +
    /* Monospace chrome, serif document. The frame says scaffolding, the text
       says read me, and the two never get confused for each other. */
    '.dc-head{flex:none;display:flex;align-items:center;justify-content:flex-end;' +
      'padding:14px 20px;' +
      'font:11px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.06em;color:#8a857d;}' +
    '.dc-close{background:none;border:none;cursor:pointer;padding:4px;' +
      'font:11px/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.06em;color:#8a857d;}' +
    '.dc-close:hover{color:#111;}' +
    '.dc-body{flex:1;overflow-y:auto;padding:44px 52px 96px;' +
      'font-family:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif;}' +
    /* One heading species. Weight, colour and spacing are shared; only scale
       and the space above them separate the title from a section. */
    '.dc-body h2,.dc-body h3{font-weight:400;color:#16130f;letter-spacing:-.012em;}' +
    '.dc-body h2,.dc-body h3{margin:0 0 22px;font-size:21px;line-height:1.3;}' +
    '.dc-body h2{margin-bottom:30px;}' +
    '.dc-body p{margin:0 0 21px;font-size:16px;line-height:1.72;color:#33302a;}' +
    '.dc-rule{border:none;border-top:1px solid #e3e0da;margin:48px 0 44px;}' +
    '.dc-body a{color:inherit;text-decoration:underline;text-decoration-color:#c4bfb5;' +
      'text-underline-offset:3px;text-decoration-thickness:1px;}' +
    '.dc-body a:hover{text-decoration-color:#16130f;}' +
    '@media (max-width:760px){.dc-panel{width:100%;}.dc-body{padding:34px 26px 80px;}' +
      '.dc-body h2,.dc-body h3{font-size:19px;}}';

  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }

  var style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  var tab = el('<button class="dc-tab" aria-haspopup="dialog">&lt;design context&gt;</button>');
  var overlay = el('<div class="dc-overlay"></div>');
  var panel = el(
    '<aside class="dc-panel" role="dialog" aria-label="Design context" aria-hidden="true">' +
      '<div class="dc-head"><button class="dc-close">close</button></div>' +
      '<div class="dc-body">' + DOC + '</div>' +
    '</aside>'
  );

  document.body.appendChild(tab);
  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  var body = panel.querySelector(".dc-body");

  /* The document is read, not consulted, so reopening returns to the sentence
     you left rather than to the top. Same move the containers make. */
  /* ?context in the address bar opens the panel, and opening it puts the
     param there, so the URL you copy is always the view you are looking at.
     A query param rather than a hash, because the manual uses hashes to open
     its own sections. */
  function setParam(on) {
    if (!history.replaceState) return;
    var u = location.pathname + location.search + location.hash;
    var has = /[?&]context(=|&|$)/.test(location.search);
    if (on && !has) {
      u = location.pathname + (location.search ? location.search + "&" : "?") + "context" + location.hash;
    } else if (!on && has) {
      var q = location.search.replace(/([?&])context(=[^&]*)?(&|$)/, "$1").replace(/[?&]$/, "");
      u = location.pathname + (q === "?" ? "" : q) + location.hash;
    } else {
      return;
    }
    try { history.replaceState(null, "", u); } catch (e) {}
  }

  function open() {
    try { sessionStorage.setItem(OPEN, "1"); } catch (e) {}
    setParam(true);
    overlay.classList.add("open");
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    var y = 0;
    try { y = parseInt(sessionStorage.getItem(KEY) || "0", 10) || 0; } catch (e) {}
    body.scrollTop = y;
  }

  function close() {
    try { sessionStorage.setItem(OPEN, "0"); } catch (e) {}
    setParam(false);
    remember();
    overlay.classList.remove("open");
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  }

  function remember() {
    try { sessionStorage.setItem(KEY, String(body.scrollTop)); } catch (e) {}
  }

  tab.addEventListener("click", open);
  overlay.addEventListener("click", close);
  panel.querySelector(".dc-close").addEventListener("click", close);
  body.addEventListener("scroll", remember);

  /* Following a link changes the page behind the panel and the panel stays,
     so the document reads as a tour. Closing it is a deliberate act. */
  body.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href]") : null;
    if (a) remember();
  });

  /* Reopened on the next page with the transition suppressed, because a slide
     on every navigation would read as the panel arriving rather than staying.
     The resting state is set outright; a synchronous reflow separates it from
     the rule that follows, since rAF is throttled in a document that is not
     painting. */
  try {
    var wanted = sessionStorage.getItem(OPEN) === "1";
    if (/[?&]context(=|&|$)/.test(location.search)) wanted = true;
    if (wanted) {
      panel.classList.add("dc-instant");
      open();
      void panel.offsetHeight;
      panel.classList.remove("dc-instant");
    }
  } catch (e) {}

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("open")) close();
  });

})();
