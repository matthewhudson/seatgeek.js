var seatgeek = require('../../');

seatgeek.venues({ id : 8 }, function(err, venue) {
  if (err) return console.log(err);
  console.log(venue);
});
