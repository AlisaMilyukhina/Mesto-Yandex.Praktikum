import { Card } from './Card.js';
import FormValidator from './FormValidator.js';

//массив изначальных карточек
const initialCards = [
  {
      name: "Архыз",
      link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
      name: "Челябинская область",
      link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
      name: "Иваново",
      link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
      name: "Камчатка",
      link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
      name: "Холмогорский район",
      link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
      name: "Байкал",
      link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsGrid = document.querySelector(".cards-grid"); //сетка в общей области видимости

// основа попапов
const popup = document.querySelector(".popup");

//попап редактирования профиля
const profilePopup = document.querySelector(".popup_edit-profile");
const profilePopupOpenButton = document.querySelector(".profile__edit-btn");
const popupCloseButton = popup.querySelector(".popup__close-icon");
const submitButton = document.querySelector(".popup__btn_save");

// инпуты имени и био
const nameInput = document.querySelector(".popup__input_name");
const bioInput = document.querySelector(".popup__input_bio");

// имя и био пользователя
const userName = document.querySelector(".profile__name");
const userBio = document.querySelector(".profile__bio");

// инпуты названия места и ссылки
const popupAddNewInputTitle = document.querySelector(".popup__input_title");
const popupAddNewInputImgUrl = document.querySelector(".popup__input_url");

// попап создания новых карточек
const addNewPopup = document.querySelector(".popup_add-new-item");
const addNewItemButton = document.querySelector(".profile__add-btn");
const addNewCloseButton = addNewPopup.querySelector(".popup__close-icon_add-new");
const saveNewItemButton = document.querySelector(".popup__btn_create");

//лайтбокс

export const closeLightboxBtn = document.querySelector(".popup__close-icon_lightbox");
//const lightboxTitle = document.querySelector(".popup__caption");
//const lightboxImage = document.querySelector(".popup__image");
export  const lightbox = document.querySelector(".popup_lightbox");

//открываем попапы
export  function openPopups(param){
  document.addEventListener('keydown', closePopupOnEsc);
  param.addEventListener('click', closePopupOnOverlay);
  param.classList.add('popup_opened');
};

//закрываем попапы этими функциями, навешиваем и убираем слушатели событий закрытия по Esc и оверлею 

function closePopupOnEsc(evt){
  const activePopup = document.querySelector('.popup_opened');
  if(evt.key === "Escape"){
    closePopups(activePopup);
  }
}

function closePopupOnOverlay(evt){
  evt.target.classList.remove('popup_opened')
}

//экспортирую эту функцию, чтобы в классе Card можно было закрывать попап лайтбокса
export function closePopups(param){
  document.removeEventListener('keydown', closePopupOnEsc);
    param.removeEventListener('click', closePopupOnOverlay);
    param.classList.remove('popup_opened');
    new FormValidator(param).hideErrors();
  }

// слушатели этих функций:
// открываем и закрываем попап редактирования профиля
profilePopupOpenButton.addEventListener('click', () => {
  openPopups(profilePopup);
  addProfilePopupValue(profilePopup);
});
popupCloseButton.addEventListener('click', function(){
  closePopups(profilePopup)
});

// открываем и закрываем попап добавления новых карточек с пустыми полями
addNewCloseButton.addEventListener('click', function(){
  closePopups(addNewPopup);
});
addNewItemButton.addEventListener('click', () => {
  openPopups(addNewPopup);
  addNewCardValue();
});

// открытие попапа редактирования профиля с актуальными данными
function addProfilePopupValue(){
  if(profilePopup.classList.contains('popup_opened')){
    nameInput.value = userName.textContent;
    bioInput.value = userBio.textContent;
  }
}
addProfilePopupValue(profilePopup);


// отправка, отмена стандартного поведения
function formSubmitHandler(event) {
event.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = bioInput.value;
  closePopups(profilePopup);
};

profilePopup.addEventListener("submit", formSubmitHandler);

//пустой попап
function addNewCardValue (){
    popupAddNewInputTitle.value = null;
    popupAddNewInputImgUrl.value = null;
    saveNewItemButton.classList.add('popup__btn_disabled');
    saveNewItemButton.setAttribute('disabled', 'disabled');
};

//из массива создаю существующие карточки с помощью нового метода createCard()
initialCards.forEach((Element) => {
  const card = new Card(Element, '.cards-grid__element');
  cardsGrid.appendChild(card.createCard());
})

//новые карточки 

const cardForm = document.querySelector(".popup__form_add-new-item"); //форма создания нового места

const handleFormSumbit = (event) => { 
event.preventDefault(); // отправка формы заблокирована

const currentForm = event.target; // получаю форму

const data = {};
data.link = currentForm.querySelector('[name="URL"]').value;  // забираю из нее поле с ссылкой
data.name = currentForm.querySelector('[name="Title"]').value;//  и с названием
const card = new Card(data, '.cards-grid__element'); //экземпляр
cardsGrid.prepend(card.createCard(), cardsGrid.firstChild); //создаю карточку методом из класса Card
closePopups(addNewPopup); // закрываю попап при создании карточки
};

cardForm.addEventListener('submit', handleFormSumbit); // вешаю на отправку формы свою функцию


const formValidationSettings = {
  inputSelector: '.popup__input',
  errorVisible: 'popup__error_visible',
  submitButtonSelector: '.popup__btn',
  disabledButton: 'popup__btn_disabled',
  inputsErrorClass: 'popup__input_type_error',
  errorBorder: 'popup__input_invalid'
}

const formArray = Array.from(document.querySelectorAll('.popup__form'));

formArray.forEach((formElement) => {
  new FormValidator(formValidationSettings, formElement).enableValidation();
});