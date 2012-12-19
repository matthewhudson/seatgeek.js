var seatgeek = require('../../seatgeek');

seatgeek.venues({ id : 8 }, function(err, venues) {
  if (err) return console.log(err);
  console.log(venues);
});
