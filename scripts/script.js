// массив карточек
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
const formElement = document.querySelector(".popup__form_edit-profile");

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
const lightbox = document.querySelector(".popup_lightbox");
const closeLightboxBtn = document.querySelector(".popup__close-icon_lightbox");
const lightboxTitle = document.querySelector(".popup__caption");
const lightboxImage = document.querySelector(".popup__image");


// загружаю первоначальные карточки
const cardTemplate = document.querySelector(".cards-grid__template").content;
const cardsGrid = document.querySelector(".cards-grid");

const cardsOnSite = function (initialCards) {
const cardElement = cardTemplate.cloneNode(true);
cardElement.querySelector(".cards-grid__pic").src = initialCards.link;
cardElement.querySelector(".cards-grid__pic").alt = initialCards.name;
cardElement.querySelector(".cards-grid__title").textContent = initialCards.name;

const cardImage = cardElement.querySelector('.cards-grid__pic');
cardImage.addEventListener('click', () => handleLightbox(initialCards));

showCardsGrid(cardElement);
cardsGrid.prepend(cardElement);
}

//показываем карточки на сайте
function appear(cards) {
  cards.forEach((cards) => {
    cardsOnSite(cards);
  });
}
  
appear(initialCards);
  

//открываем и закрываем попапы этими функциями (так же можно закрыть нажав на esc или оверлей)
function openPopups(param){
  document.addEventListener('keydown', closePopupOnEsc);
  param.addEventListener('click', closePopupOnOverlay);
  param.classList.add('popup_opened');
}

function closePopupOnEsc(evt){
  const activePopup = document.querySelector('.popup_opened');
  if(evt.key === "Escape"){
    closePopups(activePopup);
  }
}

function closePopupOnOverlay(evt){
  evt.target.classList.remove('popup_opened')
}

function closePopups(param){
  document.removeEventListener('keydown', closePopupOnEsc);
    param.removeEventListener('click', closePopupOnOverlay);
    param.classList.remove('popup_opened');
}


// слушатели этих функций:
// открываем и закрываем попап редактирования профиля
profilePopupOpenButton.addEventListener('click', function(){
  openPopups(profilePopup);
  addProfilePopupValue(profilePopup);
});
popupCloseButton.addEventListener('click', function(){closePopups(profilePopup)});
// открываем и закрываем попап добавления новых карточек с пустыми полями
addNewCloseButton.addEventListener('click', function(){closePopups(addNewPopup)});
addNewItemButton.addEventListener('click', function(){openPopups(addNewPopup);
  addNewCardValue();
});
// закрываем лайтбокс:
closeLightboxBtn.addEventListener('click', function(){closePopups(lightbox)});


// передаем данные картинок и описаний в лайтбокс
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

// открываем его с нужной картинкой
function handleLightbox(initialCards){
image.src = initialCards.link;
image.alt = initialCards.name;
caption.textContent = initialCards.name;
openPopups(lightbox);
};

// открытие попапа редактирования профиля с актуальными данными
function addProfilePopupValue(){
  if(profilePopup.classList.contains('popup_opened')){
    nameInput.value = userName.textContent;
    bioInput.value = userBio.textContent;
  }
}
addProfilePopupValue(profilePopup);

// отправка, кнопки
function formSubmitHandler(event) {
event.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = bioInput.value;
  closePopups(profilePopup);
};


formElement.addEventListener("submit", formSubmitHandler);

function addNewCardValue (){
    popupAddNewInputTitle.value = null;
    popupAddNewInputImgUrl.value = null;
    saveNewItemButton.classList.add('popup__btn_disabled');
    saveNewItemButton.setAttribute('disabled', 'disabled');
};


//удаление карточек 

function removeCard(evt) {
const card = evt.target.closest(".cards-grid__element");
card.remove();
}

//лайк

function pressLike(evt) {
const likeButton = evt.target;
likeButton.classList.toggle('cards-grid__heart-btn_active');
}

function showCardsGrid(cardElement) {
  cardElement.querySelector(".cards-grid__remove-btn").addEventListener('click', removeCard);
  cardElement.querySelector(".cards-grid__heart-btn").addEventListener('click', pressLike);
}

// новые карточки 

const form = document.querySelector(".popup__form_add-new-item");

const handleFormSumbit = (event) => {
event.preventDefault(); // отправка формы заблокирована

const currentForm = event.target; // получаю форму

const name = currentForm.querySelector('[name="Title"]').value; // забираю из нее поле с названием
const link = currentForm.querySelector('[name="URL"]').value; // и с ссылкой

cardsOnSite({ name, link }); // создаю карточку, передав в функцию имя и ссылку

closePopups(addNewPopup); // закрываю попап при создании карточки
};

form.addEventListener("submit", handleFormSumbit, false); // вешаю на отправку формы свою функцию
