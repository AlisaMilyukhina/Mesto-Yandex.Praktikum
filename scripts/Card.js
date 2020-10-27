import { openPopups, lightbox, closePopups, closeLightboxBtn } from './index.js';

export class Card {
    constructor(data, cardSelector){
        this._title = data.name;
        this._image = data.link; //линк на картинку
        this._cardSelector = cardSelector;
    }
    
    //клонируем из темплейта 
    _getCardsTemplate(){
        const cardsTemplate = document.querySelector('.cards-grid__template').content.querySelector('.cards-grid__element').cloneNode(true);
        return cardsTemplate;
        
    }

    // слушатели для карточек
    _setCardsListeners() {
        this._cardsImage = this._element.querySelector('.cards-grid__pic');
        this._element.querySelector('.cards-grid__title').textContent = this._title;
        this._cardsImage.addEventListener('click', this._handleLightbox);
        this._element.querySelector('.cards-grid__remove-btn').addEventListener('click', this._handleDelete);
        this._element.querySelector('.cards-grid__heart-btn').addEventListener('click', (evt) => { this._handleLike(evt) });
        
        closeLightboxBtn.addEventListener('click', () => {
            closePopups(lightbox);
        });
    }

    //создаем карточку публичным методом
    createCard() {
        this._element = this._getCardsTemplate();
        this._setCardsListeners();
        
        this._cardsImage.src = this._image;
        this._cardsImage.alt = this._title;
        
        
        return this._element;
}

    //метод открытия лайтбокса
    _handleLightbox(event){
        openPopups(lightbox);
        lightbox.querySelector('.popup__image').src = event.target.src;
        lightbox.querySelector('.popup__caption').textContent = event.target.parentNode.querySelector('.cards-grid__title').textContent;
    }

    //метод удаления карточки
    _handleDelete = () => {
        this._element.remove();
    }
    
    //метод лайка
    _handleLike = (event) => {
        const likeButton = event.target;
    likeButton.classList.toggle('cards-grid__heart-btn_active');
    }

}