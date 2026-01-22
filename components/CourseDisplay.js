// src/components/CourseDisplay.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../firebase'; // Import your initialized Firestore instance

function CourseDisplay() {
  // State to hold your course data
  const [courses, setCourses] = useState([]);
  // NEW: State to hold your assignment data
  const [assignments, setAssignments] = useState([]);

  // Optional: Loading and error states for both data types
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [errorCourses, setErrorCourses] = useState(null);
  const [errorAssignments, setErrorAssignments] = useState(null);

  // useEffect to fetch courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollectionRef = collection(db, 'courses');
        const querySnapshot = await getDocs(coursesCollectionRef);
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesData);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setErrorCourses("Failed to load courses.");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []); // Runs once on mount

  // NEW: useEffect to fetch assignments data
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Reference to your 'assignments' collection
        const assignmentsCollectionRef = collection(db, 'assignments');
        // Optional: order assignments, e.g., by dueDate
        const q = query(assignmentsCollectionRef, orderBy('dueDate', 'asc'));
        const querySnapshot = await getDocs(q);

        // Map the documents into an array of JavaScript objects
        const assignmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAssignments(assignmentsData); // Update state with fetched assignments
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setErrorAssignments("Failed to load assignments.");
      } finally {
        setLoadingAssignments(false);
      }
    };

    fetchAssignments();
  }, []); // Runs once on mount

  // Render logic
  if (loadingCourses || loadingAssignments) {
    return <p>Loading data...</p>;
  }

  if (errorCourses || errorAssignments) {
    return (
      <div>
        {errorCourses && <p style={{ color: 'red' }}>Error: {errorCourses}</p>}
        {errorAssignments && <p style={{ color: 'red' }}>Error: {errorAssignments}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>Our Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available yet.</p>
      ) : (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              <h2>{course.name}</h2>
              <p>{course.description}</p>
              {course.prerequisite && course.prerequisite.length > 0 && (
                <p>Prerequisites: {course.prerequisite.map(prereqRef => prereqRef.id).join(', ')}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      <hr /> {/* Separator */}

      <h1>Current Assignments</h1>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map(assignment => (
            <li key={assignment.id}>
              <h3>{assignment.title} (Course: {assignment.course})</h3>
              <p>{assignment.description}</p>
              <p>Due: {assignment.dueDate?.toDate().toLocaleDateString() || 'N/A'}</p> {/* Handle Timestamp conversion */}
              <p>Status: {assignment.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseDisplay;
