'use strict';

var avatarImg = function () {
  for (var i = 1; i <= 8; i++) {
    var numberImg = i;
  }
  return numberImg;
};

var author = 'img/avatars/user' + avatarImg() + '.png'; //строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются

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
var checkin = [
  '12:00',
  '13:00',
  '14:00'
];
var checkout = [
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
var description = '';
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

//Возвращает случайное число от - до
var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

var PRICE = getRandomNumber(MIN_PRICE, MAX_PRICE);
var address = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);
var rooms = getRandomNumber(MIN_ROOMS, MAX_ROOMS);
var guests = getRandomNumber(MIN_GUEST, MAX_GUEST);
var location = {
  locationX: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION),
  locationY: getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION)
};
