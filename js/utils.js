'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';
  var LEFT_MOUSE_BUTTON = 1;

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItem = function (array) {
    return array[getRandomValue(0, array.length - 1)];
  };

  var getArrayRandomLength = function (array) {
    var randomValue = getRandomValue(0, array.length - 1);
    var arrayRendomLength = [];
    for (var i = 0; i < randomValue; i++) {
      arrayRendomLength.push(getRandomItem(array));
    }
    return arrayRendomLength;
  };

  var getByIndex = function (array, index) {
    return array[index];
  };

  window.utils = {
    KEY_ENTER: KEY_ENTER,
    KEY_ESC: KEY_ESC,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    getRandomValue: getRandomValue,
    getRandomItem: getRandomItem,
    getArrayRandomLength: getArrayRandomLength,
    getByIndex: getByIndex,
  };
})();
