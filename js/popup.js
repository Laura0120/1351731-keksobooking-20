'use strict';

(function () {
  var mainElenent = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success ');
  var successElement = successTemplate.cloneNode(true);
  var errorTemplate = document.querySelector('#error').content.querySelector('.error ');
  var errorElement = errorTemplate.cloneNode(true);
  var errorButton = errorElement.querySelector('.error__button');

  var createSuccess = function () {
    mainElenent.appendChild(successElement);
  };

  var onPopupSuccessEscPress = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      evt.preventDefault();
      successElement.remove();
      document.removeEventListener('click', onPopupSuccessClose);
    }
  };

  var onPopupSuccessClose = function () {
    successElement.remove();
    document.removeEventListener('click', onPopupSuccessClose);
    document.removeEventListener('keydown', onPopupSuccessEscPress);
  };

  var createErrorPopup = function () {
    mainElenent.appendChild(errorElement);
  };

  var onPopupErrorEscPress = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      evt.preventDefault();
      errorElement.remove();
      document.removeEventListener('click', onPopupErrorClose);
      errorButton.removeEventListener('click', onPopupErrorClose);
    }
  };

  var onPopupErrorClose = function () {
    errorElement.remove();
    document.removeEventListener('click', onPopupErrorClose);
    errorButton.removeEventListener('click', onPopupErrorClose);
    document.removeEventListener('keydown', onPopupErrorEscPress);
  };

  window.popup = {
    errorButton: errorButton,
    createSuccess: createSuccess,
    onPopupSuccessClose: onPopupSuccessClose,
    onPopupSuccessEscPress: onPopupSuccessEscPress,
    createErrorPopup: createErrorPopup,
    onPopupErrorClose: onPopupErrorClose,
    onPopupErrorEscPress: onPopupErrorEscPress,
  };
})();
