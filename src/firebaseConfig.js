// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxB1hhMgjovaPXwh-TpHRDhYuzC3gFRDk",
  authDomain: "mastersecurity-2edea.firebaseapp.com",
  projectId: "mastersecurity-2edea",
  storageBucket: "mastersecurity-2edea.appspot.com",
  messagingSenderId: "353865525889",
  appId: "1:353865525889:web:60d0c51bcd63b5e741bb80",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
