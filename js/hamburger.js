const hamburger = document.querySelector(".header__menu-icon");
const headerMenu = document.querySelector(".header__menu");
const catalogProducts = document.querySelector(".header__catalog");

hamburger.addEventListener("click", function() {
    headerMenu.classList.toggle("header__menu--active");
});

catalogProducts.addEventListener("click", function (evt) {
    if (window.innerWidth <= 840) {
        evt.preventDefault();
        catalogProducts.classList.toggle("header__catalog--active");
    }
});