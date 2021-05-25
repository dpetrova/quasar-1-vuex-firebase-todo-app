import { firebaseAuth } from 'boot/firebase'
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from 'src/functions/show-error-message'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  register({}, payload) {
    Loading.show()
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        //console.log(response)
      })
      .catch(error => {
        //console.log(error.message)
        showErrorMessage(error.message)
      })
  },
  login({}, payload) {
    Loading.show()
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        //console.log(response)
      })
      .catch(error => {
        //console.log(error.message)
        showErrorMessage(error.message)
      })
  },
  logout({}, payload) {
    firebaseAuth.signOut()
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        // User is logged in
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => {})
        dispatch('tasks/fbReadData', null, { root: true }) //dispatch take 3 parameters: 1-> action, 2-> payload, 3->options object
      } else {
        // User is logged out
        //commit('tasks/clearTasks', null, { root: true })
        commit('tasks/setTasksDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        //The big difference between push and replace, is that while pushState will create a new entry in the browser's history, replaceState will only replace the current state
        //The router history works like a stack of routes. When you use the router.replace, you're overwritting the top of the the stack.
        //When using the router.push, it adds a new route to the top of the stack
        //The router history allows you to go back to the last page. E.g, when the user navigates to a invalid route,
        //you can use the router.replace to prevent the user to navigate back to the invalid route.
        this.$router.replace('/auth').catch(err => {}) //prevent user go back
      }
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
