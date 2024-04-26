// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEnaAVxKh1DWNDxS8IjIYPBlEshWrp6EQ",
  authDomain: "hotelbooking-5e567.firebaseapp.com",
  projectId: "hotelbooking-5e567",
  storageBucket: "hotelbooking-5e567.appspot.com",
  messagingSenderId: "744596646545",
  appId: "1:744596646545:web:8f9476e0dd36c620d16d30",
  measurementId: "G-WGQP63YMZM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
