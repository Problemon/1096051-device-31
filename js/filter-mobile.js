const filterTitle = document.querySelector(".filter__title");

filterTitle.addEventListener("click", function () {
    if (window.innerWidth <= 650) {
        filterTitle.classList.toggle("filter__title--active");
    }
});