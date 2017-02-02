var router = require('express').Router();
var Activity = require('../../models/activity');

// /api/activities
router.get('/', function(req, res, next) {
  Activity.findAll()
		.then(res.json.bind(res))
		.catch(next);
});

module.exports = router;
