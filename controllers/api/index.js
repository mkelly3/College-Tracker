
const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const collegeRoutes = require('./collegeRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/college', collegeRoutes);
router.use('/comment', commentRoutes);

module.exports = router;