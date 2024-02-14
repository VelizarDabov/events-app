import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBF3gjVKumVbMIjASJdyn-YSXb_-cPHGWc",
    authDomain: "clone-69161.firebaseapp.com",
    projectId: "clone-69161",
    storageBucket: "clone-69161.appspot.com",
    messagingSenderId: "694707186793",
    appId: "1:694707186793:web:4a7968417798a70f8546f8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {db, auth, provider}