function makeSlider (dots, dotClassActive, slides, slideClassActive, reverse) {
    dots.forEach( function (element, id) {
        element.addEventListener ("click", function () {
            let prevDot = document.querySelector("."+dotClassActive);
            prevDot.removeAttribute("disabled");
            prevDot.classList.remove(dotClassActive);
    
            let slideActive = document.querySelector("."+slideClassActive);
            slideActive.classList.remove(slideClassActive);
            
            element.setAttribute("disabled", "");
            element.classList.add(dotClassActive);
            
            let slideId = id;

            if (reverse) {
                slideId = slides.length - id - 1;
            };

            slides[slideId].classList.add(slideClassActive);
        })
    });
}

const carouselProducts = document.querySelectorAll(".carousel__product");
const carouselDots = document.querySelectorAll(".carousel__dot-button");
makeSlider(carouselDots, "carousel__dot-button--active", carouselProducts,  "carousel__product--active", true)

const benefitsSlide = document.querySelectorAll(".benefits__item");
const benefitsDots = document.querySelectorAll(".benefits__info-btn");
makeSlider(benefitsDots, "benefits__info-btn--active", benefitsSlide,  "benefits__item--active", false);

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