const map = document.querySelector(".contacts__map-link");
const modalMap = document.querySelector(".modal-map");
const modalMapFade = document.querySelector(".modal-map__fade");
const mapButtonClose = document.querySelector(".modal-map__btn-close");

map.addEventListener ("click", function (evt) {
    modalMap.classList.add("modal-map--vissible");
    evt.preventDefault();
})

modalMapFade.addEventListener ("click", function (evt) {
    modalMap.classList.remove("modal-map--vissible");
})

mapButtonClose.addEventListener ("click", function (evt) {
    modalMap.classList.remove("modal-map--vissible");
})

window.addEventListener("keydown", function (evt) {
    if (evt.key === "Esc" || evt.key === "Escape") {
        if (modalMap.classList.contains("modal-map--vissible")) {
            modalMap.classList.remove("modal-map--vissible");
        }
    }
})