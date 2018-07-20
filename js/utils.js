'use strict';

(function () {
  // var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 300;

  // function onEscDown(evt, funс) {
  //   if (evt.keyCode === ESC_KEYCODE) {
  //     func();
  //   }
  // }

  // Создает окно с ошибкой
  function createMessageError(messageError) {
    var messageWindow = document.createElement('div');
    messageWindow.classList.add('message-error');
    messageWindow.textContent = messageError;
    document.body.insertAdjacentElement('afterbegin', messageWindow);
  }

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    // onEscDown: onEscDown,
    createMessageError: createMessageError,
    debounce: debounce
  };
})();
