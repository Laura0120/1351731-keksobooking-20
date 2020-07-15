'use strict';
(function () {
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE = {
    Ok: 200,
  };

  var setupCallbacks = function (xhr, onError, onSuccess) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE.Ok) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    setupCallbacks(xhr, onError, onLoad);
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT_IN_MS;
    setupCallbacks(xhr, onError, onLoad);
    xhr.open('POST', URL_POST);

    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
