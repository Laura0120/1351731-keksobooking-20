'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';
  var LEFT_MOUSE_BUTTON = 1;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  var getByIndex = function (array, index) {
    return array[index];
  };

  var debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.utils = {
    KEY_ENTER: KEY_ENTER,
    KEY_ESC: KEY_ESC,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    getByIndex: getByIndex,
    debounce: debounce,
  };
})();
