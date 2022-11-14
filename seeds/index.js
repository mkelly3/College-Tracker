const seed = require('./colleges-seed.json');
const sequelize = require('../config/connection');
const { College } = require('../models');
const collegeApi = require('./college-api');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await College.bulkCreate(collegeApi, { returning: true })
    process.exit(0);
}

seedAll();