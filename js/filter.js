'use strict';
(function () {
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
  var ANY_VALUE = 'any';

  var filtersForm = document.querySelector('.map__filters');
  var filtersSelect = document.querySelectorAll('.map__filter');
  var typeSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  var guestsSelect = filtersForm.querySelector('#housing-guests');
  var featuresCheckbox = filtersForm.querySelector('#housing-features');

  var disableFilter = function () {
    filtersSelect.forEach(function (item) {
      item.disabled = true;
    });
    featuresCheckbox.disabled = true;
  };

  var enableFilter = function () {
    filtersSelect.forEach(function (item) {
      item.disabled = false;
    });
    featuresCheckbox.disabled = false;
  };

  var getFilterElement = function () {
    var filterValue = {
      type: typeSelect.selectedOptions[0].value,
      price: PRICE[priceSelect.selectedOptions[0].value],
      rooms: roomsSelect.selectedOptions[0].value,
      guests: guestsSelect.selectedOptions[0].value,
      features: Array.from(featuresCheckbox.querySelectorAll(':checked')).map(function (element) {
        return element.value;
      }),
    };
    return filterValue;
  };

  var filterUpdate = function (data) {
    var filterValue = getFilterElement();
    window.map.removePinElements();
    window.map.removeCard();

    var filteredAnnouncements = data.filter(function (it) {
      return (
        (filterValue.type === ANY_VALUE || it.offer.type === filterValue.type) &&
        (filterValue.price === ANY_VALUE || (it.offer.price <= filterValue.price.max && it.offer.price >= filterValue.price.min)) &&
        (filterValue.rooms === ANY_VALUE || String(it.offer.rooms) === filterValue.rooms) &&
        (filterValue.guests === ANY_VALUE || String(it.offer.guests) === filterValue.guests) &&
        filterValue.features.every(function (element) {
          return it.offer.features.indexOf(element) !== -1;
        })
      );
    });

    if (filteredAnnouncements.length !== 0) {
      window.map.renderPinElements(filteredAnnouncements);
    }
  };

  disableFilter();

  window.filter = {
    update: filterUpdate,
    disable: disableFilter,
    enable: enableFilter,
  };
})();
