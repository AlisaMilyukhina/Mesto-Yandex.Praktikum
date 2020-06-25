//открытие и закрытие попапа
const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.profile__edit-btn')
const popupCloseButton = popup.querySelector('.popup__close-icon')

const submitButton = document.querySelector('.popup__btn')
const nameInput = document.querySelector('.popup__input_name')
const bioInput = document.querySelector('.popup__input_bio')
const formElement = document.querySelector('.popup__form')

let userName = document.querySelector('.profile__name')
let userBio = document.querySelector('.profile__bio')

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