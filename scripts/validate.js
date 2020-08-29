//объект со всеми нужными параметрами, отвечает за валидацию ВСЕХ форм 
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

/* нужно сделать: 
1) с пустыми импутами кнопка не активна (toggleButtonState)
2) с пустыми полями форма не отправляется  
3) в поле «Имя» разрешены только русские или английские буквы, пробелы и дефисы
4) появляются сообщения об ошибке и их стили*/

