const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
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
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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

// Get a single post by an id
router.get('/:id', (req, res) => {
    Post.findOne({
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
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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

// // creating a post
// router.post('/', withAuth, (req, res) => {
//     // create 1 post
//     Post.create({ 
//         title: req.body.title,
//         content: req.body.content,
//         user_id: req.session.user_id
//     })
//         .then(dbPostData => res.json(dbPostData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err); 
//         });
// });



// // update a post title
// router.put('/:id', withAuth, (req, res) => {
//     Post.update({
//         title: req.body.title,
//         content: req.body.content
//       },
//       {
//         where: {
//           id: req.params.id
//         }
//     }).then(dbPostData => {
//         if (!dbPostData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }
//         res.json(dbPostData);
//     })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });



// // delete a post 
// router.delete('/:id', withAuth, (req, res) => {
//     Post.destroy({
//         where: {
//             id: req.params.id 
//         }
//     }).then(dbPostData => {
//         if (!dbPostData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }
//         res.json(dbPostData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

module.exports = router;