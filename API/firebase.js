/** This is the Firebase config file **/

/** 
 * To READ/WRITE the database, update the
 *  ./util/firebase_connection.js file. 
 * **/



// Central Firebase initialization and helpers

import{initializeApp} from 'firebase/app';
import{getFirestore, collection, getDoc, getDocs, doc, where, query} from 'firebase/firestore';
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
//create a new branch 
//figure this out!!!!!!
async function getAssignmentsByID(ID){
  const docID = ID;
  const docRef = doc(db, "Assignments",docID);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.exists());
  if(!docSnap.exists()){
    console.log("Nothing Found...");
    return null;
  } else {
    console.log("Document Data:", docSnap.data());
  }
  console.log(docID);
  const data = docSnap.data();
  //filtering the information pulled
  const filtered = {
    id: ID,
    title: data.name, 
    location: data.location,
    professor: data.professor,
    day: data.courseDate,
    time: data.time
  };
  console.log("Filtered: ", filtered);
  return filtered;
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
  } else{ // if we dont have it we gonna make funcitno call to parkers side to get his function that will be called insdie the else 
    console.log("Nothing found");
  }
}

async function get_course_by_sem(sem, year) {
  try {
    
    const assignmentsCol = collection(db, 'Assignments');
    const querySnapshot = await getDocs(assignmentsCol);

    const isEvenYear = year % 2 === 0;
    const yearTag = isEvenYear ? "even" : "odd";

    const courses = querySnapshot.docs
      .map(docSnap => {
        const data = docSnap.data();
        const semesterStr = data.Semesters;

        if (!semesterStr) return null;

        const normalized = semesterStr.toLowerCase();

        // MUST match semester first
        if (!normalized.includes(sem.toLowerCase())) return null;

        // Check if course specifies odd/even
        const hasOdd = normalized.includes("odd");
        const hasEven = normalized.includes("even");

        // If it's tied to a specific year, enforce match
        if (hasOdd || hasEven) {
          if (!normalized.includes(yearTag)) return null;
        }

        // Otherwise (no odd/even), include it (offered every year)

        return {
          id: docSnap.id,
          title: data.name,
          location: data.location,
          professor: data.professor,
          day: data.courseDate,
          time: data.time,
          semester: semesterStr
        };
      })
      .filter(Boolean);

    console.log(`Courses for ${sem} ${year}:`, courses);
    return courses;

  } catch (error) {
    console.error("Error getting courses by semester:", error);
    return [];
  }
}
//getAssignmentsByID(db);
//getScheduleByID(2026, "fall", "cs");
//getSchedules(db);
//only pull id, title, location, professor, time 
//getAssignmentsByID("CS121");
get_course_by_sem("spring", 2026);
//TODO: get all courses
export { app, db, auth, getScheduleByID, get_course_by_sem};

//TODO: push changes into Main
