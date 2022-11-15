const router = require('express').Router();
const { College, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('======================');
    College.findAll({
        attributes: [ 'id',
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
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'College_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
            }
        ]
    })
        .then(dbCollegeData => res.json(dbCollegeData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  
});

router.get('/:id', (req, res) => {
    College.findOne({
      where: {
        id: req.params.id
      },
      attributes: [ 'id',
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
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'College_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbCollegeData => {
        if (!dbCollegeData) {
          res.status(404).json({ message: 'No College found with this id' });
          return;
        }
        res.json(dbCollegeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// // creating a College
// router.College('/', withAuth, (req, res) => {
//     // create 1 College
//     College.create({ 
//         title: req.body.title,
//         content: req.body.content,
//         user_id: req.session.user_id
//     })
//         .then(dbCollegeData => res.json(dbCollegeData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err); 
//         });
// });



// // update a College title
// router.put('/:id', withAuth, (req, res) => {
//     College.update({
//         title: req.body.title,
//         content: req.body.content
//       },
//       {
//         where: {
//           id: req.params.id
//         }
//     }).then(dbCollegeData => {
//         if (!dbCollegeData) {
//             res.status(404).json({ message: 'No College found with this id' });
//             return;
//         }
//         res.json(dbCollegeData);
//     })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });



// // delete a College 
// router.delete('/:id', withAuth, (req, res) => {
//     College.destroy({
//         where: {
//             id: req.params.id 
//         }
//     }).then(dbCollegeData => {
//         if (!dbCollegeData) {
//             res.status(404).json({ message: 'No College found with this id' });
//             return;
//         }
//         res.json(dbCollegeData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

module.exports = router;