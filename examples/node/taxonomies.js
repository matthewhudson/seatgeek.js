var seatgeek = require('../../');

seatgeek.taxonomies(function(err, taxonomies) {
  if (err) return console.log(err);
  console.log(taxonomies);
});
