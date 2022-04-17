document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger-menu')
  const menu = document.querySelector('.nav__list')
  burger.addEventListener('click', function() {
    burger.classList.toggle('is-active')
    menu.classList.toggle('is-open')
  })
})
