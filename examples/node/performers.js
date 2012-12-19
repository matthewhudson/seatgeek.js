var seatgeek = require('../../seatgeek');

seatgeek.performers(function(err, performers) {
  if (err) return console.log(err);
  console.log(performers);
});
