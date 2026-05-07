// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
//const OpenAI = require('openai');
import OpenAI from "openai";
import express from 'express';
import cors from 'cors';
import 'dotenv/config';



const app = express();
app.use(express.json());
app.use(cors()); // Allow cross-origin requests from your React app

// class ResponseData {
//   constructor(year,semester,major,courses)
// }

import { AiCourseSchedule } from './aigen.mjs';

app.get('/schedule', async (req, res) => {
  try {
    const { year, semester, major, concentration } = req.query;
    
    console.log(`\n📚 Backend request: ${year} ${semester} ${major}${concentration ? ` (${concentration})` : ''}`);
    
    // Call aigen.mjs to generate schedule with OpenAI
    const aiResult = await AiCourseSchedule(year, semester, major, concentration);
    
    if (!aiResult) {
      return res.json({ courses: [] });
    }
    
    // Parse the response
    let parsed;
    try {
      parsed = JSON.parse(aiResult);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError.message);
      const jsonMatch = aiResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        return res.json({ courses: [] });
      }
    }
    
    const courses = Array.isArray(parsed.courses) ? parsed.courses : [];
    console.log(`Returning ${courses.length} courses`);
    
    res.json({
      courses,
      year,
      semester,
      major,
      concentration
    });
  } catch (error) {
    console.error('Error in /schedule endpoint:', error);
    res.status(500).json({ courses: [], error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});