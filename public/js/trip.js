'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

  // application state

  var days = [],
    currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', () => {
      $addButton.prop('disabled', true);
      addDay()
      .then(() => $addButton.prop('disabled', false))
    });
    $removeButton.on('click', deleteCurrentDay);
  });

  function addDay (data, noSwitch) {
    if (this && this.blur) this.blur(); // removes focus box from buttons
    var promise = Promise.resolve(data);
    if(!data){
      data = { number: days.length + 1 };
      promise = $.post('/api/days', data);
    }
    return promise.then((newData) => {
      var newDay = dayModule.create(newData); // dayModule
      days.push(newDay);
      if (days.length === 1) {
        currentDay = newDay;
      }
      if(!noSwitch){
        switchTo(newDay);
      }
    }).catch(() => alert('Failed to add day'));
  }

  // function addDayFunction (data, noSwitch) {
  //   if (this && this.blur) this.blur(); // removes focus box from buttons
  //   if (!data) {
  //     data = {number: days.length + 1};
  //     $.post('/api/days', data).then(() => addDayStep2(data, noSwitch)).catch(() => alert('Failed to add day'));
  //   } else {
  //     addDayStep2(data, noSwitch);
  //   }
  // }
  // function addDayStep2(data, noSwitch) {
  //   var newDay = dayModule.create(data); // dayModule
  //   days.push(newDay);
  //   if (days.length === 1) {
  //     currentDay = newDay;
  //   }
  //   if(!noSwitch){
  //     switchTo(newDay);
  //   }
  // }

  function deleteCurrentDay () {
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    //console.log('currentDay:', currentDay);
    $.ajax({method: 'DELETE', url: '/api/days/' + currentDay.id})
    .then(() => {
      var index = days.indexOf(currentDay),
        previousDay = days.splice(index, 1)[0],
        newCurrent = days[index] || days[index - 1];
      // fix the remaining day numbers
      days.forEach(function (day, i) {
        day.setNumber(i + 1);
      });
      switchTo(newCurrent);
      previousDay.hideButton();
    })
    .catch(() => alert('Could not delete current day'));
  }

  // globally accessible module methods

  var publicAPI = {

    load: function () {
      //$(addDay);
      $.get('/api/days').then((days) => {
        return Promise.all(days.map((day) => {
          return addDay(day, true);
        }))
      })
      .then(() => {
        currentDay.show();
      });
    },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return publicAPI;

}());
