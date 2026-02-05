/** This is the Firebase config file **/

/** 
 * To READ/WRITE the database, update the
 *  ./util/firebase_connection.js file. 
 * **/

// Central Firebase initialization and helpers
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const FIREBASE_API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "nest-planner.firebaseapp.com",
  projectId: "nest-planner",
  storageBucket: "nest-planner.firebasestorage.app",
  messagingSenderId: "98058962015",
  appId: "1:98058962015:web:3fb7086d88d5485de8c7ea",
  measurementId: "G-J4YESMWSVM"
};

// Initialize Firebase App, Firestore and Auth once for the whole app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
