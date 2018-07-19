'use strict';

(function () {
  var TIMEOUT_VALUE = 3000;
  var serverUrl = {
    download: 'https://js.dump.academy/keksobooking/data',
    upload: 'https://js.dump.academy/keksobooking'
  };

  var messageError = {
    'ERROR_LOAD': 'Произшла ошибка соединения',
    'TIMEOUT': 'Запрос выполняется слишком долго'
  };

  function createXhr(method, URL, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_VALUE;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
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

  // Запрос на сервер
  function download(onLoad, onError) {
    createXhr('GET', serverUrl.download, onLoad, onError).send();
  }

  // Отпарвляет на сервер
  function upload(onLoad, onError, data) {
    createXhr('POST', serverUrl.upload, onLoad, onError).send(data);
  }

  window.backend = {
    download: download,
    upload: upload
  };
})();
