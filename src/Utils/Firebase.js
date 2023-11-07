// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5rSvEC_fuxhXhouRBuRf6IPS9BZIByYs",
  authDomain: "netflixgpt-dd9a2.firebaseapp.com",
  projectId: "netflixgpt-dd9a2",
  storageBucket: "netflixgpt-dd9a2.appspot.com",
  messagingSenderId: "57799439130",
  appId: "1:57799439130:web:bbe868a54e61a3aa2c72a3",
  measurementId: "G-Z57L7796HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth  = getAuth();