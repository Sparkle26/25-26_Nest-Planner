import express from 'express';
import { getScheduleByID } from './firebase.js';
import cors from 'cors';
const app = express()
const port = 3000

app.use(cors());

app.use(express.json());

class Class {
  constructor(id, title, location, professor, day, time){
    this.id= id;
    this.title = title;
    this.location = location;
    this.professor = professor;
    this.day = day;
    this.time = time;
  }
}

const newclass = new Class("Cs250", "Title", "Out there", "tomorrow", "12 oclock")

const courseData = [
  {
  "class1":{id: 'CS1000',
    title: 'testclass',
    location: 'somewhere',
    day: 'MWF',
    time: '10:00am-12:30am'},

  "class2":{id: 'CS2000',
    title: 'testclass2',
    location: 'somewhere2',
    day: 'MWF2',
    time: '30:00am-12:30am'},


    "classclass":{id: newclass.id,
    title: newclass.title,
    location: newclass.location,
    day: newclass.day,
    time: newclass.time}
  }
]


app.get('/coursetest', (req, res) => {

  const{id, title, location, day, time } = req.query;

  res.json({
    ...courseData,
    id,
    title,
    location,
    day,
    time
  });
});


app.get('/schedule', async (req, res) => {

  let{year, semester, major} = req.query;
  console.log(year);
  semester = semester.toLowerCase();
  major = major.toLowerCase();

  const response = await getScheduleByID(year, semester, major);
  console.log(response);

  let courses = [];
  if(response){
    for (const [key,course] of Object.entries(response)) {
      course.id = key;
      courses.push(course);
    }
  }

  console.log(courses);

  res.json({
    courses: courses,
    year,
    semester,
    major
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



