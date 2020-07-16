'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPinElement = function (announcement) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = announcement.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = announcement.location.y - PIN_HEIGHT + 'px';
    var pinImg = pinElement.querySelector('img');
    pinImg.src = announcement.author.avatar;
    pinImg.alt = announcement.offer.title;
    return pinElement;
  };

  window.pin = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    createElement: createPinElement,
  };
})();
