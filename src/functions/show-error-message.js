import { Dialog, Loading } from 'quasar'

export function showErrorMessage(errorMsg) {
  Loading.hide()
  Dialog.create({
    title: 'Error',
    message: errorMsg
  })
}
