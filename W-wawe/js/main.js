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
  if (select) {
    const customSelect = new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false
    })
  }

  // accordion js
  const accordionTitlesArray = document.querySelectorAll(`[data-accordion]`);
  if (accordionTitlesArray.length > 0) {
    const accordionRegular = Array.from(accordionTitlesArray).filter(function (item, index, self) {
      return !item.dataset.accordion.split(",")[0]; // check media conditions in data attributes // data-accordion="850,max" or data-accordion
    });
    if (accordionRegular.length > 0) {
      initAccordion(accordionRegular);
    }
  }

  const titles = document.querySelectorAll('.accordion__title');
  titles.forEach((e) => {
    e.addEventListener('keypress', (event) => {
      if (event.which === 13) {
        setAccordionAction(e, true);
      }
    })
  })

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

  function getE(e, i = false) {
    if (!i) {
      const el = e.target;
      return el;
    } else {
      const el = e;
      return el;
    }
  }

  function setAccordionAction(e, i = false) {
    if (getE(e, i).hasAttribute('data-title-accordion') || getE(e, i).closest(`[data-title-accordion]`)) {
      const accordionTitle = getE(e, i).hasAttribute('data-title-accordion') ? getE(e, i) : getE(e, i).closest(`[data-title-accordion]`);
      const parentBlock = accordionTitle.closest(`[data-accordion]`);
      const bodyBlock = accordionTitle.nextElementSibling;
      const oneAccordion = bodyBlock.closest(`[data-one-accordion]`) ? true : false;
      if (!bodyBlock.querySelectorAll('.slide').length) {
        accordionTitle.classList.add('is-active');
        accordionTitle.nextElementSibling.classList.add('alpha');
        setTimeout(() => {
          accordionTitle.nextElementSibling.classList.remove('alpha');
        }, 550);
        if (oneAccordion) {
          document.querySelectorAll(`[data-title-accordion]`).forEach(function (elem) {
            if (elem.classList.contains('is-active') && !elem.nextElementSibling.hasAttribute('hidden')) {
              hideAccodrionBody(elem);
            }
          })
        }
        slideToggle(accordionTitle.nextElementSibling, 500);
      }
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
  // guests-content
  let personBtn = document.querySelectorAll('.guests__btn');
  let personContent = document.querySelectorAll('.guests__content');
  let socialListGuests = document.querySelector('.social-list')
  personBtn.forEach(function (btnClick) {
    btnClick.addEventListener('click', function (event) {
      event.preventDefault();
      const person = event.currentTarget.dataset.person;
      personBtn.forEach(function (delLastActive) {
        delLastActive.classList.remove('is-active');
      });
      personContent.forEach(function (delLastActive) {
        delLastActive.classList.remove('is-active');
      });
      document.querySelector(`[data-person="${person}"]`).classList.add('is-active');
      document.querySelector(`[data-target-person="${person}"]`).classList.add('is-active');
      if (window.innerWidth <= 1023) {
        document.querySelector(`[data-target-person="${person}"]`).scrollIntoView(
          {
            block: 'nearest',
            behavior: 'smooth'
          }
        );
      }
      socialListGuests.classList.remove('is-active');
      setTimeout(() => {
        socialListGuests.classList.add('is-active');
      }, 10); /* Добавил setTimeout, т.к. если написать подряд remove is-active и add is-active, то не срабатывает keyframe в css(Не разобрался почему) */
    })
  })

  // playlist-content
  let inputs = document.querySelectorAll('.check__input');
  let playlistItems = document.querySelectorAll('.playlist__item');
  inputs.forEach(function (inputClick) {
    inputClick.addEventListener('click', (event) => {
      //event.preventDefault();
      const genre = event.currentTarget.dataset.genre;
      playlistItems.forEach((del) => {
        del.classList.remove('showing');
      })
      /*inputs.forEach((active) => {
        active.removeAttribute('checked');
      })
      document.querySelector(`[data-genre=${genre}]`).setAttribute('checked', 'true');*/
      if (!document.querySelectorAll(`[data-target-genre="${genre}"]`).length > 0) {
        document.querySelector('.no-playlist').classList.add('showing');
      } else {
        document.querySelectorAll(`[data-target-genre="${genre}"]`).forEach((e) => {
          e.classList.add('showing');
          document.querySelector('.no-playlist').classList.remove('showing');
        });
      };
    })
  })


  // podcasts
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

  const morePodcasts = document.querySelector('.podcasts__link');
  morePodcasts.addEventListener('click', (e) => {
    e.preventDefault();
    const podcastsArray = [podcastsItem[0].cloneNode(true), podcastsItem[1].cloneNode(true), podcastsItem[2].cloneNode(true), podcastsItem[3].cloneNode(true)];
    for (let i = 0; i < 4; i++) {
      document.querySelector('.podcasts__list').appendChild(podcastsArray[i]);
    }
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
  if (broadSelect) {
    broadSelect.addEventListener('change', function () {
      const name = broadSelect.options[broadSelect.selectedIndex].getAttribute('value');
      broadcastsItems.forEach(function (delLastActive) {
        delLastActive.classList.remove('is-active');
      })
      document.querySelectorAll(`[data-target-broadcast="${name}"]`).forEach(function (el) {
        el.classList.add('is-active');
      })
    })
  }

  // validation form
  let form = document.querySelector('.about__form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputEmail = document.querySelector('.js-input-email'),
    inputName = document.querySelector('.js-input-name'),
    inputCheckbox = document.querySelector('.js-input-checkbox'),
    errBlocks = document.querySelectorAll('.form__error');

  if (inputCheckbox) {
    inputCheckbox.addEventListener('click', function () {
      inputCheckbox.closest('.about__check').classList.toggle('is-active');
    })
  }

  function validateEmail(email) {
    let regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regular.test(String(email).toLocaleLowerCase());
  }

  function validateName(name) {
    let reg = /^[а-яё]*$/i;
    return reg.test(String(name).toLocaleLowerCase());
  }

  if (form) {
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
  }

  // genre swiper
  let swipe = document.querySelectorAll('.swipe'),
    x1 = null,
    y1 = null,
    posX = 0;

  if (swipe.length > 0) {
    const swipersMedia = Array.from(swipe).filter(function (item, index, self) {
      return item.dataset.size.split(',')[0];
    });

    if (swipersMedia.length > 0) {
      const breakpointsArray = []; // contains media info
      swipersMedia.forEach(item => {
        const params = item.dataset.size;
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
        const swipe = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        // Event
        matchMedia.addEventListener('change', () => {
          initSwiper(swipe, matchMedia);
        });
      })
    }
    function initSwiper(swipe, matchMedia = false) {
      if (matchMedia.matches) {
        swipe[0].item.addEventListener('touchstart', handleTouchStart, false)
        swipe[0].item.addEventListener('touchmove', handleTouchMove, false)
      } else {
        swipe[0].item.removeEventListener('touchstart', handleTouchStart, false)
        swipe[0].item.removeEventListener('touchmove', handleTouchMove, false)
      }
    }

    function handleTouchStart(event, mobile = true) {
      if (mobile) {
        const firstTouch = event.touches[0];

        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
      }
    }

    function handleTouchMove(event, mobile = true) {
      if (!x1 || !y1) {
        return false;
      }
      let width = event.target.closest('.swipe').offsetWidth
      if (mobile) {
        let x2 = event.touches[0].clientX;
        let y2 = event.touches[0].clientY;
        let xDifferent = x2 - x1;
        let yDiffrenet = y2 - y1;

        if (Math.abs(xDifferent) > Math.abs(yDiffrenet)) {
          // right - left
          if (xDifferent > 0) {
            posX < width ? posX = 0 : posX += 180;
            event.target.closest('.swipe').style.transform = `translate3d(${(posX) + 'px'}, 0px, 0px)`;
          } else {
            Math.abs(posX) > width - 180 ? posX = 0 : posX -= 180;
            event.target.closest('.swipe').style.transform = `translate3d(${(posX) + 'px'}, 0px, 0px)`;
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
            event.target.closest('.swipe').style.transform = `translate3d(${(posX) + 'px'}, 0px, 0px)`;
          } else {
            posX < -1259 ? posX = 0 : posX -= 180;
            event.target.closest('.swipe').style.transform = `translate3d(${(posX) + 'px'}, 0px, 0px)`;
          }
        }
      }
      x1 = null;
      y1 = null;
    }
  }

  let genreLabels = document.querySelectorAll('.genre-list__label');
  genreLabels.forEach((e) => {
    e.addEventListener('click', (event) => {
      genreLabels.forEach((del) => {
        del.classList.remove('selected');
      })
      !event.target.closest('.genre-list__label').classList.contains('selected') ?
        event.target.closest('.genre-list__label').classList.add('selected') : event.target.closest('.genre-list__label').classList.remove('selected');
    })
  })



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
      spoilerBtn.closest('.header__bottom').classList.add('back');
    } else {
      document.querySelector('.live-list').style.transform = 'translateY(-1000px)';
      spoilerBtn.closest('.header__bottom').classList.remove('back');
      setTimeout(() => {
        spoilerBtn.classList.remove('is-open');
        document.querySelector('.live-list').style.transform = 'translateY(0px)';
      }, 500);
    }
  })

  // popup`s
  const populLinks = document.querySelectorAll('.popup-link'),
    body = document.querySelector('body');
  let unlock = true;
  const timeout = 800;

  if (populLinks.length > 0) {
    for (let index = 0; index < populLinks.length; index++) {
      const popupLink = populLinks[index];
      popupLink.addEventListener('click', (e) => {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        currentPopup.style.display = 'flex';
        setTimeout(() => {
          popupOpen(currentPopup);
        }, 100);
        e.preventDefault();
      });
    }
  }

  const popupCloseBtn = document.querySelectorAll('.close-popup');
  if (popupCloseBtn.length > 0) {
    for (let index = 0; index < popupCloseBtn.length; index++) {
      const el = popupCloseBtn[index];
      el.addEventListener('click', (e) => {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup.is-open');
      popupActive ? popupClose(popupActive, false) : bodyLock();
      currentPopup.classList.add('is-open');
      currentPopup.addEventListener('click', (e) => {
        !e.target.closest('.popup__content') ? popupClose(e.target.closest('.popup')) : false;
      })
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('is-open');
      doUnlock ? bodyUnLock() : false;
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.main-page').offsetWidth + 'px';
    //body.style.paddingRight = lockPaddingValue;
    body.classList.add('is-lock');

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(() => {
      //body.style.paddingRight = '0px';
      body.classList.remove('is-lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }



  // MailForm
  const formMail = document.getElementById('form');
  if (formMail) {
    formMail.addEventListener('submit', formSend);

    async function formSend(e) {
      e.preventDefault();

      let formData = new FormData(formMail);
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });

      formMail.classList.add('is-sending');
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formMail.reset();
        formMail.classList.remove('is-sending');
      } else {
        alert('Ошибка');
        formMail.classList.remove('is-sending');
      }
    }
  }
})
