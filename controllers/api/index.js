const router = require('express').Router();
const collegeRoutes = require('./collegeRoutes');
const userRoutes = require('./userRoutes');

router.use('/college', collegeRoutes);
router.use('/user', userRoutes);

module.exports = router;