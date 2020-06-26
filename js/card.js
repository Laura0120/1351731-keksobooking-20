'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var getTransfer = function (typeOfHousing) {
    switch (typeOfHousing) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return '';
    }
  };

  var createCardElement = function (announcement) {
    var cardElement = cardTemplate.cloneNode(true);
    var battonClose = cardElement.querySelector('.popup__close');
    var features = cardElement.querySelectorAll('.popup__feature');
    var photos = cardElement.querySelector('.popup__photos');
    var photo = photos.querySelector('.popup__photo');

    cardElement.querySelector('.popup__title').textContent = announcement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTransfer(announcement.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent =
      announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = announcement.offer.description;
    cardElement.querySelector('.popup__avatar').src = announcement.author.avatar;

    var getFeatures = function (feature) {
      switch (feature) {
        case 'wifi':
          return (cardElement.querySelector('.popup__feature--wifi').textContent = 'wifi');
        case 'dishwasher':
          return (cardElement.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher');
        case 'parking':
          return (cardElement.querySelector('.popup__feature--parking').textContent = 'parking');
        case 'washer':
          return (cardElement.querySelector('.popup__feature--washer').textContent = 'washer');
        case 'elevator':
          return (cardElement.querySelector('.popup__feature--elevator').textContent = 'elevator');
        case 'conditioner':
          return (cardElement.querySelector('.popup__feature--conditioner').textContent = 'conditioner');
        default:
          return '';
      }
    };

    for (var i = 0; i < announcement.offer.features.length; i++) {
      getFeatures(announcement.offer.features[i]);
    }

    for (var j = 0; j < features.length; j++) {
      if (!features[j].textContent) {
        features[j].remove();
      }
    }

    var fragment = document.createDocumentFragment();
    for (var k = 0; k < announcement.offer.photos.length; k++) {
      if (k === 0) {
        photo.src = announcement.offer.photos[k];
      } else {
        var photoNewElement = photo.cloneNode(true);
        photoNewElement.src = announcement.offer.photos[k];
        fragment.appendChild(photoNewElement);
      }
    }
    photos.appendChild(fragment);

    battonClose.addEventListener('click', function () {
      cardElement.remove();
    });
    return cardElement;
  };

  window.card = {
    createElement: createCardElement,
  };
})();
