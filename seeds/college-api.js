const axios = require("axios");
const fs = require("fs");
// array containing all college data
const collegeResultsData = [];
let pageNumber;
let numPages = 0;

// base url to find number of pages in the api query (includes)
let url =
	"https://api.data.gov/ed/collegescorecard/v1/schools.json?2020.student.size__range=5000..&_fields=school.name,school.zip,school.city,school.state,school.school_url,2020.student.size,2020.student.demographics.men,2020.student.demographics.women,2020.cost.tuition.in_state,2020.cost.tuition.out_of_state,2020.cost.roomboard.oncampus,2020.cost.roomboard.offcampus,2020.cost.avg_net_price.public,2020.cost.avg_net_price.private,2020.completion.consumer_rate,2020.admissions.admission_rate.overall,2020.academics.program_available.assoc,2020.academics.program_available.bachelors&page=0&api_key=dra3zfoeWMdlOAkY6G0ceNBrdM1sYscwYQbnINMA";

// helper function to make the axios request per page
const getColleges = (pageNumber) => {
	// adds current page to the query url
	let query =
		"https://api.data.gov/ed/collegescorecard/v1/schools.json?2020.student.size__range=5000..&_fields=school.name,school.zip,school.city,school.state,school.school_url,2020.student.size,2020.student.demographics.men,2020.student.demographics.women,2020.cost.tuition.in_state,2020.cost.tuition.out_of_state,2020.cost.roomboard.oncampus,2020.cost.roomboard.offcampus,2020.cost.avg_net_price.public,2020.cost.avg_net_price.private,2020.completion.consumer_rate,2020.admissions.admission_rate.overall,2020.academics.program_available.assoc,2020.academics.program_available.bachelors&per_page=100&page=" +
		pageNumber +
		"&api_key="+ process.env.API;
	// returns query results
	return axios.get(query).then((data) => {
		// then if the page has content (is not an empty page), pushes the data to our array
		if (data.data.results.length > 0) {
			collegeResultsData.push(data.data.results);
			// else returns an error
		} else {
			console.log("None");
			return;
		}
	});
};

axios
	.get(url)
	.then((data) => {
		const totalData = data.data.metadata.total;
		// will return the number of pages within the api query
		numPages = Math.ceil(totalData / 100);
	})

	// for each page calls the getColleges helper function
	.then(() => {
		for (var i = 0; i < numPages; i++) {
			pageNumber = i;
			getColleges(i);
		}
	})

	// timeout of 5 seconds to give promises time to complete
	// flattens the array because each page pushes an entire array of objects
	// turn the flattened array into a .json file.
	.then(() => {
		const timeout = setTimeout(() => {
			const finalCollegesList = collegeResultsData.flat();
			fs.writeFileSync(
				"./seeds/colleges-seed.json",
				JSON.stringify(finalCollegesList),
				(err) => {
					err ? console.log("error") : console.log("success");
				}
			);
		}, 5000);
	});
