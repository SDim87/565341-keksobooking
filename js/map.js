'use strict';
// Константы
var OBJECT_COUNT = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUEST = 1;
var MAX_GUEST = 7;
var MIN_X_LOCATION = 300;
var MAX_X_LOCATION = 900;
var MIN_Y_LOCATION = 130;
var MAX_Y_LOCATION = 630;
var PIN_WIDTH = 62;
var PIN_HEIGHT = 62;
var PIN_HEIGHT_AFTER = 22;
var pinMainLeft = 570;
var pinMainTop = 375;

// Переменные
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var checkpoints = [
  '12:00',
  '13:00',
  '14:00'
];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Возвращает случайное число от - до (не включая max)
function getRandomNumber(min, max) {

  return Math.floor(Math.random() * (max + 1 - min) + min);

}

// Возвращает Случайное число из массива
function getRandomArrayNumber(array) {

  return array[getRandomNumber(0, array.length - 1)];

}

// Возвращает массив с случайной длиной
function getRandomLengthArr(array) {
  var randomLength = getRandomNumber(0, array.length - 1);
  return array.slice(randomLength);
}

// Создает массив объявлений с рандом значениями
function createOffers() {
  var offerList = [];

  for (var i = 0; i < OBJECT_COUNT; i++) {
    var autor = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    var offer = {
      title: getRandomArrayNumber(titles),
      address: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION),
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayNumber(types),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUEST, MAX_GUEST),
      checkpoint: getRandomArrayNumber(checkpoints),
      features: getRandomLengthArr(features),
      description: '',
      photos: getRandomArrayNumber(photos)
    };

    var location = {
      x: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION),
      y: getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION)
    };

    var groupObject = {};
    groupObject.autor = autor;
    groupObject.offer = offer;
    groupObject.location = location;

    offerList.push(groupObject);
  }

  return offerList;

}

// Определение типа жилья
function getTipes(obj) {
  var allTipes = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  return allTipes[obj];

}

// Создает метки на карте
function getPinLocation(array) {
  var fragmentPin = document.createDocumentFragment();
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  for (var i = 0; i < OBJECT_COUNT; i++) {
    var mapPinX = array[i].location.x - PIN_WIDTH / 2;
    var mapPinY = array[i].location.y - (PIN_HEIGHT + PIN_HEIGHT_AFTER);
    var pin = pinTemplate.cloneNode(true);

    pin.style = 'left: ' + mapPinX + 'px; top: ' + mapPinY + 'px;';
    pin.setAttribute('data-number', [i]);
    pin.querySelector('img').src = array[i].autor.avatar;
    pin.querySelector('img').alt = array[i].offer.title;
    fragmentPin.appendChild(pin);

    // Добавляет объявление на карту при клике
    function onClickPin(item) {
      pin.addEventListener('click', function () {
        var cardMap = createCard(offerList[item]);
        mapPinBox.appendChild(cardMap);
      });

    }
    onClickPin(i);
  }

  return fragmentPin;

}

// вызов рандом объекты
var offerList = createOffers(OBJECT_COUNT);

// Создает блок объявления
function createCard(element) {
  var popupTemplate = document.querySelector('template').content.querySelector('.popup');
  var popupItem = popupTemplate.cloneNode(true);

  popupItem.querySelector('.popup__avatar').src = element.autor.avatar;
  popupItem.querySelector('.popup__title').textContent = element.offer.title;
  popupItem.querySelector('.popup__text--address').textContent = element.offer.address;
  popupItem.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  popupItem.querySelector('.popup__type').textContent = getTipes(element.offer.type);
  popupItem.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  popupItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkpoint + ', выезд до ' + element.offer.checkpoint;

  // Добавление features
  var featuresTemlate = popupItem.querySelector('.popup__features');

  // очистка содержимого
  featuresTemlate.innerHTML = '';

  var featuresFragment = document.createDocumentFragment();

  for (var i = 0; i < element.offer.features.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + element.offer.features[i]);
    featuresFragment.appendChild(featureElement);
  }

  featuresTemlate.appendChild(featuresFragment);

  popupItem.querySelector('.popup__description').textContent = element.offer.description;
  popupItem.querySelector('.popup__photos > img').src = element.offer.photos;

  popupItem.querySelector('.popup__close').addEventListener('click', onClickPopupClose);
  document.addEventListener('keydown', onClickPopupCloseEsc);
  return popupItem;

}

var mapPinBox = document.querySelector('.map__pins');

// Блокирует поля ввода
var mainForm = document.querySelector('.ad-form');
var lockFieldsets = document.querySelectorAll('fieldset');
for (var i = 0; i < lockFieldsets.length; i++) {
  lockFieldsets[i].setAttribute('disabled', '');
}

var mapPinMainStart = {
  x: 601,
  y: 406
};

// Заполнение поля адреса
var mapPinMain = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');

mapPinMain.style.top = (pinMainTop + PIN_WIDTH / 2) + 'px';
mapPinMain.style.left = (pinMainLeft + PIN_HEIGHT / 2) + 'px';

inputAddress.value = (mapPinMainStart.x) + ', ' + (mapPinMainStart.y);

// Разблокирует карту и Возвращает метки
function onClickPinMain() {
  document.querySelector('.map').classList.remove('map--faded');

  for (var j = 0; j < lockFieldsets.length; j++) {
    lockFieldsets[j].removeAttribute('disabled');
  }

  mainForm.classList.remove('ad-form--disabled');

  // добавляет метки на карту
  var pinsList = getPinLocation(offerList);
  mapPinBox.appendChild(pinsList);
}

// Активирует карту и форму
mapPinMain.addEventListener('click', onClickPinMain);

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

// Перетаскивание mapPinMain
mapPinMain.addEventListener('mousedown', function onMouseDownPinMain(evt) {
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
      top: mapLimit.y.min - mapPinMain.offsetHeight - PIN_HEIGHT_AFTER,
      bottom: mapLimit.y.max - mapPinMain.offsetHeight - PIN_HEIGHT_AFTER,
      left: mapLimit.x.min,
      right: mapLimit.x.max - mapPinMain.offsetWidth
    };

    var mapPinMainPosition = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y
    };

    if (mapPinMainPosition.x >= border.left && mapPinMainPosition.x <= border.right) {
      mapPinMain.style.left = mapPinMainPosition.x + 'px';
    }
    if (mapPinMainPosition.y >= border.top && mapPinMainPosition.y <= border.bottom) {
      mapPinMain.style.top = mapPinMainPosition.y + 'px';
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

// Закрытие popup по click
function onClickPopupClose() {
  var cardMap = document.querySelector('.map__card.popup');
  if (cardMap) {
    mapPinBox.removeChild(cardMap);
  }
}

// Закрытие popup по ESC
function onClickPopupCloseEsc(evt) {
  var cardMap = document.querySelector('.map__card.popup');
  if (cardMap && evt.keyCode === 27) {
    mapPinBox.removeChild(cardMap);
    document.removeEventListener('keydown', onClickPopupCloseEsc);
  }
}

// =======  form.js  =======
var fieldsetTime = document.querySelector('fieldset.ad-form__element--time');
var adForm = document.querySelector('.ad-form');
var selectType = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');
var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');
var selectRooms = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');

function onChangeTypeForm() {
  var indexSelect = selectType.value;

  switch (indexSelect) {
    case 'bungalo':
      priceInput.placeholder = 0;
      priceInput.min = 0;
      break;
    case 'flat':
      priceInput.placeholder = 1000;
      priceInput.min = 1000;
      break;
    case 'house':
      priceInput.placeholder = 5000;
      priceInput.min = 5000;
      break;
    case 'palace':
      priceInput.placeholder = 10000;
      priceInput.min = 10000;
      break;
  }
}

// Навешивает обработчик на выбор пунктов Select --> #type
selectType.addEventListener('change', onChangeTypeForm);

// Зависимость кол-ва Мест от кол-ва Комнат
function onChangeRooms() {
  var selectedValue = selectRooms.value;
  var capacityOptions = capacitySelect.querySelectorAll('option'); // массив всех Комнат

  var disabledField = {
    '100': [0],
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3]
  };
  var enabledOptions = disabledField[selectedValue];

  for (var k = 0; k < capacityOptions.length; k++) {
    if (enabledOptions.indexOf(+capacityOptions[k].value) !== -1) {
      capacityOptions[k].disabled = false;
    } else {
      capacityOptions[k].disabled = true;
    }
  }
  capacitySelect.querySelectorAll(':enabled')[0].selected = true;
}
selectRooms.addEventListener('change', onChangeRooms);

// Создается зависимость Select-ов Ввода заезда и Выезда
fieldsetTime.addEventListener('change', function onChangeTime(event) {
  if (selectTimeOut === event.target) {
    selectTimeIn.value = event.target.value;
  } else if (selectTimeIn === event.target) {
    selectTimeOut.value = event.target.value;
  }
});
