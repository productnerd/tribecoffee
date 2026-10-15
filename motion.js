// Load choreography and scroll reveals. Does nothing unless <html> has .motion
// (set in <head>; off for reduced motion and for ?nomotion=1).
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;

  // TRIBE rises in letter by letter
  var word = document.querySelector('.hero__word [aria-hidden]');
  if (word) {
    word.innerHTML = word.textContent.split('').map(function (c, i) {
      return '<span class="ltr" style="--i:' + i + '">' + c + '</span>';
    }).join('');
    word.classList.add('is-split');
  }

  // Tag what fades up as it scrolls in; siblings matching the same selector stagger
  function tag(selector, kind) {
    document.querySelectorAll(selector).forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
        return c.matches(selector);
      });
      el.setAttribute('data-reveal', kind || '');
      el.style.setProperty('--i', siblings.indexOf(el));
    });
  }
  tag('.dots', 'line');
  tag('.eyebrow, .section-head > *, .story__grid > *, .story-hero > .display, .story-hero__art');
  tag('.steps__list > li, .beans__grid > *, .buy__grid > *');
  tag('.foot__top, .foot__grid, .foot__base');
  tag('.foot__leaves', 'rise');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('is-in');
      io.unobserve(el);
      if (el.hasAttribute('data-reveal')) {
        // Once settled, hand the element back to its own transitions (hover and so on)
        var i = parseInt(el.style.getPropertyValue('--i'), 10) || 0;
        setTimeout(function () { el.removeAttribute('data-reveal'); }, 1600 + i * 90);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  document.querySelectorAll('[data-reveal], .hand, .hand-mark').forEach(function (el) {
    io.observe(el);
  });
})();
