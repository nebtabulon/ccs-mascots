/**
 * CCS Mascots – Marquee script
 *
 * GALLERY_IMAGES is injected by the Astro page as a global via:
 *   <script define:vars={{ GALLERY_IMAGES }}>
 *
 * To add images: edit the `galleryImages` list in Keystatic (Galleries singleton).
 * Each entry is a path relative to /public, e.g. '/images/fursuit1.jpg'
 */

const mobile = () => window.innerWidth <= 768;

function setNavHeight() {
  const nav = document.querySelector('nav');
  document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
}
setNavHeight();
window.addEventListener('resize', setNavHeight);

function splitImages(n) {
  const buckets = Array.from({ length: n }, () => []);
  GALLERY_IMAGES.forEach((img, i) => buckets[i % n].push(img));
  return buckets;
}

function makeItem(src) {
  const d = document.createElement('div');
  if (src) {
    d.className = 'gallery-item has-img';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'CCS Mascots fursuit';
    img.loading = 'lazy';
    d.appendChild(img);
  } else {
    d.className = 'gallery-item';
  }
  return d;
}

function makeCol(dir, images) {
  const col = document.createElement('div');
  col.className = `marquee-col dir-${dir}`;
  // If no images yet, show 6 gray placeholders doubled
  const items = images.length > 0 ? images : Array(6).fill('');
  [...items, ...items].forEach(src => col.appendChild(makeItem(src)));
  return col;
}

function buildDesktop(container) {
  container.innerHTML = '';
  const [col1imgs, col2imgs] = GALLERY_IMAGES.length > 0
    ? splitImages(2)
    : [[], []];
  container.appendChild(makeCol('up',   col1imgs));
  container.appendChild(makeCol('down', col2imgs));
}

function buildMobile(container) {
  container.innerHTML = '';
  const [row1imgs, row2imgs] = GALLERY_IMAGES.length > 0
    ? splitImages(2)
    : [[], []];
  ['up', 'down'].forEach((dir, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'row-wrap';
    wrap.appendChild(makeCol(dir, i === 0 ? row1imgs : row2imgs));
    container.appendChild(wrap);
  });
}

function setScrollSizes() {
  const isMob = mobile();
  const cols = document.querySelectorAll('.marquee-col');
  cols.forEach(col => {
    col.getBoundingClientRect();
    const items = Array.from(col.children);
    const half = items.length / 2;
    const gap = parseFloat(getComputedStyle(col).gap) || 20;
    let size = 0;
    for (let i = 0; i < half; i++) {
      size += isMob ? items[i].offsetWidth : items[i].offsetHeight;
    }
    size += gap * half;
    col.style.setProperty('--scroll-size-neg', `-${size}px`);
  });
}

function build() {
  const c = document.getElementById('galleryRight');
  mobile() ? buildMobile(c) : buildDesktop(c);
  requestAnimationFrame(() => requestAnimationFrame(setScrollSizes));
}

build();

let wasMobile = mobile();
window.addEventListener('resize', () => {
  const now = mobile();
  if (now !== wasMobile) { wasMobile = now; build(); }
  else requestAnimationFrame(() => requestAnimationFrame(setScrollSizes));
});
