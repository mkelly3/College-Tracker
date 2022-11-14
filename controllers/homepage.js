const router = require('express').Router();
const { User, College, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const collegeData = await College.findAll();
        const college = collegeData.map((col) => col.get({ plain: true }));
        res.render('homepage', {
            college,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/college/:id', async (req, res) => {
    try {
        const collegeData = await College.findByPk(req.params.id, {
            attributes: { include: ['id','name','url'] },
            include: [{ model: Comment }]
        });
        const college = collegeData.get({ plain: true });

        res.render('single-college', {
            college,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => { res.render('signup') });


module.exports = router;