const {Comment} = require('../models');
const sequelize = require('../config/connection');

const commentData = [
    {
    }

];

const seedComment = () =>Comment.bulkCreate(commentData);

module.exports = seedComment;