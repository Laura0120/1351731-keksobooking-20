'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_PRICE = 1000000;
  var FILE_TYPES = ['image/jpeg', 'image/png'];
  var ACCOMODATION_TYPE = {
    bungalo: {
      min: 0,
      name: 'Бунгало',
    },
    flat: {
      min: 1000,
      name: 'Квартира',
    },
    house: {
      min: 5000,
      name: 'Дом',
    },
    palace: {
      min: 10000,
      name: 'Дворец',
    },
  };
  var HOUSING_NOT_FOR_GUESTS = {
    Rooms: '100',
    Guests: '0',
  };

  var adForm = document.querySelector('.ad-form');
  var adFormfieldsets = adForm.querySelectorAll('fieldset');
  var avatarInput = adForm.querySelector('#avatar');
  var avatarImg = document.querySelector('.ad-form-header__preview img');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var numberOfGuestsSelect = adForm.querySelector('#capacity');
  var addressInput = adForm.querySelector('#address');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeHousingSelect = adForm.querySelector('#type');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var photosInput = adForm.querySelector('#images');
  var photosContener = adForm.querySelector('.ad-form__photo');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var filtersForm = document.querySelector('.map__filters');

  var addPhoto = function (image) {
    var photo = document.createElement('img');
    photo.style = 'margin: 5px; width: 60px; height: 60px;';
    photo.alt = 'фото обьявления';
    photo.src = image;
    photosContener.appendChild(photo);
  };

  var setAvatar = function (image) {
    avatarImg.src = image;
  };

  var uploadImage = function (input, setImageCallback) {
    var file = input.files[0];
    var validType = FILE_TYPES.some(function (it) {
      return it === file.type;
    });
    if (validType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        setImageCallback(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var setAddress = function (x, y) {
    addressInput.value = Math.round(x) + ', ' + Math.round(y);
  };

  var handleRoomNumberChange = function () {
    Array.from(numberOfGuestsSelect.options).forEach(function (item) {
      if (roomNumberSelect.value === HOUSING_NOT_FOR_GUESTS.Rooms) {
        item.disabled = item.value > HOUSING_NOT_FOR_GUESTS.Guests;
      } else if (item.value <= roomNumberSelect.value && item.value !== HOUSING_NOT_FOR_GUESTS.Guests) {
        item.disabled = false;
      } else {
        item.disabled = true;
      }
    });

    var selectedOption = numberOfGuestsSelect.selectedOptions[0];

    var errorMessage = selectedOption.disabled ? 'выбрано недопустимое значение' : '';
    numberOfGuestsSelect.setCustomValidity(errorMessage);
  };

  var handlePrice = function () {
    var selectedType = typeHousingSelect.selectedOptions[0].value;
    priceInput.min = ACCOMODATION_TYPE[selectedType].min;
    priceInput.placeholder = ACCOMODATION_TYPE[selectedType].min;
  };

  var handleTimeoutChange = function () {
    var selectedTime = timeinSelect.selectedOptions[0].value;
    for (var i = 0; i < timeoutSelect.options.length; i++) {
      if (timeoutSelect.options[i].value === selectedTime) {
        timeoutSelect.options[i].selected = true;
        break;
      }
    }
  };

  var handleTimeinChange = function () {
    var selectedTime = timeoutSelect.selectedOptions[0].value;
    for (var i = 0; i < timeinSelect.options.length; i++) {
      if (timeinSelect.options[i].value === selectedTime) {
        timeinSelect.options[i].selected = true;
        break;
      }
    }
  };

  var disableAdForm = function () {
    adForm.classList.add('ad-form--disabled');
    Array.from(adFormfieldsets).forEach(function (item) {
      item.disabled = true;
    });
    setAddress(window.userPin.location.x, window.userPin.location.y);
    avatarImg.src = 'img/muffin-grey.svg';
    photosContener.innerHTML = '';
  };

  var enableAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    Array.from(adFormfieldsets).forEach(function (item) {
      item.disabled = false;
    });
    addressInput.readOnly = true;
  };

  var setInitialState = function () {
    window.map.removePinElements();
    window.map.removeCard();
    adForm.reset();
    window.userPin.reset();
    disableAdForm();
    window.map.disable();
    filtersForm.reset();
    window.filter.disable();
  };

  var onUploadSuccess = function () {
    setInitialState();
    window.popup.showOnSuccess();
  };

  var onUploadError = function (errorMessage) {
    window.popup.showOnError(errorMessage);
  };

  var onAdFormSubmit = function (evt) {
    window.backend.save(new FormData(adForm), onUploadSuccess, onUploadError);
    evt.preventDefault();
  };

  photosInput.addEventListener('change', function () {
    uploadImage(photosInput, addPhoto);
  });

  avatarInput.addEventListener('change', function () {
    uploadImage(avatarInput, setAvatar);
  });

  titleInput.addEventListener('input', function () {
    titleInput.reportValidity();
    var valueLength = titleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  roomNumberSelect.addEventListener('change', function () {
    handleRoomNumberChange();
  });

  numberOfGuestsSelect.addEventListener('change', function () {
    handleRoomNumberChange();
  });

  priceInput.addEventListener('input', function () {
    priceInput.reportValidity();
    var value = priceInput.value;
    if (value > MAX_PRICE) {
      priceInput.setCustomValidity('Максимальная стоимость ' + MAX_PRICE);
    } else {
      priceInput.setCustomValidity('');
    }
  });

  typeHousingSelect.addEventListener('change', function () {
    handlePrice();
  });

  timeinSelect.addEventListener('change', function () {
    handleTimeoutChange();
  });

  timeoutSelect.addEventListener('change', function () {
    handleTimeinChange();
  });

  adForm.addEventListener('submit', onAdFormSubmit);

  resetButton.addEventListener('click', function (evt) {
    setInitialState();
    evt.preventDefault();
  });

  handleRoomNumberChange();

  disableAdForm();

  window.form = {
    enable: enableAdForm,
    setAddress: setAddress,
  };
})();
