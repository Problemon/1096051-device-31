const buttonOpen = document.querySelector(".contacts__btn");
const modal = document.querySelector(".modal");
const modalFade = modal.querySelector(".modal__fade") 
const buttonClose = modal.querySelector(".modal__form-btn-close");

const modalForm = modal.querySelector(".modal__form");
const inputName = modal.querySelector(".modal__form-input-name");
const inputEmail = modal.querySelector(".modal__form-input-email");
const inputTextarea = modal.querySelector(".modal__form-textarea");
const modalButtonSubmit = modal.querySelector(".modal__form-btn");

let isStorageSupport = true;
let storageName = "";

try {
    storageName = localStorage.getItem("name");
} catch (err) {
    isStorageSupport = false;
};

buttonOpen.addEventListener("click", function (evt) {
    evt.preventDefault();
    modal.classList.add("modal--vissible");
    
    if (storageName) {
        inputName.value = localStorage.getItem("name");
        inputEmail.value = localStorage.getItem("email");
        inputTextarea.focus();
    } else {
        inputName.focus();
    }
});

modalFade.addEventListener("click", function () {
    modal.classList.remove("modal--vissible");
    modal.classList.remove("modal--error");
});

buttonClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    modal.classList.remove("modal--vissible");
    modal.classList.remove("modal--error");
});

window.addEventListener("keydown", function (evt) {
    if (evt.key === "Esc" || evt.key === "Escape") {
        if (modal.classList.contains("modal--vissible")) {
            evt.preventDefault();
            modal.classList.remove("modal--vissible");
            modal.classList.remove("modal--error");
        };
    };
});

modalButtonSubmit.addEventListener("click", function (evt) {
    if (!inputName.validity.valid || !inputEmail.validity.valid) {
        modal.classList.remove("modal--error");
        void modal.offsetWidth;
        modal.classList.add("modal--error");
        
        evt.preventDefault();
    } else {
        if (isStorageSupport) { 
            localStorage.setItem ("name", inputName.value); 
            localStorage.setItem ("email", inputEmail.value); 
        }
    }
})

modalButtonSubmit.onfocus = function () {
    function focusTrap (evt) {
        if(evt.key === "Tab") {
            evt.preventDefault();
            buttonClose.focus();

            window.removeEventListener("keydown", focusTrap);
        }
    }
    window.addEventListener("keydown", focusTrap);
};