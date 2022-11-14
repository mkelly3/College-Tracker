const collegesData = require("./colleges-seed.json");
const sequelize = require("../config/connection");
const { College } = require("../models");

const seedAll = async () => {
	await sequelize.sync({ force: true });
	// await College.bulkCreate(seed, { returning: true });

	for (let i = 0; i < collegesData.length; i++) {
		let schoolType;
		if (!!collegesData[i]["2020.cost.avg_net_price.public"]) {
			schoolType = "public";
		} else if (!!collegesData[i]["2020.cost.avg_net_price.private"]) {
			schoolType = "private";
		} else {
			schoolType = "N/A";
		}
		await College.create({
			name: collegesData[i]["school.name"],
			// price: collegesData[i]["2020.cost.tuition.in_state"], // change "price" to instate
			// Instate_Tuition: collegesData[i]["2020.cost.tuition.in_state"],
			// Out_Of_State_Tuition: collegesData[i]["2020.cost.tuition.out_of_state"],
			size: collegesData[i]["2020.student.size"],
			url: collegesData[i]["school.school_url"],
			// location:
			// 	collegesData[i]["school.city"] + " " + collegesData[i]["school.state"],
			// associates: collegesData[i]["2020.academics.program_available.assoc"],
			// bachelors: collegesData[i]["2020.academics.program_available.bachelors"],
			Admission_Rate: collegesData[i]["2020.admissions.admission_rate.overall"],
			School_Type: schoolType,
			// On_Campus: collegesData[i]["2020.cost.roomboard.oncampus"],
			// Off_Campus: collegesData[i]["2020.cost.roomboard.offcampus"],
			Male_Students: collegesData[i]["2020.student.demographics.men"] * 100,
			Female_Students: collegesData[i]["2020.student.demographics.women"] * 100,
		}).catch((err) => {
			console.log(err);
		});
	}
	process.exit(0);
};

seedAll();
