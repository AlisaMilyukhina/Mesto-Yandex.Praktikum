// массив карточек 
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


//попап редактирования профиля
const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.profile__edit-btn')
const popupCloseButton = popup.querySelector('.popup__close-icon')
const submitButton = document.querySelector('.popup__btn_save')

// инпуты имени и био
const nameInput = document.querySelector('.popup__input_name')
const bioInput = document.querySelector('.popup__input_bio')
const formElement = document.querySelector('.popup__form')

// имя и био пользователя
let userName = document.querySelector('.profile__name')
let userBio = document.querySelector('.profile__bio')

//inputs
const popupAddNewInputTitle = document.querySelector('.popup__input_title');
const popupAddNewInputImgUrl = document.querySelector('.popup__input_url');

// попап создания новых карточек
const addNewPopup = document.querySelector('.popup_add-new-item')
const addNewItemButton = document.querySelector('.profile__add-btn')
const addNewCloseButton = addNewPopup.querySelector('.popup__close-icon_add-new')
const saveNewItemButton = document.querySelector('.popup__btn_create');

//лайтбокс
const lightbox = document.querySelector('.popup_lightbox');
const closeLightboxBtn = document.querySelector('.popup__close-icon_lightbox');

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
        popupAddNewInputTitle.value = null;
        popupAddNewInputImgUrl.value = null;
    }
    addNewPopup.classList.toggle('popup_opened')
}

addNewCloseButton.addEventListener('click', addNewItemPopupToggle)
addNewItemButton.addEventListener('click', addNewItemPopupToggle)


// загружаю первоначальные карточки
//вот тут начинается главная проблема!
const cardsOnSite = function(initialCards) {
    const cardTemplate = document.querySelector('.cards-grid__template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardsGrid = document.querySelector('.cards-grid');

    cardElement.querySelector('.cards-grid__pic').src = initialCards.link;
    cardElement.querySelector('.cards-grid__pic').alt = initialCards.name;
    cardElement.querySelector('.cards-grid__title').textContent = initialCards.name;
    
    cardsGridAppear(cardElement);
    cardsGrid.prepend(cardElement);
}

function appear(cards){
    cards.forEach(cards => {
    cardsOnSite(cards)
})
};
appear(initialCards);

//lightbox

function handleLightbox(item){
    document.querySelector('.popup__image').src = item.link;
    document.querySelector('.popup__caption').textContent = item.name;

    popupToggle(lightbox);
}

closeLightboxBtn.addEventListener('click', function(){
    popupToggle(lightbox);
}); 

//удаление карточек

function removeCard(evt) {
    const card = evt.target.closest('.cards-grid__element');
    card.remove();
}

// лайк (пока не готов)
const likeButton = document.querySelector('.cards-grid__heart-btn');
var isClicked = false;

function pressLike(likeButton, isClicked) {
    if (isClicked) {
likeButton.classList = '';
isClicked = false;
    } else {
    likeButton.classList = ('.cards-grid__heart-btn_active');
    isClicked = true;
    }
}; 

function cardsGridAppear(cardElement) {
    cardElement.querySelector('.cards-grid__remove-btn').addEventListener('click', removeCard);
    cardElement.querySelector('.cards-grid__heart-btn').addEventListener('click', pressLike);

}
