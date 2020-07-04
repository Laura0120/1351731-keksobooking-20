'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
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

  var filtersForm = document.querySelector('.map__filters');
  var typeSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  var guestsSelect = filtersForm.querySelector('#housing-guests');
  var featuresCheckbox = filtersForm.querySelector('#housing-features');
  var lastTimeout;

  var debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
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

  var updateAnnouncements = function (data) {
    var filterValue = getFilterElement();

    window.map.removePinElements();
    window.map.removeCard();

    var filteredAnnouncements = data.filter(function (it) {
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
      window.map.renderPinElements(filteredAnnouncements);
    }
  };

  window.filter = {
    updateAnnouncements: updateAnnouncements,
    debounce: debounce,
  };
})();
