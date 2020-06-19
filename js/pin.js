'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createElement = function (announcement) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = announcement.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = announcement.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = announcement.author.avatar;
    pinElement.querySelector('img').alt = announcement.offer.title;
    return pinElement;
  };

  window.pin = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    createElement: createElement,
  };
})();
