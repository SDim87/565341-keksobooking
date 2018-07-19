'use strict';

(function () {
  var ESC_KEYCODE = 27;

  function onEscDown(evt, funс) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  }

  window.utils = {
    onEscDown: onEscDown
  };
})();
