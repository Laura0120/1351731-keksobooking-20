'use strict';

(function () {
  var ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var REGISTRATION_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];
  var ANNOUNCEMENTS_COUNT = 8;
  var TITLES = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8'];
  var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
  var ROOMS = [1, 2, 3, 4, 5, 6, 7, 8];
  var GUESTS = [1, 2, 3, 4, 5, 6, 7, 8];
  var DESCRIPTION = ['добро пожаловать!'];

  var createAnnouncements = function () {
    var announcements = [];
    for (var i = 1; i <= ANNOUNCEMENTS_COUNT; i++) {
      var location = {
        x: window.util.getRandomValue(0, getWidth()),
        y: window.util.getRandomValue(130, 630),
      };
      announcements.push({
        author: {
          avatar: 'img/avatars/user' + '0' + i + '.png',
        },
        offer: {
          title: window.util.getRandomItem(TITLES),
          address: location.x + ', ' + location.y,
          price: window.util.getRandomItem(PRICES),
          type: window.util.getRandomItem(ACCOMODATION_TYPES),
          rooms: window.util.getRandomItem(ROOMS),
          guests: window.util.getRandomItem(GUESTS),
          checkin: window.util.getRandomItem(REGISTRATION_TIMES),
          checkout: window.util.getRandomItem(REGISTRATION_TIMES),
          features: window.util.getArrayRandomLength(FEATURES),
          description: window.util.getRandomItem(DESCRIPTION),
          photos: window.util.getArrayRandomLength(PHOTOS),
        },
        location: location,
      });
    }
    return announcements;
  };

  window.data = {
    createAnnouncements: createAnnouncements,
  };
})();
