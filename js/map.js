'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  var pinsContainer = mapElement.querySelector('.map__pins');

  var getWidth = function () {
    return mapElement.offsetWidth;
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
    if (mapElement.classList.contains('map--faded')) {
      mapElement.classList.remove('map--faded');
      window.form.enable();
      renderPinElements();
    }
  };

  window.map = {
    getWidth: getWidth,
    showMap: showMap,
  };
})();
