// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB4_Ew8tfW5359c0MH1ZBybv4qvmNzIB8I",
  authDomain: "chat-app-react-b03d9.firebaseapp.com",
  projectId: "chat-app-react-b03d9",
  storageBucket: "chat-app-react-b03d9.appspot.com",
  messagingSenderId: "269784705732",
  appId: "1:269784705732:web:26b7b8d12633c4229af791",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
