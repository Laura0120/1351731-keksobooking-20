var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var REGISTRATION_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ANNOUCEMENTS_COUNT = 8;

var TITLE = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8'];
var PRICE = [100, 200, 300, 400, 500, 600, 700, 800];
var ROOMS = [1, 2, 3, 4, 5, 6, 7, 8];
var GUESTS = [1, 2, 3, 4, 5, 6, 7, 8];
var DESCRIPTION = ['добро пожаловать!'];

var annoucements = [];
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapWidth = map.offsetWidth;
var listPin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

var createAnnoucements = function () {
  var generatedAnnoucements = [];
  for (var i = 1; i <= ANNOUCEMENTS_COUNT; i++) {
    var location = {
      x: getRandomValue(0, mapWidth),
      y: getRandomValue(130, 630),
    };
    generatedAnnoucements.push({
      author: {
        avatar: 'img/avatars/user' + '0' + i + '.png',
      },
      offer: {
        title: getRandomItem(TITLE),
        address: location.x + ', ' + location.y,
        price: getRandomItem(PRICE),
        type: getRandomItem(TYPE),
        rooms: getRandomItem(ROOMS),
        guests: getRandomItem(GUESTS),
        checkin: getRandomItem(REGISTRATION_TIME),
        checkout: getRandomItem(REGISTRATION_TIME),
        features: getArrayRandomLength(FEATURES),
        description: getRandomItem(DESCRIPTION),
        photos: getArrayRandomLength(PHOTOS),
      },
      location: location,
    });
  }
  return generatedAnnoucements;
};

var createPinElement = function (annoucement) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = annoucement.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = annoucement.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = annoucement.author.avatar;
  pinElement.querySelector('img').alt = annoucement.offer.title;
  return pinElement;
};

var renderPinElement = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < annoucements.length; i++) {
    fragment.appendChild(createPinElement(annoucements[i]));
  }

  listPin.appendChild(fragment);
};

annoucements = createAnnoucements();
renderPinElement();
