var seatgeek = require('../../');

seatgeek.events({ callback : 'fireEvent' }, function (err, events) {
  if (err) return console.log(err);
  console.log(events);
});