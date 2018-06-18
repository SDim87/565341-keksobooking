'use strict';

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

var avatarQuantity = 8;


var author = {
  avatar: function () {
    for (var i = 1; i <= avatarQuantity; i++) {
      var number = 'img/avatars/user0' + i + '.png';
    }

    return number;

  }
};

// Возвращает случайное число от - до (не включая max)
var getRandomNumber = function (min, max) {

  return Math.floor(Math.random() * (max + 1 - min) + min);

};

// Возвращает Случайное число из массива
var getRandomArrayNumber = function (array) {

  return array[getRandomNumber(0, array.length - 1)];

};

var offer = {
  title: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  address: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION),
  price: getRandomNumber(MIN_PRICE, MAX_PRICE),
  type: [
    'palace',
    'flat',
    'house',
    'bungalo'
  ],
  rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
  guests: getRandomNumber(MIN_GUEST, MAX_GUEST),
  checkpoint: [
    '12:00',
    '13:00',
    '14:00'
  ],
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  description: '',
  photos: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ]
};

var location = {
  locationX: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION),
  locationY: getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION)
};

var advert = function (index) {
  autor = this.autor;
  this.author.avatar();
  offer.title = getRandomArrayNumber(title);
  offer.address;
  offer.price;
  offer.type = getRandomArrayNumber(type);
  offer.rooms;
  offer.guests;
  offer.checkpoint = getRandomArrayNumber(checkpoint);
  offer.features = getRandomArrayNumber(features);
  offer.description;
  offer.photos = getRandomArrayNumber(photos);
  location = this.location;
  this.location.locationX;
  this.location.locationY;
};
