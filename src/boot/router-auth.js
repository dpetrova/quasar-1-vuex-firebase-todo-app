import { LocalStorage } from 'quasar'

export default ({ router }) => {
  //beforeEach is a hook which is fired every time when user ties to navigate from one page to another
  router.beforeEach((to, from, next) => {
    // console.log('from: ', from)
    // console.log('to: ', to)
    let loggedIn = LocalStorage.getItem('loggedIn')
    if (!loggedIn && to.path !== '/auth') {
      next('/auth')
    } else {
      next()
    }
  })
}
