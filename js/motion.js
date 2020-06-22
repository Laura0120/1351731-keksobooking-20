'use strict';

(function () {
  var ARROW_HEIGHT = 22;
  var markElement = document.querySelector('.map__pin--main');
  var location = {
    x: markElement.offsetLeft + window.pin.PIN_WIDTH / 2,
    y: markElement.offsetTop + window.pin.PIN_HEIGHT,
  };

  markElement.addEventListener('keydown', function (evt) {
    if (evt.code === window.util.KEY_ENTER) {
      window.map.showMap();
    }
  });

  markElement.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      window.map.showMap();
    }

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

      var currentCoords = {
        x: markElement.offsetLeft - shift.x,
        y: markElement.offsetTop - shift.y,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (
        currentCoords.x + markElement.offsetWidth / 2 <= 0 ||
        currentCoords.x + markElement.offsetWidth >= window.map.getWidth() ||
        currentCoords.y + markElement.offsetHeight + ARROW_HEIGHT <= 130 ||
        currentCoords.y + markElement.offsetHeight + ARROW_HEIGHT >= 630
      ) {
        shift.x = 0;
        shift.y = 0;
      }

      markElement.style.left = markElement.offsetLeft - shift.x + 'px';
      markElement.style.top = markElement.offsetTop - shift.y + 'px';

      location = {
        x: currentCoords.x + markElement.offsetWidth / 2,
        y: currentCoords.y + markElement.offsetHeight + ARROW_HEIGHT,
      };

      window.form.setAddress(location.x, location.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.move = {
    location: location,
  };
})();
