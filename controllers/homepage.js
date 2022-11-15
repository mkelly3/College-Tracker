
const sequelize = require('../config/connection');
const { College, User, Comment } = require('../models');
const router = require('express').Router();


router.get('/', (req, res) => {
    College.findAll({
      attributes: [
        'id',
        'name',
        'Instate_Tuition',
        'Out_Of_State_Tuition',
        'On_Campus',
        'Off_Campus',
        'size',
        'url',
        'location',
        'associates',
        'bachelors',
        'Admission_Rate',
        'Male_Students',
        'Female_Students',
        'School_Type'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'College_id', 'user_id', ],
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
      .then(dbCollegeData => {
        const Colleges = dbCollegeData.map(College => College.get({ plain: true }));
        res.render('homepage', { Colleges, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});


router.get('/college', (req, res) => {
    College.findOne({
      where: {
        name : req.body.name
      },
      attributes: [
        'id',
        'name',
        'Instate_Tuition',
        'Out_Of_State_Tuition',
        'On_Campus',
        'Off_Campus',
        'size',
        'url',
        'location',
        'associates',
        'bachelors',
        'Admission_Rate',
        'Male_Students',
        'Female_Students',
        'School_Type'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'College_id', 'user_id'],
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
      .then(dbCollegeData => {
        if (!dbCollegeData) {
          res.status(404).json({ message: 'No College found with this id' });
          return;
        }
  
        const College = dbCollegeData.get({ plain: true });
  
        console.log(College);
       // res.render('single-College', { College, loggedIn: req.session.loggedIn});


      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.get('/Colleges-comments', (req, res) => {
    College.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'name',
          'Instate_Tuition',
          'Out_Of_State_Tuition',
          'On_Campus',
          'Off_Campus',
          'size',
          'url',
          'location',
          'associates',
          'bachelors',
          'Admission_Rate',
          'Male_Students',
          'Female_Students',
          'School_Type'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'Colllege_id', 'user_id'],
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
        .then(dbCollegeData => {
          if (!dbCollegeData) {
            res.status(404).json({ message: 'No College found with this id' });
            return;
          }
    
          const College = dbCollegeData.get({ plain: true });
    
          res.render('Colleges-comments', { College, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router; 