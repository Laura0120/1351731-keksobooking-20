'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  var pinsContainer = mapElement.querySelector('.map__pins');

  var getWidth = function () {
    return mapElement.offsetWidth;
  };

  var renderPinElements = function (announcements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < announcements.length; i++) {
      fragment.appendChild(window.pin.createElement(announcements[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  var removePinElements = function () {
    var similairesPinElement = pinsContainer.querySelectorAll('.map__pin');
    for (var i = 1; i < similairesPinElement.length; i++) {
      similairesPinElement[i].remove();
    }
  };

  var showMap = function () {
    if (mapElement.classList.contains('map--faded')) {
      mapElement.classList.remove('map--faded');
      window.form.enable();
      window.request.load(renderPinElements, window.request.errorHandler);
    }
  };

  var disableMap = function () {
    mapElement.classList.add('map--faded');
  };

  window.map = {
    getWidth: getWidth,
    showMap: showMap,
    disable: disableMap,
    removePinElements: removePinElements,
  };
})();
