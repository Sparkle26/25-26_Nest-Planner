import express from 'express';
const app = express()
const port = 3000

app.use(express.json());

const courseData = {
    id: 'CS1000',
    title: 'testclass',
    location: 'somewhere',
    day: 'MWF',
    time: '10:00am-12:30am'
}

7
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// app.use(cors());
