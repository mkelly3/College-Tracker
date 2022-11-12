const router = require('express').Router();
const { User, College, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).redirect('/');
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {username: req.body.username }});
        const userPassword = userData.checkPassword(req.body.password);

        if (!userData || !userPassword) {
            res.status(400).json({message: 'Incorrect email or password. Please try again.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        })
    } catch (err) {
        res.status(500).json(err);
    }
});