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
    for (var i = 0; i < takeNumber; i++) {
      renderPinElement(data[i]);
    }
  };

  var renderPinElement = function (element) {
    var pinElement = window.pin.createElement(element);
    pinsContainer.appendChild(pinElement);
    pinElement.addEventListener('click', function () {
      removeCard();
      filtersForm.before(window.card.createElement(element));
    });
  };

  var removePinElements = function () {
    var pinElements = pinsContainer.querySelectorAll('.map__pin');
    Array.from(pinElements).forEach(function (item, index) {
      if (index !== 0) {
        item.remove();
      }
    });
  };

  var successHandler = function (data) {
    announcements = data;
    window.filter.update(announcements);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var enable = function () {
    if (mapElement.classList.contains('map--faded')) {
      mapElement.classList.remove('map--faded');
      window.form.enable();
      window.filter.enable();
      window.backend.load(successHandler, errorHandler);
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
