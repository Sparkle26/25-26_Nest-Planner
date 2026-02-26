/** This is the Firebase config file **/

/** 
 * To READ/WRITE the database, update the
 *  ./util/firebase_connection.js file. 
 * **/



// Central Firebase initialization and helpers

import{initializeApp} from 'firebase/app';
import{getFirestore, collection, getDoc, getDocs, doc} from 'firebase/firestore';
import{getAuth} from 'firebase/auth';
import 'dotenv/config';
//const {initializeApp} = require('firebase/app');
//const {getFirestore} = require('firebase/firestore');
//const {getAuth} = require('firebase/auth');

// we need a different way to load the env file
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
console.log(FIREBASE_API_KEY);
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

async function getAssignments(db){
  //get classes when there isn't a schedule pre-made
  try{
    const assignmentsCol = collection(db, 'Assignments');
    const assignmentsSnapshot = await getDocs(assignmentsCol);
    const assignmentList = assignmentsSnapshot.docs.map(doc => doc.data());
    console.log("Assignments:", assignmentList);
    return assignmentList;
  } catch (error){
    console.error("Error getting assignments:", error);
  }
}

async function getAssignmentsByID(ID){
  const docID= ID;
  const docRef = doc(db, "Assignements",docID);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    console.log("Document Data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("Nothing found");
  }
  console.log(assignmentID);
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

//getAssignmentsByID(db);
//getScheduleByID(2026, "fall", "cs");
//getSchedules(db);

export { app, db, auth, getScheduleByID, getAssignmentsByID};
