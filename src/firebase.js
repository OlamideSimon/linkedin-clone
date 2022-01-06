import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD2GOi97slRJ5emP20zUiBkTGrFIr9dR1c",
  authDomain: "linkedin-clone-25081.firebaseapp.com",
  projectId: "linkedin-clone-25081",
  storageBucket: "linkedin-clone-25081.appspot.com",
  messagingSenderId: "135473239988",
  appId: "1:135473239988:web:2d79bf104894e23b50c4e1"
};

initializeApp(firebaseConfig)
const db = getFirestore();
const auth = getAuth();

export {db, auth};