# seatgeek.js

Common JS & Browser library for the [SeatGeek Platform API](http://platform.seatgeek.com/).

## Document Formats
The API provides two basic types of response documents: (i) a single resource response document and (ii) a bulk resource response document. The former returns a single document of the requested resource.

A bulk resource response document will include an array of single resource documents along with some additional meta information about the response. If no resources are found, meta information will be returned with an empty resources array.

<table>
  <tr>
    <th>Parameter</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>format</td>
    <td>optional, default is json</td>
    <td>Acceptable arguments are json and xml</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>optional, default is null</td>
    <td>If a callback is provided, the response will be forced to be json, and your response document will be wrapped with your callback argument.</td>
  </tr>
</table>

## API Features
The SeatGeek API supports sorting, pagination, and geolocation. Geolocation is only available for resources with a location attribute (in other words, not /performers).

### Geolocation
The API can geolocate requests based on a user's IP address, postal code (currently, only US and Canadian postal codes are supported), or latitude and longitude. In order to geolocate a request, either geoip or both lat and lon must be provided. Details about geolocation will be returned in the meta document.

<table>
  <tr>
    <th>Parameter</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>geoip</td>
    <td>optional, default is false</td>
    <td>Accepts one of: a valid IP address (useful when making a request server-side on behalf of a client); a valid US or Canadian postal code; or true, to attempt to geolocate by the requesting client's IP (useful when calling directly from a browser).</td>
  </tr>
  <tr>
    <td>lat</td>
    <td>optional, lon is required if used</td>
    <td>Latitude in decimal degrees.</td>
  </tr>
  <tr>
    <td>lon</td>
    <td>optional, lat is required if used</td>
    <td>Longitude in decimal degrees</td>
  </tr>
  <tr>
    <td>range</td>
    <td>optional, default is 30mi</td>
    <td>The number of miles (or kilometers, with km) to search around the location</td>
  </tr>
</table>

### Pagination
The SeatGeek Platform API has built in pagination support.

<table>
  <tr>
    <th>Parameter</th>
    <th>Default</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td>per_page</td>
    <td>optional, default is 10</td>
    <td>Number of resource documents to return per "page"</td>
  </tr>
  <tr>
    <td>page</td>
    <td>optional, default is 1</td>
    <td>Page number, 1-indexed</td>
  </tr>
</table>

### Sorting
The SeatGeek Platform API has basic support for sorting the response result set.

<table>
  <tr>
    <th>Parameter</th>
    <th>Default</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td>sort</td>
    <td>optional, defaults vary by resource</td>
    <td>By default events are sorted by sort=datetime_utc.asc, venues and performers are sorted by sort=score.desc.
This argument takes two parameters, the field which to sort by and the direction of the sort separated with a .(period character). Valid sort directions are asc and desc. Valid fields are datetime_local, datetime_utc, and score</td>
  </tr>
</table>

### Filtering
The SeatGeek Platform API has basic support for filtering the response result set. Filtering is only available on the events endpoint.

By default events are not filtered. You can filter the results based on listing_count, average_price, lowest_price, and highest_price. These filters work the same was at the date-based filtering. For example: you can append listing_count.gt=0 to return only events that have ticket listings, or highest_price.lte=20 to return events with a highest ticket price of $20 or less.

### Score
Most document types include a score field. The score field is used to indicate the document's relative popularity within its type. 

<table>
  <tr>
    <th>Parameter</th>
    <th>Default</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td>score</td>
    <td>optional</td>
    <td>score is a floating point value in 0 <= score <= 1</td>
  </tr>
</table>

### Affiliates
The SeatGeek Platform API has built–in support for affiliates.

<table>
  <tr>
    <th>Parameter</th>
    <th>Default</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td>aid</td>
    <td>optional, default is null</td>
    <td>Adding the aid argument will append an aid to all URLs</td>
  </tr>
  <tr>
    <td>rid</td>
    <td>optional, default is null</td>
    <td>Adding the rid argument will append an rid to all URLs</td>
  </tr>
</table>

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

## ISSUES
* Currently does not support multiple id arguments in a request.
* Browser support is broken because SeatGeek does not presently allow CORS.

## TODO
* datetime: support local vs utc, and  ISO 8601
* multi ids in arguments
* support for javascript chaining

  
