import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA3cPzB9yu-dEm8RLn1lOWNotul_ldpgBY",
    authDomain: "music-57082.firebaseapp.com",
    projectId: "music-57082",
    storageBucket: "music-57082.appspot.com",
    appId: "1:688513588038:web:0ad91989b9523896ff6347"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users')

export { auth, db, usersCollection }