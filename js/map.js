'use strict';

(function () {
  window.mapBox = document.querySelector('.map');
  window.mapPinBox = document.querySelector('.map__pins');
  window.mapPinMain = document.querySelector('.map__pin--main');


  // // вызов рандом объекты
  // var offerList = window.data.createOffers(window.data.OBJECT_COUNT);

  // Активирует карту и добавляет метки
  function activePinMain(createdData) {
    mapBox.classList.remove('map--faded');

    var pinsList = window.pin.getPinLocation(createdData);
    window.mapPinBox.appendChild(pinsList);
  }

  // function onClickActiveMap() {
  //   window.mapPinMain.addEventListener('click', activePinMain);
  // }
  // onClickActiveMap();

  window.map = {
    activePinMain: activePinMain,
    //offerList: offerList,
  };

})();
