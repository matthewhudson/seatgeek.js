var seatgeek = require('../../');

seatgeek.events({ id : 801255 }, function (err, event) {
  if (err) return console.log(err);
  console.log(event);
});
