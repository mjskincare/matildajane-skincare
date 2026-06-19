/* ==========================================================
   MATILDA JANE — SHARED PAGE BEHAVIOUR
   Fade-up + smooth accordion (outer single-open + nested FAQ)
   ========================================================== */
(function () {
  'use strict';

  /* === Fade-up on scroll === */
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fu').forEach(function (el) { obs.observe(el); });

  /* === Helpers === */
  function setHeight(body) {
    if (!body) return;
    body.style.maxHeight = body.scrollHeight + 'px';
  }
  function close(item, bodySel, triggerSel) {
    if (!item) return;
    item.classList.remove('open');
    const body = item.querySelector(bodySel);
    if (body) body.style.maxHeight = '0';
    const trigger = item.querySelector(triggerSel);
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }
  function recalcOuter(innerItem) {
    const outerAcc = innerItem.closest('.acc-item');
    if (!outerAcc || !outerAcc.classList.contains('open')) return;
    setHeight(outerAcc.querySelector('.acc-body'));
  }

  /* === Outer accordion — single-open === */
  document.querySelectorAll('.acc-trigger').forEach(function (t) {
    t.addEventListener('click', function () {
      const item = t.parentElement;
      const list = item.parentElement;
      const willOpen = !item.classList.contains('open');

      list.querySelectorAll(':scope > .acc-item').forEach(function (i) {
        close(i, '.acc-body', '.acc-trigger');
      });

      if (willOpen) {
        item.classList.add('open');
        setHeight(item.querySelector('.acc-body'));
        t.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* === Set initial state for default-open items === */
  document.querySelectorAll('.acc-item.open').forEach(function (item) {
    setHeight(item.querySelector('.acc-body'));
    const trigger = item.querySelector('.acc-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  });

  /* === Inner FAQ — single-open, parent height auto-grows === */
  document.querySelectorAll('.faq-trigger').forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.stopPropagation();
      const item = t.parentElement;
      const list = item.parentElement;
      const willOpen = !item.classList.contains('open');

      list.querySelectorAll(':scope > .faq-item').forEach(function (i) {
        close(i, '.faq-body', '.faq-trigger');
      });

      if (willOpen) {
        item.classList.add('open');
        setHeight(item.querySelector('.faq-body'));
        t.setAttribute('aria-expanded', 'true');
      }
      requestAnimationFrame(function () { recalcOuter(item); });
    });
  });

  /* === Checkerboard scroll animation === */
  const checkerObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        checkerObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.checker-row').forEach(function (r) { checkerObs.observe(r); });

  /* === Image carousel thumbnails === */
  document.querySelectorAll('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      const wrap = t.closest('.product-image-side');
      if (!wrap) return;
      wrap.querySelectorAll('.thumb').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      t.classList.add('active');
      t.setAttribute('aria-selected', 'true');

      const src = t.dataset.src;
      const main = wrap.querySelector('.product-image-main');
      if (src && main) {
        const mainImg = main.querySelector('img');
        const showAnnotations = t.dataset.annotations === 'true';
        const bannerKey = t.dataset.banner || '';
        const showBanner = bannerKey !== '';
        if (mainImg && mainImg.src.indexOf(src.split('/').pop()) === -1) {
          main.classList.add('swapping');
          setTimeout(function () {
            mainImg.src = src;
            mainImg.alt = t.getAttribute('aria-label') || '';
            main.classList.remove('swapping');
            main.classList.toggle('show-annotations', showAnnotations);
            main.classList.toggle('show-banner', showBanner);
            // Hide all banners, show only the matching one
            main.querySelectorAll('.image-banner').forEach(function (b) {
              b.style.display = (showBanner && b.classList.contains('image-banner-' + bannerKey)) ? '' : 'none';
            });
          }, 180);
        } else {
          main.classList.toggle('show-annotations', showAnnotations);
          main.classList.toggle('show-banner', showBanner);
          main.querySelectorAll('.image-banner').forEach(function (b) {
            b.style.display = (showBanner && b.classList.contains('image-banner-' + bannerKey)) ? '' : 'none';
          });
        }
        return;
      }

      const view = t.dataset.view || '0';
      const bottle = wrap.querySelector('.product-bottle');
      if (bottle) {
        bottle.classList.remove('view-0', 'view-1', 'view-2', 'view-3');
        bottle.classList.add('view-' + view);
      }
    });
  });

  /* === Spotlight card tap-to-magnify (mobile-friendly) === */
  const spotCards = document.querySelectorAll('.spotlight-card');
  spotCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (window.matchMedia('(hover: hover)').matches) return; // desktop uses :hover
      spotCards.forEach(function (c) { if (c !== card) c.classList.remove('tap-active'); });
      card.classList.toggle('tap-active');
      e.stopPropagation();
    });
  });
  document.addEventListener('click', function () {
    spotCards.forEach(function (c) { c.classList.remove('tap-active'); });
  });

  /* === Mobile nav hamburger toggle === */
  const hamburger = document.getElementById('mj-hamburger');
  const mobileNav = document.getElementById('mj-mobile-nav');
  const mobileOverlay = document.getElementById('mj-mobile-overlay');
  const mobileClose = document.getElementById('mj-mobile-close');
  function openMobileNav() {
    if (!mobileNav || !mobileOverlay) return;
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (!mobileNav || !mobileOverlay) return;
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* === Recalculate heights on resize === */
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      document.querySelectorAll('.acc-item.open').forEach(function (i) {
        setHeight(i.querySelector('.acc-body'));
      });
      document.querySelectorAll('.faq-item.open').forEach(function (i) {
        setHeight(i.querySelector('.faq-body'));
      });
    }, 120);
  });
})();

/* === Nav turns charcoal + translucent once you scroll === */
(function () {
  var nav = document.querySelector('.site-nav-v2');
  if (!nav) return;
  var onScroll = function () {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
