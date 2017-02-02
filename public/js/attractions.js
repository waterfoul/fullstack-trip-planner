'use strict';
/* global $ attractionModule hotels restaurants activities */

/**
 * This module holds collection of enhanced attraction objects which can be
 * easily looked up by type and id. It is primarily used when someone clicks
 * to add an attraction in the `options` module.
 */

var attractionsModule = (function () {

	// application state

  var enhanced = {
    hotels: [],
    restaurants: [],
    activities: [],
  };

	// private helper methods (only available inside the module)

  function findById (array, id) {
    return array.find(function (el) {
      return +el.id === +id;
    });
  }
  var hotelsPromise = $.get('/api/hotels').then((hotels) => {
    enhanced.hotels = hotels.map(attractionModule.create);
    return hotels;
  });
  var restaurantsPromise = $.get('/api/restaurants').then((restaurants) => {
    enhanced.restaurants = restaurants.map(attractionModule.create);
    return restaurants;
  });
  var activitiesPromise = $.get('/api/activities').then((activities) => {
    enhanced.activities = activities.map(attractionModule.create);
    return activities;
  });

	// globally accessible module methods (available to other modules)

  var publicAPI = {

    getByTypeAndId: function (type, id) {
      if (type === 'hotel') return findById(enhanced.hotels, id);
      else if (type === 'restaurant') return findById(enhanced.restaurants, id);
      else if (type === 'activity') return findById(enhanced.activities, id);
      else throw Error('Unknown attraction type');
    },

    getEnhanced: function (databaseAttraction) {
      var type = databaseAttraction.type;
      var id = databaseAttraction.id;
      var found = publicAPI.getByTypeAndId(type, id);
      if (found) return found;
      throw Error('enhanced version not found', databaseAttraction);
    },

    dataFetched: Promise.all([
      hotelsPromise,
      restaurantsPromise,
      activitiesPromise
    ])

  };

  return publicAPI;

}());
