document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hc-wrap').forEach(wrapper => {
    const trigger  = wrapper.querySelector('.hc-trigger');
    const template = wrapper.querySelector('.hc-content');
    if (!trigger || !template || trigger._tippy) return;       // idempotent

    const maxW = template.dataset.maxw || '400px';
    const maxH = template.dataset.maxh || '240px';
    const html = `
      <div class="hc-card-content" style="max-height:${maxH};max-width:${maxW};">
        ${template.innerHTML}
      </div>`;

    let isPinned = false;       // pin state lives here
    let closeBtn;               // will hold the × button element

    const tip = tippy(trigger, {
      content: html,
      allowHTML: true,
      placement: 'top',
      interactive: true,
      delay: [0, 325],
      trigger: 'mouseenter focus',
      hideOnClick: () => !isPinned,           // outside clicks hide only if not pinned
      onShow(i) {
        i.popper.style.maxWidth = 'none';
        i.popper.querySelector('.tippy-box').style.maxWidth = maxW;
      },
      onHide() {                              // safety reset
        if (isPinned) {
          unpin();
        }
      }
    });

    /* ---------- Pin / un-pin helpers ---------- */
	function pin() {
      if (isPinned) return;
      isPinned = true;
      trigger.classList.add('hc-locked');
      tip.setProps({ trigger: 'manual' });

      // --- FIX STARTS HERE ---
      // Re-apply the max-width style, as setProps() resets it.
      tip.popper.style.maxWidth = 'none';
      // --- FIX ENDS HERE ---

      if (!tip.state.isShown) tip.show();

      // lazily create the × button the first time we pin
      if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'hc-close';
        closeBtn.setAttribute('aria-label', 'Close hovercard');
        closeBtn.innerHTML = '&times;';
        tip.popper.appendChild(closeBtn);

        closeBtn.addEventListener('click', e => {
          e.stopPropagation();   // don’t bubble back to body
          unpin();
          tip.hide();
        });
      }
      closeBtn.style.display = 'block';
    }

    function unpin() {
      isPinned = false;
      trigger.classList.remove('hc-locked');
      tip.setProps({ trigger: 'mouseenter focus' });
      if (closeBtn) closeBtn.style.display = 'none';
    }

    /* ---------- Trigger click → pin / un-pin ---------- */
    trigger.addEventListener('pointerdown', e => {
      e.preventDefault();        // keep focus styles predictable
      isPinned ? unpin() : pin();
    });
  });
});
