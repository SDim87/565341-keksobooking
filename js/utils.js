'use strict';

(function () {
  var ESC_KEYCODE = 27;

  function onEscDown(evt, funс) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  }

  // Создает окно с ошибкой
  function createMessageError(messageError) {
    var messageWindow = document.createElement('div');
    messageWindow.classList.add('message-error');
    messageWindow.textContent = messageError;
    document.body.insertAdjacentElement('afterbegin', messageWindow);
  }

  window.utils = {
    onEscDown: onEscDown,
    createMessageError: createMessageError
  };
})();
