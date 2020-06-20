'use strict';

(function () {
  var markElement = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var location = {
    x: markElement.offsetLeft + window.pin.PIN_WIDTH / 2,
    y: markElement.offsetTop + window.pin.PIN_HEIGHT,
  };
  var renderPinElements = false;

  var getAddress = function () {
    addressInput.value = Math.round(location.x) + ', ' + Math.round(location.y);
  };

  markElement.addEventListener('keydown', function (evt) {
    if (evt.code === window.util.KEY_ENTER) {
      window.map.showMap();
    }
  });

  markElement.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      window.map.showMap();
      if (!renderPinElements) {
        window.map.renderPinElements();
      }
    }
    renderPinElements = true;

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (
        markElement.offsetLeft + window.pin.PIN_WIDTH / 2 - shift.x <= 0 ||
        markElement.offsetLeft + window.pin.PIN_WIDTH - shift.x >= window.map.getWidth() ||
        markElement.offsetTop + window.pin.PIN_HEIGHT - shift.y <= 130 ||
        markElement.offsetTop + window.pin.PIN_HEIGHT - shift.y >= 630
      ) {
        shift.x = 0;
        shift.y = 0;
      }

      markElement.style.top = markElement.offsetTop - shift.y + 'px';
      markElement.style.left = markElement.offsetLeft - shift.x + 'px';

      location = {
        x: markElement.offsetLeft + window.pin.PIN_WIDTH / 2,
        y: markElement.offsetTop + window.pin.PIN_HEIGHT,
      };

      getAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  getAddress();
})();
