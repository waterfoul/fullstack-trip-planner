var router = require('express').Router();

router.use('/hotels', require('./hotels'));
router.use('/restaurants', require('./restaurants'));
router.use('/activities', require('./activities'));
router.use('/days', require('./days'));

module.exports = router;
