'use strict';

(function () {
  var ARROW_HEIGHT = 22;
  var MARK_ELEMENT = document.querySelector('.map__pin--main');
  var MIN_COORDINATES_Y = 130;
  var MAX_COORDINATES_Y = 630;
  var location = {
    x: MARK_ELEMENT.offsetLeft + MARK_ELEMENT.offsetWidth / 2,
    y: MARK_ELEMENT.offsetTop + MARK_ELEMENT.offsetHeight + ARROW_HEIGHT,
  };

  MARK_ELEMENT.addEventListener('keydown', function (evt) {
    if (evt.code === window.util.KEY_ENTER) {
      window.map.showMap();
    }
  });

  MARK_ELEMENT.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which !== window.util.LEFT_MOUSE_BUTTON) {
      return;
    }
    window.map.showMap();

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
        x: MARK_ELEMENT.offsetLeft - shift.x,
        y: MARK_ELEMENT.offsetTop - shift.y,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (
        currentCoords.x + MARK_ELEMENT.offsetWidth / 2 >= 0 &&
        currentCoords.x + MARK_ELEMENT.offsetWidth / 2 <= window.map.getWidth() &&
        currentCoords.y + MARK_ELEMENT.offsetHeight + ARROW_HEIGHT >= MIN_COORDINATES_Y &&
        currentCoords.y + MARK_ELEMENT.offsetHeight + ARROW_HEIGHT <= MAX_COORDINATES_Y
      ) {
        MARK_ELEMENT.style.left = currentCoords.x + 'px';
        MARK_ELEMENT.style.top = currentCoords.y + 'px';

        location = {
          x: currentCoords.x + MARK_ELEMENT.offsetWidth / 2,
          y: currentCoords.y + MARK_ELEMENT.offsetHeight + ARROW_HEIGHT,
        };

        window.form.setAddress(location.x, location.y);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.userPin = {
    location: location,
    MARK_ELEMENT: MARK_ELEMENT,
  };
})();
