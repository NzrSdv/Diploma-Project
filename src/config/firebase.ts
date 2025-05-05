
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbyMrSvaXKm0VL31HOAcukoGI1nUb2cl4",
    authDomain: "wineproject-85a44.firebaseapp.com",
    projectId: "wineproject-85a44",
    storageBucket: "wineproject-85a44.firebasestorage.app",
    messagingSenderId: "53677795854",
    appId: "1:53677795854:web:2f3efb31bd96d30f24ea5f",
    measurementId: "G-HD9KFW1Z9R"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

