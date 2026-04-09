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



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// class ResponseData {
//   constructor(year,semester,major,courses)
// }

async function AiCourseSchedule(year,semester,major,courses) {
  const prompt = `organize this given data into a class schedule: ${year} ${semester} ${major} ${JSON.stringify(courses)} ensure classes wont overlap, return the final schedule in .json format`
  console.log(prompt);
  try {

    // const response = await openai.responses.create({
      //  model: "gpt-5-nano", 
      //  input: "  prompt in here  "

    // });

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano", // model name might not be right
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 300,  // this will need to be changed
    });
    console.log(response.choices[0].message.content)
    return (response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI error:", error);
  }
}

const courses=[
  { title: "Computer Science I", id: "CS121", location: "Esbenshade 281", day: ["Mon", "Wed", "Fri"], time: "11:00" },
  { title: "Software Engineering", id: "CS341", location: "CS Lounge", day: ["Tue", "Thu"], time: "9:30"},
  // { title: "sample", id: "ms2000", location: "Lounge", day: ["Sun", "Thu"], time: "40:30"}
];

AiCourseSchedule(2025,"Spring","CS",courses);

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));