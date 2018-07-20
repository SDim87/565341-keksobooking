'use strict';

(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_HEIGHT_AFTER = 22;
  var pinMainLeft = 570;
  var pinMainTop = 375;
  var inputAddress = document.querySelector('#address');

  // Создает метки на карте
  function getPinLocation(array) {
    var fragmentPin = document.createDocumentFragment();
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

    for (var i = 0; i < array.length; i++) {
      var mapPinX = array[i].location.x - PIN_WIDTH / 2;
      var mapPinY = array[i].location.y - (PIN_HEIGHT + PIN_HEIGHT_AFTER);
      var pin = pinTemplate.cloneNode(true);

      pin.style = 'left: ' + mapPinX + 'px; top: ' + mapPinY + 'px;';
      pin.setAttribute('data-number', [i]);
      pin.querySelector('img').src = array[i].author.avatar;
      pin.querySelector('img').alt = array[i].offer.title;
      fragmentPin.appendChild(pin);

      // Добавляет объявление на карту при клике
      function onClickPin(item) {
        pin.addEventListener('click', function () {
          var OpenCard = document.querySelector('.map__card');
          if (OpenCard) {
            OpenCard.remove();
          }
          var cardMap = window.card.createCard(array[item]);
          window.mapPinBox.appendChild(cardMap);
        });

      }
      onClickPin(i);
    }

    return fragmentPin;

  }

  function onLoadSuccess(data) {
    window.map.activePinMain(data.slice());
  }

  function onLoadError() {
    window.utils.createMessageError();
  }

  // Размеры активного окна карты
  var mapLimit = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  // Перетаскивание window.mapPinMain
  window.mapPinMain.addEventListener('mousedown', function onMouseDownPinMain(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMovePinMain(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var border = {
        top: mapLimit.y.min - window.mapPinMain.offsetHeight - PIN_HEIGHT_AFTER,
        bottom: mapLimit.y.max - window.mapPinMain.offsetHeight - PIN_HEIGHT_AFTER,
        left: mapLimit.x.min,
        right: mapLimit.x.max - window.mapPinMain.offsetWidth
      };

      var mapPinMainPosition = {
        x: window.mapPinMain.offsetLeft - shift.x,
        y: window.mapPinMain.offsetTop - shift.y
      };

      if (mapPinMainPosition.x >= border.left && mapPinMainPosition.x <= border.right) {
        window.mapPinMain.style.left = mapPinMainPosition.x + 'px';
      }
      if (mapPinMainPosition.y >= border.top && mapPinMainPosition.y <= border.bottom) {
        window.mapPinMain.style.top = mapPinMainPosition.y + 'px';
      }

      // Вывод адреса в поле
      inputAddress.value = Math.round(mapPinMainPosition.x) + ', ' + Math.round(mapPinMainPosition.y);
    }

    function onMouseUpPinMain(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMovePinMain);
      document.removeEventListener('mouseup', onMouseUpPinMain);
    }

    document.addEventListener('mousemove', onMouseMovePinMain);
    document.addEventListener('mouseup', onMouseUpPinMain);
  });


  // Заполнение поля адреса
  function getAddressValue() {
    // Начальные координаты pinMain
    var mapPinMainStart = {
      x: 601,
      y: 406
    };
    window.mapPinMain.style.top = (pinMainTop + PIN_WIDTH / 2) + 'px';
    window.mapPinMain.style.left = (pinMainLeft + PIN_HEIGHT / 2) + 'px';

    inputAddress.value = (mapPinMainStart.x) + ', ' + (mapPinMainStart.y);
  }

  getAddressValue();

  // Удаляет метки с карты
  function removePins() {
    var mapPinsAll = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsAll.forEach(function (item) {
      item.remove();
    });
  }
  // Удаление карты объявления
  function removeCardMap() {
    if (window.cardMap) {
      window.cardMap.remove();
    }
  }

  // Очистка карты
  function disablePinMain() {
    window.mapBox.classList.add('map--faded');
    removePins();
    removeCardMap();
    getAddressValue();
  }

  window.pin = {
    getPinLocation: getPinLocation,
    removePins: removePins,
    disablePinMain: disablePinMain,
    onLoadSuccess: onLoadSuccess,
    onLoadError: onLoadError
  };
})();
