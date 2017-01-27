var db = require('./db');
var Sequelize = require('sequelize');
var place = require('./place');

var Restaurant = db.define('restaurant', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	cuisine: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.DECIMAL,
		allowNull: false
	}
});

Restaurant.belongsTo(place);

module.exports = Restaurant;
