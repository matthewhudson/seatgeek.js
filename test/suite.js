var vows = require('vows');
var http = require('http');
var assert = require('assert');
var seatgeek = require('../');

var EVENT_IDS = [];

function isResourceResponseDocument () {
  return function (err, data) {
    assert.equal(data.hasOwnProperty('meta'), true);
  }
}

function isSingleResourceResponseDocument (resource) {
  return function (err, data) {
    assert.equal(data[resource].length, 1);
  }
}

function isBulkResourceResponseDocument (resource) {
  return function (err, data) {
    assert.equal(data.hasOwnProperty(resource), true);
  }
}

function isPageNumberOfResponseDocument (page) {
  return function (err, data) {
    assert.equal(data['meta']['page'], page);
  }
}

function hasSpecificNumberOfResourcesInResponseDocument (resource, count) {
  return function (err, data) {
    assert.equal(data[resource].length, count);
  }
}

function seedRandomEventIds (callback) {
  var endpoint = 'http://api.seatgeek.com/2/events?sort=score.desc';
  var request = http.get(endpoint, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      json = JSON.parse(body);
      if (!json.hasOwnProperty('events')) {
        exit("Failed to seed the EVENT_IDS necessary to run tests.");
      }
      for (var key in json['events']) {
        EVENT_IDS.push(json['events'][key]['id']);
      }
      callback();
    });
  });
  request.on('error', function (err) {
    exit(err);
  });
}

function getRandomEventIds (count) {
  var random = [];
  while (random.length < count) {
    random.push(EVENT_IDS[Math.floor(Math.random() * EVENT_IDS.length)]);
    random = random.filter(function(elem, pos) {
      return random.indexOf(elem) == pos;
    });
  }
  return random;
}

function exit (message) {
  console.warn(message);
  process.exit(1);
}

seedRandomEventIds (function () {
  vows.describe('seatgeek.events()')
    .addBatch({
      'Paginated List of All Events': {
        topic: function () {
          var next = this.callback;
          seatgeek.events(function (err, events) {
            next(err, events);
          });
        },
        'should respond with a resource response document': isResourceResponseDocument(),
        'should respond with a bulk response document': isBulkResourceResponseDocument('events'),
        'should respond with page 1 of the response document': isPageNumberOfResponseDocument(1),
        'should respond with 10 resources in response document': hasSpecificNumberOfResourcesInResponseDocument('events', 10)
      }
    })
    .addBatch({
      'Single Event Document': {
        topic: function () {
          var next = this.callback;
          seatgeek.events({ id : getRandomEventIds(1) }, function (err, events) {
            next(err, events);
          });
        },
        'should respond with a resource response document': isResourceResponseDocument(),
        'should respond with a single response document': isSingleResourceResponseDocument('events'),
        'should respond with page 1 of the response document': isPageNumberOfResponseDocument(1),
        'should respond with 1 resource in response document': hasSpecificNumberOfResourcesInResponseDocument('events', 1)
      }
    })
    .addBatch({
      'Multiple Event Resource Documents by Id': {
        topic: function () {
          var next = this.callback;
          seatgeek.events({ id : getRandomEventIds(3) }, function (err, events) {
            next(err, events);
          });
        },
        'should respond with a resource response document': isResourceResponseDocument(),
        'should respond with a bulk response document': isBulkResourceResponseDocument('events'),
        'should respond with page 1 of the response document': isPageNumberOfResponseDocument(1),
        'should respond with 3 resources in response document': hasSpecificNumberOfResourcesInResponseDocument('events', 3)
      }
    })
    .run();
})