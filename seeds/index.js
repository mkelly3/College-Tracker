const seed = require('./colleges-seed.json');
const sequelize = require('../config/connection');
const { College } = require('../models');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await College.bulkCreate(seed, { returning: true })
    process.exit(0);
}

seedAll();