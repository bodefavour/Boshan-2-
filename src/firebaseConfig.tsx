// firebase.js
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ84wdH3g8q72nczRSrsRSefJJfc196AA",
  authDomain: "boshan-store.firebaseapp.com",
  projectId: "boshan-store",
  storageBucket: "boshan-store.firebasestorage.app",
  messagingSenderId: "615236015310",
  appId: "1:615236015310:web:a381d4c12ca6667f316c9f",
  measurementId: "G-0SVNNJ55PY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
