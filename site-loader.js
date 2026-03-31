/* ═══════════════════════════════════════════════════════
   Webnari CMS — Site Content Loader (Hydration Script)
   Reads site-data.json and overlays dynamic content onto
   the static HTML. Falls back to hardcoded content if
   the fetch fails (progressive enhancement).
   ═══════════════════════════════════════════════════════ */
(function() {
  'use strict';

  function resolve(obj, path) {
    return path.split('.').reduce(function(o, k) { return o && o[k]; }, obj);
  }

  function hydrateText(data) {
    document.querySelectorAll('[data-cms]').forEach(function(el) {
      var val = resolve(data, el.getAttribute('data-cms'));
      if (val != null) {
        if (typeof val === 'string' && val.indexOf('\n') > -1) {
          el.innerHTML = val.replace(/\n/g, '<br>');
        } else {
          el.textContent = String(val);
        }
      }
    });
  }

  function hydrateImages(data) {
    document.querySelectorAll('[data-cms-img]').forEach(function(el) {
      var val = resolve(data, el.getAttribute('data-cms-img'));
      if (val) el.setAttribute('src', val);
    });
  }

  function hydrateLinks(data) {
    document.querySelectorAll('[data-cms-href]').forEach(function(el) {
      var val = resolve(data, el.getAttribute('data-cms-href'));
      if (val) el.setAttribute('href', val);
    });
  }

  function hydrateSEO(data) {
    if (!data.seo) return;
    if (data.seo.title) document.title = data.seo.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && data.seo.description) metaDesc.setAttribute('content', data.seo.description);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && data.seo.ogTitle) ogTitle.setAttribute('content', data.seo.ogTitle);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && data.seo.ogDescription) ogDesc.setAttribute('content', data.seo.ogDescription);
  }

  function hydrateMeals(data) {
    var container = document.querySelector('[data-cms-list="sections.featured_meals.items"]');
    if (!container || !data.sections || !data.sections.featured_meals) return;
    var items = data.sections.featured_meals.items;
    if (!items || !items.length) return;
    var delays = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];
    container.innerHTML = items.map(function(item, i) {
      var f = item.fields || {};
      return '<a href="/meal.html?m=' + i + '" class="meal-card reveal visible ' + delays[i % 3] + '" style="display:block;color:inherit;text-decoration:none;">' +
        '<div class="meal-img">' +
          (item.image ? '<img src="' + item.image + '" alt="' + (item.name || '') + '" loading="lazy">' : '') +
          '<span class="meal-cuisine-tag">' + (item.tag || '') + '</span>' +
        '</div>' +
        '<div class="meal-body">' +
          '<div class="meal-name">' + (item.name || '') + '</div>' +
          '<div class="meal-desc">' + (item.description || '') + '</div>' +
          '<div class="meal-macros">' +
            (f.protein ? '<div class="meal-macro"><span class="meal-macro-val">' + f.protein + '</span><span class="meal-macro-label">Protein</span></div>' : '') +
            (f.calories ? '<div class="meal-macro"><span class="meal-macro-val">' + f.calories + '</span><span class="meal-macro-label">Cal</span></div>' : '') +
            (f.carbs ? '<div class="meal-macro"><span class="meal-macro-val">' + f.carbs + '</span><span class="meal-macro-label">Carbs</span></div>' : '') +
            (f.fat ? '<div class="meal-macro"><span class="meal-macro-val">' + f.fat + '</span><span class="meal-macro-label">Fat</span></div>' : '') +
          '</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  function hydrateTestimonials(data) {
    var container = document.querySelector('[data-cms-list="sections.testimonials.items"]');
    if (!container || !data.sections || !data.sections.testimonials) return;
    var items = data.sections.testimonials.items;
    if (!items || !items.length) return;
    var starSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    var delays = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];
    container.innerHTML = items.map(function(item, i) {
      var stars = '';
      for (var s = 0; s < (parseInt(item.rating) || 5); s++) stars += starSvg;
      return '<div class="testimonial-card reveal visible ' + delays[i % 3] + '">' +
        '<div class="testimonial-stars">' + stars + '</div>' +
        '<p class="testimonial-text">"' + (item.text || '') + '"</p>' +
        '<div class="testimonial-author">' + (item.author || '') + '</div>' +
        '<div class="testimonial-handle">' + (item.source || '') + '</div>' +
      '</div>';
    }).join('');
  }

  function hydrateAbout(data) {
    if (!data.sections || !data.sections.about) return;
    var about = data.sections.about;
    var paragraphs = document.querySelectorAll('[data-cms-about-p]');
    if (about.paragraphs) {
      paragraphs.forEach(function(el, i) {
        if (about.paragraphs[i] != null) el.textContent = about.paragraphs[i];
      });
    }
    var values = document.querySelectorAll('[data-cms-about-value]');
    if (about.values) {
      values.forEach(function(el, i) {
        if (about.values[i] != null) {
          var svg = el.querySelector('svg');
          var text = about.values[i];
          el.textContent = '';
          if (svg) el.appendChild(svg);
          el.appendChild(document.createTextNode(' ' + text));
        }
      });
    }
  }

  function hydrateKitchen(data) {
    var container = document.querySelector('[data-cms-list="sections.kitchen.items"]');
    if (!container || !data.sections || !data.sections.kitchen) return;
    var items = data.sections.kitchen.items;
    if (!items || !items.length) return;
    var playSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="var(--white)" stroke="none"><polygon points="8 5 20 12 8 19"/></svg>';
    var delays = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];
    container.innerHTML = items.map(function(item, i) {
      return '<a class="kitchen-card reveal visible ' + delays[i % 3] + '" href="' + (item.link || '#') + '" target="_blank" rel="noopener">' +
        '<div class="kitchen-thumb">' +
          (item.image ? '<img src="' + item.image + '" alt="' + (item.title || '') + '" loading="lazy">' : '') +
          '<div class="kitchen-play"><div class="kitchen-play-btn">' + playSvg + '</div></div>' +
          '<span class="kitchen-label">' + (item.label || '') + '</span>' +
        '</div>' +
        '<div class="kitchen-body">' +
          '<div class="kitchen-title">' + (item.title || '') + '</div>' +
          '<div class="kitchen-desc">' + (item.description || '') + '</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  /* Re-observe any .reveal elements that were dynamically inserted.
     Elements already in the viewport get visible immediately;
     elements below the fold get observed for scroll-triggered reveal. */
  function reobserveReveals() {
    var unrevealed = document.querySelectorAll('.reveal:not(.visible)');
    if (!unrevealed.length) return;
    var vh = window.innerHeight;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    unrevealed.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  }

  // Main loader
  fetch('/site-data.json?v=' + Date.now())
    .then(function(r) { return r.ok ? r.json() : Promise.reject('fetch failed'); })
    .then(function(data) {
      hydrateSEO(data);
      hydrateText(data);
      hydrateImages(data);
      hydrateLinks(data);
      hydrateMeals(data);
      hydrateTestimonials(data);
      hydrateAbout(data);
      hydrateKitchen(data);
      reobserveReveals();
    })
    .catch(function(err) {
      // Silent fail — hardcoded HTML remains
      console.warn('CMS loader: using static content', err);
    });
})();
