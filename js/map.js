'use strict';
(function () {
  var ANNOUNCEMENT_COUNT = 5;
  var PRICE = {
    any: 'any',
    middle: {
      min: 10000,
      max: 50000,
    },
    low: {
      min: 0,
      max: 10000,
    },
    high: {
      min: 5000,
      max: Infinity,
    },
  };

  var mapElement = document.querySelector('.map');
  var pinsContainer = mapElement.querySelector('.map__pins');
  var filtersForm = mapElement.querySelector('.map__filters');
  var typeSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  var guestsSelect = filtersForm.querySelector('#housing-guests');
  var featuresCheckbox = filtersForm.querySelector('#housing-features');
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

  var getFilterElement = function () {
    var filterValue = {
      type: typeSelect.selectedOptions[0].value,
      price: PRICE[priceSelect.selectedOptions[0].value],
      rooms: roomsSelect.selectedOptions[0].value,
      guests: guestsSelect.selectedOptions[0].value,
      features: Array.from(featuresCheckbox.querySelectorAll(':checked')).map(function (el) {
        return el.value;
      }),
    };
    return filterValue;
  };

  var updateAnnouncements = function () {
    var filterValue = getFilterElement();

    removePinElements();
    removeCard();

    var filteredAnnouncements = announcements.filter(function (it) {
      return (
        (filterValue.type === 'any' || it.offer.type === filterValue.type) &&
        (filterValue.price === 'any' || (it.offer.price <= filterValue.price.max && it.offer.price >= filterValue.price.min)) &&
        (filterValue.rooms === 'any' || String(it.offer.rooms) === filterValue.rooms) &&
        (filterValue.guests === 'any' || String(it.offer.guests) === filterValue.guests) &&
        filterValue.features.every(function (el) {
          return it.offer.features.indexOf(el) !== -1;
        })
      );
    });
    if (filteredAnnouncements.length !== 0) {
      renderPinElements(filteredAnnouncements);
    }
  };

  var successHandler = function (data) {
    announcements = data;
    updateAnnouncements();
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

  filtersForm.addEventListener('change', function () {
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
