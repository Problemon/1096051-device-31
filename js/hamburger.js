const hamburger = document.querySelector(".header__menu-icon");
const headerMenu = document.querySelector(".header__menu");

hamburger.addEventListener("click", function() {
    headerMenu.classList.toggle("header__menu--active");
});