export default class FormValidator {
    constructor(formValidationSettings, formElement){
        this._formElement = formElement;
        this._inputSelector = formValidationSettings.inputSelector;
        this._submitButtonSelector = formValidationSettings.submitButtonSelector;
        this._disabledButton = formValidationSettings.disabledButton;
        this._inputError = formValidationSettings.inputError;
        this._errorClass = formValidationSettings.errorClass;
        this._errorBorder = formValidationSettings.errorBorder;
        this._errorSelector = formValidationSettings.errorSelector;
        this._errorVisible = formValidationSettings.errorVisible
    }

    //показываем ошибку
    _showInputError(inputElement, errorMessage){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputError);
        inputElement.classList.add(this._errorBorder);
        errorElement.classList.add(this._errorVisible);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    };
    
    //убираем ошибку
    _hideInputError(inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputError);
        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._errorBorder);
        errorElement.classList.remove(this._errorVisible);
        errorElement.textContent = null;
    };

    // проверяем на валидность
    _checkValidity(inputElement){
    if (!inputElement.validity.valid){
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
    }

    //расставляем слушатели событий
    _setEventListeners () {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleButtonState(inputList);
            })
            })
    }

    //публичный метод; включает валидацию всем формам
    enableValidation(){
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        this._setEventListeners();
    }

    //если есть ошибка
    _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
    }

    // кнопка submit неактивна
    _disabledSubmitButton() {
    this._submitButtonElement.classList.add(this._disabledButton);
    
    }

    // кнопка submit активна
    _activeSubmit() {
    this._submitButtonElement.classList.remove(this._disabledButton);
    }

    //переключаем состояние кнопки
    _toggleButtonState(inputList) {
        if(this._hasInvalidInput(inputList)){
            this._disabledSubmitButton();
            this.resetButton();
            this._submitButtonElement.setAttribute('disabled', 'disabled');
        } else {
            this._activeSubmit();
            this._submitButtonElement.removeAttribute('disabled');
        }
    }

    //состояние кнопки при открытии попапа
    resetButton(){
        if (this._submitButtonElement.classList.contains('popup__btn_save')) {
            this._activeSubmit();
        } else {
            this._disabledSubmitButton();
        }
    }

    //очищаем ошибки при повторном открытии попапа
    hideErrors(){
        const inputList = Array.from(document.querySelectorAll('.popup__input'));
        const errorElement = Array.from(document.querySelectorAll('.popup__input_type_error'));

        inputList.forEach(input => {
            input.classList.remove(this._inputError);
            input.classList.remove(this._errorVisible);
            input.classList.remove('popup__input_invalid');
        });

        errorElement.forEach(error => {
            error.classList.remove(this._errorVisible);
            error.classList.remove(this._errorClass);
            error.textContent = '';
        });
    }
}
