const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(500).json(req);
});

module.exports = router;