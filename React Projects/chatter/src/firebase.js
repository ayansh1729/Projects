// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGhkk041T_VfaBV-q_3cT9M53LMUbaGLk",
  authDomain: "chatter-436ca.firebaseapp.com",
  projectId: "chatter-436ca",
  storageBucket: "chatter-436ca.appspot.com",
  messagingSenderId: "392050185651",
  appId: "1:392050185651:web:1c259e9a146ae2cf7267c6",
  measurementId: "G-M0MQ4CMYH9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); //new is used for creating an instance of user-defined data-type

export { auth, provider };
export default db;
