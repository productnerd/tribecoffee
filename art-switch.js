// Illustration test switch (remove before launch): the colour art, ink line art (style A in
// black and white), or the current style in black and white. Remembers the choice per browser.
(function () {
  var buttons = document.querySelectorAll('.art-switch button');
  var pattern = /assets\/(illustrations|products)\//;
  var images = Array.prototype.filter.call(document.images, function (img) {
    return pattern.test(img.getAttribute('src'));
  });
  images.forEach(function (img) { img.dataset.colourSrc = img.getAttribute('src'); });

  function set(art) {
    images.forEach(function (img) {
      var src = img.dataset.colourSrc;
      img.src = art === 'colour' ? src : src.replace(pattern, 'assets/$1-' + art + '/');
    });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.art === art)); });
    try { localStorage.setItem('tribe-art', art); } catch (e) {}
  }

  buttons.forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.art); }); });
  var saved = null;
  try { saved = localStorage.getItem('tribe-art'); } catch (e) {}
  set(saved === 'ink' || saved === 'mono' ? saved : 'colour');
})();
