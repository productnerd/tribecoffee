// Opens the product popup with the clicked bean card's picture, name, notes and sizes.
(function () {
  var dialog = document.querySelector('.bean-dialog');
  var art = dialog.querySelector('.bean-dialog__art');
  var name = dialog.querySelector('.bean__name');
  var notes = dialog.querySelector('.bean-dialog__notes');
  var sizes = dialog.querySelector('.bean-dialog__sizes');
  var wholesale = dialog.querySelector('.bean-dialog__wholesale');
  var wholesaleHref = wholesale.getAttribute('href');

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
      sizes.textContent = card.querySelector('.bean__bar span:last-child').textContent;
      wholesale.href = wholesaleHref + '?subject=' + encodeURIComponent('Wholesale: ' + title);
      dialog.showModal();
    });
  });

  // A click on the dimmed backdrop closes it too
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });
})();
