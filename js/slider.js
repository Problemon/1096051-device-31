const carouselSlider = document.querySelector(".carousel-slider"),
      carouselList = document.querySelector(".carousel__list"),
      carouselProducts = document.querySelectorAll(".carousel__product"),
      carouselDots = document.querySelectorAll(".carousel__dot-button");

let count = 0,
    carouselWidth = carouselSlider.offsetWidth,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --carouselProducts.length * carouselWidth,
    posThreshold = carouselWidth * .35,
    trfRegExp = /[-0-9.]+(?=px)/;

    
makeSlider(carouselDots, "carousel__dot-button--active", carouselProducts, false);
window.addEventListener("resize", setWidth);
setWidth();

slide = function() {
    carouselList.style.transition = 'transform .5s';
    carouselList.style.transform = `translate3d(-${count * carouselWidth}px, 0px, 0px)`;
}

getEvent = function() {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
};
  
swipeStart = function() {
    let evt = getEvent();
   
    if (allowSwipe) {

        transition = true;
  
        nextTrf = (count + 1) * -carouselWidth;
        prevTrf = (count - 1) * -carouselWidth;
  
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
  
        carouselList.style.transition = '';
  
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);
  
        carouselSlider.classList.remove('grab');
        carouselSlider.classList.add('grabbing');
      }
};

swipeAction = function() {
    let evt = getEvent(),
      style = carouselList.style.transform,
      transform = +style.match(trfRegExp)[0];
  
    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    };

	if (isSwipe) {
		if (count === 0) {
			if (posInit < posX1) {
				setTransform(transform, 0);
				return;
			} else {
				allowSwipe = true;
			}
		};
  
		if (count === --carouselProducts.length) {
			if (posInit > posX1) {
				setTransform(transform, lastTrf);
				return;
			} else {
				allowSwipe = true;
			}
		};

		if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
			reachEdge();
			return;
		};
    
    	carouselList.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
	};	
};

swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;
  
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);
	
    carouselSlider.classList.add('grab');
    carouselSlider.classList.remove('grabbing');
  
	if (allowSwipe) {
		if (Math.abs(posFinal) > posThreshold) {
			if (posInit < posX1) {
				count--;
			} else if (posInit > posX1) {
				count++;
			}

            activeDot("carousel__dot-button--active", carouselDots[carouselDots.length - 1 - count]);
		}
  
		if (posInit !== posX1) {
			allowSwipe = false;
			slide();
		} else {
		  	allowSwipe = true;
		};
	} else {
		allowSwipe = true;
	}
};

setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
		if (transform > comapreTransform) {
			carouselList.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
		}
    }
    allowSwipe = false;
};

reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
};

carouselList.style.transform = 'translate3d(0px, 0px, 0px)';
carouselSlider.classList.add('grab');

carouselList.addEventListener('transitionend', () => allowSwipe = true);
carouselSlider.addEventListener('touchstart', swipeStart);
carouselSlider.addEventListener('mousedown', swipeStart);


const benefitsSlide = document.querySelectorAll(".benefits__item"),
      benefitsDots = document.querySelectorAll(".benefits__info-btn");
makeSlider(benefitsDots, "benefits__info-btn--active", benefitsSlide,  "benefits__item--active");


window.onhashchange = function () {
    checkHash();
}
checkHash();

function makeSlider (dots, dotClassActive, slides, slideClassActive) {
    dots.forEach( function (element, id) {
        element.addEventListener ("click", function () {
            activeDot(dotClassActive, element);
            
            if (slideClassActive) {
                let slideActive = document.querySelector("."+slideClassActive);
                slideActive.classList.remove(slideClassActive);
                slides[id].classList.add(slideClassActive);
            } else {
                choiceSlide(id, true);
            };
        });
    });
};

function activeDot (classActive, dot) {
    let prevDot = document.querySelector("."+classActive);
    prevDot.removeAttribute("disabled");
    prevDot.classList.remove(classActive);

    dot.setAttribute("disabled", "");
    dot.classList.add(classActive);
}

function choiceSlide (ind, isReverse) {
    if (isReverse) {
        count = carouselProducts.length - ind - 1;
    } else {
        count = ind;
    };
    carouselList.style.transform = "translate(-" + count * carouselWidth + "px)";
};

function setWidth () {
    carouselWidth = carouselSlider.offsetWidth;
    carouselList.style.width = carouselWidth * carouselProducts.length + "px";
    
    carouselProducts.forEach( item => {
        item.style.width = carouselWidth + "px";
    })
    
    choiceSlide(count, false) 
};

function checkHash () {
    if (window.location.hash === "#warranty") {
        let warranty = document.getElementById("warranty");
        warranty.click();
    } else if (window.location.hash === "#delivery") {
        let delivery = document.getElementById("delivery");
        delivery.click();
    };
}