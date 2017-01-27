'use strict';

const express = require('express');
const Bluebird = require('bluebird');

const models = require('../models');

const router = express.Router();

router.get('/', function(req, res, next) {
	Bluebird.all([
		models.hotel.findAll(),
		models.restaurant.findAll(),
		models.activity.findAll()
	]).spread((hotels, restaurants, activities) => {
		res.render('index', {
			hotels: hotels,
			restaurants: restaurants,
			activities: activities
		});
	});
});

module.exports = router;