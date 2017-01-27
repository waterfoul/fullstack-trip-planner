var db = require('./db');
var Sequelize = require('sequelize');
var place = require('./place');

var Activity = db.define('activity', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	ageRange: {
		type: Sequelize.STRING,
		defaulValue: "All"
	}
});

Activity.belongsTo(place);

module.exports = Activity;
