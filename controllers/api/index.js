const router = require('express').Router();
const collegeRoutes = require('./collegeRoutes');
const userRoutes = require('./userRoutes');
const comment = require('./comment')

router.use('/college', collegeRoutes);
router.use('/users', userRoutes);
router.use('/comment',comment)

module.exports = router;