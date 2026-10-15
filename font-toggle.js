// Body-font test toggle (remove before launch). Remembers the choice per browser.
(function () {
  var buttons = document.querySelectorAll('.font-toggle button');
  function set(font) {
    document.documentElement.classList.toggle('mono', font === 'mono');
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.font === font)); });
    try { localStorage.setItem('tribe-body-font', font); } catch (e) {}
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.font); }); });
  try { set(localStorage.getItem('tribe-body-font') || 'outfit'); } catch (e) { set('outfit'); }
})();
