import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/schedule';

export async function getSchedule(year, semester, major, concentration) {
    console.log("Requesting schedule:", { year, semester, major, concentration });
    
    try {
        const params = new URLSearchParams({
            year: year,
            semester: semester,
            major: major,
            concentration: concentration || ''
        });
        
        const url = BACKEND_URL + "?" + params.toString();
        console.log("Request URL:", url);
        
        const response = await axios.get(url);
        console.log(`Got ${response.data.courses.length} courses`);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching schedule:", error.message);
        return { courses: [] };
    }
}

//getSchedule(2026, "Spring", "CS")