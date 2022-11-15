// const router = require('express').Router();
// const { User, College, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/:id', withAuth, async (req, res) => {
//     try {
//         const newSavedCollege = await College.create({
//             ...req.body,
//             user_id: req.session.user_id
//         });
//         res.status(200).json(newSavedCollege);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const collegeData = await College.destroy({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id
//             }
//         });

//         if (!projectData) {res.status(404).json({message: `Couldn't find a college with this id!`})};

//         res.status(200).json(collegeData);

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.post('/:id/comment', withAuth, async (req, res) => {
//     try {
//         const newComment = await Comment.create({
//             ...req.body,
//             user_id: req.session.user_id,
//             college_id: req.params.id
//         });
//         res.status(200).json(newComment);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.put('/:id/comment/:commentID', withAuth, async (req, res) => {
//     try {
//         const updatedComment = await Comment.update(
//             {
//                 title: req.body.title,
//                 content: req.body.content
//             },    
//             {
//             where: {
//                 college_id: req.params.id,
//                 id: req.params.commentID
//             }
//             }
//         )
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;

const router = require('express').Router();
const {College, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
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
            attributes: ['id', 'content', 'college_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData.reverse()))
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
          attributes: ['id', 'content', 'college_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;