import express from 'express';
import { AiCourseSchedule } from "./aigen.mjs";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/schedule', async (req, res) => {
  try {
    let { year, semester, major, concentration } = req.query;

    console.log(`Request for schedule: ${year} ${semester} ${major}${concentration ? ` (${concentration})` : ''}`);

    // Call aigen which handles Firebase lookup + OpenAI generation
    const aiResult = await AiCourseSchedule(year, semester, major, concentration);
    
    if (!aiResult) {
      return res.json({ courses: [] });
    }

    // Parse the response
    let parsed;
    try {
      parsed = JSON.parse(aiResult);
    } catch (parseError) {
      const jsonMatch = aiResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        return res.json({ courses: [] });
      }
    }

    const courses = Array.isArray(parsed.courses) ? parsed.courses : Object.values(parsed).filter(item => item.title);
    
    console.log(`Returning ${courses.length} courses`);
    
    res.json({
      courses,
      year,
      semester,
      major,
      concentration
    });
  } catch (error) {
    console.error("Error in /schedule endpoint:", error);
    res.status(500).json({ courses: [], error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
