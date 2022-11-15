const router = require('express').Router();
const collegeRoutes = require('./collegeRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./comment-routes')

router.use('/college', collegeRoutes);
router.use('/users', userRoutes);

module.exports = router;