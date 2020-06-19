'use strict';

(function () {
  var KEY_ENTER = 'Enter';

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

  var getWidth = function (element) {
    return element.offsetWidth;
  };

  var getOffsetLeft = function (element) {
    return element.offsetLeft;
  };

  var getOffsetTop = function (element) {
    return element.offsetTop;
  };

  window.util = {
    getRandomValue: getRandomValue,
    getRandomItem: getRandomItem,
    getArrayRandomLength: getArrayRandomLength,
    getWidth: getWidth,
    getOffsetLeft: getOffsetLeft,
    getOffsetTop: getOffsetTop,
    KEY_ENTER: KEY_ENTER,
  };
})();
