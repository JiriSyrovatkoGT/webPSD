// ==========================================================================
// Pluk Šťastných Dechařů — společné skripty
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobilní menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  /* ---------- Lightbox galerie ---------- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  if (galleryItems.length === 0) return;

  const overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) return;

  const lightboxBody = overlay.querySelector('.lightbox-body');
  const captionEl = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');

  let currentIndex = 0;

  function renderSlide(index) {
    const item = galleryItems[index];
    const caption = item.dataset.caption || '';
    const img = item.querySelector('img');

    lightboxBody.innerHTML = '';

    if (img) {
      const cloned = document.createElement('img');
      cloned.src = img.src;
      cloned.alt = caption;
      lightboxBody.appendChild(cloned);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'placeholder-label';
      placeholder.textContent = item.querySelector('.placeholder-label')?.textContent || 'Foto';
      lightboxBody.appendChild(placeholder);
    }

    captionEl.textContent = caption;
    currentIndex = index;
  }

  function openLightbox(index) {
    renderSlide(index);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showNext() {
    renderSlide((currentIndex + 1) % galleryItems.length);
  }

  function showPrev() {
    renderSlide((currentIndex - 1 + galleryItems.length) % galleryItems.length);
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
});
