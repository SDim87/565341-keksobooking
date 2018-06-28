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
function getRandomNumber (min, max) {

  return Math.floor(Math.random() * (max + 1 - min) + min);

};

// Возвращает Случайное число из массива
function getRandomArrayNumber (array) {

  return array[getRandomNumber(0, array.length - 1)];

};

// Создает массив объявлений с рандом значениями
function createOffers (objectCount) {
  var offerList = [];

  for (var i = 0; i < OBJECT_COUNT; i++) {
    var autor = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    }

    var offer = {
      title: getRandomArrayNumber(title),
      address: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION),
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayNumber(type),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUEST, MAX_GUEST),
      checkpoint: getRandomArrayNumber(checkpoint),
      features: getRandomArrayNumber(features),
      description: '',
      photos: getRandomArrayNumber(photos)
    }

    var location = {
      locationX: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION),
      locationY: getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION)
    }

    var groupObject = {};
    groupObject.autor = autor;
    groupObject.offer = offer;
    groupObject.location = location;

    offerList.push(groupObject);
  }

  return offerList;

};

// Удаляет класс .map--faded
function renderMap() {
  document.querySelector('.map').classList.remove('map--faded');
};

// Создает метки на карте
function mapPinLocation (offerList) {
  var mapPinBox = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinImage = document.querySelector('template').content.querySelector('.map__pin > img');
  var points = [];

  for (var i = 0; i < OBJECT_COUNT; i++) {
    points[i] = mapPinBox.cloneNode(true);
    var mapPinX = createOffers()[i].location.locationX / 2;
    var mapPinY = createOffers()[i].location.locationY;
    points[i].style = 'left: ' + mapPinX + 'px; top: ' + mapPinY + 'px;';
    points[i].querySelector('img').src = createOffers()[i].autor.avatar;
    points[i].querySelector('img').alt = createOffers()[i].offer.title;
  }

  return points;

};

console.log(mapPinLocation());

function objEnter(points) {
  for (var i = 0; i < 0; i--) {
    Things[i]
  }
  var obj = document.querySelector('.map__pins');
  mapPinLocation().appendChild(obj);
};


createOffers (OBJECT_COUNT); // рандом объекты
renderMap(); // Разблокирует карту
