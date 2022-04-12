document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.step-item__link').forEach(function(stepLink) {
    stepLink.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path
      console.log(path)

      document.querySelectorAll('.step-item__link').forEach(function(el) {
        el.classList.remove('step-item__link_active')
      })
      document.querySelectorAll('.how__slider-item').forEach(function(stepContent) {
        stepContent.classList.remove('how__slider-item-active')
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('step-item__link_active')
      document.querySelector(`[data-target="${path}"]`).classList.add('how__slider-item-active')
    })
  })
})
