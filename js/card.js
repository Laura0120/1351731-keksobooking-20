'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var typeOfHousing = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var setFeatures = function (feature, element) {
    switch (feature) {
      case 'wifi':
        element.querySelector('.popup__feature--wifi').textContent = 'wifi';
        break;
      case 'dishwasher':
        element.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
        break;
      case 'parking':
        element.querySelector('.popup__feature--parking').textContent = 'parking';
        break;
      case 'washer':
        element.querySelector('.popup__feature--washer').textContent = 'washer';
        break;
      case 'elevator':
        element.querySelector('.popup__feature--elevator').textContent = 'elevator';
        break;
      case 'conditioner':
        element.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
        break;
      default:
        return '';
    }
    return element;
  };

  var createCardElement = function (announcement) {
    var cardElement = cardTemplate.cloneNode(true);
    var buttonClose = cardElement.querySelector('.popup__close');
    var featuresElement = cardElement.querySelectorAll('.popup__feature');
    var featuresOffer = announcement.offer.features;
    var photosContainer = cardElement.querySelector('.popup__photos');
    var photoElement = photosContainer.querySelector('.popup__photo');
    var photosOffer = announcement.offer.photos;
    var typeOfHousingOffer = announcement.offer.type;

    cardElement.querySelector('.popup__title').textContent = announcement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeOfHousing[typeOfHousingOffer];
    cardElement.querySelector('.popup__text--capacity').textContent =
      announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = announcement.offer.description;
    cardElement.querySelector('.popup__avatar').src = announcement.author.avatar;

    for (var i = 0; i < featuresOffer.length; i++) {
      setFeatures(featuresOffer[i], cardElement);
    }

    for (var j = 0; j < featuresElement.length; j++) {
      if (!featuresElement[j].textContent) {
        featuresElement[j].remove();
      }
    }

    var fragment = document.createDocumentFragment();
    if (photosOffer.length === 0) {
      photoElement.remove();
    } else {
      for (var k = 0; k < announcement.offer.photos.length; k++) {
        if (k === 0) {
          photoElement.src = announcement.offer.photos[k];
        } else {
          var photoNewElement = photoElement.cloneNode(true);
          photoNewElement.src = announcement.offer.photos[k];
          fragment.appendChild(photoNewElement);
        }
      }
      photosContainer.appendChild(fragment);
    }

    buttonClose.addEventListener('click', function () {
      cardElement.remove();
    });
    return cardElement;
  };

  window.card = {
    createElement: createCardElement,
  };
})();
