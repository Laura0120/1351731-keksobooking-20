'use strict';
(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPE_OF_HOUSING = {
    Flat: 'Квартира',
    Bungalo: 'Бунгало',
    House: 'Дом',
    Palace: 'Дворец',
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var setupPhotos = function (element, photosOffer) {
    var photosContainer = element.querySelector('.popup__photos');
    var photoElement = photosContainer.querySelector('.popup__photo');
    if (photosOffer.length !== 0) {
      var fragment = document.createDocumentFragment();
      photosOffer.forEach(function (item) {
        var photoNewElement = photoElement.cloneNode(true);
        photoNewElement.src = item;
        fragment.appendChild(photoNewElement);
      });
      photosContainer.appendChild(fragment);
    }
    photoElement.remove();
  };

  var createCardElement = function (announcement) {
    var cardElement = cardTemplate.cloneNode(true);
    var buttonClose = cardElement.querySelector('.popup__close');
    var featuresOffers = announcement.offer.features;
    var photosOffers = announcement.offer.photos;
    var typeOfHousingOffer = announcement.offer.type;

    cardElement.querySelector('.popup__title').textContent = announcement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSING[typeOfHousingOffer];
    cardElement.querySelector('.popup__text--capacity').textContent =
      announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = announcement.offer.description;
    cardElement.querySelector('.popup__avatar').src = announcement.author.avatar;

    FEATURES.forEach(function (item) {
      if (featuresOffers.indexOf(item) === -1) {
        cardElement.querySelector('.popup__feature--' + item).remove();
      }
    });

    setupPhotos(cardElement, photosOffers);

    var onDocumentKeydown = function (evt) {
      if (evt.key === window.utils.KEY_ESC) {
        evt.preventDefault();
        cardElement.remove();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    buttonClose.addEventListener('click', function () {
      cardElement.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    });

    document.addEventListener('keydown', onDocumentKeydown);
    return cardElement;
  };

  window.card = {
    createElement: createCardElement,
  };
})();
