'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  var pinsContainer = mapElement.querySelector('.map__pins');
  var mark = pinsContainer.querySelector('.map__pin--main');

  var getWidth = function () {
    return window.util.getWidth(mapElement);
  };

  var renderPinElements = function () {
    var announcements = window.data.createAnnouncements();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < announcements.length; i++) {
      fragment.appendChild(window.pin.createElement(announcements[i]));
    }

    pinsContainer.appendChild(fragment);
  };

  var showMap = function () {
    mapElement.classList.remove('map--faded');
    window.form.enable();
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
    markOffsetLeft: window.util.getOffsetLeft(mark),
    markOffsetTop: window.util.getOffsetTop(mark),
    getWidth: getWidth,
  };
})();
