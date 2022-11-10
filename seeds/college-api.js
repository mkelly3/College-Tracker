const axios = require("axios");

// array containing all college data
const collegeResultsData = [];

// TODO: hide api key
// Currently querying for schools of at least 5,000 students
const url =
	"https://api.data.gov/ed/collegescorecard/v1/schools.json?2020.student.size__range=5000..&_fields=school.zip,school.city,school.state,school.school_url,2020.student.size,2020.student.demographics.men,2020.student.demographics.women,2020.cost.tuition.in_state,2020.cost.tuition.out_of_state,2020.cost.roomboard.oncampus,2020.cost.roomboard.offcampus,2020.cost.avg_net_price.public,2020.cost.avg_net_price.private,2020.completion.consumer_rate,2020.admissions.admission_rate.overall,2020.academics.program_available.assoc,2020.academics.program_available.bachelors&api_key=dra3zfoeWMdlOAkY6G0ceNBrdM1sYscwYQbnINMA";

axios.get(url).then(function (data) {
	// returns an array of only college results data
	// instead of console logging, push it to collegeResultsData
	console.log(data.data.results);

	// then repeat steps for the next api page
});

// push each page's array to collegeResultsData
// at the end, collegeResultsData.flat to remove nested arrays
