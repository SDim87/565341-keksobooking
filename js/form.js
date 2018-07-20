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
  function disabledForm() {
    for (var i = 0; i < lockFieldsets.length; i++) {
      lockFieldsets[i].setAttribute('disabled', '');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
  }

  disabledForm();

  // Активация формы
  function activeForm() {
    for (var j = 0; j < lockFieldsets.length; j++) {
      lockFieldsets[j].removeAttribute('disabled');
    }

    adForm.classList.remove('ad-form--disabled');
  }

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

  // Обработка отправки формы
  function onSuccessClick() {
    closeSuccessPopup();
  }

  function onSuccessEscDown(evt) {
    window.utils.onEscDown(evt, closeSuccessPopup);
  }

  function showSuccessPopup() {
    successPopup.classList.remove('hidden');
    document.addEventListener('keydown', onSuccessEscDown);
    successPopup.addEventListener('click', onSuccessClick);
  }

  function closeSuccessPopup() {
    successPopup.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessEscDown);
    successPopup.removeEventListener('click', onSuccessClick);
  }

  // Деактивация формы
  function onSubmitSuccess() {
    disabledForm();
    showSuccessPopup();
    window.pin.disablePinMain();
  }

  function onSubmitError(messageError) {
    window.utils.createMessageError(messageError);
  }

   // Навешивает обработчик на выбор пунктов Select --> #type
  selectType.addEventListener('change', onChangeTypeForm);

  // Активация карты и формы
  window.mapPinMain.addEventListener('click', function onClickActivePage(createdData) {
    window.backend.download(window.pin.onLoadSuccess, window.pin.onLoadError);
    window.map.activePinMain(createdData);
    activeForm();
  })

  // Отправляет данные на сервер
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(adForm);
    window.backend.upload(onSubmitSuccess, onSubmitError, data);
  });

  window.form = {
    activeForm: activeForm
  }

})();
