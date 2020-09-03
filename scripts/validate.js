// элементы
const formArray = {
  formElement: 'popup__form',
  inputElement: 'popup__input',
  inputsErrorClass: 'popup__input_type_error', ///inputErrorClass
  errorVisible: 'popup__error_visible', //errorClass
  buttonElement: 'popup__btn',
  buttonElementDisabled: 'popup__btn_disabled'
}

function showInputError(formElement, inputElement, classList){
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(classList.inputsErrorClass);
  errorElement.classList.add(classList.errorVisible);
  errorElement.textContent = inputElement.validationMessage;
};

function hideInputError(formElement, inputElement, classList){
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(classList.inputsErrorClass);
  errorElement.classList.remove(classList.errorVisible);
  errorElement.textContent = '';
};

function checkValidity(formElement, inputElement, classList){
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, classList);
  } else {
    hideInputError(formElement, inputElement, classList);
  }
}

function popupValidation(container, classList){
  const formElement = container.querySelector(classList.formElement);
  if(formElement.textContent.length > 0){
    const inputList = Array.from(formElement.querySelectorAll(classList.inputElement));

    inputList.forEach((inputElement) => {
      formElement.reset();
      hideInputError(formElement, inputElement, classList);
    })
  }
  popupValidation();
}

function setEventListeners(formElement, classList){
  const inputList = Array.from(formElement.querySelectorAll(classList.inputElement));
  const submitButton = formElement.querySelector(classList.buttonElement);
  toggleButtonState(inputList, submitButton, classList);
  inputList.forEach((inputElement) => {
    console.log(inputElement);
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, classList);
      toggleButtonState(inputList, submitButton, classList);
    })
  })
}

function enableValidation(classList){
  const formList = Array.from(document.querySelectorAll(classList.formElement));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      setEventListeners(formElement, classList);
    })
}


function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, classList) {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(classList.buttonElementDisabled);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(classList.buttonElementDisabled);
    buttonElement.removeAttribute('disabled', 'disabled')
  }
}

enableValidation(formArray);

