/* directive to delay input autofocus on cordova devices */

import { Platform } from 'quasar'

export const autofocus = {
  // inserted(el) {
  bind(el, binding) {
    //console.log(el)
    //console.log(binding)
    let input = el.querySelector('.q-field__native')
    let delay = 0
    if (Platform.is.cordova) {
      delay = 700
      if (binding.value && binding.value.delay) {
        delay = binding.value.delay
      }
    }

    setTimeout(() => {
      input.focus()
    }, delay)
  }
}
