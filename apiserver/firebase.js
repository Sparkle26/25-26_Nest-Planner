/** This is the Firebase config file **/

/** 
 * To READ/WRITE the database, update the
 *  ./util/firebase_connection.js file. 
 * **/

// using import, not require. Figure out what we are using.
// Central Firebase initialization and helpers

import{initializeApp} from 'firebase/app';
import{getFirestore, collection, getDoc, doc} from 'firebase/firestore';
import{getAuth} from 'firebase/auth';
import 'dotenv/config';
//const {initializeApp} = require('firebase/app');
//const {getFirestore} = require('firebase/firestore');
//const {getAuth} = require('firebase/auth');

// we need a different way to load the env file
const FIREBASE_API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
console.log(PROCESS.env.EXPO_PUBLIC_FIREBASE_API_KEY);
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

async function getSchedules(db){
  //gets all the schedules from this collection
  const schedulesCol = collection(db, 'schedules');
  const scheduleSnapshot = await getDocs(schedulesCol);
  const scheduleList = scheduleSnapshot.docs.map(doc => doc.data());
  console.log(scheduleList);
  return scheduleList;
}

//year, semester, major
async function getScheduleByID(year, semester, major){
  const docID = year + "_" + semester + "_" + major;
  console.log(docID);
  const docRef = doc(db, "schedules", docID);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    console.log("Document Data:", docSnap.data());
    return docSnap.data();
  } else{
    console.log("Nothing found");
  }
}
getScheduleByID(2026, "fall", "cs");
//getSchedules(db);

export { app, db, auth, getScheduleByID };
