var router = require('express').Router();
var Restaurant = require('../../models/restaurant');

// /api/restaurant
router.get('/', function(req, res, next) {
	Restaurant.findAll()
		.then(res.json.bind(res))
		.catch(next);
});

module.exports = router;