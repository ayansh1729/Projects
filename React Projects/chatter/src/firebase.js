// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsB7N6MHQ6kn-CCXmajKYpI1JtgfUBe4o",
  authDomain: "chatter-b4cfe.firebaseapp.com",
  projectId: "chatter-b4cfe",
  storageBucket: "chatter-b4cfe.appspot.com",
  messagingSenderId: "962879468860",
  appId: "1:962879468860:web:42d9046fa26cc737d29a39",
  measurementId: "G-C9QCZ49QBW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); //new is used for creating an instance of user-defined data-type

export { auth, provider };
export default db;
