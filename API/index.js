const { default: TimeTable } = require('@mikezzb/react-native-timetable')
const express = require('express')
const app = express()
const port = 3000



// const courseData = {

//     "2025" : {
//         Fall: {
//             courseCode: "Testcourse",
//         },
//         Spring: {
//             courseCode: "SpringTestcourse",
//         }
//     }
// }


app.get('/coursetest', (req, res) => {
id        = req.query.id;
title     = req.query.title;
location  = req.query.location;
day       = req.query.day;
time      = req.query.time;
res.json(courseData);
})



const courseData = {

  Year: 2026,
  Sem: "Spring",
  Maj: "CS",

  courses: [
    
    {
      name: 'CS1',
      code: 'cs121',
      day: 'MWF',
      time: '11:00am-12:20pm',
    }
  ] 

    
  
}

// app.get('/coursetest', (req, res) => {
//   res.json(courseData);
// })

// app.get('/coursetest/year', (req, res) => {
//   res.json(courseData.Year)
// })

// app.get('/coursetest/semester', (req, res) => {
//   res.json(courseData.Sem)
// })

// app.get('/coursetest/courses', (req, res) => {
//   res.json(courseData.courses)
// })

// app.get('/coursetest', (req, res) => {
//   const year = req.query.year;
//   const sem =  req.query.semester;
//   const major = req.query.major;
//   res.json(courseData)
// })

// app.get('/schedule', (req, res) => {         <- possible final version (to be updated
//   const year = req.query.year;
//   const sem =  req.query.semester;
//   const major = req.query.major;

//   res.json()
// })



// app.post      <- will eventually post info to the database to reuse

// app.get (/'coursetest/made, (req, res) => {            <- will eventually pull this saved info from the database
//  res.json(courseData.made)
//})


// app.get('/test', (req, res) => {           <- testing .get for utility purposes
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// app.use(cors());

app.use(express.json());


