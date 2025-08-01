// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDDyAw3_Ugu8GPmQp7lToDkPS2NUQNFHs",
  authDomain: "netflixgpt-9299b.firebaseapp.com",
  projectId: "netflixgpt-9299b",
  storageBucket: "netflixgpt-9299b.firebasestorage.app",
  messagingSenderId: "523312916272",
  appId: "1:523312916272:web:9414aa3db479fba1798af5",
  measurementId: "G-ZHQ9QNWRGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const actionCodeSettings = {
  url: 'https://netflixgpt-9299b.web.app/finishSignIn', // or any specific route/page where you’ll handle sign-in
  handleCodeInApp: true
};
export const auth = getAuth();