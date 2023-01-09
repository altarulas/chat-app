// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYgl7CKVkVmkJrVZ2aPSjb8yJJzu8aAqQ",
  authDomain: "chat-app-react-de766.firebaseapp.com",
  projectId: "chat-app-react-de766",
  storageBucket: "chat-app-react-de766.appspot.com",
  messagingSenderId: "302844758741",
  appId: "1:302844758741:web:834661d89991827144305c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
