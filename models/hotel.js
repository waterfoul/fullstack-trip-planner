var place = require('./place');
var db = require('./db');
var Sequelize = require('sequelize');

var Hotel = db.define('hotel', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	numStars: {
		type: Sequelize.DECIMAL,
		defaultValue: 0
	},
	amenities: {
		type: Sequelize.STRING
	}

});

Hotel.belongsTo(place);


module.exports = Hotel;
