var seatgeek = require('../../seatgeek');

seatgeek.performers({ id : 2079 }, function(err, performer) {
  if (err) return console.log(err);
  console.log(performer);
});
