var ESC = "Escape";

// Форма обратной связи

var feedbackLink = document.querySelector(".contacts-button");
var feedbackPopup = document.querySelector(".modal-contact-us");
var feedbackClose = document.querySelector(".feedback-close-button");
var feedbackForm = document.querySelector(".feedback-form");
var feedbackName = document.querySelector("[name = name]");
var feedbackEmail = document.querySelector("[name = email]");
var feedbackText = document.querySelector("[name = text]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = "false"
}

if (feedbackLink !== null) {
  feedbackLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.remove("visually-hidden");
    feedbackPopup.classList.add("modal-show")
    if (storageName) {
      feedbackName.value = storageName;
    } else {
      feedbackName.focus();
    }
    if (storageEmail) {
      feedbackEmail.value = storageEmail;
    } else {
      feedbackEmail.focus();
    }
    if(storageName && storageEmail) {
      feedbackText.focus();
    }
  })
}

if (feedbackClose !== null) {
  feedbackClose.addEventListener("click", function() {
    feedbackPopup.classList.remove("modal-show")
    feedbackPopup.classList.add("visually-hidden");
  })

  feedbackForm.addEventListener("submit", function(evt) {
    if (!feedbackName.value || !feedbackEmail.value || !feedbackText.value) {
      evt.preventDefault();
      feedbackPopup.classList.remove("modal-error"); // все же вернул анимацию ошибки, раз критерий требует (Д17)
      feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
      feedbackPopup.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
      localStorage.setItem("name", feedbackName.value);
      localStorage.setItem("email", feedbackEmail.value);
      }
    }
  })
}

if (feedbackPopup !== null) {
  document.addEventListener("keydown", function(evt) {
    if (evt.key === ESC) {
      if (feedbackPopup.classList.contains("modal-show")) {
        evt.preventDefault();
        feedbackPopup.classList.remove("modal-show");
        feedbackPopup.classList.add("visually-hidden");
      }
    }
  })
}

// Карта

var mapLink = document.querySelector(".contacts-map");
var mapPopup = document.querySelector(".modal-map");
var mapClose = document.querySelector(".map-close-button");

if (mapPopup !== null) {
  ymaps.ready(init);
  function init() {
  var myMap = new ymaps.Map("yandex-map", {
    center: [59.938635, 30.323118],
    zoom: 17
  })
}
}

if (mapPopup !== null) {
  mapLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    mapPopup.classList.remove("visually-hidden");
    mapPopup.classList.add("modal-show");
  })
}

if (mapPopup !== null) {
  mapClose.addEventListener("click", function() {
    mapPopup.classList.remove("modal-show");
    mapPopup.classList.add("visually-hidden");
  })
}

if (mapPopup !== null) {
  document.addEventListener("keydown", function(evt) {
    if (evt.key === ESC) {
      if (mapPopup.classList.contains("modal-show")) {
        evt.preventDefault();
        mapPopup.classList.remove("modal-show");
        mapPopup.classList.add("visually-hidden");
      }
    }
  })
}

// Корзина

var cartLinks = document.querySelectorAll(".buy-button");
var cartPopup = document.querySelector(".modal-added-to-cart");
var cartClose = document.querySelector(".cart-close-button");
var cartContinue = document.querySelector(".continue-button");
var cartCounter = document.querySelector(".cart-counter");
var cartTab = document.querySelector(".cart-link");

if (cartLinks !== null) {
  for (var i = 0; i < cartLinks.length; i++) {
    cartLinks[i].addEventListener("click", function(evt) {
      evt.preventDefault();
      var currentCount = parseInt(cartCounter.textContent);
      cartCounter.textContent = currentCount + 1;
      cartPopup.classList.remove("visually-hidden");
      cartPopup.classList.add("modal-show");
      if (parseInt(cartCounter.textContent) > 0) {
        cartTab.classList.add("active");
      }
    })
  }
}

cartClose.addEventListener("click", function() {
  cartPopup.classList.remove("modal-show");
  cartPopup.classList.add("visually-hidden");
})

cartContinue.addEventListener("click", function(evt) {
  evt.preventDefault();
  cartPopup.classList.remove("modal-show");
  cartPopup.classList.add("visually-hidden");
})

document.addEventListener("keydown", function(evt) {
  if (evt.key === ESC) {
    if (cartPopup.classList.contains("modal-show")) {
      evt.preventDefault();
      cartPopup.classList.remove("modal-show");
      cartPopup.classList.add("visually-hidden");
    }
  }
})


// Слайдер

var sliderControls = document.querySelectorAll(".slider-controls-button");
var sliderItems = document.querySelectorAll(".slider-item");
var sliderPaginators = document.querySelectorAll(".slider-pagination-button");
var countSlider = 1;

function addVisuallyHiddenSliderClass() {
  for (var i = 0; i < sliderItems.length; i++) {
     sliderItems[i].classList.add("visually-hidden");
     sliderPaginators[i].classList.remove("current");
  }
}

function removeVisuallyHiddenSliderClass() {
  for (var l = 0; l < sliderItems.length; l++) {
    if (sliderPaginators[l].classList.contains("current")) {
      sliderItems[l].classList.remove("visually-hidden");
    }
  }
}

for (var j = 0; j < sliderControls.length; j++) {
  sliderControls[j].addEventListener("click", function() {
    addVisuallyHiddenSliderClass();
    sliderItems[(sliderItems.length + countSlider) % sliderItems.length].classList.remove("visually-hidden");
    sliderPaginators[(sliderPaginators.length + countSlider) % sliderPaginators.length].classList.add("current");
    countSlider++;
  })
}

for (var k = 0; k < sliderPaginators.length; k++) {
  sliderPaginators[k].addEventListener("click", function(evt) {
    addVisuallyHiddenSliderClass();
    evt.target.classList.add("current");
    removeVisuallyHiddenSliderClass();
  })
}


// Слайдер услуг

var servicesButtons = document.querySelectorAll(".services-slider-button");
var servicesCount = servicesButtons.length - 1;
var servicesItems = document.querySelectorAll(".services-slider-item");


function removeIsActiveTabClass() {
  for (var i = 0; i <= servicesCount; i++) {
     servicesButtons[i].classList.remove("active");
     servicesItems[i].classList.add("visually-hidden");
  }
}

function removeVisuallyHiddenItemClass() {
  for (var k = 0; k <= servicesCount; k++) {
    if (servicesButtons[k].classList.contains("active")) {
      servicesItems[k].classList.remove("visually-hidden");
    }
  }
}

for (var j = 0; j <= servicesCount; j++) {
     servicesButtons[j].addEventListener("click", function(evt) {
          removeIsActiveTabClass();
          evt.target.classList.add("active");
          removeVisuallyHiddenItemClass();
     })
}
