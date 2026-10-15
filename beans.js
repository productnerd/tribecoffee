// Opens the product popup with the clicked bean card's picture, name, notes, best-for line and sizes.
(function () {
  var dialog = document.querySelector('.bean-dialog');
  var art = dialog.querySelector('.bean-dialog__art');
  var name = dialog.querySelector('.bean__name');
  var notes = dialog.querySelector('.bean-dialog__notes');
  var sizes = dialog.querySelector('.bean-dialog__sizes');
  var use = dialog.querySelector('.bean-dialog__use');
  var wholesale = dialog.querySelector('.bean-dialog__wholesale');
  var wholesaleHref = wholesale.getAttribute('href');
  var animated = document.documentElement.classList.contains('motion');

  document.querySelectorAll('.bean__open').forEach(function (button) {
    var card = button.closest('.bean');
    var title = card.querySelector('.bean__name').textContent;
    button.setAttribute('aria-label', title + ': details');
    button.addEventListener('click', function () {
      var picture = card.querySelector('.bean__art').cloneNode(true);
      picture.removeAttribute('loading');
      art.replaceChildren(picture);
      name.textContent = title;
      notes.textContent = card.querySelector('.bean__notes').textContent;
      use.innerHTML = card.querySelector('.bean__use').innerHTML;
      sizes.textContent = card.querySelector('.bean__bar span:last-child').textContent;
      wholesale.href = wholesaleHref + '?subject=' + encodeURIComponent('Wholesale: ' + title);
      dialog.showModal();
    });
  });

  // Play the closing animation before actually closing
  function close() {
    if (!animated || dialog.classList.contains('is-closing')) {
      if (!animated) dialog.close();
      return;
    }
    dialog.classList.add('is-closing');
    var timer;
    function done(e) {
      if (e && (e.target !== dialog || e.pseudoElement)) return;
      dialog.removeEventListener('animationend', done);
      clearTimeout(timer);
      dialog.classList.remove('is-closing');
      dialog.close();
    }
    dialog.addEventListener('animationend', done);
    // in case the animation never reports back (a hidden tab pauses it)
    timer = setTimeout(done, 300);
  }

  dialog.querySelector('.bean-dialog__close').addEventListener('click', function (e) {
    e.preventDefault();
    close();
  });
  // Escape
  dialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    close();
  });
  // A click on the dimmed backdrop (outside the card, not on its frame)
  dialog.addEventListener('click', function (e) {
    var r = dialog.getBoundingClientRect();
    var outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (e.target === dialog && outside) close();
  });
})();
