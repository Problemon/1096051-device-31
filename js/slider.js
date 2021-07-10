function makeSlider (dots, dotClassActive, slides, slideClassActive) {
    dots.forEach( function (element, id) {
        element.addEventListener ("click", function () {
            let prevDot = document.querySelector("."+dotClassActive);
            prevDot.removeAttribute("disabled");
            prevDot.classList.remove(dotClassActive);
            
            if (slideClassActive) {
                let slideActive = document.querySelector("."+slideClassActive);
                slideActive.classList.remove(slideClassActive);
                slides[id].classList.add(slideClassActive);
            } else {
                choiceSlide(id, true);
            }
            
            element.setAttribute("disabled", "");
            element.classList.add(dotClassActive);
        })
    });
}


const carouselList = document.querySelector(".carousel__list");
const carouselProducts = document.querySelectorAll(".carousel__product");
const carouselDots = document.querySelectorAll(".carousel__dot-button");

let count = 0;
let carouselWidth;

function setWidth () {
    carouselWidth = document.querySelector(".carousel-slider").offsetWidth;
    carouselList.style.width = carouselWidth * carouselProducts.length + "px";
    
    carouselProducts.forEach( item => {
        item.style.width = carouselWidth + "px";
    })

    choiceSlide(count, false) 
};

window.addEventListener("resize", setWidth);
setWidth();

function choiceSlide (ind, isReverse) {
    if (isReverse) {
        count = carouselProducts.length - ind - 1;
    } else {
        count = ind;
    };
    carouselList.style.transform = "translate(-" + count * carouselWidth + "px)";
};

makeSlider(carouselDots, "carousel__dot-button--active", carouselProducts, false);


const benefitsSlide = document.querySelectorAll(".benefits__item");
const benefitsDots = document.querySelectorAll(".benefits__info-btn");
makeSlider(benefitsDots, "benefits__info-btn--active", benefitsSlide,  "benefits__item--active");



function checkHash () {
    if (window.location.hash === "#warranty") {
        let warranty = document.getElementById("warranty");
        warranty.click();
    } else if (window.location.hash === "#delivery") {
        let delivery = document.getElementById("delivery");
        delivery.click();
    };
}

window.onhashchange = function () {
    checkHash();
}
checkHash();