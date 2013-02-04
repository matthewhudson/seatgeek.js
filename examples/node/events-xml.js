var seatgeek = require('../../');

seatgeek.events({ format : 'xml' }, function (err, events) {
  if (err) return console.log(err);
  console.log(events);
});
