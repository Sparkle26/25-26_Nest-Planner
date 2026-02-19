import express from 'express';
const app = express()
const port = 3000

app.use(express.json());

class Class {
  constructor(id, title, location, day, time){
    this.id= id;
    this.title = title;
    this.location = location;
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
