'use strict';
(function () {
  var ANNOUNCEMENT_COUNT = 5;

  var mapElement = document.querySelector('.map');
  var pinsContainer = mapElement.querySelector('.map__pins');
  var filtersForm = mapElement.querySelector('.map__filters');
  var announcements = [];

  var getWidthMap = function () {
    return mapElement.offsetWidth;
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var renderPinElements = function (data) {
    var takeNumber = data.length > ANNOUNCEMENT_COUNT ? ANNOUNCEMENT_COUNT : data.length;
    if (takeNumber.length !== 0) {
      filtersForm.before(window.card.createElement(data[0]));
    }
    for (var i = 0; i < takeNumber; i++) {
      (function () {
        var element = window.utils.getByIndex(data, i);
        var pinElement = window.pin.createElement(element);
        pinsContainer.appendChild(pinElement);
        pinElement.addEventListener('click', function () {
          removeCard();
          filtersForm.before(window.card.createElement(element));
        });
      })();
    }
  };

  var removePinElements = function () {
    var similairesPinElement = pinsContainer.querySelectorAll('.map__pin');
    for (var i = 1; i < similairesPinElement.length; i++) {
      similairesPinElement[i].remove();
    }
  };

  var successHandler = function (data) {
    announcements = data;
   window.filter.update(announcements);
  };

  var enable = function () {
    if (mapElement.classList.contains('map--faded')) {
      mapElement.classList.remove('map--faded');
      window.form.enable();
      window.filter.enable();
      window.backend.load(successHandler, window.backend.errorHandler);
    }
  };

  var disable = function () {
    mapElement.classList.add('map--faded');
  };

  filtersForm.addEventListener('change', function () {
    window.utils.debounce(function () {
      window.filter.update(announcements);
    });
  });

  window.map = {
    getWidth: getWidthMap,
    enable: enable,
    disable: disable,
    renderPinElements: renderPinElements,
    removePinElements: removePinElements,
    removeCard: removeCard,
  };
})();
