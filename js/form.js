'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var roomNumberInput = adForm.querySelector('#room_number');
  var numberOfGuestsInput = adForm.querySelector('#capacity');
  var addressInput = document.querySelector('#address');

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

  setAddress(window.move.location.x, window.move.location.y);
  handleRoomNumberChange();
  disableAdForm();

  window.form = {
    enable: enableAdForm,
    setAddress: setAddress,
  };
})();
