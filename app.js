(() => {
      const svg = document.querySelector('.preview > svg');
      const scene = svg?.querySelector(':scope > g[clip-path]');
      const defs = svg?.querySelector(':scope > defs');
      if (!svg || !scene || !defs || scene.dataset.carouselReady) return;

      const ns = 'http://www.w3.org/2000/svg';
      const cycle = 504;
      const makeSvg = name => document.createElementNS(ns, name);

      const clip = makeSvg('clipPath');
      clip.id = 'food-carousel-clip';
      const clipRect = makeSvg('rect');
      clipRect.setAttribute('x', '0');
      clipRect.setAttribute('y', '96');
      clipRect.setAttribute('width', '375');
      clipRect.setAttribute('height', '248');
      clip.appendChild(clipRect);
      defs.appendChild(clip);

      const viewport = makeSvg('g');
      viewport.classList.add('carousel-viewport');
      viewport.setAttribute('clip-path', 'url(#food-carousel-clip)');

      const buildRow = (minY, maxY, className, cloneOffset) => {
        const row = makeSvg('g');
        const candidates = [...scene.children].filter(node => {
          if (node === viewport || node.tagName.toLowerCase() === 'defs') return false;
          try {
            const box = node.getBBox();
            const centerY = box.y + box.height / 2;
            return box.height > 0 && centerY >= minY && centerY < maxY;
          } catch { return false; }
        });
        candidates.forEach(node => row.appendChild(node));

        const track = makeSvg('g');
        track.classList.add('carousel-track', className);
        track.appendChild(row);
        const duplicate = row.cloneNode(true);
        duplicate.setAttribute('transform', `translate(${cloneOffset} 0)`);
        track.appendChild(duplicate);
        viewport.appendChild(track);
      };

      buildRow(96, 221, 'carousel-top', cycle);
      buildRow(221, 344, 'carousel-bottom', -cycle);
      scene.appendChild(viewport);
      scene.dataset.carouselReady = 'true';
    })();

(() => {
      const svg = document.querySelector('.preview > svg');
      const scene = svg?.querySelector(':scope > g[clip-path]');
      if (!svg || !scene || scene.dataset.moodPickerReady) return;

      const ns = 'http://www.w3.org/2000/svg';
      const makeSvg = name => document.createElementNS(ns, name);
      const leftDefault = scene.querySelector('g[clip-path="url(#clip2_83_33)"]');
      const centerSelected = scene.querySelector('g[clip-path="url(#clip3_83_33)"]');
      const rightDefault = scene.querySelector('g[clip-path="url(#clip4_83_33)"]');
      if (!leftDefault || !centerSelected || !rightDefault) return;

      const centerDefault = makeSvg('g');
      centerDefault.setAttribute('aria-label', '正在纠结，未选中');
      centerDefault.style.display = 'none';
      centerDefault.innerHTML = `
        <rect x="147" y="595" width="95" height="101" rx="14" fill="white" stroke="#E7E7E7" stroke-width="2"/>
        <path d="M178 613h10c2 0 3 1 3 3v5c0 4-3 7-7 7s-7-3-7-7v-2h-3c-3 0-5-2-5-5 0-1 1-1 9-1Z" fill="#050505"/>
        <path d="M202 613h10c2 0 3 1 3 3v5c0 4-3 7-7 7s-7-3-7-7v-2h-3c-3 0-5-2-5-5 0-1 1-1 9-1Z" fill="#050505"/>
        <text x="194.5" y="654" text-anchor="middle" font-family="Noto Sans SC, sans-serif" font-size="16" font-weight="600" fill="#050505">正在</text>
        <text x="194.5" y="676" text-anchor="middle" font-family="Noto Sans SC, sans-serif" font-size="16" font-weight="600" fill="#050505">纠结</text>`;

      const leftSelected = makeSvg('image');
      leftSelected.setAttribute('href', 'Group 10.svg');
      leftSelected.setAttribute('x', '24');
      leftSelected.setAttribute('y', '578');
      leftSelected.setAttribute('width', '113');
      leftSelected.setAttribute('height', '123');
      leftSelected.setAttribute('aria-label', '随便吃点，已选中');
      leftSelected.style.display = 'none';

      const rightSelected = makeSvg('g');
      rightSelected.setAttribute('aria-label', '整点好的，已选中');
      rightSelected.style.display = 'none';
      rightSelected.innerHTML = `
        <g transform="translate(247 578)">
          <path d="M2.1045 20.0078C1.48074 10.6321 7.40647 6.07822 18.6342 4.47096C41.0896 1.25643 71.0301 1.25643 93.4855 4.47096C104.713 6.07822 110.639 10.6321 110.015 20.0078C109.391 24.5618 106.584 27.5084 106.896 32.866C108.456 54.2962 108.768 79.7445 106.584 102.782C105.337 113.497 97.8518 117.783 85.6885 118.855C68.2231 120.462 43.8965 120.462 26.4312 118.855C14.2678 117.783 6.78271 113.497 5.53519 102.782C3.35203 79.7445 3.66391 54.2962 5.22331 32.866C5.53519 27.5084 2.72827 24.5618 2.1045 20.0078Z" fill="#FFD51B" stroke="#FFC20A" stroke-width="4.12" stroke-linejoin="round"/>
          <path d="M34 31h14c3 0 4 2 4 4v6c0 5-4 8-8 8s-8-3-8-8v-3h-3c-3 0-6-3-6-6 0-1 2-1 7-1ZM64 31h14c3 0 4 2 4 4v6c0 5-4 8-8 8s-8-3-8-8v-3h-3c-3 0-6-3-6-6 0-1 2-1 7-1Z" fill="#050505"/>
          <path d="M30 29l15 4M82 29l-15 4" stroke="#050505" stroke-width="4" stroke-linecap="round"/>
          <text x="56" y="80" text-anchor="middle" font-family="Noto Sans SC, sans-serif" font-size="16" font-weight="600" fill="#050505">整点</text>
          <text x="56" y="102" text-anchor="middle" font-family="Noto Sans SC, sans-serif" font-size="16" font-weight="600" fill="#050505">好的</text>
        </g>`;

      const hitLeft = makeSvg('rect');
      hitLeft.setAttribute('x', '24');
      hitLeft.setAttribute('y', '578');
      hitLeft.setAttribute('width', '113');
      hitLeft.setAttribute('height', '123');
      hitLeft.setAttribute('fill', 'transparent');
      hitLeft.setAttribute('role', 'button');
      hitLeft.setAttribute('tabindex', '0');
      hitLeft.style.cursor = 'pointer';

      const hitCenter = makeSvg('rect');
      hitCenter.setAttribute('x', '134');
      hitCenter.setAttribute('y', '578');
      hitCenter.setAttribute('width', '108');
      hitCenter.setAttribute('height', '123');
      hitCenter.setAttribute('fill', 'transparent');
      hitCenter.setAttribute('role', 'button');
      hitCenter.setAttribute('tabindex', '0');
      hitCenter.style.cursor = 'pointer';

      const hitRight = makeSvg('rect');
      hitRight.setAttribute('x', '247');
      hitRight.setAttribute('y', '578');
      hitRight.setAttribute('width', '113');
      hitRight.setAttribute('height', '123');
      hitRight.setAttribute('fill', 'transparent');
      hitRight.setAttribute('role', 'button');
      hitRight.setAttribute('tabindex', '0');
      hitRight.style.cursor = 'pointer';

      const selectLeft = () => {
        leftDefault.style.display = 'none';
        centerSelected.style.display = 'none';
        centerDefault.style.display = '';
        leftSelected.style.display = '';
        rightDefault.style.display = '';
        rightSelected.style.display = 'none';
        hitLeft.setAttribute('aria-pressed', 'true');
        hitCenter.setAttribute('aria-pressed', 'false');
        hitRight.setAttribute('aria-pressed', 'false');
      };
      const selectCenter = () => {
        leftDefault.style.display = '';
        centerSelected.style.display = '';
        centerDefault.style.display = 'none';
        leftSelected.style.display = 'none';
        rightDefault.style.display = '';
        rightSelected.style.display = 'none';
        hitLeft.setAttribute('aria-pressed', 'false');
        hitCenter.setAttribute('aria-pressed', 'true');
        hitRight.setAttribute('aria-pressed', 'false');
      };
      const selectRight = () => {
        leftDefault.style.display = '';
        leftSelected.style.display = 'none';
        centerSelected.style.display = 'none';
        centerDefault.style.display = '';
        rightDefault.style.display = 'none';
        rightSelected.style.display = '';
        hitLeft.setAttribute('aria-pressed', 'false');
        hitCenter.setAttribute('aria-pressed', 'false');
        hitRight.setAttribute('aria-pressed', 'true');
      };
      const keyboardActivate = action => event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          action();
        }
      };

      hitLeft.addEventListener('click', selectLeft);
      hitLeft.addEventListener('keydown', keyboardActivate(selectLeft));
      hitCenter.addEventListener('click', selectCenter);
      hitCenter.addEventListener('keydown', keyboardActivate(selectCenter));
      hitRight.addEventListener('click', selectRight);
      hitRight.addEventListener('keydown', keyboardActivate(selectRight));

      scene.append(centerDefault, leftSelected, rightSelected, hitLeft, hitCenter, hitRight);
      selectCenter();
      scene.dataset.moodPickerReady = 'true';
    })();

(() => {
      const preview = document.querySelector('.preview');
      const svg = preview?.querySelector(':scope > svg');
      const scene = svg?.querySelector(':scope > g[clip-path]');
      const backButton = preview?.querySelector('.result-back-hit');
      const reselectButton = preview?.querySelector('.result-reselect-hit');
      const shareButton = preview?.querySelector('.result-share-hit');
      const shareCloseButton = preview?.querySelector('.share-close-hit');
      const retrySubmitButton = preview?.querySelector('.retry-submit-hit');
      if (!preview || !svg || !scene || !backButton || !reselectButton || !shareButton || !shareCloseButton || !retrySubmitButton || scene.dataset.resultNavReady) return;

      const ns = 'http://www.w3.org/2000/svg';
      const ctaHit = document.createElementNS(ns, 'rect');
      ctaHit.setAttribute('x', '29');
      ctaHit.setAttribute('y', '726');
      ctaHit.setAttribute('width', '318');
      ctaHit.setAttribute('height', '57');
      ctaHit.setAttribute('rx', '8');
      ctaHit.setAttribute('fill', 'transparent');
      ctaHit.setAttribute('role', 'button');
      ctaHit.setAttribute('tabindex', '0');
      ctaHit.setAttribute('aria-label', '帮我选，查看推荐结果');
      ctaHit.style.cursor = 'pointer';

      const showResult = () => {
        preview.classList.remove('show-retry');
        preview.classList.remove('show-share');
        preview.classList.add('show-result');
        backButton.focus({ preventScroll: true });
      };
      const showPicker = () => {
        preview.classList.remove('show-result');
        preview.classList.remove('show-retry');
        preview.classList.remove('show-share');
        ctaHit.focus({ preventScroll: true });
      };
      const showRetry = () => {
        preview.classList.remove('show-result');
        preview.classList.remove('show-share');
        preview.classList.add('show-retry');
      };
      const showShare = () => {
        preview.classList.remove('show-result');
        preview.classList.remove('show-retry');
        preview.classList.add('show-share');
      };
      const keyboardActivate = event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          showResult();
        }
      };

      ctaHit.addEventListener('click', showResult);
      ctaHit.addEventListener('keydown', keyboardActivate);
      backButton.addEventListener('click', showPicker);
      reselectButton.addEventListener('click', showRetry);
      shareButton.addEventListener('click', showShare);
      shareCloseButton.addEventListener('click', showResult);
      retrySubmitButton.addEventListener('click', showResult);
      retrySubmitButton.addEventListener('keydown', keyboardActivate);
      const retryVisuals = {
        left: preview.querySelector('.retry-left-visual'),
        center: preview.querySelector('.retry-center-visual'),
        right: preview.querySelector('.retry-right-visual')
      };
      const retryHits = {
        left: preview.querySelector('.retry-mood-hit.left'),
        center: preview.querySelector('.retry-mood-hit.center'),
        right: preview.querySelector('.retry-mood-hit.right')
      };
      const selectRetryMood = selected => {
        retryVisuals.left.style.display = selected === 'left' ? 'block' : 'none';
        retryVisuals.center.style.display = selected === 'center' ? 'none' : 'block';
        retryVisuals.right.style.display = selected === 'right' ? 'block' : 'none';
        Object.entries(retryHits).forEach(([name, button]) => button.setAttribute('aria-pressed', name === selected ? 'true' : 'false'));
      };
      Object.entries(retryHits).forEach(([name, button]) => button.addEventListener('click', () => selectRetryMood(name)));
      selectRetryMood('center');
      scene.appendChild(ctaHit);
      scene.dataset.resultNavReady = 'true';
    })();