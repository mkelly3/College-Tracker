const router = require('express').Router();
const { User, College, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
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

        // const college = collegeData.get({ plain: true });

        res.render('dashboard', {
            collegeData
        });
        
        
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports=router;