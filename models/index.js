const db = require('./db');

module.exports = {
	sync: function (force) {
		return db.sync({force: force});
	}
};