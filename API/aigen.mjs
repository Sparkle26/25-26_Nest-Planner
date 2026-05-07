import OpenAI from "openai";
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { get_course_by_sem } from './firebase.js';



const app = express();
app.use(express.json());
app.use(cors()); // Allow cross-origin requests from your React app

// class ResponseData {
//   constructor(year,semester,major,courses)
// }

export async function AiCourseSchedule(year, semester, major, concentration) {
  try {
    console.log(`\n Checking Firebase for ${year} ${semester} courses...`);

    // First try to get courses from Firebase
    const firebaseCourses = await get_course_by_sem(semester, year);

    if (firebaseCourses && firebaseCourses.length > 0) {
      console.log(`Found ${firebaseCourses.length} courses in Firebase!`);
      return JSON.stringify({
        courses: firebaseCourses.map(course => ({
          id: course.id,
          title: course.title,
          location: course.location,
          instructor: course.professor,
          day: course.day,
          time: course.time
        }))
      });
    }

    console.log(`No Firebase courses found, generating with AI...`);

    // Fall back to AI generation
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log(`AI generating schedule for ${year} ${semester} ${major}${concentration ? ` - ${concentration}` : ''}`);

    const prompt = `Generate a class schedule for a student with these requirements:
- Year: ${year}
- Semester: ${semester}
- Major: ${major}
${concentration ? `- Concentration/Focus: ${concentration}` : ''}
Random seed: ${Math.random()}

Schedule constraints:
- Classes must not overlap
- Each class is 80 minutes long
- 10-minute gap between classes
- Classes can start at any time between 8:00 AM and 2:00 PM, ensuring no overlaps and 10-minute gaps between classes
- Include 4-5 relevant courses for this major${concentration ? ` with emphasis on ${concentration}` : ''}, generating different course names, IDs, and details each time for variety

Return ONLY valid JSON (no markdown, no code blocks) in this exact format:
{
  "courses": [
    { "id": "CS301", "title": "Data Structures", "location": "Building Room", "instructor": "", "day": "", "time": "" },
    { "id": "CS302", "title": "Algorithms", "location": "Building Room", "instructor": "", "day": "", "time": "" }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 500,
      temperature: 0.8,
    });

    let content = response.choices[0].message.content;

    // Strip markdown code blocks if present
    content = content.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');

    console.log(`AI generated schedule with ${content.match(/\"id\":/g)?.length || 0} courses`);
    return content;

  } catch (error) {
    console.error("Error in AiCourseSchedule:", error.message);
    return null;
  }
}

// Note: This function is called by server.mjs endpoint

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));