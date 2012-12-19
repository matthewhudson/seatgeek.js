var seatgeek = require('../../seatgeek');

seatgeek.venues(function(err, venues) {
  if (err) return console.log(err);
  console.log(venues);
});
