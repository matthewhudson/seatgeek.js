var seatgeek = require('../../');

seatgeek.performers(function(err, performers) {
  if (err) return console.log(err);
  console.log(performers);
});
