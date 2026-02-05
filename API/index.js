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

app.get('/coursetest', (req, res) => {
  res.json(courseData);
})

app.get('/coursetest/year', (req, res) => {
  res.json(courseData.Year)
})

app.get('/coursetest/semester', (req, res) => {
  res.json(courseData.Sem)
})

app.get('/coursetest/courses', (req, res) => {
  res.json(courseData.courses)
})

app.get('/coursetest', (req, res) => {
  const year = req.query.year;
  const sem =  req.query.semester;
  const major = req.query.major;
  res.json(courseData)
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


