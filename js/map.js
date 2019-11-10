'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var QUANTITY = 5;

  var map = document.querySelector('.map');
  // Находит элемент, в который мы будем вставлять похожие объявления
  var mapTop = document.querySelector('.map__pins');
  var renderedCard;

  var removeCard = function () {
  // Карточку берем из замыкания модуля
  // Если ее нет, то ничего не делать
    if (!renderedCard) {
      return;
    }
    // Удаляем карточку
    map.removeChild(renderedCard);
    renderedCard = null;

    // Снимаем обработчик с document
    document.removeEventListener('keyup', onDocumentKeyupPopup);
  };
  var onDocumentKeyupPopup = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
    }
  };

  // Функция создания обработчика на пин
  function createClickPinHandler(pin) {

    //  Обработка нажатия на пин
    var clickPinHandler = function () {
      // var pin = window.pin.pinsArr[index];

      removeCard();

      renderedCard = window.card.renderCardElement(pin);
      map.appendChild(renderedCard);

      var closeButton = renderedCard.querySelector('.popup__close');

      // по клику на крестик
      closeButton.addEventListener('click', function () {
        removeCard();
      });
      document.addEventListener('keyup', onDocumentKeyupPopup);
    };
    return clickPinHandler;
  }

  var renderPins = function (pins) {
    // записываем весь массив в переменную чтоб можно было рисовать и удалять карточки
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QUANTITY; i++) {
      var pin = pins[i];
      var element = document.createElement('div');
      element.classList.add('pin');
      var pinClickHandler = createClickPinHandler(pin);
      element.addEventListener('click', pinClickHandler);
      var renderedPin = window.pin.renderPin(pin);
      element.appendChild(renderedPin);
      fragment.appendChild(element);
    }
    mapTop.appendChild(fragment);

  };

  window.map = {
    element: map,
    mapTop: mapTop,
    renderPins: renderPins
  };
})();
