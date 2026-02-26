const express = require('express')
const cors = require('cors'); //gets our cors
const app = express()
const port = 3000

app.use(cors());

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

// const courseData = {

//   Year: 2026,
//   Sem: "Spring",
//   Maj: "CS",

//   courses: [
    
//     {
//       name: 'CS1',
//       code: 'cs121',
//       day: 'MWF',
//       time: '11:00am-12:20pm',
//     }
//   ] 
// }

const courseData2 = {
  
  Year: 2026,
  Sem: "Spring",
  Maj: "CS",

  courses: [
    { title: "Computer Science I",
      id: "CS121",
      location:"Esbenshade 281",
      day: ["Mon", "Wed", "Fri"],
      time: "11:00",
    },

    { title: "Software Engineering",
      id: "CS341",
      location: "CS Lounge",
      day: ["Tue", "Thu"],
      time: "9:30",
    },
  ]
}


app.get('/coursetest', (req, res) => {
  const year = req.query.year;
  const sem =  req.query.semester;
  const major = req.query.major;
  res.json(courseData2)
})

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


