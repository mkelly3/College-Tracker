const router = require('express').Router();
const { User, College, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/',withAuth, async (req, res) => {
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
        });
        
        
    } catch (err) {
        res.status(500).json(err);
    }
}
);




router.post('/', withAuth, (req, res) => {
    // check session
    if (req.session) {
    Comment.create({
        content: req.body.content, 
        // use the id from the session
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});

module.exports=router;