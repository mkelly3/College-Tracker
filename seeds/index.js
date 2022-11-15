
const sequelize = require('../config/connection');
const { College } = require('../models');
const collegeApi = require('./college-api');
const collegesData = require('./colleges-seed.json')


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    for (let i = 0; i < collegesData.length; i++) {
      let schoolType;
      let admissionRate;
      // will set set the school_type as public, private, or null
      if (!!collegesData[i]["2020.cost.avg_net_price.public"]) {
        schoolType = "public";
      } else if (!!collegesData[i]["2020.cost.avg_net_price.private"]) {
        schoolType = "private";
      }
      // if admission rate exists, convert to XX.XX format
      if (!!collegesData[i]["2020.admissions.admission_rate.overall"]) {
        admissionRate =
          collegesData[i]["2020.admissions.admission_rate.overall"] * 100;
      }
      // create sql rows with api data
      await College.create({
        name: collegesData[i]["school.name"],
        Instate_Tuition: collegesData[i]["2020.cost.tuition.in_state"],
        Out_Of_State_Tuition: collegesData[i]["2020.cost.tuition.out_of_state"],
        size: collegesData[i]["2020.student.size"],
        url: collegesData[i]["school.school_url"],
        location:
          collegesData[i]["school.city"] + " " + collegesData[i]["school.state"],
        associates: collegesData[i]["2020.academics.program_available.assoc"],
        bachelors: collegesData[i]["2020.academics.program_available.bachelors"],
        Admission_Rate: admissionRate,
        School_Type: schoolType,
        On_Campus: collegesData[i]["2020.cost.roomboard.oncampus"],
        Off_Campus: collegesData[i]["2020.cost.roomboard.offcampus"],
        Male_Students: collegesData[i]["2020.student.demographics.men"] * 100,
        Female_Students: collegesData[i]["2020.student.demographics.women"] * 100,
      }).catch((err) => {
        console.log(err);
      });
    }
    process.exit(0);
    }


seedAll();