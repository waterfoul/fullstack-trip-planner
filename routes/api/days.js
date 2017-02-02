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
    .then((data) => res.status(201).json(data))
    .catch(next);
});

router.put('/:id', function(req, res, next){
  Day.update(req.body, {id: req.params.id})
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.delete('/:id', function(req, res, next){
  Day.destroy({
    where: {id: req.params.id},
    individualHooks: true
  })
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.post('/:id/hotel/:hotelId', function(req, res, next){
	Promise.all([
    Day.findById(req.params.id),
    Hotel.findById(req.params.hotelId)
  ])
    .then(([day, hotel]) => day.setHotel(hotel))
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.delete('/:id/hotel', function(req, res, next){
  Day.findById(req.params.id)
    .then((day) => day.setHotel(null))
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.post('/:id/restaurant/:restaurantId', function(req, res, next){
  Promise.all([
    Day.findById(req.params.id),
    Restaurant.findById(req.params.restaurantId)
  ])
    .then(([day, restaurant]) => day.addRestaurant(restaurant))
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.delete('/:id/restaurant/:restaurantId', function(req, res, next){
  Promise.all([
    Day.findById(req.params.id),
    Restaurant.findById(req.params.restaurantId)
  ])
    .then(([day, restaurant]) => day.removeRestaurant(restaurant))
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.post('/:id/activity/:activityId', function(req, res, next){
  Promise.all([
    Day.findById(req.params.id),
    Activity.findById(req.params.activityId)
  ]).then(([day, activity]) => day.addActivity(activity))
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.delete('/:id/activity/:activityId', function(req, res, next){
  Promise.all([
    Day.findById(req.params.id),
    Activity.findById(req.params.activityId)
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
