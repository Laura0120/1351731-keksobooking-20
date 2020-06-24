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
    addressInput.setAttribute('readonly', 'readonly');
  };

  var onGetOriginalCost = function () {
    window.map.removePinElements();
    adForm.reset();
    window.userPin.MARK_ELEMENT.style.left = '570px';
    window.userPin.MARK_ELEMENT.style.top = '375px';
    disableAdForm();
    window.map.disable();
    window.popup.createSuccess();
    document.addEventListener('click', window.popup.onPopupSuccessClose);
    document.addEventListener('keydown', window.popup.onPopupSuccessEscPress);
  };

  var onErrorHandler = function () {
    window.popup.createErrorPopup();
    document.addEventListener('click', window.popup.onPopupErrorClose);
    window.popup.errorButton.addEventListener('click', window.popup.onPopupErrorClose);
    document.addEventListener('keydown', window.popup.onPopupErrorEscPress);
  };

  var onSubmitHandler = function (evt) {
    window.request.save(new FormData(adForm), onGetOriginalCost, onErrorHandler);
    evt.preventDefault();
  };

  roomNumberInput.addEventListener('change', function () {
    handleRoomNumberChange();
  });

  adForm.addEventListener('submit', onSubmitHandler);

  handleRoomNumberChange();
  disableAdForm();

  window.form = {
    enable: enableAdForm,
    setAddress: setAddress,
  };
})();
