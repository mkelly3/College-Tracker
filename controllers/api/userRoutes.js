const router = require('express').Router();
const { User, College, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', async (req, res) => {
//     try {
//         const newUser = await User.create(req.body);
//         req.session.save(() => {
//             req.session.user_id = newUser.id;
//             req.session.logged_in = true;
//             res.status(200).json(newUser);
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const userData = await User.findOne({where: {username: req.body.username }});
//         if (!userData) {
//             res.status(400).json({message: 'Incorrect email or password. Please try again.'});
//             return;
//         }

//         const userPassword = userData.checkPassword(req.body.password);
//         if(!userPassword) {
//             res.status(400).json({message: 'Incorrect username or password. Please try again.'});
//             return;
//         }

//         req.session.save(() => {
//             req.session.user_id = userData.id;
//             req.session.logged_in = true;
//         })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.post('/logout', (req, res) => {
//     if (req.session.logged_in) {
//         req.session.destroy(() => {
//             res.status(204).end();
//         })
//     } else {
//         res.status(404).end();
//     }
// });



router.get('/', (req, res) => {
    // access our user model and run .findAll() method -- similar to SELECT * FROM users;
    User.findAll({
        attributes: { exclude: ['[password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    // store user data during session 
    .then(dbUserData => {
    req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
  
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that username!'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
      
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
router.put('/:id', (req, res) => {
    
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });

});

module.exports = router;