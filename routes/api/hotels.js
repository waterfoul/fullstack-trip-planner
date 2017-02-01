var router = require('express').Router();
var Hotel = require('../../models/hotel');

// /api/hotels
router.get('/', function(req, res, next) {
	Hotel.findAll()
		.then(res.json.bind(res))
		.catch(next);
});

module.exports = router;