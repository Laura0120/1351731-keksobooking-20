'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var typeOfHousing = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var setupPhotos = function (element, photosOffer) {
    var photosContainer = element.querySelector('.popup__photos');
    var photoElement = photosContainer.querySelector('.popup__photo');
    if (photosOffer.length !== 0) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photosOffer.length; i++) {
        var photoNewElement = photoElement.cloneNode(true);
        photoNewElement.src = photosOffer[i];
        fragment.appendChild(photoNewElement);
      }
      photosContainer.appendChild(fragment);
    }
    photoElement.remove();
  };

  var createCardElement = function (announcement) {
    var cardElement = cardTemplate.cloneNode(true);
    var buttonClose = cardElement.querySelector('.popup__close');
    var featuresOffer = announcement.offer.features;
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

    for (var i = 0; i < features.length; i++) {
      if (featuresOffer.indexOf(features[i]) === -1) {
        cardElement.querySelector('.popup__feature--' + features[i]).remove();
      }
    }

    setupPhotos(cardElement, photosOffer);

    buttonClose.addEventListener('click', function () {
      cardElement.remove();
    });
    return cardElement;
  };

  window.card = {
    createElement: createCardElement,
  };
})();
