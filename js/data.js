'use strict';
// (function () {
  // Константы
  // var MIN_PRICE = 1000;
  // var MAX_PRICE = 1000000;
  // var MIN_ROOMS = 1;
  // var MAX_ROOMS = 5;
  // var MIN_GUEST = 1;
  // var MAX_GUEST = 5;
  // var MIN_X_LOCATION = 300;
  // var MAX_X_LOCATION = 900;
  // var MIN_Y_LOCATION = 130;
  // var MAX_Y_LOCATION = 630;

  // // Переменные
  // var titles = [
  //   'Большая уютная квартира',
  //   'Маленькая неуютная квартира',
  //   'Огромный прекрасный дворец',
  //   'Маленький ужасный дворец',
  //   'Красивый гостевой домик',
  //   'Некрасивый негостеприимный домик',
  //   'Уютное бунгало далеко от моря',
  //   'Неуютное бунгало по колено в воде'
  // ];
  // var types = [
  //   'palace',
  //   'flat',
  //   'house',
  //   'bungalo'
  // ];
  // var checkpoints = [
  //   '12:00',
  //   '13:00',
  //   '14:00'
  // ];
  // var features = [
  //   'wifi',
  //   'dishwasher',
  //   'parking',
  //   'washer',
  //   'elevator',
  //   'conditioner'
  // ];
  // var photos = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  // ];

  // // Возвращает случайное число от - до (не включая max)
  // function getRandomNumber(min, max) {

  //   return Math.floor(Math.random() * (max + 1 - min) + min);

  // }

  // // Возвращает Случайное число из массива
  // function getRandomArrayNumber(array) {

  //   return array[getRandomNumber(0, array.length - 1)];

  // }

  // // Возвращает массив с случайной длиной
  // function getRandomLengthArr(array) {
  //   var randomLength = getRandomNumber(0, array.length - 1);
  //   return array.slice(randomLength);
  // }

  // // Создает массив объявлений с рандом значениями
  // function createOffers() {
  //   var offerList = [];

  //   for (var i = 0; i < window.data.OBJECT_COUNT; i++) {
  //     var autor = {
  //       avatar: 'img/avatars/user0' + (i + 1) + '.png'
  //     };

  //     var offer = {
  //       title: getRandomArrayNumber(titles),
  //       address: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION),
  //       price: getRandomNumber(MIN_PRICE, MAX_PRICE),
  //       type: getRandomArrayNumber(types),
  //       rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
  //       guests: getRandomNumber(MIN_GUEST, MAX_GUEST),
  //       checkpoint: getRandomArrayNumber(checkpoints),
  //       features: getRandomLengthArr(features),
  //       description: '',
  //       photos: getRandomArrayNumber(photos)
  //     };

  //     var location = {
  //       x: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION),
  //       y: getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION)
  //     };

  //     var groupObject = {};
  //     groupObject.autor = autor;
  //     groupObject.offer = offer;
  //     groupObject.location = location;

  //     offerList.push(groupObject);
  //   }

  //   return offerList;

  // }

  // window.data = {
  //   OBJECT_COUNT: 8,
    //createOffers: createOffers
//   };
// })();
