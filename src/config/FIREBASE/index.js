import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGzy9DHdsSqsxuPeMQ8Vy6hsE6xr-0llc",
  authDomain: "pab-angela.firebaseapp.com",
  projectId: "pab-angela",
  storageBucket: "pab-angela.firebasestorage.app",
  messagingSenderId: "153153070356",
  appId: "1:153153070356:web:aa0adb9c2d6358f3640e01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const FIREBASE = firebase;

export default FIREBASE;