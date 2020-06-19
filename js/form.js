'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var roomNumberInput = adForm.querySelector('#room_number');
  var numberOfGuestsInput = adForm.querySelector('#capacity');
  var addressInput = adForm.querySelector('#address');

  var getAddress = function () {
    addressInput.value =
      Math.round(window.map.markOffsetLeft + window.pin.PIN_WIDTH / 2) +
      ', ' +
      Math.round(window.map.markOffsetTop + window.pin.PIN_HEIGHT);
    addressInput.disabled = true;
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

  var disableAdForm = function () {
    for (var i = 0; i < fieldsetsAdForm.length; i++) {
      fieldsetsAdForm[i].disabled = true;
    }
  };

  var enableAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsetsAdForm.length; i++) {
      fieldsetsAdForm[i].disabled = false;
    }
  };

  roomNumberInput.addEventListener('change', function () {
    handleRoomNumberChange();
  });

  getAddress();
  handleRoomNumberChange();
  disableAdForm();

  window.form = {
    enable: enableAdForm,
  };
})();
