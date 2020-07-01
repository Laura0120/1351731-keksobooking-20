'use strict';
(function () {
  var ANNOUNCEMENT_COUNT = 5;
  var mapElement = document.querySelector('.map');
  var pinsContainer = mapElement.querySelector('.map__pins');
  var filtersСontainer = mapElement.querySelector('.map__filters-container');
  var housingTypeSelect = filtersСontainer.querySelector('#housing-type');
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
      filtersСontainer.before(window.card.createElement(data[0]));
    }
    for (var i = 0; i < takeNumber; i++) {
      (function () {
        var element = window.utils.getByIndex(data, i);
        var pinElement = window.pin.createElement(element);
        pinsContainer.appendChild(pinElement);
        pinElement.addEventListener('click', function () {
          removeCard();
          filtersСontainer.before(window.card.createElement(element));
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
    updateAnnouncements();
  };

  var updateAnnouncements = function () {
    removePinElements();
    removeCard();
    if (housingTypeSelect.selectedOptions[0].value === 'any') {
      renderPinElements(announcements);
    } else {
      var sameTypeHousing = announcements.filter(function (it) {
        return it.offer.type === housingTypeSelect.selectedOptions[0].value;
      });
      renderPinElements(sameTypeHousing);
    }
  };

  var showMap = function () {
    if (mapElement.classList.contains('map--faded')) {
      mapElement.classList.remove('map--faded');
      window.form.enable();
      window.backend.load(successHandler, window.backend.errorHandler);
    }
  };

  var disableMap = function () {
    mapElement.classList.add('map--faded');
  };

  housingTypeSelect.addEventListener('change', function () {
    updateAnnouncements();
  });

  window.map = {
    getWidth: getWidthMap,
    showMap: showMap,
    disable: disableMap,
    removePinElements: removePinElements,
    removeCard: removeCard,
  };
})();
