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
var title = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var type = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var checkpoint = [
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
      title: getRandomArrayNumber(title),
      address: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION),
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayNumber(type),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUEST, MAX_GUEST),
      checkpoint: getRandomArrayNumber(checkpoint),
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

// Блокирует карту и поля ввода
var mainForm = document.querySelector('.ad-form');
var lockFildset = document.querySelectorAll('fieldset');
for (var i = 0; i < lockFildset.length; i++) {
  lockFildset[i].setAttribute('disabled', '');
}

// Заполнение поля адреса
var inputAddress = document.querySelector('input[name=address]');
inputAddress.value = (pinMainLeft + PIN_WIDTH / 2) + ', ' + (pinMainTop + PIN_HEIGHT / 2);

// Определение точки ввода PIN
// inputAddress.value = (pinMainLeft + PIN_WIDTH / 2) + ', ' + (pinMainTop + PIN_HEIGHT + PIN_HEIGHT_AFTER);

// Разблокирует карту и Возвращает метки
function onClickPinMain() {
  document.querySelector('.map').classList.remove('map--faded');

  for (var j = 0; j < lockFildset.length; j++) {
    lockFildset[j].removeAttribute('disabled');
  }

  mainForm.classList.remove('ad-form--disabled');

  // добавляет метки на карту
  var pinsList = getPinLocation(offerList);
  mapPinBox.appendChild(pinsList);
}

// Активирует карту и форму
var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('click', onClickPinMain);

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

var priceForm = document.querySelector('input[name=price]');
var typeFormOptions = document.querySelector('select[name=type]');

function onChangeTypeForm() {
  var indexSelect = typeFormOptions.value;

  switch (indexSelect) {
    case 'bungalo':
      priceForm.placeholder = 0;
      priceForm.min = 0;
      break;
    case 'flat':
      priceForm.placeholder = 1000;
      priceForm.min = 1000;
      break;
    case 'house':
      priceForm.placeholder = 5000;
      priceForm.min = 5000;
      break;
    case 'palace':
      priceForm.placeholder = 10000;
      priceForm.min = 10000;
      break;
  }
}

// Навешивает обработчик на выбор пунктов Select --> #type
typeFormOptions.addEventListener('change', onChangeTypeForm);

var fieldsetTime = document.querySelector('fieldset.ad-form__element--time');
var adForm = document.querySelector('.ad-form');
var selectType = adForm.querySelector('#type');
var inputPrice = adForm.querySelector('#price');
var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');
var selectRooms = adForm.querySelector('#room_number');
//var selectedNumRooms = Number(selectRooms.value);
var selectCapacity = adForm.querySelector('#capacity');
//var selectNumCapacity = Number(selectCapacity.value);

// Зависимость кол-ва Мест от кол-ва Комнат
function onChangeRooms() {
  var indexSelectRooms = selectRooms.selectedIndex; // индекс Комнаты
  var optionsRooms = selectRooms.querySelectorAll('option'); // массив всех Комнат
  var disabledField = {
    '0': [3],
    '1': [0],
    '2': [0, 1],
    '3': [0, 1, 2]
  }

  for (var i = 0; i < optionsRooms.length; i++) {
    if (indexSelectRooms === disabledField[i]) {

      console.log('dfgdfgd');
    }
    console.log(disabledField[i]);
  }



  // if (indexRoomNumber === 0) {
  //   selectCapacity.options[2].setAttribute('selected', '');
  //   selectCapacity.options[0].disabled = true;
  //   selectCapacity.options[1].disabled = true;
  //   selectCapacity.options[2].disabled = false;
  //   selectCapacity.options[3].disabled = true;
  //   selectCapacity.options[3].removeAttribute('selected');
  // } else if (indexRoomNumber === 1) {
  //   selectCapacity.options[0].disabled = true;
  //   selectCapacity.options[1].disabled = false;
  //   selectCapacity.options[2].disabled = false;
  //   selectCapacity.options[3].disabled = true;
  // } else if (indexRoomNumber === 2) {
  //   selectCapacity.options[0].disabled = false;
  //   selectCapacity.options[1].disabled = false;
  //   selectCapacity.options[2].disabled = false;
  //   selectCapacity.options[3].disabled = true;
  // } else if (indexRoomNumber === 3) {
  //   selectCapacity.options[0].disabled = true;
  //   selectCapacity.options[1].disabled = true;
  //   selectCapacity.options[2].disabled = true;
  //   selectCapacity.options[2].removeAttribute('selected');
  //   selectCapacity.options[3].disabled = false;
  //   selectCapacity.options[3].setAttribute('selected', '');
  // }
}

selectRooms.addEventListener('change', onChangeRooms);

// Создается зависимость Select-ов Вода заезда и Выезда
fieldsetTime.addEventListener('change', function onChangeTime(event) {
  if (selectTimeOut === event.target) {
    selectTimeIn.value = event.target.value
  } else if (selectTimeIn === event.target) {
    selectTimeOut.value = event.target.value
  }
});



// 2й способ
function onChangeSelectCapacity() {
  var message = '';
  selectCapacity.setCustomValidity('');

  switch (selectedNumRooms) {
    case 1:
      if (selectNumCapacity !== 1) {
        message = 'Можно выбрать - 1 гостя';
      }
    break;
    case 2:
      if (selectNumCapacity !== 1 && selectNumCapacity !== 2) {
        message = 'Можно выбрать - 1 или 2 гостей';
      }
    break;
    case 3:
      if (selectNumCapacity !== 1 && selectNumCapacity !== 2 && selectNumCapacity !== 3) {
        message = 'Можно выбрать - 1, 2 или 3 гостей';
      }
    break;
    case 100:
      if (selectNumCapacity !== 0) {
        message = 'Можно выбрать - не для гостей';
      }
    break;
  }
  selectCapacity.setCustomValidity(message);
}

selectCapacity.addEventListener('change', onChangeSelectCapacity);
