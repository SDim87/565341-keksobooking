'use strict';

(function () {
  // Пока так, по Slint нужно заменить все
  window.mapPinBox = document.querySelector('.map__pins');
  window.mapPinMain = document.querySelector('.map__pin--main');

  // вызов рандом объекты
  var offerList = window.data.createOffers(window.data.OBJECT_COUNT);

  // Активирует карту и добавляет метки
  function onClickPinMain() {
    document.querySelector('.map').classList.remove('map--faded');

    var pinsList = window.pin.getPinLocation(window.map.offerList);
    window.mapPinBox.appendChild(pinsList);
  }

  // Активирует карту
  window.mapPinMain.addEventListener('click', onClickPinMain);

  // Активирует форму
  window.mapPinMain.addEventListener('click', window.onClickActiveForm);

  window.map = {
    onClickPinMain: onClickPinMain,
    offerList: offerList
  };

})();
