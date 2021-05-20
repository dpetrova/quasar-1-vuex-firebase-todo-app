// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBlPKKltZZJ5bZMROB2SnduWX-uFFNRWrc',
  authDomain: 'awesome-todo-e40c4.firebaseapp.com',
  databaseURL: 'https://awesome-todo-e40c4-default-rtdb.firebaseio.com',
  projectId: 'awesome-todo-e40c4',
  storageBucket: 'awesome-todo-e40c4.appspot.com',
  messagingSenderId: '118698577946',
  appId: '1:118698577946:web:54850c326cca079f1f81a3'
}

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)

let firebaseAuth = firebaseApp.auth()

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}

export { firebaseAuth }
