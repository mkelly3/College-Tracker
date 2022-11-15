const collegesData = require("./colleges-seed.json");
const sequelize = require("../config/connection");
const { College, Comment } = require("../models");
const commentsData = require("./comment-seed.json")

const seedAll = async () => {
	await sequelize.sync({ force: true });

	for (let i = 0; i < collegesData.length; i++) {
		await College.create({
			name: collegesData[i]["school.name"],
			price: collegesData[i]["2020.cost.tuition.in_state"], // change "price" to instate
			// instate: collegesData[i]["2020.cost.tuition.in_state"],
			// outofstate: collegesData[i]["2020.cost.tuition.out_of_state"],
			size: collegesData[i]["2020.student.size"],
			url: collegesData[i]["school.school_url"],
			// location:
			// 	collegesData[i]["school.city"] +
			// 	" " +
			// 	collegesData[i]["school.state"],
			// associates: collegesData[i]["2020.academics.program_available.assoc"],
			// bachelors: collegesData[i]["2020.academics.program_available.bachelors"],
			// admission: collegesData[i]["2020.admissions.admission_rate.overall"],
			// publicPrivate: schoolType,
			// onCampus: collegesData[i]["2020.cost.roomboard.oncampus"],
			// offCampus: collegesData[i]["2020.cost.roomboard.offcampus"],
			// maleStudents: collegesData[i]["2020.student.demographics.men"],
			// femaleStudents: collegesData[i]["2020.student.demographics.women"],
		}).catch((err) => {
			console.log(err);
		});	
	}
	
	//for (let i = 0; i < commentsData.length; i++) {
		//await Comment.create({ 
		//	title: commentsData[i]["title"],
		//	content: commentsData[i]["content"],
		//	user_id: commentsData[i]["user_id"],
		//	college_id: commentsData[i]["college_id"]
		//}).catch((err) => {
		//	console.log(err);
		//});
	//}
	
	
	process.exit(0);
};

seedAll();
