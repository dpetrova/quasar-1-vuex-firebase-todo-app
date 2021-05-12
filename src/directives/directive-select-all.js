/* directive to auto select all text in input field when focus */

export const selectAll = {
  // inserted(el) {
  bind(el) {
    let input = el.querySelector('.q-field__native')
    input.addEventListener('focus', () => {
      if (input.value.length) {
        input.select()
      }
    })
  }
}
