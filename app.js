const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/&lt;br&gt;/g, '<br>');

function render() {
  const side = document.getElementById('side');
  const quick = document.getElementById('quick');
  const content = document.getElementById('content');
  let sideHtml = '';
  let html = '';

  SECOES.forEach((s, idx) => {
    if (s.grupo) sideHtml += '<div class="side-title">' + s.grupo + '</div>';
    sideHtml += '<a class="nav" href="#' + s.id + '" data-id="' + s.id + '"><i class="fa-solid ' + s.icon + '"></i>' + s.titulo + '</a>';
    quick.insertAdjacentHTML('beforeend', '<a href="#' + s.id + '"><i class="fa-solid ' + s.icon + '"></i>' + s.titulo + '</a>');

    html += '<section class="sec" id="' + s.id + '"><div class="sec-head"><div class="sec-icon ' + s.cor + '"><i class="fa-solid ' + s.icon + '"></i></div><h2>' + s.titulo + '</h2></div>';
    if (s.sub) html += '<div class="sec-sub">' + fmt(s.sub) + '</div>';
    if (s.tiles) html += '<div class="tiles">' + s.tiles.map((t) => '<div class="tile item ' + (t.cls || '') + '"><div class="tt">' + t.t + '</div><div class="tv">' + fmt(t.v) + '</div></div>').join('') + '</div>';
    if (s.termos) html += '<div class="terms">' + s.termos.map((t) =>
      '<div class="term item"><div class="tn">' + t.n + '</div><div class="td">' + fmt(t.d) + '</div>' +
      (t.ex.length ? '<div class="tx">' + t.ex.map((e) => '<span>' + esc(e) + '</span>').join('') + '</div>' : '') + '</div>').join('') + '</div>';
    if (s.precisa) html += '<div class="blk"><h3>O que você precisa</h3><div class="needs">' + s.precisa.map((n) => '<span class="need item">' + fmt(n) + '</span>').join('') + '</div></div>';
    if (s.passos) html += '<div class="blk"><h3>Passo a passo</h3><ol class="steps">' + s.passos.map((p, n) => '<li class="step item"><span class="num">' + (n + 1) + '</span><div><div class="st">' + fmt(p[0]) + '</div><div class="sd">' + fmt(p[1]) + '</div></div></li>').join('') + '</ol></div>';
    (s.blocos || []).forEach((b) => {
      html += '<div class="blk"><h3>' + b.h + '</h3><ul class="rules">' + b.itens.map((i) => '<li class="item">' + fmt(i) + '</li>').join('') + '</ul></div>';
    });
    (s.teclas || []).forEach((g) => {
      html += '<div class="blk"><h3>' + g.g + '</h3><div class="keys">' + g.l.map((k) => '<div class="key item"><kbd>' + esc(k[0]) + '</kbd><span>' + esc(k[1]) + '</span></div>').join('') + '</div></div>';
    });
    if (s.comandos) html += '<div class="keys">' + s.comandos.map((c) => '<div class="key item"><code class="cmd">' + c[0] + '</code><span>' + esc(c[1]) + '</span></div>').join('') + '</div>' +
      '<div class="note"><i class="fa-solid fa-circle-info"></i>Comandos são digitados no chat (tecla <b>T</b>).</div>';
    html += '</section>';
  });

  side.innerHTML = sideHtml;
  content.innerHTML = html;
  document.querySelectorAll('.item').forEach((el) => { el.dataset.raw = el.innerHTML; });
}

function search(term) {
  term = term.trim().toLowerCase();
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const nt = norm(term);
  let any = false;
  document.querySelectorAll('section.sec').forEach((sec) => {
    let secHit = false;
    sec.querySelectorAll('.blk, .tiles, .terms, .keys').forEach((blk) => {
      let blkHit = false;
      blk.querySelectorAll('.item').forEach((el) => {
        el.innerHTML = el.dataset.raw;
        if (!nt) { el.classList.remove('hidden'); blkHit = true; return; }
        const hit = norm(el.textContent).includes(nt);
        el.classList.toggle('hidden', !hit);
        if (hit) {
          blkHit = true;
          const re = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
          el.innerHTML = ('>' + el.dataset.raw + '<').replace(/>([^<]+)</g, (m, txt) => '>' + txt.replace(re, '<mark>$1</mark>') + '<').slice(1, -1);
        }
      });
      blk.classList.toggle('hidden', !blkHit);
      if (blkHit) secHit = true;
    });
    sec.classList.toggle('hidden', !secHit);
    if (secHit) any = true;
  });
  document.getElementById('empty').style.display = any ? 'none' : 'block';
  document.getElementById('inicio').classList.toggle('hidden', !!nt);
}

render();

const q = document.getElementById('q');
q.addEventListener('input', () => search(q.value));
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); }
  if (e.key === 'Escape') { q.value = ''; search(''); q.blur(); }
});

const side = document.getElementById('side');
document.getElementById('menuBtn').addEventListener('click', () => side.classList.toggle('open'));
side.addEventListener('click', (e) => { if (e.target.closest('.nav')) side.classList.remove('open'); });

// Destaca no menu a secao que esta na tela
const navs = () => document.querySelectorAll('.nav');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) navs().forEach((n) => n.classList.toggle('active', n.dataset.id === en.target.id));
  });
}, { rootMargin: '-80px 0px -70% 0px' });
document.querySelectorAll('section.sec').forEach((s) => obs.observe(s));
