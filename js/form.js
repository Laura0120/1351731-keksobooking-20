'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var roomNumber = adForm.querySelector('#room_number');
  var numberOfGuests = adForm.querySelector('#capacity');

  var getAddress = function () {
    var addressInput = adForm.querySelector('#address');
    addressInput.value =
      Math.round(window.map.mark.offsetLeft + window.pin.PIN_WIDTH / 2) +
      ', ' +
      Math.round(window.map.mark.offsetTop + window.pin.PIN_HEIGHT);
    addressInput.disabled = true;
  };

  getAddress();

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

  window.form = {
    adForm: adForm,
    cancelDisabled: cancelDisabled,
  };
})();
