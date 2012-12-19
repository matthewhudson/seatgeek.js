var seatgeek = require('../../seatgeek');

seatgeek.performers({ id : 2079 }, function(err, performers) {
  if (err) return console.log(err);
  console.log(performers);
});
