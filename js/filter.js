'use strict';

(function () {
  window.Filter = {
    TYPE: document.querySelector('#housing-type'),
    PRICE: document.querySelector('#housing-price'),
    ROOMS: document.querySelector('#housing-rooms'),
    GUESTS: document.querySelector('#housing-guests'),
    FEATURES: document.querySelector('#housing-features')
  };

  window.pin.showFiltered = function () {

    //  Удалает объявления при смене фильтров
    var popupAdvert = document.querySelector('.popup');
    if (popupAdvert !== null) {
      popupAdvert.parentNode.removeChild(popupAdvert);
    }

    //  функция удаления пинов с карты
    var clearPins = function () {
      var pinListElement = document.querySelector('.map__pins');
      var targetPin = pinListElement.querySelector('.map__pin:not(.map__pin--main)');

      while (targetPin !== null) {
        pinListElement.removeChild(targetPin);
        targetPin = pinListElement.querySelector('.map__pin:not(.map__pin--main)');
      }
    };

    clearPins();

    // Фильтр по типу
    var filterType = function (element) {
      return (element.offer.type === window.Filter.TYPE.value || window.Filter.TYPE.value === 'any');
    };

    // Фильтр по цене
    var filterPrice = function (element) {

      switch (window.Filter.PRICE.value) {

        case 'low':
          return element.offer.price < 10000;

        case 'middle':
          return element.offer.price > 10000 && element.offer.price < 50000;

        case 'high':
          return element.offer.price > 50000;

        default:
          return true;
      }
    };

    // Фильтр по комнатам
    var filterRooms = function (element) {
      return (element.offer.rooms.toString()) === window.Filter.ROOMS.value || (window.Filter.ROOMS.value === 'any');
    };

    // Фильтр по гостям
    var filterGuests = function (element) {
      return (element.offer.guests.toString()) === window.Filter.GUESTS.value || (window.Filter.GUESTS.value === 'any');
    };

    //  Фильтр по features
    var filterFeatures = function (element) {
      var checkedElements = window.Filter.FEATURES.querySelectorAll('input[type=checkbox]:checked');
      for (var i = 0; i < checkedElements.length; i++) {
        if (checkedElements[i].checked && element.offer.features.indexOf(checkedElements[i].value) === -1) {
          return false;
        }
      }

      return true;
    };

    var realDataCopy = window.map.realData.slice();
    window.updatedData = realDataCopy
    .filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterFeatures).splice(0, window.map.NUMBER_OF_SPLICED_ELEMENTS);
    window.pin.createPins(window.updatedData);

  };
})();
