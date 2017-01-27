const db = require('./db');

module.exports = {
	place: require('./place'),
	hotel: require('./hotel'),
	restaurant: require('./restaurant'),
	activity: require('./activity'),
	sync: function (force) {
		return db.sync({force: force});
	}
};
