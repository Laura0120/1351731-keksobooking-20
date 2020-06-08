var title = [title1, title2, title3, title4, title5, title6, title7, title8];
var price = [100, 200, 300, 400, 500, 600, 700, 800];
var rooms = [1, 2, 3, 4, 5, 6, 7, 8];
var guests = [1, 2, 3, 4, 5, 6, 7, 8];
var description = ['добро пожаловать!'];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItem = function (array) {
  return array[getRandomValue(0, array.length - 1)];
};

var generateData = function (array) {
  return getRandomItem(array);
};
