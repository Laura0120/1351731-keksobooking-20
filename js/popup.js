'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error ');
  var errorElement = errorTemplate.cloneNode(true);
  var errorButton = errorElement.querySelector('.error__button');
  var errorMessageElement = errorElement.querySelector('.error__message');
  var successTemplate = document.querySelector('#success').content.querySelector('.success ');
  var successElement = successTemplate.cloneNode(true);

  var currentPopup;

  var hide = function () {
    currentPopup.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var showOnSuccess = function () {
    currentPopup = successElement;
    mainElement.appendChild(successElement);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var showOnError = function (errorMessage) {
    currentPopup = errorElement;
    errorMessageElement.textContent = 'Ошибка загрузки объявления. ' + errorMessage;
    mainElement.appendChild(errorElement);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var onDocumentClick = function () {
    hide();
  };

  var onDocumentKeydown = function (evt) {
    if (evt.key === window.utils.KEY_ESC) {
      evt.preventDefault();
      hide();
    }
  };

  errorButton.addEventListener('click', function () {
    hide();
  });

  window.popup = {
    showOnError: showOnError,
    showOnSuccess: showOnSuccess,
  };
})();
