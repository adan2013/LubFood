import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDRdHmJADtfgGpVkNCP55h1jbYkMUDY1GM",
    authDomain: "lubfoodgh.firebaseapp.com",
    projectId: "lubfoodgh",
    storageBucket: "lubfoodgh.appspot.com",
    messagingSenderId: "719043369683",
    appId: "1:719043369683:web:6b35ccb6f9d50abebad226"
}
firebase.initializeApp(firebaseConfig)

export default firebase
