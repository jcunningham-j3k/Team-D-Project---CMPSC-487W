// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl2ET5y3N5yI5aYTgCOiRr0hcIxm4Zj1o",
  authDomain: "launchbox-ea67f.firebaseapp.com",
  projectId: "launchbox-ea67f",
  storageBucket: "launchbox-ea67f.firebasestorage.app",
  messagingSenderId: "263774634016",
  appId: "1:263774634016:web:135ab74a3dd585acf0bc45",
  measurementId: "G-LRYX5SMZN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);