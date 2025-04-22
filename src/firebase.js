// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
  } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqISftnvhG2QUuimVRax8pezR56SY4OKY",
  authDomain: "e-commerce-99da8.firebaseapp.com",
  databaseURL: "https://e-commerce-99da8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerce-99da8",
  storageBucket: "e-commerce-99da8.firebasestorage.app",
  messagingSenderId: "735630252133",
  appId: "1:735630252133:web:ba1e567dd759c7d40e0e8c",
  measurementId: "G-7Y49ECYRMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
  };