
const sequelize = require('../config/connection');
const {College, User, Comment, UserCollege} = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();


router.get('/', withAuth, async (req, res) => {
    try {
        const collegeData = await College.findAll({
            include: 
            [{ model: Comment},
                {
                    model: User,
                    attributes: ['username']
                  }
            ]
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})



module.exports = router;
