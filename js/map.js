'use strict';

(function () {
  window.mapBox = document.querySelector('.map');
  window.mapPinBox = document.querySelector('.map__pins');
  window.mapPinMain = document.querySelector('.map__pin--main');

  // Активирует карту и добавляет метки
  function activePinMain(createdData) {
    window.mapPinBox.classList.remove('map--faded');

    var pinsList = window.pin.getPinLocation(createdData);
    window.mapPinBox.appendChild(pinsList);
  }

  window.map = {
    activePinMain: activePinMain,
  };

})();
