function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}


// =-=-=-=-=-=-=-=-=-=-=-=- <sliders> -=-=-=-=-=-=-=-=-=-=-=-=

let categoriesSlider;

new Swiper(".intro__slider", {
  spaceBetween: 15,
  slidesPerView: 1,
  centeredSlides: false,
  autoHeight: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let productPageImageSlider = new Swiper(".product-page__image-slider", {
  spaceBetween: 14,
  slidesPerView: 1,
  centeredSlides: false,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

new Swiper(".like-products__slider", {
  spaceBetween: 14,
  slidesPerView: 1,
  centeredSlides: false,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
    draggable: true,
  },
  breakpoints: {
    1180: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

// =-=-=-=-=-=-=-=-=-=-=-=- </sliders> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <slide drop-down> -=-=-=-=-=-=-=-=-=-=-=-=

let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.boxSizing = "border-box";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

let slideDown = (target, duration = 500) => {
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;

  if (display === "none") display = "block";

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

// =-=-=-=-=-=-=-=-=-=-=-=- </slide drop-down> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <tab> -=-=-=-=-=-=-=-=-=-=-=-=

function tab(elem) {
  checkTabActive = true;

  elem
    .closest("._tab-list")
    .querySelectorAll("._tab-link")
    .forEach((element) => {
      element.classList.remove("_active");
    });

  elem.classList.add("_active");

  const tabLink = elem;

  let tabBlock, tabBlockActive, tabBlockParent;

  try {
    tabBlock = document.querySelector(tabLink.getAttribute("href"));
    tabBlockParent = tabBlock.parentNode;

    if (tabBlock.classList.contains("_active")) {
      checkTabActive = false;
      return false;
    }

    tabBlockActive = tabBlockParent.querySelector("._tab-block._active");
  } catch {
    return false;
  }

  const tabBlockList = tabBlockParent.querySelectorAll("._tab-block");

  tabBlockParent.style.minHeight = tabBlockActive.offsetHeight + "px";

  tabBlockActive.classList.remove("_fade-in");

  setTimeout(function () {
    tabBlockList.forEach((element) => {
      element.classList.remove("_active");
      element.classList.remove("_fade-in");
    });

    tabBlock.classList.add("_active");
  }, 200);

  setTimeout(function () {
    tabBlock.classList.add("_fade-in");

    tabBlockParent.style.minHeight = "0px";

    checkTabActive = false;
  }, 400);
}

// =-=-=-=-=-=-=-=-=-=-=-=- </tab> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <fade-animation> -=-=-=-=-=-=-=-=-=-=-=-=

(function () {
  var FX = {
    easing: {
      linear: function (progress) {
        return progress;
      },
      quadratic: function (progress) {
        return Math.pow(progress, 2);
      },
      swing: function (progress) {
        return 0.5 - Math.cos(progress * Math.PI) / 2;
      },
      circ: function (progress) {
        return 1 - Math.sin(Math.acos(progress));
      },
      back: function (progress, x) {
        return Math.pow(progress, 2) * ((x + 1) * progress - x);
      },
      bounce: function (progress) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
          if (progress >= (7 - 4 * a) / 11) {
            return (
              -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
            );
          }
        }
      },
      elastic: function (progress, x) {
        return (
          Math.pow(2, 10 * (progress - 1)) *
          Math.cos(((20 * Math.PI * x) / 3) * progress)
        );
      },
    },
    animate: function (options) {
      var start = new Date();
      var id = setInterval(function () {
        var timePassed = new Date() - start;
        var progress = timePassed / options.duration;
        if (progress > 1) {
          progress = 1;
        }
        options.progress = progress;
        var delta = options.delta(progress);
        options.step(delta);
        if (progress == 1) {
          clearInterval(id);

          options.complete();
        }
      }, options.delay || 10);
    },
    fadeOut: function (element, options) {
      var to = 1;
      this.animate({
        duration: options.duration,
        delta: function (progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function (delta) {
          element.style.opacity = to - delta;
        },
      });
    },
    fadeIn: function (element, options) {
      var to = 0;
      element.style.display = "block";
      this.animate({
        duration: options.duration,
        delta: function (progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function (delta) {
          element.style.opacity = to + delta;
        },
      });
    },
  };
  window.FX = FX;
})();

// =-=-=-=-=-=-=-=-=-=-=-=- </fade-animation> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

let popupCheck = true,
  popupCheckClose = true;
function popup(arg) {
  if (popupCheck) {
    popupCheck = false;

    let popup,
      popupClose,
      body = arg.body,
      html = arg.html,
      header = arg.header,
      duration = arg.duration ? arg.duration : 200,
      id = arg.id;

    try {
      popup = document.querySelector(id);
      popupClose = popup.querySelectorAll("._popup-close");
    } catch {
      return false;
    }

    function removeFunc(popup, removeClass) {
      if (popupCheckClose) {
        popupCheckClose = false;

        FX.fadeOut(popup, {
          duration: duration,
          complete: function () {
            popup.style.display = "none";
          },
        });
        popup.classList.remove("_active");

        setTimeout(() => {
          popupCheckClose = true;
        }, duration);

        if (removeClass) {
          if (header) header.classList.remove("_popup-active");

          setTimeout(function () {
            body.classList.remove("_popup-active");
            html.style.setProperty("--popup-padding", "0px");
          }, duration);
        }
      }
    }

    body.classList.remove("_popup-active");
    html.style.setProperty(
      "--popup-padding",
      window.innerWidth - body.offsetWidth + "px"
    );
    body.classList.add("_popup-active");

    popup.classList.add("_active");
    if (header) header.classList.add("_popup-active");

    setTimeout(function () {
      FX.fadeIn(popup, {
        duration: duration,
        complete: function () {},
      });
    }, duration);

    popupClose.forEach((element) => {
      element.addEventListener("click", function (event) {
        event.preventDefault();
        if (document.querySelectorAll("._popup._active").length <= 1) {
          removeFunc(popup, true);
        } else {
          removeFunc(popup, false);
        }
        setTimeout(function () {
          return false;
        }, duration);
      });
    });

    setTimeout(() => {
      popupCheck = true;
    }, duration);
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <gallery-popup> -=-=-=-=-=-=-=-=-=-=-=-=

function galleryNextImg(wrapper, galleryPopupImg, slider) {
  galleryPopupImg.classList.add('_hidden');

  let activeLink  = wrapper.querySelector('._gallery-link._active'),
      nextElement = activeLink.closest('._gallery-item').nextElementSibling;

    if(nextElement == null) {
      nextElement = wrapper.querySelector('._gallery-item');
      nextElement.querySelector('._gallery-link').classList.add('_active');
      if(slider) slider.slideTo(0, 200)
    } else {
      if(slider) slider.slideNext(0)
    }

    let nextElementLink = nextElement.querySelector('._gallery-link'),
        nextElementImgSrc = nextElementLink.getAttribute('href');

    activeLink.classList.remove('_active');
    nextElementLink.classList.add('_active');

    galleryPopupImg.setAttribute('src', nextElementImgSrc);
    
    galleryPopupImg.onload = function() {
      galleryPopupImg.classList.remove('_hidden');
    }
    
    
}

function galleryPrevImg(wrapper, galleryPopupImg, slider) {
  galleryPopupImg.classList.add('_hidden');

  let activeLink  = wrapper.querySelector('._gallery-link._active'),
      prevElement = activeLink.closest('._gallery-item').previousElementSibling;

    if(prevElement == null) {
      prevElement = wrapper.querySelectorAll('._gallery-item');
      if(slider) slider.slideTo((prevElement.length - 1), 200)
      prevElement = prevElement[prevElement.length - 1];
      prevElement.querySelector('._gallery-link').classList.add('_active');

    } else {
      if(slider) slider.slidePrev(0)
    }

    let prevElementLink = prevElement.querySelector('._gallery-link'),
        prevElementImgSrc = prevElementLink.getAttribute('href');

    activeLink.classList.remove('_active');
    prevElementLink.classList.add('_active');

    galleryPopupImg.setAttribute('src', prevElementImgSrc);

    galleryPopupImg.onload = function() {
      galleryPopupImg.classList.remove('_hidden');
    }
    
}

function swipedetect(el, callback){
  
  var touchsurface = el,
  swipedir,
  startX,
  startY,
  distX,
  distY,
  threshold = 25, //required min distance traveled to be considered swipe
  restraint = 150, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 300, // maximum time allowed to travel that distance
  elapsedTime,
  startTime,
  handleswipe = callback || function(swipedir){}

  touchsurface.addEventListener('touchstart', function(e){
      var touchobj = e.changedTouches[0]
      swipedir = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      e.preventDefault()
  }, false)

  touchsurface.addEventListener('touchmove', function(e){
      e.preventDefault() // prevent scrolling when inside DIV
  }, false)

  touchsurface.addEventListener('touchend', function(e){
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for awipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
              swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
          }
      }
      handleswipe(swipedir)
      e.preventDefault()
  }, false)
}

function galleryPopup(arg) {

  let html    = arg.html,
      body    = arg.body,
      link    = arg.link,
      wrapper = link.closest('._gallery-wrapper'),
      galleryLength = wrapper.querySelectorAll('._gallery-link').length,
      imgBg   = link.closest('._gallery-color-bg').dataset.bg;

  let galleryNav = 
  `
  <button type="button" class="_gallery-popup-arrow _prev _icon-arrow-to-left"></button>
  <button type="button" class="_gallery-popup-close-btn _icon-x"></button>
  <button type="button" class="_gallery-popup-arrow _next _icon-arrow-to-right"></button>
  `;

  if(galleryLength <= 1) {
    galleryNav = 
  `
  <button type="button" class="_gallery-popup-close-btn _icon-x"></button>
  `;
  }
  

  let galleryPopupBlock = 
          `
          <div class="_gallery-popup _hidden">
              <div class="_gallery-popup-bg"></div>
              <div class="lds-ring _gallery-popup-loading"><div></div><div></div><div></div><div></div></div>
              <div class="_gallery-popup-body _gallery-popup-max">
                  <div class="_gallery-popup-image" style="--bg: ${imgBg}">
                    <img src="${link.href}" class="_gallery-popup-img" alt="Изображения отсутствует">
                  </div>
                  ${galleryNav}
              </div>
          </div>
          
          `;

    body.insertAdjacentHTML('beforeend', galleryPopupBlock);
    html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
    body.classList.add('_popup-active');

    if(wrapper.querySelector('._gallery-link._active')) wrapper.querySelector('._gallery-link._active').classList.remove('_active');

    link.classList.add('_active');
    
    let galleryPopup          = document.querySelector('._gallery-popup'),
        galleryPopupImg       = galleryPopup.querySelector('._gallery-popup-img'),
        galleryPopupArrowPrev = galleryPopup.querySelector('._gallery-popup-arrow._prev'),
        galleryPopupArrowNext = galleryPopup.querySelector('._gallery-popup-arrow._next');

    setTimeout(function() {
      galleryPopup.classList.remove('_hidden');
    },200);

    swipedetect(galleryPopupImg, function(swipedir) {
      if(swipedir == 'left') {
        galleryNextImg(wrapper, galleryPopupImg, productPageImageSlider);
      }
    
      if(swipedir == 'right') {
        galleryPrevImg(wrapper, galleryPopupImg, productPageImageSlider);
      }
    })

    body.onkeyup = function (event) {
      if(event.key == 'ArrowRight') {
        galleryNextImg(wrapper, galleryPopupImg, productPageImageSlider);
      }
    
      if(event.key == 'ArrowLeft') {
        galleryPrevImg(wrapper, galleryPopupImg, productPageImageSlider);
      }
    };

    if(galleryPopupArrowPrev) {
      galleryPopupArrowPrev.addEventListener('click', function() {
        galleryPrevImg(wrapper, galleryPopupImg, productPageImageSlider);
      })
    }
    
    if(galleryPopupArrowNext) {
      galleryPopupArrowNext.addEventListener('click', function() {
        galleryNextImg(wrapper, galleryPopupImg, productPageImageSlider);
      })
    }

    function removeGalleryPopup() {
      galleryPopup.classList.add('_hidden');
      setTimeout(function() {
        wrapper.querySelector('._gallery-link._active').classList.remove('_active');
        body.removeChild(galleryPopup);
        body.onkeyup = null;
        body.classList.remove('_popup-active');
        html.style.setProperty('--popup-padding', '0px');
      },200);
    }



    galleryPopup.querySelector('._gallery-popup-close-btn').addEventListener('click', function() {
      removeGalleryPopup();
    });
    galleryPopup.querySelector('._gallery-popup-bg').addEventListener('click', function() {
      removeGalleryPopup();
    });



}

// =-=-=-=-=-=-=-=-=-=-=-=- <gallery-popup> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <custome form select> -=-=-=-=-=-=-=-=-=-=-=-=

let tabSelect = document.querySelectorAll("._tab-select");

if (tabSelect[0]) {
  tabSelect.forEach((thisElement) => {
    thisElement.style.display = "block";
    thisElement.addEventListener("change", function (e) {
      let selectValue = thisElement.value,
        tab = document.querySelector(`#${selectValue}`),
        tabBlocks = document.querySelectorAll("._tab-select-block._active");

      if (tab) {
        tabBlocks.forEach((element) => {
          element.classList.remove("_active");
          setTimeout(() => {
            element.style.display = "none";
          }, 200);
        });

        setTimeout(() => {
          tab.style.display = "block";
        }, 200);
        setTimeout(() => {
          tab.classList.add("_active");
        }, 400);
      }
    });
  });
}

new lc_select(document.querySelectorAll("._select"), {
  enable_search: false,
});

// =-=-=-=-=-=-=-=-=-=-=-=- </custome form select> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll("._product-count").forEach((thisElement) => {
  let value = thisElement.value,
    parent = thisElement.closest(".product-settings"),
    price = parent.querySelector("._product-price"),
    currency = thisElement.dataset.currency ? thisElement.dataset.currency : "",
    aprice = thisElement.dataset.aprice ? Number(thisElement.dataset.aprice) : false,
    allPriceList = document.querySelector('._all-price-list'),
    allPrice = document.querySelector('._all-price-value');

  if (aprice) {
    price.textContent = Math.round10(value * aprice, -2) + currency;
    price.dataset.price = Math.round10(value * aprice, -2);
  }

  if(allPrice) {
    let productPrice = allPriceList.querySelectorAll('._product-price'),
        result = 0;
    
    productPrice.forEach(thisPrice => {
      result+=Number(thisPrice.dataset.price);
    })

    allPrice.textContent = result.toFixed(1) + currency;

  }

});

// =-=-=-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-=-=

const body = document.querySelector("body"),
  html = document.querySelector("html"),
  menu = document.querySelectorAll("._burger, .header__nav, body"),
  burger = document.querySelector("._burger"),
  wrapper = document.querySelector('.wrapper'),
  header = document.querySelector(".header");

let checkTabActive = false,
  slideCheck = true;
let thisTarget;

body.addEventListener("click", function (event) {
  thisTarget = event.target;

  // Меню в шапке
  if (thisTarget.closest("._burger")) {
    menu.forEach((elem) => {
      elem.classList.toggle("_active");
    });
  }

  let headerSearchOpen = thisTarget.closest(".header__search--open-popup");
  if (headerSearchOpen) {
    let headerSearchPopup = document.querySelector(".header__search--popup");
    if (headerSearchPopup) {
      headerSearchPopup.classList.toggle("_active");
      headerSearchOpen.classList.toggle("_active");
    }
  }

  let productRadioBtn = thisTarget.closest("._product-radio-btn");
  if (productRadioBtn) {
    let input = productRadioBtn.querySelector("._product-radio"),
      parent = productRadioBtn.closest("._product-radio-body"),
      btn = parent.querySelectorAll("._product-radio-btn"),
      allInput = parent.querySelectorAll("._product-radio");

    btn.forEach((element) => {
      element.classList.remove("_active");
    });
    productRadioBtn.classList.add("_active");

    allInput.forEach((element) => {
      element.checked = false;
    });
    input.checked = true;

    let allBlocks = parent.querySelectorAll("._product-radio-block"),
      block = parent.querySelector(`[data-id="${input.dataset.value}"]`);

    allBlocks.forEach((allBlock) => {
      allBlock.style.display = "none";
    });

    block.style.display = "block";
    
  }

  let btnPopup = thisTarget.closest("._open-popup");
  if (btnPopup) {
    event.preventDefault();
    popup({
      id: btnPopup.getAttribute("href"),
      html: html,
      body: body,
      header: header,
    });
  }

  let categoriesBurger = thisTarget.closest(".categories-btn");
  if (categoriesBurger) {
    let categories = document.querySelector(`#${categoriesBurger.dataset.id}`);

    if (categories) {
      if (!categoriesBurger.classList.contains("_active")) {
        categoriesBurger.classList.add("_active");
        

        FX.fadeIn(categories, {
          duration: 200,
          complete: function () {
            categories.style.display = "block";
            categories.style.opacity = "1";
            wrapper.style.minHeight = (categories.offsetHeight + document.querySelector('.page-header').offsetHeight + 50) + 'px';
          },
        });
      } else if (categoriesBurger.classList.contains("_active")) {
        categoriesBurger.classList.remove("_active");

        FX.fadeOut(categories, {
          duration: 200,
          complete: function () {
            categories.style.display = "none";
            wrapper.style.minHeight = 0 + 'px';
          },
        });
      }
    }
  } else if (
    !thisTarget.closest(".categories-btn") &&
    !thisTarget.closest(".categories")
  ) {
    let categoriesBtn = document.querySelector(".categories-btn"),
      categories = document.querySelector(".categories__block._popup");

    if (categories && categoriesBtn) {
      if (categoriesBtn.classList.contains("_active")) {
        categoriesBtn.classList.remove("_active");
        FX.fadeOut(categories, {
          duration: 200,
          complete: function () {
            categories.style.display = "none";
          },
        });
      }
    }
  }

  let cartProductDelete = thisTarget.closest("._cart-product-delete");
  if (cartProductDelete) {
    let product = cartProductDelete.closest("._cart-product"),
      productsLength = product.parentNode.querySelectorAll("._cart-product");

    productsLength = productsLength.length;

    if (product) {
      let popup = product.closest("._popup");
      product.classList.add("_removing");

      setTimeout(() => {
        
        let allPriceList = product.closest('._all-price-list'),
            allPrice = (allPriceList) ? allPriceList.parentNode.querySelector('._all-price-value') : false,
            currency;

        product.remove();
        
        if(allPrice) {
          let productPrice = allPriceList.querySelectorAll('._product-price'),
              result = 0;
          
          currency = (allPriceList.querySelector('._product-count')) ? (allPriceList.querySelector('._product-count').dataset.currency) ? allPriceList.querySelector('._product-count').dataset.currency : '' : ''
          
          if(productPrice) {
            productPrice.forEach(thisPrice => {
              result+=Number(thisPrice.dataset.price);
            })

            allPrice.textContent = result.toFixed(1) + currency;

          } else {
              allPrice.textContent = 0;
          }

        }

        let allProducts = document.querySelector("._empty-list");
        if (allProducts) {
          allProducts = allProducts.querySelectorAll("._cart-product");

          if (!allProducts[0]) {
            let emptyBlock = document.querySelector("._empty-block"),
              cartBlock = document.querySelector(".cart-page__block");

            if (emptyBlock && cartBlock) {
              FX.fadeOut(cartBlock, {
                duration: 200,
                complete: function () {
                  cartBlock.style.display = "none";
                },
              });

              setTimeout(() => {
                FX.fadeIn(emptyBlock, {
                  duration: 200,
                  complete: function () {
                    emptyBlock.style.display = "block";
                    emptyBlock.style.opacity = "1";
                  },
                });

              }, 200);
            
            }
          }
        }

        if (popup && productsLength <= 1) {
          popup.querySelector("._popup-close").click();
        }
      }, 800);
    }
  }

  let tabLink = thisTarget.closest("._tab-link");
  if (tabLink) {
    event.preventDefault();
    if (checkTabActive == false) {
      tab(tabLink);
    }
  }

  let slideOpen = thisTarget.closest("._slide-open");
  if (slideOpen && slideCheck) {
    slideCheck = false;

    let slideItem = slideOpen.closest("._slide-item"),
      slideContent = slideItem
        ? slideItem.querySelector("._slide-content")
        : false;

    if (slideContent && slideItem) {
      if (slideItem.classList.contains("_active")) {
        slideItem.classList.remove("_active");
        slideUp(slideContent);
      } else {
        slideItem.classList.add("_active");
        slideDown(slideContent);
      }

      setTimeout(() => {
        slideCheck = true;
      }, 500);
    }
  }

  let tableInfoLink = thisTarget.closest('._table-info-link');
  if(tableInfoLink) {
    event.preventDefault();
    let tableInfoBlock = tableInfoLink.closest('tr').nextElementSibling.querySelector('._table-info-block');
    
    if(tableInfoBlock) {
      tableInfoLink.classList.toggle('_active');
      tableInfoBlock.classList.toggle('_visible');
    }
  }

  let galleryLink = thisTarget.closest('._gallery-link');
  if(galleryLink) {
    event.preventDefault();
    galleryPopup({
      link: galleryLink,
      html: html,
      body: body,
    });

  }

  let productsFilterMobBtn = thisTarget.closest('.products-filter__mob-btn'),
      productsFilterPopup = document.querySelector('.products-filter__popup');
  if(productsFilterMobBtn) {
    productsFilterPopup.classList.add('_active');
    body.classList.add('_popup-active');
  }

  let productsFilterPopupBg = thisTarget.closest('.products-filter__popup--bg');
  if(productsFilterPopupBg) {
    productsFilterPopup.classList.remove('_active');
    body.classList.remove('_popup-active');
  }

  let productsFilterPopupCloseBtn = thisTarget.closest('.products-filter__popup--close-btn');
  if(productsFilterPopupCloseBtn) {
    productsFilterPopup.classList.remove('_active');
    body.classList.remove('_popup-active');
  }

  let productsFilterLink = thisTarget.closest('.products-filter__link--list-btn');
  if(productsFilterLink) {

    let subList = productsFilterLink.parentNode.querySelector('.products-filter__sub')
    
    if(subList) {
      if(productsFilterLink.parentNode.classList.contains('_sub-active')) {

        slideUp(subList);
        setTimeout(() => {
          productsFilterLink.parentNode.classList.remove('_sub-active');
        },500)

      } else {

        slideDown(subList);
        setTimeout(() => {
          productsFilterLink.parentNode.classList.add('_sub-active');
        },50)

      }
    }
    
  }

  let productsFilterSubLink = thisTarget.closest('.products-filter__sub--list-btn');
  if(productsFilterSubLink) {
    
    let subList = productsFilterSubLink.parentNode.querySelector('.products-filter__sub');
    if(subList) {
      if(productsFilterSubLink.parentNode.classList.contains('_sub-active')) {

        slideUp(subList);
        setTimeout(() => {
          productsFilterSubLink.parentNode.classList.remove('_sub-active');
        },500)

      } else {

        slideDown(subList);
        setTimeout(() => {
          productsFilterSubLink.parentNode.classList.add('_sub-active');
        },50)

      }
    }
  }

});

// =-=-=-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let firstStart = true;

let appendElem = document.querySelectorAll("._append-elem"),
  appendElemList = [];

if (appendElem[0]) {
  appendElem.forEach((thisElement) => {
    appendElemList.push([
      thisElement,
      thisElement.parentNode,
      document.querySelector(thisElement.dataset.appendTo),
    ]);
  });
}

let resizeCheck = {},
  windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
  if (
    windowSize <= size &&
    (resizeCheck[String(size)] == true ||
      resizeCheck[String(size)] == undefined) &&
    resizeCheck[String(size)] != false
  ) {
    resizeCheck[String(size)] = false;
    maxWidth(); // < size
  }

  if (
    windowSize >= size &&
    (resizeCheck[String(size)] == false ||
      resizeCheck[String(size)] == undefined) &&
    resizeCheck[String(size)] != true
  ) {
    resizeCheck[String(size)] = true;
    minWidth(); // > size
  }
}

function resize() {
  windowSize = window.innerWidth;

  resizeCheckFunc(
    768,
    function () {
      // screen > 768

      if (categoriesSlider) categoriesSlider.destroy(true, true);
    },
    function () {
      // screen < 768

      categoriesSlider = new Swiper(".categories__body", {
        spaceBetween: 0,
        slidesPerView: 3,

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      });
    }
  );

  resizeCheckFunc(
    992,
    function () {
      // screen > 992

      if (appendElem[0] && !firstStart) {
        for (let index = 0; index < appendElemList.length; index++) {
          if (appendElemList[index][1]) {
            appendElemList[index][1].append(appendElemList[index][0]);
          }
        }
      }
    },
    function () {
      // screen < 992

      if (appendElem[0]) {
        for (let index = 0; index < appendElemList.length; index++) {
          if (appendElemList[index][2]) {
            appendElemList[index][2].append(appendElemList[index][0]);
          }
        }
      }
    }
  );

  firstStart = false;
}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <Кастомный input range> -=-=-=-=-=-=-=-=-=-=-=-=

  const productsFilterRange = document.querySelector('.products-filter__range'),
        productsFilterRangeInput = document.querySelector('.products-filter__range--input'),
        productsFilterRangeBody = document.querySelector('.products-filter__range--body'),
        productsFilterRangeMin = document.querySelector('.products-filter__range--text-input._min-value'),
        productsFilterRangeMax = document.querySelector('.products-filter__range--text-input._max-value');

if(productsFilterRange) {
  const productsFilterRangeSlider = noUiSlider.create(productsFilterRangeBody, {
    tooltips: false,
    
    start: [Number(productsFilterRangeInput.getAttribute('min')),Number(productsFilterRangeInput.getAttribute('max'))],
    connect: true,
    
    step: Number(productsFilterRangeInput.getAttribute('step')),
    range: {
        'min': Number(productsFilterRangeInput.getAttribute('min')),
        'max': Number(productsFilterRangeInput.getAttribute('max')),
    },
  
  });
  
  productsFilterRange.classList.add('_custome-slider-active');
  
  productsFilterRangeSlider.on('update', function (values, handle) {
    
    productsFilterRangeMin.value = Math.round(values[0]);
    productsFilterRangeMax.value = Math.round(values[1]);
    
  });
}   


// =-=-=-=-=-=-=-=-=-=-=-=- </Кастомный input range> -=-=-=-=-=-=-=-=-=-=-=-=


const entry = document.querySelectorAll("#input-entry");
const auto = document.querySelectorAll("#input-autoh");
const buttons = document.querySelectorAll(".autohization__btn");
const checkbox = document.querySelector(".autohization__checkbox");

function checkInput(array, e) {
  array.forEach((item) => {
    if (item.value == "") {
      e.preventDefault();
      item.classList.add("input-invalid");
      setTimeout(() => {
        item.classList.remove("input-invalid");
      }, 4000);
    }
  });
}

if(buttons[0]) {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.hasAttribute("data-entry")) {
        checkInput(entry, e);
      } else {
        checkInput(auto, e);
      }
    });
  });
}

if(checkbox) {
  checkbox.addEventListener("click", () => {
    checkbox.checked
      ? buttons[1].removeAttribute("disabled", false)
      : buttons[1].setAttribute("disabled", true);
  });
}

