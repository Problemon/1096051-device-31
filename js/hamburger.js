const hamburger = document.querySelector(".header__menu-icon");
const headerMenu = document.querySelector(".header__menu");
const catalogProducts = document.querySelector(".header__catalog");

window.addEventListener("click", function(evt) {
    if (!evt.target.classList.contains("header__menu-icon") && 
    !evt.target.closest(".header__menu--active")) {
        hideMenu();
        headerMenu.classList.remove("header__menu--active");
        headerMenu.classList.remove("header__menu--hide");
    };
});

hamburger.addEventListener("click", function() {
    hideMenu();
    headerMenu.classList.toggle("header__menu--active");
});

window.addEventListener("keydown", function (evt) {
    if (evt.key === "Esc" || evt.key === "Escape") {
        hideMenu();
        headerMenu.classList.remove("header__menu--active");
    };
});

const infoLinks = document.querySelectorAll(".info__link");
infoLinks[infoLinks.length - 1].onfocus = function () {
    function focusTrap (evt) {
        if(evt.key === "Tab") {
            evt.preventDefault();
            hamburger.focus();
            
            window.removeEventListener("keydown", focusTrap);
        }
    }
    window.addEventListener("keydown", focusTrap);
};


catalogProducts.addEventListener("click", function (evt) {
    if (window.innerWidth <= 840) {
        evt.preventDefault();
        catalogProducts.classList.toggle("header__catalog--active");
    }
});

function hideMenu () {
    if (headerMenu.classList.contains("header__menu--active")) {
        headerMenu.classList.add("header__menu--hide");
        headerMenu.onanimationend = () => {headerMenu.classList.remove("header__menu--hide");};
    } else {
        headerMenu.classList.remove("header__menu--hide");
    }
};
