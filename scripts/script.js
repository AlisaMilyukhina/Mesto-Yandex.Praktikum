//открытие и закрытие попапов
const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.profile__edit-btn')
const popupCloseButton = popup.querySelector('.popup__close-icon')

const submitButton = document.querySelector('.popup__btn_save')
const nameInput = document.querySelector('.popup__input_name')
const bioInput = document.querySelector('.popup__input_bio')
const formElement = document.querySelector('.popup__form')

let userName = document.querySelector('.profile__name')
let userBio = document.querySelector('.profile__bio')

// создание новых карточек
const addNewPopup = document.querySelector('.popup_add-new-item')
const addNewItemButton = document.querySelector('.profile__add-btn')
const addNewCloseButton = addNewPopup.querySelector('.popup__close-icon_add-new')
const saveNewItemButton = document.querySelector('.popup__btn_create')

const titleInput = document.querySelector('.popup__input_title')
const urlInput = document.querySelector('.popup__input_url')

let cardsTitle = document.querySelector('.cards-grid__title')
let cardsUrl = document.querySelector('.cards-grid__pic')

// открытие попапа редактирования профиля

function popupToggle() { 
    if (!popup.classList.contains('popup_opened')) {
      nameInput.value = userName.textContent;
      bioInput.value = userBio.textContent;
    }
    popup.classList.toggle('popup_opened');
}

// отправка, кнопки

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userBio.textContent = bioInput.value;
    popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', popupToggle)
popupCloseButton.addEventListener('click', popupToggle)

// попап добавления новых карточек: открытие и закрытие

function addNewItemPopupToggle() {
  if (!addNewPopup.classList.contains('popup_opened')){
      titleInput.value = null;
      urlInput.value = null;
  }
  addNewPopup.classList.toggle('popup_opened')
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  cardsTitle.textContent = titleInput.value;
  cardsUrl.textContent = urlInput.value;
  addNewItemPopupToggle();
}
addNewCloseButton.addEventListener('click', addNewItemPopupToggle)
addNewItemButton.addEventListener('click', addNewItemPopupToggle)

