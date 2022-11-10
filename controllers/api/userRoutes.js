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