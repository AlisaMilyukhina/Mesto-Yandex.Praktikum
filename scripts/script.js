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

//попап редактирования профиля
const popup = document.querySelector(".popup");
const profilePopup = document.querySelector(".popup__edit-profile");
const profilePopupOpenButton = document.querySelector(".profile__edit-btn");
const popupCloseButton = popup.querySelector(".popup__close-icon");
const submitButton = document.querySelector(".popup__btn_save");

// инпуты имени и био
const nameInput = document.querySelector(".popup__input_name");
const bioInput = document.querySelector(".popup__input_bio");
const formElement = document.querySelector(".popup__form");

// имя и био пользователя
let userName = document.querySelector(".profile__name");
let userBio = document.querySelector(".profile__bio");

//inputs
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
const cardsOnSite = function (initialCards) {
  const cardTemplate = document.querySelector(".cards-grid__template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardsGrid = document.querySelector(".cards-grid");
  cardElement.querySelector(".cards-grid__pic").src = initialCards.link;
  cardElement.querySelector(".cards-grid__pic").alt = initialCards.name;
  cardElement.querySelector(".cards-grid__title").textContent = initialCards.name;

  const cardImage = cardElement.querySelector('.cards-grid__pic');
  cardImage.addEventListener('click', () => handleLightbox(initialCards));

  cardsGridAppear(cardElement);
  cardsGrid.prepend(cardElement);

// открываем лайтбокс

function toggleLightbox(lightbox){
  if(!lightbox.classList.contains('popup_opened'));
  lightbox.classList.toggle('popup_opened');
}
// передаем данные картинок и описаний в попап

function handleLightbox(){
    const image = document.querySelector('.popup__image');
    const caption = document.querySelector('.popup__caption');
    image.src = initialCards.link;
    caption.textContent = initialCards.name;
    toggleLightbox(lightbox);
}

// закрыть лайтбокс
function closeLightbox(evt){
  lightbox.classList.remove('popup_opened');
}
closeLightboxBtn.addEventListener("click", closeLightbox);
}

function appear(cards) {
  cards.forEach((cards) => {
    cardsOnSite(cards);
  });
}
appear(initialCards);

// открытие попапа редактирования профиля
function profilePopupToggle() {
  if (!popup.classList.contains("popup_opened")) {
    nameInput.value = userName.textContent;
    bioInput.value = userBio.textContent;
  }
  popup.classList.toggle("popup_opened");
};

profilePopupOpenButton.addEventListener('click', (profilePopupToggle));


// прописать эту функцию, чтобы она вызывала открытие
// отправка, кнопки
function formSubmitHandler(evt) {
  evt.preventDefault();
    userName.textContent = nameInput.value;
    userBio.textContent = bioInput.value;
    profilePopupToggle();
};

function closePopup(profilePopup) {
  popup.classList.remove("popup_opened");
};

formElement.addEventListener("submit", formSubmitHandler);
popupCloseButton.addEventListener("click", closePopup);

// попап добавления новых карточек: открытие и закрытие 
function addNewItemPopupToggle() {
  if (!addNewPopup.classList.contains("popup_opened")) {
      popupAddNewInputTitle.value = null;
      popupAddNewInputImgUrl.value = null;
  }
  addNewPopup.classList.toggle("popup_opened");
}

addNewCloseButton.addEventListener("click", addNewItemPopupToggle);
addNewItemButton.addEventListener("click", addNewItemPopupToggle);

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

  addNewItemPopupToggle(); // закрываю попап при создании карточки
};

form.addEventListener("submit", handleFormSumbit, false); // вешаю на отправку формы свою функцию