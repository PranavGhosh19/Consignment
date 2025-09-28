import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCgvXgIEWoueN6dkqn1P4AcVWt_G_QSVw",
  authDomain: "shipping-battlefield.firebaseapp.com",
  databaseURL: "https://shipping-battlefield-default-rtdb.firebaseio.com",
  projectId: "shipping-battlefield",
  storageBucket: "shipping-battlefield.appspot.com",
  messagingSenderId: "154914599500",
  appId: "1:154914599500:web:2c3ea470544b4cc5433ae9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
