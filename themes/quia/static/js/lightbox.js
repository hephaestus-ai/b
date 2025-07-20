(() => {
  /* ============== Scroll Lock ======================================== */
  let locked = false;
  const lockScroll = () => {
    if (locked) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--sbw', `${scrollbarWidth}px`);
    document.documentElement.classList.add('mediabox-lock-scroll');
    locked = true;
  };
  const unlockScroll = () => {
    if (!locked) return;
    document.documentElement.classList.remove('mediabox-lock-scroll');
    document.documentElement.style.removeProperty('--sbw');
    locked = false;
  };

  /* ============== Overlay skeleton (built once) ====================== */
  let overlay, viewport;
  const buildOverlay = () => {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.id = 'mediabox-overlay';
    overlay.innerHTML = `
      <button id="mediabox-close" aria-label="Close">×</button>
      <div id="mediabox-viewport">
        <div id="mediabox-canvas"></div>
      </div>`;
    document.body.appendChild(overlay);
    viewport = overlay.querySelector('#mediabox-canvas');

    /* Close handlers */
    const close = () => {
      overlay.classList.remove('open');
      unlockScroll();
      viewport.innerHTML = '';
    };
    overlay.querySelector('#mediabox-close').onclick = close;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    /* =================== Zoom & Pan on IMG ========================= */
    let scale = 1;
    let originX = 0, originY = 0;
    let startX, startY, panning = false;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const updateTransform = img => {
      // Clamp origins to prevent panning beyond the image edges
      const maxPanX = Math.max(0, img.naturalWidth * scale - img.clientWidth);
      const maxPanY = Math.max(0, img.naturalHeight * scale - img.clientHeight);
      originX = clamp(originX, 0, maxPanX);
      originY = clamp(originY, 0, maxPanY);

      if (scale === 1) { // If fully zoomed out, reset transform
        img.style.transform = 'none';
        img.style.cursor = 'zoom-in';
        originX = originY = 0;
      } else {
        img.style.transform = `translate(${-originX}px, ${-originY}px) scale(${scale})`;
        img.style.cursor = 'grab';
      }
    };
    
    const resetTransform = img => {
      scale = 1;
      updateTransform(img);
    };

    const doZoom = (img, delta, centerX, centerY) => {
      const newScale = clamp(scale * delta, 1, 5);
      if (newScale === scale) return;

      // Adjust origin to zoom towards the given point (cursor or center)
      originX = (originX + centerX / scale) - centerX / newScale;
      originY = (originY + centerY / scale) - centerY / newScale;
      scale = newScale;
      updateTransform(img);
    };

    const wheelHandler = e => {
      const img = e.currentTarget;
      e.preventDefault();
      const rect = img.getBoundingClientRect();
      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      doZoom(img, delta, e.clientX - rect.left, e.clientY - rect.top);
    };

    const down = e => {
      const img = e.currentTarget;
      if (scale === 1) return;
      e.preventDefault(); // <-- FIX: Prevents browser's default image drag
      panning = true;
      startX = e.clientX + originX;
      startY = e.clientY + originY;
      img.setPointerCapture(e.pointerId);
      img.style.cursor = 'grabbing';
    };

    const move = e => {
      if (!panning) return;
      const img = e.currentTarget;
      originX = startX - e.clientX;
      originY = startY - e.clientY;
      updateTransform(img);
    };

    const up = e => {
      const img = e.currentTarget;
      if (!panning) return;
      panning = false;
      img.releasePointerCapture(e.pointerId); // <-- FIX: Explicitly release pointer
      img.style.cursor = 'grab';
    };
    
    /* Keyboard controls */
    window.addEventListener('keydown', e => {
        if (!overlay.classList.contains('open')) return;
        
        if (e.key === 'Escape') return close();

        const img = viewport.querySelector('img');
        if (!img) return; // Only apply below controls if an image is open

        e.preventDefault();
        const panStep = 50;
        const zoomDelta = 1.2;

        switch (e.key) {
            case 'ArrowUp':    originY -= panStep / scale; break;
            case 'ArrowDown':  originY += panStep / scale; break;
            case 'ArrowLeft':  originX -= panStep / scale; break;
            case 'ArrowRight': originX += panStep / scale; break;
            case '+': case '=':
                const rect = img.getBoundingClientRect();
                doZoom(img, zoomDelta, rect.width / 2, rect.height / 2);
                break;
            case '-': case '_':
                const rectOut = img.getBoundingClientRect();
                doZoom(img, 1 / zoomDelta, rectOut.width / 2, rectOut.height / 2);
                break;
            default: return; // Do nothing if the key is not one of the above
        }
        updateTransform(img);
    });

    /* Observer attaches handlers once media is placed in the viewport */
    const observer = new MutationObserver(() => {
      const media = viewport.querySelector('img, video');
      if (media && !media.dataset.mediabox) {
        media.dataset.mediabox = 'ready';
        // Only attach zoom/pan handlers to images
        if (media.tagName === 'IMG') {
          resetTransform(media);
          media.addEventListener('wheel', wheelHandler, { passive: false });
          media.addEventListener('pointerdown', down);
          media.addEventListener('pointermove', move);
          media.addEventListener('pointerup', up);
          media.addEventListener('dblclick', () => resetTransform(media));
        }
      }
    });
    observer.observe(viewport, { childList: true });
  };

  /* ============== Exported handler (called by ⤢ button) ============== */
  window.mediaboxExpand = btn => {
    const media = btn.closest('.mediabox-content')?.querySelector('img, video');
    if (!media) return;
    buildOverlay();

    const clone = media.cloneNode(true);
    clone.removeAttribute('loading');
    clone.removeAttribute('style');

    // Add specific attributes based on media type
    if (clone.tagName === 'IMG') {
      clone.draggable = false; // <-- FIX: Prevents ghost image on drag
    } else if (clone.tagName === 'VIDEO') {
      clone.controls = true;
      clone.autoplay = true;
      clone.loop = true;
    }

    viewport.innerHTML = '';
    viewport.appendChild(clone);

    overlay.classList.add('open');
    lockScroll();
  };
})();