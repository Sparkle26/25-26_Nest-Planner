// firebase data access using the shared firebase initializer
import { db } from "../firebase";

import { doc, getDoc } from "firebase/firestore";

export async function getSchedule(year, semester, major) {
  semester = semester.toLowerCase();
  major = major.toLowerCase();
  const id = `${year}_${semester}_${major}`; // document id, e.g., "2026_spring_cs"

  const docRef = doc(db, "schedules", id); // reference to the document

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() };
      console.log("schedule:", data);
      return data;
    } else {
      console.log("No schedule found for id:", id);
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}