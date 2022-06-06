addEventListener('DOMContentLoaded', function () {
  // search-header
  let headerNav = document.querySelector('.header__nav'),
    searchBtn = document.querySelector('.nav__btn-search');
  searchBtn.addEventListener('click', function (event) {
    if (event.target.classList === searchBtn.classList || event.target.closest('.nav__btn-search')) {
      searchBtn.classList.toggle('is-open');
      headerNav.classList.toggle('is-searching');
    }
  })

  const select = document.querySelector('.broadcasts__select');
  const customSelect = new Choices(select, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false
  })

  // accordion vanila js
  const accordionTitlesArray = document.querySelectorAll(`[data-accordion]`);
  if (accordionTitlesArray.length > 0) {
    const accordionRegular = Array.from(accordionTitlesArray).filter(function (item, index, self) {
      return !item.dataset.accordion.split(",")[0]; // check media conditions in data attributes // data-accordion="850,max" or data-accordion
    });
    if (accordionRegular.length > 0) {
      initAccordion(accordionRegular);
    }

    const accordionMedia = Array.from(accordionTitlesArray).filter(function (item, index, self) {
      return item.dataset.accordion.split(",")[0];
    });

    if (accordionMedia.length > 0) {
      const breakpointsArray = []; // contains media info
      accordionMedia.forEach(item => {
        const params = item.dataset.accordion;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });

      // get unique breakpoints
      let mediaQueries = breakpointsArray.map(function (item) {
        return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });

      // Working with each breakpoints
      mediaQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);

        // Objects with the right conditions
        const accordionTitlesArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        // Event
        matchMedia.addEventListener('change', () => {
          initAccordion(accordionTitlesArray, matchMedia);
        });
        initAccordion(accordionTitlesArray, matchMedia);
      })
    }
  }
  // Initialization accordion
  function initAccordion(accordionTitlesArray, matchMedia = false) {
    accordionTitlesArray.forEach(block => {
      block = matchMedia ? block.item : block;
      if (matchMedia.matches || !matchMedia) {
        block.classList.add('init');
        initAccordionBody(block);
        block.addEventListener('click', setAccordionAction);
      } else {
        block.classList.remove('init');
        initAccordionBody(block, false);
        block.removeEventListener('click', setAccordionAction);
      }
    });
  }

  // Working with content
  function initAccordionBody(block, hideAccodrionBody = true) {
    const accodrionTitles = block.querySelectorAll(`[data-title-accordion]`);
    if (accodrionTitles.length > 0) {
      accodrionTitles.forEach(accodrionTitle => {
        if (hideAccodrionBody) {
          accodrionTitle.removeAttribute('tabindex');
          if (!accodrionTitle.classList.contains('is-active')) {
            accodrionTitle.nextElementSibling.hidden = true;
          } else {
            accodrionTitle.setAttribute('tabindex', '-1');
            accodrionTitle.nextElementSibling.hidden = false;
          }
        }
      });
    }
  }

  function setAccordionAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-title-accordion') || el.closest(`[data-title-accordion]`)) {
      const accordionTitle = el.hasAttribute('data-title-accordion') ? el : el.closest(`[data-title-accordion]`);
      const parentBlock = accordionTitle.closest(`[data-accordion]`);
      const bodyBlock = accordionTitle.nextElementSibling;
      const oneAccordion = bodyBlock.closest(`[data-one-accordion]`) ? true : false;
      if (!bodyBlock.querySelectorAll('.slide').length) {
        accordionTitle.classList.add('is-active');
        if (oneAccordion) {
          document.querySelectorAll(`[data-title-accordion]`).forEach(function (elem) {
            if (elem.classList.contains('is-active') && !elem.nextElementSibling.hasAttribute('hidden')) {
              hideAccodrionBody(elem);
            }
          })
        }
        slideToggle(accordionTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }

  function hideAccodrionBody(accordionTitle) {
    accordionTitle.classList.remove('is-active');
    accordionTitle.setAttribute = 'hidden'
    slideUp(accordionTitle.nextElementSibling, 500);
  }

  let slideUp = (target, duration = 500) => {
    if (target.classList.contains('slide')) {
      target.classList.add('slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('slide');
      }, duration);
    }
  }

  let slideDown = (target, duration = 500) => {
    if (!target.classList.contains('slide')) {
      target.classList.add('slide');
      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
      }, duration);
    }
  }

  let slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
  }
  /*------------------------------------------------------------------------------- */
  let personBtn = document.querySelectorAll('.guests__btn');
  let personContent = document.querySelectorAll('.guests__content');
  let socialListGuests = document.querySelector('.social-list')
  personBtn.forEach(function (btnClick) {
    btnClick.addEventListener('click', function (event) {
      const person = event.currentTarget.dataset.person;
      personBtn.forEach(function (delLastActive) {
        delLastActive.classList.remove('is-active');
      })
      personContent.forEach(function (delLastActive) {
        delLastActive.classList.remove('is-active');
      })
      document.querySelector(`[data-person="${person}"]`).classList.add('is-active');
      document.querySelector(`[data-target-person="${person}"]`).classList.add('is-active');
      socialListGuests.classList.remove('is-active');
      setTimeout(() => {
        socialListGuests.classList.add('is-active');
      }, 10); /* Добавил setTimeout, т.к. если написать подряд remove is-active и add is-active, то не срабатывает keyframe в css(Не разобрался почему) */
    })
  })


  // podcasts__audio
  const podcastsAudio = document.querySelector('.podcasts__audio'),
    playBtns = document.querySelectorAll('.podcasts-list__btn');
  let podcastsItem = document.querySelectorAll('.podcasts__item');

  let playlist = ['Begi', 'Daniel_Silver_Now_That_Youre_Gone', 'GOKILLA_JEKAJIO_Boyz_n_da_Hood', 'JIZZZY_Rose', 'Kuok_love', 'LUCAVEROS_A_ya_pel_im_o_lyubvi', 'ooes_night', 'ooes_winter'];

  // init
  function loadSong(song) {
    podcastsAudio.src = `audio/${song}.mp3`;
  }

  // Play
  function Play(activeEl) {
    podcastsItem.forEach(function (delActive) {
      delActive.classList.remove('play');
    })
    activeEl.classList.add('play');
    podcastsAudio.play();
    podcastsAudio.addEventListener('loadedmetadata', function (e) {
      setTimeout(() => {
        activeEl.classList.remove('play')
      }, this.duration * 1000);
    })
  }

  // Pause
  function Pause(activeEl) {
    activeEl.classList.remove('play');
    podcastsAudio.pause();
  }

  playBtns.forEach(function (playBtn) {
    playBtn.addEventListener('click', function (activeEl) {
      let index = Array.prototype.indexOf.call(podcastsItem, activeEl.target.closest('.podcasts__item'));
      const isPlaying = playBtn.closest('.podcasts__item');
      if (isPlaying.classList.contains('play')) {
        Pause(isPlaying);
      } else {
        loadSong(playlist[index]);
        Play(isPlaying);
      }
    })
  })

  // statistics podcasts
  let statBtn = document.querySelectorAll('.stat-list__btn');
  statBtn.forEach(function (event) {
    event.addEventListener('click', function (eventClick) {
      if (eventClick.target.classList === statBtn.classList || eventClick.target.closest('.stat-list__btn') || eventClick.target.nextElementSibling.classList === 'stat-list__count') {
        setTimeout(() => {
          let currentCount = parseInt(eventClick.target.querySelector('.stat-list__count').textContent);
          currentCount++;
          eventClick.target.querySelector('.stat-list__count').innerHTML = String(currentCount);
        }, 10);
      }
    })
  })

  // filter broadcasts
  let broadSelect = document.querySelector('.broadcasts__select'),
    broadcastsItems = document.querySelectorAll('.broadcasts__item');
  broadSelect.addEventListener('change', function () {
    const name = broadSelect.options[broadSelect.selectedIndex].getAttribute('value');
    broadcastsItems.forEach(function (delLastActive) {
      delLastActive.classList.remove('is-active');
    })
    document.querySelectorAll(`[data-target-broadcast="${name}"]`).forEach(function (el) {
      el.classList.add('is-active');
    })
  })

  // validation form
  let form = document.querySelector('.about__form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputEmail = document.querySelector('.js-input-email'),
    inputName = document.querySelector('.js-input-name'),
    inputCheckbox = document.querySelector('.js-input-checkbox'),
    errBlocks = document.querySelectorAll('.form__error');

  inputCheckbox.addEventListener('click', function () {
    inputCheckbox.closest('.about__check').classList.toggle('is-active');
  })

  function validateEmail(email) {
    let regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regular.test(String(email).toLocaleLowerCase());
  }

  function validateName(name) {
    let reg = /^[а-яё]*$/i;
    return reg.test(String(name).toLocaleLowerCase());
  }

  form.onsubmit = function () {
    let emailVal = inputEmail.value,
      nameVal = inputName.value,
      emptyInputs = Array.from(formInputs).filter(input => input.value === '');


    if (!validateName(nameVal)) {
      inputName.classList.add('error-name');
      document.querySelector('.js-input.error-name + .error-name').innerHTML = 'Имя содержит только русские буквы';
      return false;
    } else {
      inputName.classList.remove('error-name');
    }

    if (!inputCheckbox.closest('.about__check').classList.contains('is-active')) {
      inputCheckbox.closest('.about__check').classList.add('error-mark');
      document.querySelector('.error-checkbox').innerHTML = 'Не отмечена обработка персональных данных';
      return false;
    } else {
      inputCheckbox.closest('.about__check').classList.remove('error-mark');
    }


    formInputs.forEach(function (input) {
      if (input.value === '') {
        input.classList.add('error');
        errBlocks.forEach(function (el) {
          el.innerHTML = 'Заполните все обязательные поля';
        })
        return false;
      } else {
        input.classList.remove('error');
      }
    })

    if (emptyInputs.length !== 0) {
      return false;
    }

    if (!validateEmail(emailVal)) {
      inputEmail.classList.add('error-val');
      document.querySelector('.error-email').innerHTML = 'Неверно заполнен eMail';
      return false;
    } else {
      input.classList.remove('error-val');
    }
  }

  // genre swiper
  let genreList = document.querySelector('.playlist__genre-list'),
    x1 = null,
    y1 = null,
    posX = 0;

  genreList.addEventListener('touchstart', handleTouchStart, false);
  genreList.addEventListener('touchmove', handleTouchMove, false);
  genreList.addEventListener('mousedown', (e) => {
    handleTouchStart(e, false);
  });
  genreList.addEventListener('mouseover', (e) => {
    handleTouchMove(e, false);
  })

  function handleTouchStart(event, mobile = true) {
    if (mobile) {
      const firstTouch = event.touches[0];

      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;
    } else {
      x1 = event.clientX;
      y1 = event.clientY;
    }
  }

  function handleTouchMove(event, mobile = true) {
    if (!x1 || !y1) {
      return false;
    }
    if (mobile) {
      let x2 = event.touches[0].clientX;
      let y2 = event.touches[0].clientY;
      let xDifferent = x2 - x1;
      let yDiffrenet = y2 - y1;

      if (Math.abs(xDifferent) > Math.abs(yDiffrenet)) {
        // right - left
        if (xDifferent > 0) {
          posX > 179 ? posX = 0 : posX += 180;
          genreList.style.transform = `translate3d(${(posX) + 'px'}, 0px, 0px)`;
        } else {
          posX < -1259 ? posX = 0 : posX -= 180;
          genreList.style.transform = `translate3d(${(posX) + 'px'}, 0px, 0px)`;
        }
      }
    } else {
      let x2 = event.clientX,
        y2 = event.clientY,
        xDifferent = x2 - x1,
        yDiffrenet = y2 - y1;
      if (Math.abs(xDifferent) > Math.abs(yDiffrenet)) {
        if (xDifferent > 0) {
          posX > 179 ? posX = 0 : posX += 180;
          genreList.style.transform = `translate3d(${(posX) + 'px'}, 0px, 0px)`;
        } else {
          posX < -1259 ? posX = 0 : posX -= 180;
          genreList.style.transform = `translate3d(${(posX) + 'px'}, 0px, 0px)`;
        }
      }
    }
    x1 = null;
    y1 = null;
  }

  // burger
  let burgerBtn = document.querySelector('.header__burger-btn');

  burgerBtn.addEventListener('click', () => {
    if (burgerBtn.classList.contains('is-active')) {
      document.querySelector('.nav__list').style.transform = 'translateX(-1000px)';
      document.querySelector('.menu-list').style.transform = 'translateX(-1000px)';
      burgerBtn.classList.add('close');
      setTimeout(() => {
        burgerBtn.classList.remove('is-active');
        document.querySelector('.nav__list').style.transform = 'translateX(0px)';
        burgerBtn.classList.remove('close');
        document.querySelector('.menu-list').style.transform = 'translateX(0px)';
        document.querySelector('.menu-list').classList.remove('is-active');
      }, 500);
    } else {
      burgerBtn.classList.add('is-active');
      document.querySelector('.menu-list').classList.add('is-active');
    }
  })

  // Spoiler header
  let spoilerBtn = document.querySelector('.spoiler-menu');
  spoilerBtn.addEventListener('click', () => {
    if (!spoilerBtn.classList.contains('is-open')) {
      spoilerBtn.classList.add('is-open');
    } else {
      document.querySelector('.live-list').style.transform = 'translateY(-1000px)'
      setTimeout(() => {
        spoilerBtn.classList.remove('is-open');
        document.querySelector('.live-list').style.transform = 'translateY(0px)'
      }, 500);
    }
  })
})
