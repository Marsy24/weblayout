document.addEventListener('DOMContentLoaded', function() {
  let burger = document.querySelector('.burger-menu')
  let menu = document.querySelector('.nav__list')
  burger.addEventListener('click', function() {
    burger.classList.toggle('is-active')
    menu.classList.toggle('is-open')
  })
})
