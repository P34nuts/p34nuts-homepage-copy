(() => {
  const boot = () => {
    const section = document.querySelector('.gallery-section');
    if (!section || section.dataset.enhanced === 'true') return !!section;

    const sourceFigures = [...section.querySelectorAll('.gallery-grid figure')];
    if (!sourceFigures.length) return false;

    const items = sourceFigures.map((figure, index) => {
      const image = figure.querySelector('img');
      const caption = figure.querySelector('figcaption');
      const category = figure.querySelector('figcaption')?.textContent?.split('/')[0]?.trim() || 'VISUAL';
      return {
        id: String(index + 1).padStart(2, '0'),
        src: image?.currentSrc || image?.src || '',
        alt: image?.alt || '',
        caption: image?.alt || caption?.textContent?.replace(/^\s*\d+\s*/, '') || `Frame ${index + 1}`,
        category: category.toUpperCase(),
      };
    });

    section.dataset.enhanced = 'true';
    section.classList.add('gallery-v2');
    section.innerHTML = `
      <div class="section-wrap gallery-v2-intro">
        <div class="gallery-v2-title-row">
          <div><span class="gallery-v2-kicker">05 / IMAGE ARCHIVE</span><h2>GALLERY</h2></div>
          <p>Kuratiertes Bildarchiv von P34nuts. Durch die Frames navigieren, als Diashow ansehen oder direkt in die Archivansicht springen.</p>
        </div>
      </div>
      <div class="gallery-v2-stage" aria-label="P34nuts Galerie">
        <div class="gallery-v2-stack" aria-live="polite"></div>
        <div class="gallery-v2-side">
          <div class="gallery-v2-counter"><strong>01</strong><span>/ ${String(items.length).padStart(2, '0')}</span></div>
          <div class="gallery-v2-nav">
            <button type="button" data-gallery-prev aria-label="Vorheriges Bild">←</button>
            <button type="button" data-gallery-next aria-label="Nächstes Bild">→</button>
          </div>
          <button type="button" class="gallery-v2-slideshow" data-gallery-play><span>▶</span> VIEW AS SLIDESHOW</button>
        </div>
        <div class="gallery-v2-progress" role="tablist" aria-label="Galeriepositionen"></div>
        <div class="gallery-v2-caption"><span data-gallery-category>EDITORIAL</span><strong data-gallery-caption></strong></div>
        <button type="button" class="gallery-v2-thumbs-toggle" data-gallery-thumbs>VIEW THUMBNAILS <span>⠿</span></button>
      </div>
      <div class="section-wrap gallery-v2-archive">
        <div class="gallery-v2-archive-head">
          <div><span class="gallery-v2-kicker">ARCHIVE / ${String(items.length).padStart(2, '0')} FRAMES</span><h3>GALLERY ARCHIVE</h3></div>
          <div class="gallery-v2-filters" role="group" aria-label="Galerie Filter">
            <button type="button" class="is-active" data-filter="ALL">ALL</button>
            <button type="button" data-filter="PHOTO">PHOTO</button>
            ${[...new Set(items.map(item => item.category))].map(category => `<button type="button" data-filter="${category}">${category}</button>`).join('')}
          </div>
        </div>
        <div class="gallery-v2-grid"></div>
      </div>
      <div class="gallery-v2-lightbox" data-gallery-lightbox hidden>
        <button type="button" class="gallery-v2-close" data-gallery-close aria-label="Galerie schließen">×</button>
        <button type="button" class="gallery-v2-lightbox-prev" data-gallery-light-prev aria-label="Vorheriges Bild">←</button>
        <figure><img data-gallery-light-image alt=""><figcaption><span data-gallery-light-meta></span><strong data-gallery-light-caption></strong></figcaption></figure>
        <button type="button" class="gallery-v2-lightbox-next" data-gallery-light-next aria-label="Nächstes Bild">→</button>
      </div>
    `;

    const stack = section.querySelector('.gallery-v2-stack');
    const progress = section.querySelector('.gallery-v2-progress');
    const archive = section.querySelector('.gallery-v2-grid');
    const counter = section.querySelector('.gallery-v2-counter strong');
    const categoryEl = section.querySelector('[data-gallery-category]');
    const captionEl = section.querySelector('[data-gallery-caption]');
    const lightbox = section.querySelector('[data-gallery-lightbox]');
    const lightImage = section.querySelector('[data-gallery-light-image]');
    const lightMeta = section.querySelector('[data-gallery-light-meta]');
    const lightCaption = section.querySelector('[data-gallery-light-caption]');
    let current = 0;
    let filter = 'ALL';
    let timer = null;

    const renderStack = () => {
      stack.innerHTML = '';
      items.forEach((item, index) => {
        const figure = document.createElement('figure');
        figure.className = `gallery-v2-card ${index === current ? 'is-current' : ''}`;
        figure.style.setProperty('--card-offset', `${index - current}`);
        figure.innerHTML = `<img src="${item.src}" alt="${item.alt.replace(/"/g, '&quot;')}" loading="lazy"><span>${item.id}</span>`;
        figure.addEventListener('click', () => {
          if (index === current) openLightbox(index); else setCurrent(index);
        });
        stack.appendChild(figure);
      });
      counter.textContent = items[current].id;
      categoryEl.textContent = items[current].category;
      captionEl.textContent = items[current].caption;
      progress.innerHTML = items.map((item, index) => `<button type="button" class="${index === current ? 'is-active' : ''}" data-index="${index}" aria-label="Frame ${item.id}"></button>`).join('');
      progress.querySelectorAll('button').forEach(button => button.addEventListener('click', () => setCurrent(Number(button.dataset.index))));
    };

    const renderArchive = () => {
      const visible = items.filter(item => filter === 'ALL' || filter === 'PHOTO' || item.category === filter);
      archive.innerHTML = visible.map(item => `<button type="button" class="gallery-v2-tile" data-id="${item.id}"><img src="${item.src}" alt="${item.alt.replace(/"/g, '&quot;')}" loading="lazy"><span><b>${item.id}</b>${item.category} / ${item.caption}</span></button>`).join('');
      archive.querySelectorAll('[data-id]').forEach(button => button.addEventListener('click', () => openLightbox(items.findIndex(item => item.id === button.dataset.id))));
    };

    const setCurrent = (index) => {
      current = (index + items.length) % items.length;
      renderStack();
    };

    const openLightbox = (index) => {
      current = (index + items.length) % items.length;
      const item = items[current];
      lightImage.src = item.src;
      lightImage.alt = item.alt;
      lightMeta.textContent = `${item.id} / ${item.category}`;
      lightCaption.textContent = item.caption;
      lightbox.hidden = false;
      document.body.classList.add('gallery-lightbox-open');
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.classList.remove('gallery-lightbox-open');
    };

    const step = (direction) => {
      setCurrent(current + direction);
      if (!lightbox.hidden) openLightbox(current);
    };

    section.querySelector('[data-gallery-prev]').addEventListener('click', () => step(-1));
    section.querySelector('[data-gallery-next]').addEventListener('click', () => step(1));
    section.querySelector('[data-gallery-light-prev]').addEventListener('click', () => step(-1));
    section.querySelector('[data-gallery-light-next]').addEventListener('click', () => step(1));
    section.querySelector('[data-gallery-close]').addEventListener('click', closeLightbox);
    section.querySelector('[data-gallery-thumbs]').addEventListener('click', () => section.classList.toggle('show-thumbnails'));
    section.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      filter = button.dataset.filter;
      section.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('is-active', item === button));
      renderArchive();
    }));

    section.querySelector('[data-gallery-play]').addEventListener('click', (event) => {
      const button = event.currentTarget;
      if (timer) {
        clearInterval(timer);
        timer = null;
        button.innerHTML = '<span>▶</span> VIEW AS SLIDESHOW';
      } else {
        setCurrent(current + 1);
        timer = setInterval(() => setCurrent(current + 1), 4200);
        button.innerHTML = '<span>Ⅱ</span> STOP SLIDESHOW';
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    });

    let touchStartX = 0;
    stack.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
    stack.addEventListener('touchend', event => {
      const delta = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) > 45) step(delta > 0 ? -1 : 1);
    }, { passive: true });

    renderStack();
    renderArchive();
    return true;
  };

  const waitForGallery = () => {
    if (boot()) return;
    const observer = new MutationObserver(() => {
      if (boot()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 15000);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitForGallery);
  else waitForGallery();
})();
