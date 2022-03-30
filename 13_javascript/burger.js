document.querySelector('.button__burger').addEventListener('click', function() {
  document.querySelector('.header__nav-list').classList.toggle('active')
  document.querySelector('.button__burger_exit').classList.toggle('hidden')
})

document.querySelector('.button__burger_exit').addEventListener('click', function() {
  document.querySelector('.header__nav-list').classList.toggle('active')
  document.querySelector('.button__burger_exit').classList.toggle('hidden')
})

