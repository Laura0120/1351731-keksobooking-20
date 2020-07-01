'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_PRICE = 1000000;
  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var roomNumberInput = adForm.querySelector('#room_number');
  var numberOfGuestsInput = adForm.querySelector('#capacity');
  var addressInput = adForm.querySelector('#address');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeHousingInput = adForm.querySelector('#type');
  var accomodationType = {
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

  var setAddress = function (x, y) {
    addressInput.value = Math.round(x) + ', ' + Math.round(y);
  };

  var handleRoomNumberChange = function () {
    for (var i = 0; i < numberOfGuestsInput.options.length; i++) {
      var guestsOption = numberOfGuestsInput.options[i];
      if (roomNumberInput.value === '100') {
        guestsOption.disabled = guestsOption.value > '0';
      } else if (guestsOption.value <= roomNumberInput.value && guestsOption.value !== '0') {
        guestsOption.disabled = false;
      } else {
        guestsOption.disabled = true;
      }
    }

    var selectedOption = numberOfGuestsInput.selectedOptions[0];

    if (selectedOption.disabled === true) {
      numberOfGuestsInput.setCustomValidity('выбрано недопустимое значение');
    } else {
      numberOfGuestsInput.setCustomValidity('');
    }
  };

  var handlePrice = function () {
    var selectedType = typeHousingInput.selectedOptions[0].value;
    priceInput.min = accomodationType[selectedType].min;
    priceInput.placeholder = accomodationType[selectedType].min;
  };

  var disableAdForm = function () {
    adForm.classList.add('ad-form--disabled');
    for (var i = 0; i < fieldsetsAdForm.length; i++) {
      fieldsetsAdForm[i].disabled = true;
    }
    setAddress(window.userPin.location.x, window.userPin.location.y);
  };

  var enableAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsetsAdForm.length; i++) {
      fieldsetsAdForm[i].disabled = false;
    }
    addressInput.readOnly = true;
  };

  var onUploadSuccess = function () {
    window.map.removePinElements();
    window.map.removeCard();
    adForm.reset();
    window.userPin.reset();
    disableAdForm();
    window.map.disable();
    window.popup.createSuccess();
    document.addEventListener('click', window.popup.onPopupSuccessClose);
    document.addEventListener('keydown', window.popup.onPopupSuccessEscPress);
  };

  var onUploadError = function (errorMessage) {
    window.popup.createErrorPopup(errorMessage);
    document.addEventListener('click', window.popup.onPopupErrorClose);
    window.popup.onPopupErrorClose();
    document.addEventListener('keydown', window.popup.onPopupErrorEscPress);
  };

  var onSubmitHandler = function (evt) {
    window.backend.save(new FormData(adForm), onUploadSuccess, onUploadError);
    evt.preventDefault();
  };

  titleInput.addEventListener('input', function () {
    titleInput.reportValidity();
    var valueLength = titleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  roomNumberInput.addEventListener('change', function () {
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

  typeHousingInput.addEventListener('change', function () {
    handlePrice();
  });

  adForm.addEventListener('submit', onSubmitHandler);

  handleRoomNumberChange();

  disableAdForm();

  window.form = {
    enable: enableAdForm,
    setAddress: setAddress,
  };
})();
