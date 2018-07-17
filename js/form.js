'use strict';

(function () {
  var fieldsetTime = document.querySelector('fieldset.ad-form__element--time');
  var adForm = document.querySelector('.ad-form');
  var selectType = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');
  var selectRooms = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var lockFieldsets = document.querySelectorAll('fieldset');
  var successPopup = document.querySelector('.success');

  // Блокирует форму
  function getDisabledForm() {

    for (var i = 0; i < lockFieldsets.length; i++) {
      lockFieldsets[i].setAttribute('disabled', '');
    }
  }

  getDisabledForm();

  // Активирует форму
  function onClickActiveForm() {
    for (var j = 0; j < lockFieldsets.length; j++) {
      lockFieldsets[j].removeAttribute('disabled');
    }

    adForm.classList.remove('ad-form--disabled');
  }

  // Активирует форму
  window.mapPinMain.addEventListener('click', onClickActiveForm);

  // Валидация поля пунктов #type
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


  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
     window.backend.upload();
  });

})();

