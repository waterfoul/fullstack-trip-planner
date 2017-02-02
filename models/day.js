/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Day = db.define('day', {
  number: Sequelize.INTEGER
}, {
  hooks: {
    afterDestroy: function(day){
      console.log('day:', day);
      return Day.findAll({
        where: {
          number: {
            $gte: day.number
          }
        },
        order: 'number'
      })
      .then((days) => {
        console.log('days', days);
        var currentNumber = day.number;
        for(var i = 0; i < days.length; i++){
          days[i].number = currentNumber;
          currentNumber++;
        }
        return Promise.all(days.map((day) => day.save()));
      })
    }
  }
});

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
Day.belongsToMany(Activity, {through: 'day_activity'});

module.exports = Day;
