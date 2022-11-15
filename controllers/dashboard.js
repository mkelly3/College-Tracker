
const sequelize = require('../config/connection');
const {College, User, Comment, UserCollege} = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();


router.get('/', withAuth, (req, res) => {
    College.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'name',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'college_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/edit/:id', withAuth, (req, res) => {
    College.findOne({
        where: {
          id: req.params.id
        },
        attributes: [ 
          'id',
          'name',
        ],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'college_id', 'user_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      })
        .then(dbCollegeData => {
          if (!dbCollegeData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
            const post = dbCollegeData.get({ plain: true });
            res.render('edit-post', {post, loggedIn: true});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})


// // redirecting users to sign in page once they sign up
// router.get('/new', (req, res) => {
//     res.render('new-post');
// });


module.exports = router;