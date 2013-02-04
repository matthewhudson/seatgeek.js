var seatgeek = require('../../');

seatgeek.events(function(err, events) {
  if (err) return console.log(err);
  console.log(events);
});
