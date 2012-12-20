# seatgeek.js

Common JS & Browser library for the [SeatGeek Platform API](http://platform.seatgeek.com/).

## Response Formats
The API provides two basic types of response documents: (i) a single resource response document and (ii) a bulk resource response document. The former returns a single document of the requested resource.

A bulk resource response document will include an array of single resource documents along with some additional meta information about the response. If no resources are found, meta information will be returned with an empty resources array.

## Installation

Just include the script. The `seatgeek` object is automagically added to your environment. No need for `new` or any other sort of initialization. In the browser do the following:

``` html
<script src="seatgeek.js"></script>
```

or if you're using webpipe.js with node.js

	$ npm -g install seatgeek

Then require the "seatgeek" module:

``` javascript
var seatgeek = require("seatgeek");
```

### Events
Please refer to [SeatGeek Events API](http://platform.seatgeek.com/#events) for accepted arguments.

#### Events Usage

##### Paginated List of All Events
    seatgeek.events(function(err, events) {
      if (err) return console.log(err);
      console.log(events);
    });

##### Single Event Document
    seatgeek.events({ id : 801255 }, function (err, event) {
      if (err) return console.log(err);
      console.log(event);
    });

### Performers
Please refer to [SeatGeek Performers API](http://platform.seatgeek.com/#performers) for accepted arguments.

#### Performers Usage

##### Paginated List of All Performers
    seatgeek.performers(function(err, performers) {
      if (err) return console.log(err);
      console.log(performers);
    });

##### Single Performer Document
    seatgeek.performers({ id : 2079 }, function(err, performers) {
      if (err) return console.log(err);
      console.log(performers);
    });
    
### Venues
Please refer to [SeatGeek Venues API](http://platform.seatgeek.com/#venues) for accepted arguments.

#### Venues Usage

##### Paginated List of All Venues
    seatgeek.venues(function(err, venues) {
      if (err) return console.log(err);
      console.log(venues);
    });

##### Single Venue Document
    seatgeek.venues({ id : 8 }, function(err, venues) {
      if (err) return console.log(err);
      console.log(venues);
    });

### API Features
The SeatGeek API (and seatgeek.js) supports sorting, pagination, geolocation, filtering, and affiliates. 

Please refer to the [SeatGeek Platform API](http://platform.seatgeek.com/) documentation for accepted arguments.

## ISSUES
* Currently does not support multiple id arguments in a request.

## TODO
* datetime: support local vs utc, and  ISO 8601
* multi ids in arguments
* support for javascript chaining

  
