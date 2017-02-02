var router = require('express').Router();
var Day = require('../../models/day');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');

// /api/days
router.get('/', function(req, res, next) {
  Day.findAll({include: [
    Hotel,
    Restaurant,
    Activity
  ]})
    .then(res.json.bind(res))
    .catch(next);
});

router.get('/:id', function(req, res, next){
  Day.findById(req.params.id, {include: [Hotel, Restaurant, Activity]})
    .then(res.json.bind(res))
    .catch(next);
});

router.post('/', function(req, res, next){
  Day.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
});

router.put('/:id', function(req, res, next){
  Day.update(req.body, {id: req.params.id})
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.delete('/:id', function(req, res, next){
  Day.destroy({id: req.params.id})
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.post('/:id/hotel', function(req, res, next){
  Promise.all([
    Day.findById(req.param.id),
    Hotel.findById(req.body)
  ])
    .then(([day, hotel]) => day.setHotel(hotel))
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.delete('/:id/hotel', function(req, res, next){
  Day.findById(req.param.id)
    .then((day) => day.setHotel(null))
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.post('/:id/restaurant', function(req, res, next){
  Promise.all([
    Day.findById(req.param.id),
    Restaurant.findById(req.body)
  ])
    .then(([day, restaurant]) => day.addRestaurant(restaurant))
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.delete('/:id/restaurant', function(req, res, next){
  Promise.all([
    Day.findById(req.param.id),
    Restaurant.findById(req.body)
  ])
    .then(([day, restaurant]) => day.removeRestaurant(restaurant))
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.post('/:id/activity', function(req, res, next){
  Promise.all([
    Day.findById(req.param.id),
    Activity.findById(req.body)
  ]).then(([day, activity]) => day.addActivity(activity))
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.delete('/:id/activity', function(req, res, next){
  Promise.all([
    Day.findById(req.param.id),
    Activity.findById(req.body)
  ])
    .then(([day, activity]) => day.removeActivity(activity))
    .then(() => res.sendStatus(204))
    .catch(next);
})
module.exports = router;

/*
 res.json.bind(res) =

 function(params){
 return res.json(params);
 }
 */
