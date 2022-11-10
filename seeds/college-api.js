const axios = require("axios");

// array containing all college data
const collegeResultsData = [];
let pageNumber;
let numPages = 0;
// TODO: hide api key
// Currently querying for schools of at least 5,000 students
let url =
	"https://api.data.gov/ed/collegescorecard/v1/schools.json?2020.student.size__range=5000..&_fields=school.zip,school.city,school.state,school.school_url,2020.student.size,2020.student.demographics.men,2020.student.demographics.women,2020.cost.tuition.in_state,2020.cost.tuition.out_of_state,2020.cost.roomboard.oncampus,2020.cost.roomboard.offcampus,2020.cost.avg_net_price.public,2020.cost.avg_net_price.private,2020.completion.consumer_rate,2020.admissions.admission_rate.overall,2020.academics.program_available.assoc,2020.academics.program_available.bachelors&per_page=100&page=" +
	pageNumber +
	"&api_key=dra3zfoeWMdlOAkY6G0ceNBrdM1sYscwYQbnINMA";
let starterurl =
	"https://api.data.gov/ed/collegescorecard/v1/schools.json?2020.student.size__range=5000..&_fields=school.zip,school.city,school.state,school.school_url,2020.student.size,2020.student.demographics.men,2020.student.demographics.women,2020.cost.tuition.in_state,2020.cost.tuition.out_of_state,2020.cost.roomboard.oncampus,2020.cost.roomboard.offcampus,2020.cost.avg_net_price.public,2020.cost.avg_net_price.private,2020.completion.consumer_rate,2020.admissions.admission_rate.overall,2020.academics.program_available.assoc,2020.academics.program_available.bachelors&per_page=100&page=0&api_key=dra3zfoeWMdlOAkY6G0ceNBrdM1sYscwYQbnINMA";
const getColleges = (currentPageNumber) => {
	pageNumber = currentPageNumber;
	return axios.get(url).then((data) => {
		console.log(url);
		// returns an array of only college results data
		// instead of console logging, push it to collegeResultsData
		if (data.data.results.length > 0) {
			// console.log("This is data.data.results");
			// console.log(data.data.results);
			return data.data.results;
		} else {
			console.log("None");
			return;
		}
		// then repeat steps for the next api page
	});
};

axios
	.get(starterurl)
	.then((data) => {
		const totalData = data.data.metadata.total;
		numPages = Math.ceil(totalData / 100); // will return the number of pages within the api query
		console.log("This is the number of pages");
		console.log(numPages);
	})
	.then(() => {
		for (var i = 0; i < numPages; i++) {
			pageNumber = i;
			console.log("This is current index");
			console.log(i);
			// let x = getColleges().then(() => {
			// console.log("This is getColleges function");
			// console.log(x);
			// collegeResultsData.push(getColleges());
			collegeResultsData.push(getColleges(i));
			console.log("This is the length of the api call");
			console.log();
		}
		console.log("This is the end");
		console.log(collegeResultsData.length);
	});

// push each page's array to collegeResultsData
// at the end, collegeResultsData.flat to remove nested arrays
