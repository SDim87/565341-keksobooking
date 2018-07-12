'use strict';

(function () {
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

  // Закрытие popup по click
  function onClickPopupClose() {
    var cardMap = document.querySelector('.map__card.popup');
    if (cardMap) {
      window.mapPinBox.removeChild(cardMap);
    }
  }

  // Закрытие popup по ESC
  function onClickPopupCloseEsc(evt) {
    var cardMap = document.querySelector('.map__card.popup');
    if (cardMap && evt.keyCode === 27) {
      window.mapPinBox.removeChild(cardMap);
      document.removeEventListener('keydown', onClickPopupCloseEsc);
    }
  }

  window.card = {
    createCard: createCard,
    onClickPopupClose: onClickPopupClose,
    onClickPopupCloseEsc: onClickPopupCloseEsc
  };

})();
