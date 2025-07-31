// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzE7P5yyKyAfNeQ_eq7lmyhyXUKxcqHA8",
  authDomain: "netflixgpt-9c2ed.firebaseapp.com",
  projectId: "netflixgpt-9c2ed",
  storageBucket: "netflixgpt-9c2ed.firebasestorage.app",
  messagingSenderId: "213312168498",
  appId: "1:213312168498:web:4191cf525ea59c1b5b522b",
  measurementId: "G-9KFY4RS107"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);