document.querySelector('#btn__search').addEventListener('click', function() {
  document.querySelector('.form-search').classList.add('active')
  document.querySelector('#btn__search').classList.add('none')
  document.querySelector('.nav-list').classList.add('active-search')
  document.querySelector('.header').classList.add('adaptive-search')
})
document.querySelector('.header__seacrh_exit').addEventListener('click', function() {
  document.querySelector('.form-search').classList.remove('active')
  document.querySelector('#btn__search').classList.remove('none')
  document.querySelector('.nav-list').classList.remove('active-search')
  document.querySelector('.header').classList.remove('adaptive-search')
})
