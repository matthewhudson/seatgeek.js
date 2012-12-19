var seatgeek = require('../../seatgeek');

seatgeek.events({ format : 'xml' }, function (err, events) {
  if (err) return console.log(err);
  console.log(events);
});
