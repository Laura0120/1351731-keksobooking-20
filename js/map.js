'use strict';
(function () {
  var mapElement = document.querySelector('.map');

  var pinsContainer = mapElement.querySelector('.map__pins');
  var filtersСontainer = mapElement.querySelector('.map__filters-container');

  var getWidthMap = function () {
    return mapElement.offsetWidth;
  };

  var renderPinElements = function (announcements) {
    var fragment = document.createDocumentFragment();
    filtersСontainer.before(window.card.createElement(announcements[0]));
    var getPinByIndex = function (array, index) {
      var value = array[index];
      var pinElement = window.pin.createElement(value);
      pinElement.addEventListener('click', function () {
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
        filtersСontainer.before(window.card.createElement(value));
      });
      return pinElement;
    };

    for (var i = 0; i < announcements.length; i++) {
      fragment.appendChild(getPinByIndex(announcements, i));
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
      window.backend.load(renderPinElements, window.backend.errorHandler);
    }
  };

  var disableMap = function () {
    mapElement.classList.add('map--faded');
  };

  var resetMap = function () {
    window.userPin.markElement.style.left = '570px';
    window.userPin.markElement.style.top = '375px';
  };

  window.map = {
    getWidth: getWidthMap,
    showMap: showMap,
    disable: disableMap,
    removePinElements: removePinElements,
    reset: resetMap,
  };
})();
