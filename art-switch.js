// Illustration test switch (remove before launch): B&W (the default in the HTML), the colour art,
// or the ink line art. Remembers the choice per browser.
(function () {
  var buttons = document.querySelectorAll('.art-switch button');
  var pattern = /assets\/(illustrations|products)(-ink|-mono)?\//;
  var images = Array.prototype.filter.call(document.images, function (img) {
    return pattern.test(img.getAttribute('src'));
  });

  function set(art) {
    images.forEach(function (img) {
      var src = img.getAttribute('src').replace(pattern, 'assets/$1' + (art === 'colour' ? '' : '-' + art) + '/');
      if (src !== img.getAttribute('src')) img.src = src;
    });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.art === art)); });
    try { localStorage.setItem('tribe-art', art); } catch (e) {}
  }

  buttons.forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.art); }); });
  var saved = null;
  try { saved = localStorage.getItem('tribe-art'); } catch (e) {}
  set(saved === 'colour' || saved === 'ink' ? saved : 'mono');
})();
