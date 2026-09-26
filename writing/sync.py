#!/usr/bin/env python3
"""Sync the writing in this folder into the wireframe, ../wireframe/current.

    python3 writing/sync.py           write edited words into the site
    python3 writing/sync.py --check   list what would change, write nothing

Each .md here is one piece of writing on the site:
  design-context.md   the Design context panel, design-context.js
  <slug>.md           a Tonefield piece, its page <slug>.html and its feed entry
  neotone-one.md      the instrument page, index.html

Only words are replaced, and only where they differ, so unedited files change
nothing. Quotes are typed straight and become curly on the site.

Markdown: *italic*, [link](page.html). A piece opens with its title, **Kicker**
and **Preview** for the feed, then a --- divider and the body, with [Image: ...]
and [Video: ...] figures, ending with the bracketed draft note. neotone-one.md follows the page block by block, so edits
go inside a block and the number of blocks stays fixed. Its bracketed headings
are for orientation only, **bold** in the title is the name styling, and spec
labels and wood names stay as they are.
"""
import html, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(HERE, '..', 'wireframe', 'current')

# Tonefield feed order; a piece without a page is feed-only.
PIECES = ['transformation-alchemy-mystery', 'safe-yet-expansive', 'bach-on-a-handpan',
          'accidentally-microtonal', 'integrating-integral', 'three-journeys']


# ---- text -------------------------------------------------------------------

def typo(s):
    s = s.replace("'", '&rsquo;').replace('…', '&hellip;').replace('×', '&times;').replace('→', '&rarr;')
    out, opening = [], True
    for ch in s:
        if ch == '"':
            out.append('&ldquo;' if opening else '&rdquo;')
            opening = not opening
        else:
            out.append(ch)
    return ''.join(out)

def inline(s, bold='strong'):
    """Markdown line to HTML: [links](page.html), *italic*, **bold**, typography."""
    def fmt(t):
        t = typo(t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))
        t = re.sub(r'\*\*(.+?)\*\*', r'<%s>\1</%s>' % (bold, bold.split()[0]), t)
        return re.sub(r'\*(.+?)\*', r'<em>\1</em>', t)
    out, last = [], 0
    for m in re.finditer(r'\[([^\]]+)\]\(([^)\s]+)\)', s):
        out += [fmt(s[last:m.start()]), '<a href="%s">%s</a>' % (m.group(2), fmt(m.group(1)))]
        last = m.end()
    return ''.join(out + [fmt(s[last:])])

def norm(h):
    """What a reader sees, for comparing: entities decoded, quotes straightened, spacing collapsed."""
    h = re.sub(r'<br\s*/?>', '\x01', h)
    h = re.sub(r'\s+', ' ', h).strip()
    t = html.unescape(h).replace('\x01', '\n')
    return re.sub(r' ?\n ?', '\n', t).translate({0x2019: "'", 0x2018: "'", 0x201c: '"', 0x201d: '"'})

def blocks(md):
    return [b.strip() for b in re.split(r'\n\s*\n', md.strip()) if b.strip()]

def para(b):
    return ' '.join(l.strip() for l in b.split('\n'))


# ---- design context ---------------------------------------------------------

def design_context(check):
    path = os.path.join(SITE, 'design-context.js')
    js = open(path, encoding='utf-8').read()
    start = js.index('  var DOC =\n')
    end = js.index("';\n", start) + 3
    current = ''.join(re.findall(r"'((?:[^'\\]|\\.)*)'", js[start:end].replace("' + L + '", 'index.html')))
    parts = []
    for b in blocks(open(os.path.join(HERE, 'design-context.md'), encoding='utf-8').read()):
        if b.startswith('### '): parts.append('<h3>%s</h3>' % inline(b[4:]))
        elif b.startswith('## '): parts.append('<h2>%s</h2>' % inline(b[3:]))
        elif re.fullmatch(r'-{3,}', b): parts.append('<hr class="dc-rule">')
        else: parts.append('<p>%s</p>' % inline(para(b)))
    if norm(''.join(parts)) == norm(current):
        return []
    if not check:
        lines = ["    '%s' +" % p.replace('href="index.html"', "href=\"' + L + '\"") for p in parts]
        lines[-1] = lines[-1][:-2] + ';'
        js = js[:start] + '  var DOC =\n' + '\n'.join(lines) + '\n' + js[end:]
        open(path, 'w', encoding='utf-8').write(js)
    return ['design-context.js']


# ---- Tonefield --------------------------------------------------------------

def read_piece(slug):
    """Title, **Kicker** and **Preview** for the feed, then --- and the body."""
    bs = blocks(open(os.path.join(HERE, slug + '.md'), encoding='utf-8').read())
    cut = next((i for i, b in enumerate(bs) if re.fullmatch(r'-{3,}', b)), len(bs))
    p = dict(slug=slug, title=None, kicker=None, preview=None, body=[para(b) for b in bs[cut + 1:]], note=None)
    for b in bs[:cut]:
        m = re.fullmatch(r'\*\*(Kicker|Preview)\*\*\s*([\s\S]+)', b)
        if b.startswith('# '): p['title'] = b[2:].strip()
        elif m: p[m.group(1).lower()] = para(m.group(2))
    if p['body'] and re.fullmatch(r'\[.*\]', p['body'][-1]) and not re.match(r'\[(Image|Video): ', p['body'][-1]):
        p['note'] = p['body'].pop()
    for k in ('title', 'kicker', 'preview'):
        if not p[k]: sys.exit('%s.md: no %s' % (slug, k))
    return p

def figure(b):
    kind, cap = re.fullmatch(r'\[(Image|Video): (.+)\]', b).groups()
    box = 'video-box' if kind == 'Video' else 'media-box'
    return ('      <figure class="piece-media">\n        <div class="%s"></div>\n'
            '        <figcaption class="piece-caption">%s: %s</figcaption>\n      </figure>') % (box, kind, inline(cap))

def article(p, nxt):
    body = '\n\n'.join(figure(b) if re.fullmatch(r'\[(Image|Video): .+\]', b) else '      <p>%s</p>' % inline(b) for b in p['body'])
    note = '\n\n      <p class="piece-note">%s</p>' % inline(p['note']) if p['note'] else ''
    href = nxt['slug'] + '.html' if nxt['page'] else 'tonefield.html#' + nxt['slug']
    return ('  <article class="piece">\n\n    <header class="piece-head">\n'
            '      <span class="piece-kicker">%s</span>\n      <h1 class="piece-title">%s</h1>\n    </header>\n\n'
            '    <div class="piece-body">\n%s%s\n    </div>\n\n'
            '    <nav class="next" aria-label="Read next">\n      <span class="next-label">Read next</span>\n      <ul class="next-list">\n'
            '        <li><a href="%s"><span class="next-kicker">%s</span><span class="next-title">%s</span></a></li>\n'
            '      </ul>\n    </nav>\n\n  </article>\n') % (inline(p['kicker']), inline(p['title']), body, note,
                                                          href, inline(nxt['kicker']), inline(nxt['title']))

def feed_item(i, p):
    cls = 'feed-item' + (' lead' if i == 0 else ' second' if i == 1 else '')
    href, click = (p['slug'] + '.html', '') if p['page'] else ('#', ' onclick="pieceLink(event)"')
    return ('      <article class="%s" id="%s">\n        <div class="feed-media"></div>\n'
            '        <span class="feed-kicker">%s</span>\n'
            '        <h2 class="feed-title"><a href="%s"%s>%s</a></h2>\n'
            '        <p class="feed-excerpt">%s</p>\n'
            '        <a class="feed-more" href="%s"%s>Continue reading &rarr;</a>\n      </article>') % (
            cls, p['slug'], inline(p['kicker']), href, click, inline(p['title']), inline(p['preview']), href, click)

def tonefield(check):
    changed = []
    pieces = [read_piece(s) for s in PIECES]
    for p in pieces:
        p['page'] = os.path.exists(os.path.join(SITE, p['slug'] + '.html'))
    paged = [p for p in pieces if p['page']]
    for i, p in enumerate(paged):
        nxt = paged[i + 1] if i + 1 < len(paged) else next(q for q in pieces if not q['page'])
        path = os.path.join(SITE, p['slug'] + '.html')
        s = open(path, encoding='utf-8').read()
        m = re.search(r'  <article class="piece">.*?  </article>\n', s, re.S)
        t = re.search(r'<title>(.*?)</title>', s)
        new_art, new_title = article(p, nxt), inline(p['title']) + ' &middot; Tonefield'
        if norm(m.group(0)) == norm(new_art) and norm(t.group(1)) == norm(new_title):
            continue
        changed.append(p['slug'] + '.html')
        if not check:
            s = s[:m.start()] + new_art + s[m.end():]
            s = re.sub(r'<title>.*?</title>', '<title>%s</title>' % new_title, s, count=1)
            open(path, 'w', encoding='utf-8').write(s)
    path = os.path.join(SITE, 'tonefield.html')
    s = open(path, encoding='utf-8').read()
    m = re.search(r'(  <div class="feed">\n)(.*?)(\n  </div>\n\n  <div class="feed-end">)', s, re.S)
    new_feed = '\n' + '\n\n'.join(feed_item(i, p) for i, p in enumerate(pieces))
    if norm(m.group(2)) != norm(new_feed):
        changed.append('tonefield.html')
        if not check:
            open(path, 'w', encoding='utf-8').write(s[:m.start(2)] + new_feed + s[m.end(2):])
    return changed


# ---- Neotone One ------------------------------------------------------------

def cls(tag, name, n=0, inner=r'(.*?)'):
    return (r'<%s class="%s"[^>]*>%s</%s>' % (tag, name, inner, tag), n, 1)

# Every text on index.html that neotone-one.md carries: (pattern, occurrence, group).
SLOT = {
    'opening': cls('h1', 'opening'),
    'text1': cls('p', 'editorial-text'), 'pull': cls('p', 'editorial-pull'), 'text2': cls('p', 'editorial-text', 1),
    'neos-kicker': cls('span', 'neos-kicker'), 'neos-title': cls('h2', 'neos-title'), 'neos-text': cls('p', 'neos-text'),
    'build-intro': cls('p', 'panel-intro'), 'stock-intro': cls('p', 'panel-intro', 1),
    'empty-head': cls('p', 'stock-empty-head'), 'empty-body': cls('p', 'stock-empty-body'),
    'notify-label': (r'<div class="block sans"[^>]*>\s*<p class="block-label">(.*?)</p>\s*<p class="block-desc"[^>]*>(.*?)</p>', 0, 1),
    'notify-desc': (r'<div class="block sans"[^>]*>\s*<p class="block-label">(.*?)</p>\s*<p class="block-desc"[^>]*>(.*?)</p>', 0, 2),
    'next-label': cls('span', 'sec-label'),
    'terms-q': cls('p', 'terms-q'), 'terms-a': cls('p', 'terms-a'), 'q-label': cls('span', 'q-label'), 'q-desc': cls('p', 'q-desc'),
    'play-label': cls('span', 'sec-label', 1), 'play-line': cls('p', 'sec-line'),
    'cta': cls('a', 'path-cta'), 'from-label': cls('span', 'sec-label', 2), 'from-line': cls('p', 'sec-line', 1),
    'list-label': cls('span', 'subscribe-label'),
    'list-text': (r'<span class="subscribe-label">.*?</span>\s*<p>(.*?)</p>', 0, 1),
}
for i in range(5):
    SLOT['spec%d' % i], SLOT['specv%d' % i] = cls('span', 'spec-label', i), cls('span', 'spec-value', i)
    SLOT['wood%d' % i], SLOT['woodn%d' % i] = cls('p', 'material-name', i), cls('p', 'material-note', i)
for i in range(3):
    for part in ('kind', 'title', 'desc'):
        SLOT['door%d-%s' % (i, part)] = cls('span', 'door-' + part, i)
    SLOT['way%d' % i], SLOT['wayt%d' % i] = cls('h3', 'way-title', i), cls('p', 'way-text', i)
for i in range(2):
    SLOT['tab%d' % i], SLOT['tabd%d' % i] = cls('span', 'tab-title', i), cls('span', 'tab-desc', i)
for i in range(4):
    SLOT['step%d' % i], SLOT['stepd%d' % i] = cls('p', 'step-title', i), cls('p', 'step-desc', i)
    SLOT['card%d' % i], SLOT['cardd%d' % i] = cls('p', 'stack-title', i), cls('p', 'stack-desc', i)

# neotone-one.md in reading order: (kind, slots). A str is a fixed heading.
LAYOUT = [
    ('h1', ['opening']), ('p', ['text1']), ('quote', ['pull']), ('p', ['text2']),
    '## [Specs]', *[('item', ['spec%d' % i, 'specv%d' % i]) for i in range(5)],
    ('h2', ['neos-title']), ('kicker', ['neos-kicker']), ('p', ['neos-text']),
    *[('door', ['door%d-title' % i, 'door%d-kind' % i, 'door%d-desc' % i]) for i in range(3)],
    '## [Order]', *[('item', ['tab%d' % i, 'tabd%d' % i]) for i in range(2)],
    '### [Built to Order]', ('p', ['build-intro']), *[('item', ['wood%d' % i, 'woodn%d' % i]) for i in range(5)],
    '### [From Stock]', ('p', ['stock-intro']), ('p', ['empty-head']), ('lines', ['empty-body']),
    ('h3', ['notify-label']), ('p', ['notify-desc']),
    ('h2', ['next-label']), *[('num', ['step%d' % i, 'stepd%d' % i]) for i in range(4)],
    ('h3', ['terms-q']), ('p', ['terms-a']), ('h3', ['q-label']), ('p', ['q-desc']),
    ('h2', ['play-label']), ('p', ['play-line']),
    ('h3', ['way0']), ('p', ['wayt0']), ('p', ['cta']), ('item', ['card0', 'cardd0']),
    ('h3', ['way1']), ('p', ['wayt1']), ('h3', ['way2']), ('p', ['wayt2']),
    ('h2', ['from-label']), ('p', ['from-line']), *[('item', ['card%d' % i, 'cardd%d' % i]) for i in (1, 2, 3)],
    ('h2', ['list-label']), ('p', ['list-text']),
]
# Spec labels and wood names are also named in the page's scripts, so they stay as they are.
KEYS = ['spec%d' % i for i in range(5)] + ['wood%d' % i for i in range(5)]

def tokens(md):
    out = []
    for b in blocks(md):
        lines = b.split('\n')
        if all(re.match(r'(- |\d+\. )', l) for l in lines):
            out += [l for l in lines]
        else:
            out.append(b)
    return out

def read_one(md):
    """neotone-one.md to {slot: markdown text}, checked against LAYOUT."""
    toks, vals = tokens(md), {}
    if len(toks) != len(LAYOUT):
        sys.exit('neotone-one.md: %d blocks where the page has %d; add or remove text only inside a block' % (len(toks), len(LAYOUT)))
    for t, spec in zip(toks, LAYOUT):
        if isinstance(spec, str):
            if t != spec: sys.exit('neotone-one.md: expected "%s", found "%s"' % (spec, t[:60]))
            continue
        kind, slots = spec
        pat = {'h1': r'# (.+)', 'h2': r'## (.+)', 'h3': r'### (.+)', 'quote': r'> (.+)', 'kicker': r'\*\*Kicker\*\*\s*(.+)',
               'item': r'- (.+?): (.+)', 'num': r'\d+\. (.+?): (.+)', 'door': r'- (.+?) \((.+?)\): (.+)',
               'p': r'(?!#|- |> |\d+\. )([\s\S]+)', 'lines': r'([\s\S]+)'}[kind]
        m = re.fullmatch(pat, t)
        if not m: sys.exit('neotone-one.md: "%s" should be a %s' % (t[:60], kind))
        groups = [g if kind == 'lines' else para(g) for g in m.groups()]
        for s, g in zip(slots, groups):
            vals[s] = g
    return vals

def neotone_one(check):
    path = os.path.join(SITE, 'index.html')
    s = open(path, encoding='utf-8').read()
    vals = read_one(open(os.path.join(HERE, 'neotone-one.md'), encoding='utf-8').read())
    edits = []
    for name, (pat, n, g) in SLOT.items():
        m = list(re.finditer(pat, s, re.S))[n]
        cur = m.group(g)
        v = vals[name]
        new = inline(v, bold='span class="opening-name"') if name == 'opening' else \
              '<br>'.join(inline(l.strip()) for l in v.split('\n')) if name == 'empty-body' else inline(v)
        if norm(cur) == norm(new):
            continue
        if name in KEYS:
            sys.exit('neotone-one.md: "%s" is also named in the page\'s scripts, so it stays as it is' % norm(cur))
        edits.append((m.start(g), m.end(g), new))
    if edits and not check:
        for a, b, new in sorted(edits, reverse=True):
            s = s[:a] + new + s[b:]
        open(path, 'w', encoding='utf-8').write(s)
    return ['index.html (%d text%s)' % (len(edits), '' if len(edits) == 1 else 's')] if edits else []


if __name__ == '__main__':
    check = '--check' in sys.argv
    changed = design_context(check) + tonefield(check) + neotone_one(check)
    verb = 'would change' if check else 'changed'
    print('\n'.join('%s %s' % (verb, c) for c in changed) if changed else 'site matches the writing, nothing to change')
