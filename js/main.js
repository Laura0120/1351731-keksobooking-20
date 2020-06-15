'use strict';

var ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var REGISTRATION_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ANNOUNCEMENTS_COUNT = 8;

var TITLES = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8'];
var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
var ROOMS = [1, 2, 3, 4, 5, 6, 7, 8];
var GUESTS = [1, 2, 3, 4, 5, 6, 7, 8];
var DESCRIPTION = ['добро пожаловать!'];

var announcements = [];
var map = document.querySelector('.map');
var mark = document.querySelector('.map__pin--main');
var pinsContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var adForm = document.querySelector('.ad-form');
var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
var roomNumber = adForm.querySelector('#room_number');
var numberOfGuests = adForm.querySelector('#capacity');

var handleRoomNumberChange = function () {
  for (var i = 0; i < numberOfGuests.options.length; i++) {
    var guestsOption = numberOfGuests.options[i];
    if (roomNumber.value === '100') {
      guestsOption.disabled = guestsOption.value > '0';
    } else if (guestsOption.value <= roomNumber.value && guestsOption.value !== '0') {
      guestsOption.disabled = false;
    } else {
      guestsOption.disabled = true;
    }
  }

  var selectedOption = numberOfGuests.selectedOptions[0];
  if (selectedOption.disabled === true) {
    numberOfGuests.setCustomValidity('выбрано недопустимое значение');
  } else {
    numberOfGuests.setCustomValidity('');
  }
};

handleRoomNumberChange();
roomNumber.addEventListener('change', handleRoomNumberChange);
numberOfGuests.addEventListener('change', function () {
  var selectedOption = numberOfGuests.selectedOptions[0];
  if (selectedOption.disabled === false) {
    numberOfGuests.setCustomValidity('');
  }
});

var addDisabled = function () {
  for (var i = 0; i < fieldsetsAdForm.length; i++) {
    fieldsetsAdForm[i].disabled = true;
  }
  return fieldsetsAdForm;
};

addDisabled();

var cancelDisabled = function () {
  for (var i = 0; i < fieldsetsAdForm.length; i++) {
    fieldsetsAdForm[i].disabled = false;
  }
  return fieldsetsAdForm;
};

var getAddress = function () {
  var addressInput = adForm.querySelector('#address');
  addressInput.value = Math.round(mark.offsetLeft + PIN_WIDTH / 2) + ', ' + Math.round(mark.offsetTop + PIN_HEIGHT);
  addressInput.disabled = true;
};

getAddress();

var showMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  cancelDisabled();
  renderPinElements();
};

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

var createAnnouncements = function () {
  var mapWidth = map.offsetWidth;
  var generatedAnnouncements = [];
  for (var i = 1; i <= ANNOUNCEMENTS_COUNT; i++) {
    var location = {
      x: getRandomValue(0, mapWidth),
      y: getRandomValue(130, 630),
    };
    generatedAnnouncements.push({
      author: {
        avatar: 'img/avatars/user' + '0' + i + '.png',
      },
      offer: {
        title: getRandomItem(TITLES),
        address: location.x + ', ' + location.y,
        price: getRandomItem(PRICES),
        type: getRandomItem(ACCOMODATION_TYPES),
        rooms: getRandomItem(ROOMS),
        guests: getRandomItem(GUESTS),
        checkin: getRandomItem(REGISTRATION_TIMES),
        checkout: getRandomItem(REGISTRATION_TIMES),
        features: getArrayRandomLength(FEATURES),
        description: getRandomItem(DESCRIPTION),
        photos: getArrayRandomLength(PHOTOS),
      },
      location: location,
    });
  }
  return generatedAnnouncements;
};

var createPinElement = function (announcement) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = announcement.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = announcement.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = announcement.author.avatar;
  pinElement.querySelector('img').alt = announcement.offer.title;
  return pinElement;
};

var renderPinElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announcements.length; i++) {
    fragment.appendChild(createPinElement(announcements[i]));
  }

  pinsContainer.appendChild(fragment);
};

announcements = createAnnouncements();

mark.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    showMap();
  }
});

mark.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    showMap();
  }
});
