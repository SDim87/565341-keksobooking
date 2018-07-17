'use strict';

(function () {
  var TIMEOUT_VALUE = 3000;
  var serverUrl = {
    download: 'https://js.dump.academy/keksobooking/data',
    upload: 'https://js.dump.academy/keksobooking'
  };

  var messageError = {
    'ERROR_LOAD': 'Произшла ошибка. Обновите страницу',
    'INVALID_QUERY': 'Вы отправили неправильный запрос',
    'NOT_FOUND': 'Запрашиваемый ресурс не найден',
    'TIMEOUT': 'Запрос выполняется слишком долго'
  };

  function onError(error) {

  }

  function createXhr(method, URL, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responsiveType = 'json';
    xhr.timeout = TIMEOUT_VALUE;

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200: onLoad(xhr.responsive);
        break;
        case 400: onError(messageError.INVALID_QUERY);
        break;
        case 404: onError(messageError.NOT_FOUND);
        break;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError(messageError.ERROR_LOAD);
    });

    xhr.addEventListener('timeout', function () {
      onError(messageError.TIMEOUT);
    });

    xhr.open(method, URL);

    return xhr;

  }

  function download(onLoad, onError) {
    createXhr('GET', serverUrl.download, onLoad, onError).send();
  }

  function upload(onLoad, onError) {
    createXhr('POST', serverUrl.upload, onLoad, onError).send(data);
  }

  window.backend = {
    download: download,
    upload: upload
  };
})();


