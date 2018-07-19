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
    xhr.responsiveType = 'json';
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

    xhr.open('GET', serverUrl.download);

    return xhr;

  }
  //console.log(method);
  console.log(URL)
  // Загружает с сервера
  function download(onLoad, onError) {
    createXhr(method, URL, onLoad, onError).send();
  }

  // Отпарвляет на сервер
  function upload(onLoad, onError, data) {
    createXhr(method, URL, onLoad, onError).send(data);
  }

  window.backend = {
    download: download,
    upload: upload
  };
})();
