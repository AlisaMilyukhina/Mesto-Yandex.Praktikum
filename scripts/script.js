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
const formElement = document.querySelector(".popup__form");

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

cardsGridAppear(cardElement);
cardsGrid.prepend(cardElement);
}

//показываем карточки на сайте
function appear(cards) {
  cards.forEach((cards) => {
    cardsOnSite(cards);
  });
}
  
appear(initialCards);
  

//открываем и закрываем оба попапа этой функцией
function togglePopups(param){
  if(!param.classList.contains('popup_opened'));
  param.classList.toggle('popup_opened');
}

// слушатели этой функции:
// открываем попап редактирования профиля
profilePopupOpenButton.addEventListener('click', function(){togglePopups(profilePopup)});
popupCloseButton.addEventListener('click', function(){togglePopups(profilePopup)});
// открываем попап добавления новых карточек с пустыми полями
addNewCloseButton.addEventListener('click', function(){togglePopups(addNewPopup)});
addNewItemButton.addEventListener('click', function(){togglePopups(addNewPopup);
  popupAddNewInputTitle.value = null;
  popupAddNewInputImgUrl.value = null;});

// добавляем возможность закрыть любое окно нажав на esc

function closePopupOnEsc(popup){
  document.addEventListener('keydown', function(evt){
    if(evt.key === "Escape"){
        popup.classList.remove('popup_opened');
      }
  });
};

closePopupOnEsc(profilePopup);
closePopupOnEsc(addNewPopup);
closePopupOnEsc(lightbox);

// можно закрыть попап кликнув по оверлею
function closePopupOnOverlay(popup){
  popup.addEventListener('click', function(evt){
    evt.target.classList.remove('popup_opened');
  });
}

closePopupOnOverlay(profilePopup);
closePopupOnOverlay(addNewPopup);
closePopupOnOverlay(lightbox);


// передаем данные картинок и описаний в лайтбокс
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

// открываем его с нужной картинкой
function handleLightbox(initialCards){
image.src = initialCards.link;
caption.textContent = initialCards.name;
togglePopups(lightbox);
};

// закрываем лайтбокс 
function closeLightbox(evt){
lightbox.classList.remove('popup_opened');
};
closeLightboxBtn.addEventListener("click", closeLightbox);

// открытие попапа редактирования профиля с актуальными данными
function profilePopupValue(){
  nameInput.value = userName.textContent;
  bioInput.value = userBio.textContent;
}

// отправка, кнопки
function formSubmitHandler(event) {
event.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = bioInput.value;
  togglePopups(profilePopup);
};

function closePopup(profilePopup) {
popup.classList.remove("popup_opened");
};

formElement.addEventListener("submit", formSubmitHandler);
popupCloseButton.addEventListener("click", closePopup);

function addNewCardValue (){
    popupAddNewInputTitle.value = null;
    popupAddNewInputImgUrl.value = null;
};


//удаление карточек 

function removeCard(evt) {
const card = evt.target.closest(".cards-grid__element");
card.remove();
}

//лайк

function pressLike(evt) {
console.log(evt.target)
const likeButton = evt.target;
likeButton.classList.toggle('cards-grid__heart-btn_active');
}

function cardsGridAppear(cardElement) {
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

togglePopups(addNewPopup); // закрываю попап при создании карточки
};

form.addEventListener("submit", handleFormSumbit, false); // вешаю на отправку формы свою функцию


console.log(form.validity);