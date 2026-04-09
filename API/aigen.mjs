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
  //const prompt = `organize this given data into a class schedule: ${year} ${semester} ${major} ${JSON.stringify(courses)} ensure classes wont overlap, return the final schedule in .json format`
  //console.log(prompt);
  try {

    const response = await openai.responses.create({
       model: "gpt-5-nano",
       input: `organize this given data into a class schedule: ${year} ${semester} ${major} ${JSON.stringify(courses)} ensure classes wont overlap, the classes will be 80 minutes long, there should be a gap of 10 minutes between classes. Classes can start between 8:00AM and 3:30PM. return the final schedule in .json format`
    });

    // const response = await openai.chat.completions.create({
    //   model: "gpt-5-nano", // model name might not be right
    //   messages: [{ role: "user", content: prompt }],
    //   max_completion_tokens: 300,  // this will need to be changed
    // });

    console.log(response);
    return (response.output_text);
  } catch (error) {
    console.error("OpenAI error:", error);
  }
}

const courses=[
  { title: "Computer Science 1 A", id: "CS121a", location: "Esbenshade 281", day: ["Mon", "Wed", "Fri"]},
  { title: "Computer Science 1 B", id: "CS121b", location: "Esbenshade 281", day: ["Mon", "Wed", "Fri"]},
  { title: "Computer Science 2", id: "CS221", location: "Esbenshade 281", day: ["Mon", "Wed", "Fri"]},
  { title: "Software Engineering", id: "CS341", location: "CS Lounge", day: ["Tue", "Thu"]},
  { title: "Algorithms", id: "CS322", location: "Esbenshade 281", day: ["Tue", "Thu"]},
];

AiCourseSchedule(2025,"Spring","CS",courses);

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));