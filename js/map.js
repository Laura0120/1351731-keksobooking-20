'use strict';
(function () {
  var pinsContainer = window.main.map.querySelector('.map__pins');
  var mark = pinsContainer.querySelector('.map__pin--main');

  var renderPinElements = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.announcements.length; i++) {
      fragment.appendChild(window.pin.createPinElement(window.data.announcements[i]));
    }

    pinsContainer.appendChild(fragment);
  };

  var showMap = function () {
    window.main.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.cancelDisabled();
    renderPinElements();
  };

  mark.addEventListener('keydown', function (evt) {
    if (evt.code === window.util.KEY_ENTER) {
      showMap();
    }
  });

  mark.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      showMap();
    }
  });
  window.map = {
    mark: mark,
  };
})();
