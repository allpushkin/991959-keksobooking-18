'use strict';

var TITLE = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_GUESTS = 0;
var MAX_GUESTS = 2;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var MIN_PRICE = 0;
var MAX_PRICE = 1000000;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 44;
var MIN_X = 320;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_AVATAR_NUMBER = 1;
var QUANTITY = 8;

//  возвращает случайное число из массива
var getRandomElement = function (elements) {
  var max = elements.length;
  var randomIndex = Math.round(Math.random() * (max - 1));
  return elements[randomIndex];
};
//  возвращает случайное число из интервала
var getRandomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
//  возвращает новый случайный массив
var getRandomArr = function (elements) {
  var newArrays = [];
  var arrMin = 1;
  var arrMAx = elements.length;
  for (var i = 0; i < getRandomIntFromInterval(arrMin, arrMAx); i++) {
    newArrays.push(elements[i]);
  }
  return newArrays;
};

var getArray = function () {
  var pins = [];

  for (var i = 0; i < QUANTITY; i++) {
    var author = {
      avatar: 'img/avatars/user0' + getRandomIntFromInterval(MIN_AVATAR_NUMBER, QUANTITY) + '.png'
    };

    var location = {
      x: getRandomIntFromInterval(MIN_X, MAX_X),
      y: getRandomIntFromInterval(MIN_Y, MAX_Y)
    };

    var offer = {
      title: getRandomElement(TITLE),
      address: location.x + ', ' + location.y,
      price: getRandomIntFromInterval(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPE),
      rooms: getRandomIntFromInterval(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntFromInterval(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: getRandomArr(FEATURES),
      description: getRandomElement(DESCRIPTION),
      photos: getRandomArr(PHOTOS)
    };

    var pin = {
      author: author,
      offer: offer,
      location: location
    };
    pins.push(pin);
  }
  return pins;
};

// переключение карты из неактивного состояния в активное
var map = document.querySelector('.map');
map.classList.remove('map--faded');

//  нашли шаблон пинов, который будем копировать
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

//  создаем пин
var renderPin = function (pin) {
  var element = similarPinTemplate.cloneNode(true);
  element.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  element.style.top = pin.location.y - PIN_HEIGHT + 'px';
  element.querySelector('img').src = pin.author.avatar;
  element.querySelector('img').alt = pin.offer.title;

  return element;
};
// Находит элемент, в который мы будем вставлять похожие объявления
var mapTop = document.querySelector('.map__pins');

var pinsArr = getArray();

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var element = renderPin(pins[i]);
    fragment.appendChild(element);
  }
  mapTop.appendChild(fragment);
};

renderPins(pinsArr);

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

//  тип жилья
var element = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

//   var key = 'house'
// element[key]
//   console.log(element[key]);

//  отрисовка модального окна с объявлением
var renderCardElement = function (cardElement, pin) {

  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = element[pin.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + 'выезд до ' + pin.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = pin.offer.features;
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  cardElement.querySelector('.popup__avatar').src = pin.author.avatar;

  return cardElement;
};

var renderPhotos = function (cardElement, pin) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pin.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = pin.offer.photos[i];
    img.width = 45;
    img.height = 40;

    fragment.appendChild(img);
  }
  cardElement.appendChild(fragment);
};
//  var mapFiltersContainer = document.querySelector('.map__filters-container');
var cardElement = cardTemplate.cloneNode(true);
mapTop.appendChild(renderCardElement(cardElement, pinsArr[0]));
mapTop.appendChild(renderPhotos(cardElement, pinsArr[0]));