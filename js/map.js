'use strict';

// Константы
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
  var groupObject = [];

  for (var i = 0; i < objectCount; i++) {
    var autor = {};
    autor.avatars = 'img/avatars/user0' + (i + 1) + '.png';
    var offer = {};
    offer.title = getRandomArrayNumber(title);
    offer.address = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);
    offer.price = getRandomNumber(MIN_PRICE, MAX_PRICE);
    offer.type = getRandomArrayNumber(type);
    offer.rooms = getRandomNumber(MIN_ROOMS, MAX_ROOMS);
    offer.guests = getRandomNumber(MIN_GUEST, MAX_GUEST);
    offer.checkpoint = getRandomArrayNumber(checkpoint);
    offer.features = getRandomArrayNumber(features);
    offer.description = '';
    offer.photos = getRandomArrayNumber(photos);
    var location = {};
    location.locationX = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION);
    location.locationY = getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);

    groupObject.push(autor, offer, location);
    offerList.push(groupObject);
  }

  return offerList;

};

console.log(createOffers(8));

// Удаляет класс .map--faded
function renderMap() {
  document.querySelector('map').classList.remove('map--faded');
};
