var seatgeek = require('../../seatgeek');

seatgeek.events({ id : [ 1282220, 1192081, 1191418 ] }, function (err, events) {
  if (err) return console.log(err);
  console.log(events);
});
