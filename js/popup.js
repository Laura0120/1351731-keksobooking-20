'use strict';

(function () {
  var mainElement = document.querySelector('main');

  function addEvent(element) {
    var onDocumentClick = function () {
      element.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    var onDocumentKeydown = function (evt) {
      if (evt.key === window.utils.KEY_ESC) {
        evt.preventDefault();
        element.remove();
        document.removeEventListener('click', onDocumentClick);
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  var showOnSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success ');
    var successElement = successTemplate.cloneNode(true);
    mainElement.appendChild(successElement);
    addEvent(successElement);
  };

  var showOnError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error ');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    var errorMessageElement = errorElement.querySelector('.error__message');
    errorMessageElement.textContent = 'Ошибка загрузки объявления. ' + errorMessage;
    mainElement.appendChild(errorElement);
    addEvent(errorElement);
    errorButton.addEventListener('click', function () {
      errorElement.remove();
    });
  };

  window.popup = {
    showOnError: showOnError,
    showOnSuccess: showOnSuccess,
  };
})();
