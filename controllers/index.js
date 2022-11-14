const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./homepage');
const dashboard = require('./dashboard');

router.use('/', homepageRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard',dashboard)
module.exports = router;