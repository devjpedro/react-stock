import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOrLvLPYJG_FosnG68V8PZ5YJ4FSc_8Mk",
  authDomain: "react-stock-de921.firebaseapp.com",
  projectId: "react-stock-de921",
  storageBucket: "react-stock-de921.appspot.com",
  messagingSenderId: "905286091679",
  appId: "1:905286091679:web:7c5b4034ae8cc7e48cf3aa",
  measurementId: "G-B2P84QZWG6",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
