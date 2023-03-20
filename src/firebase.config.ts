// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFN3kuymM8q2nPPAzVbzt_6SeJNiUwbC4",
  authDomain: "application-generator-40de2.firebaseapp.com",
  projectId: "application-generator-40de2",
  storageBucket: "application-generator-40de2.appspot.com",
  messagingSenderId: "800559498830",
  appId: "1:800559498830:web:604210db2200aa6206651f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);