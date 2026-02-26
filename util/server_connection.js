import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/schedule';

export async function getSchedule(year,semester, major) {
    console.log (year, semester, major);
    const url = BACKEND_URL + "?year=" + year + "&semester=" + semester + "&major=" + major;
    console.log(url)
    const response = await axios.get(url)  //check this line 

    console.log (response.data);

    return response.data;
}

//getSchedule(2026, "Spring", "CS")