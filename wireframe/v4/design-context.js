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
    '<p>This wireframe is an artifact of our work over the past months to articulate the company&rsquo;s values and direction. Some of the thinking it embeds warrants saying out loud as we begin to consider visual design, and to develop Neotone&rsquo;s brand system.</p>' +
    '<p>The site leans toward the vocabulary of an art and culture magazine, a site which itself feels like a high value material object with equally valuable thinking inside of it, rather than the vocabulary of an e-commerce site, with its feature and spec focus, marketing headlines, and shopping cart. The principle beneath this is to interrupt the default perception of the instrument as yet another boutique controller with interesting sensor tech, and to foreground instead that Neotone is uniquely positioned to produce knowledge in its field as well as instruments.</p>' +
    '<hr class="dc-rule">' +
    '<h3>Positioning</h3>' +
    '<p>The acoustic handpan is producing genuinely new knowledge, and Neotone has a unique view of it, because it rebuilt the instrument in another medium. That view runs in two directions. Neotone can articulate knowledge that is valuable to players and makers of the acoustic instrument, and also extend that field&rsquo;s values into electronic music. The position is a new frame, not a variation on any established frame. &ldquo;Digital handpan,&rdquo; an electronic translation of an acoustic instrument, has turned out to be too limited to describe what the company creates. So has &ldquo;MIDI controller,&rdquo; and so has &ldquo;experimental new interface.&rdquo; That frame is available because of three qualities of the acoustic handpan itself.</p>' +
    '<p>The handpan is about twenty-five years old, with a rapidly expanding community of makers and players, so the rate at which it produces new terminology, designs, and concepts is unusually high. We are watching a new acoustic instrument come into being and establish itself in culture in real time, which happens very rarely. The last instance at this magnitude is the saxophone in the 1930s.</p>' +
    '<p>The knowledge itself is cloaked in alchemy. The origin myth of music theory has Pythagoras walking past a blacksmith&rsquo;s shop and hearing the harmonic ratios in the hammers. The myth describes a physical impossibility, since metal is inharmonic. A handpan is a piece of metal into which a fundamental note and its harmonics are hammered by hand, which puts it, completely literally, at the junction of music theory and alchemy that the myth describes. Its knowledge is inseparable from its material.</p>' +
    '<p>And the handpan sounds good immediately when an absolute beginner plays it, while also having a very high ceiling for developing advanced skill, a combination that is powerful and rare in any instrument. This is an experiential opening into established musical traditions, and importantly, not only into the Western tradition where this instrument originated.</p>' +
    '<p>Neotone&rsquo;s view comes from that translation. Rebuilding the handpan in an electronic medium was a study of the acoustic instrument that is different from the study makers or players undertake. It created knowledge of a different sort: about gestures of the hand, about how one note changes with the position and force of a strike. And the instrument that came out of it, while of exceptionally high craftsmanship, is, crucially, not a handpan. Its body is made of wood rather than metal, and it also reaches directly into electronic music culture.</p>' +
    '<p>Neotone&rsquo;s adopters have followed the same line. The first customers were professional acoustic handpan players; the instrument now increasingly reaches DJs and electronic musicians, and the overlap opens a larger opportunity for learners, since it works equally well whether the entry point is sound design, electronic production, or instrumental technique. What Neotone offers is a way into a craft-rich practice, a way of belonging to that kind of pursuit. Neotone is thus not competing on features or specs, it is offering an otherwise unrepresented entry point into music.</p>' +
    '<p>All of this is invisible if the instrument is taken for something familiar at first glance. That impression cannot be interrupted through marketing headlines or product copy. It can only be interrupted by establishing a place to locate this emerging craft discourse. No individual instrument maker can own that discourse, Neotone included. Neotone&rsquo;s position to host it, and to embody and extend it in a singular way, is the principle underneath the design.</p>' +
    '<hr class="dc-rule">' +
    '<h3>Tonefield</h3>' +
    '<p>To accomplish this, the site introduces an editorial layer, at the highest level of navigation, alongside the instrument. We named this publication <a href="tonefield.html"><em>Tonefield</em></a>, after the surface of the instrument that meets the player&rsquo;s hand.</p>' +
    '<p>Its pieces pass a filter: they must be of value to a reader who does not necessarily own a Neotone instrument. That&rsquo;s what distinguishes the writing from a product blog. The pieces are edited and curated, not sorted by date, and they are not conceived as &ldquo;content&rdquo; generated to fill a pre-existing space. This project is creating a new space with new material, something that will invite contribution and that reads somewhere between an art and culture magazine and a trade journal. Neotone&rsquo;s instrument may itself be a point of access into many of these ideas, but it is not their subject.</p>' +
    '<p>The written pieces in this wireframe are early drafts, provided to give a sense of the subjects, voice, and register we&rsquo;d like to develop.</p>' +
    '<hr class="dc-rule">' +
    '<h3>Wireframe</h3>' +
    '<p>The wireframe does not intend to convey visual design choices. But some of its structure is deliberate in ways that may read as omissions.</p>' +
    '<p>A new visitor lands on <a href="' + L + '">the instrument</a>. Neotone is foremost an instrument maker, and its instrument contains the knowledge it produces. Some visitors will be electronic musicians or DJs who do not care to read about Pythagoras, who want the specs and a cool instrument and that&rsquo;s that, so the instrument is what everybody sees first.</p>' +
    '<p>The instrument page is structured as a narrative. The object draws you into a story, and the story draws you into deeper knowledge: discovery, then purchase, then continued exploration, with no separation between a product page and a store. We modeled this on the discovery and purchasing process that currently takes place through personal email correspondence with the company.</p>' +
    '<p>&ldquo;Neotone&rdquo; is the container for the instrument and the knowledge, so the wordmark is a masthead rather than a link, and the top level navigation is focused to its highest value outputs: Instruments and Tonefield. &ldquo;Instruments&rdquo; is plural solely to explore how the structure holds as Neotone develops additional products. Beneath those two words the site keeps the same separation of purposes. Tonefield has a container page and its <a href="transformation-alchemy-mystery.html">articles</a>. <a href="updates.html">Updates</a> has a container of its own, for the mailing list archive, which carries dates where Tonefield does not. And there is a small set of utility pages: a <a href="brief.html">Brief</a>, which gives the company at a glance without the product framing of a FAQ, and contact and <a href="legal.html">legal</a>, which are pure utility.</p>' +
    '<p>The principle is simplicity, and hard lines between the purposes of each part. To illustrate, there is no &ldquo;About&rdquo; page. What such a page would typically carry is distributed between the Brief, for getting information quickly, and a piece on the workshop, which introduces the production process and the people in the context of the instrument purchase, where it is purposeful.</p>';

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
