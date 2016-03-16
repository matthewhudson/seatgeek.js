(function() {
  var root, _endpoint, _request, _url;

  root = typeof exports !== "undefined" && exports !== null ? exports : (this.seatgeek = {});

  _url = 'https://api.seatgeek.com/2';

  root.callback = null;

  root.events = function(options, callback) {
    return _request('/events/', options, callback);
  };

  root.performers = function(options, callback) {
    return _request('/performers/', options, callback);
  };

  root.venues = function(options, callback) {
    return _request('/venues/', options, callback);
  };

  root.taxonomies = function(options, callback) {
    return _request('/taxonomies/', options, callback);
  };

  _request = function(resource, options, callback) {
    var req, request, script, url, _format, _ref;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    _format = (_ref = options != null ? options.format : void 0) != null ? _ref : 'json';
    if (typeof exports === "undefined" || exports === null) {
      options.callback = 'seatgeek.callback';
      root.callback = callback;
    } else if (!request) {
      request = require('request');
    }
    url = _endpoint(resource, options);
    if (typeof exports === "undefined" || exports === null) {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      return document.body.appendChild(script);
    } else {
      return req = request.get(url, function(error, response, body) {
        if (error != null) {
          return callback(error, null);
        }
        if (_format === 'json') {
          return callback(null, JSON.parse(body));
        } else {
          return callback(null, body);
        }
      });
    }
  };

  _endpoint = function(resource, params) {
    var endpoint, key, query_string, value;
    endpoint = _url + resource;
    query_string = [];
    for (key in params) {
      value = params[key];
      key = encodeURIComponent(key);
      value = encodeURIComponent(value);
      query_string.push(key + '=' + value);
    }
    if (query_string.length) {
      endpoint += '?' + query_string.join('&');
    }
    return endpoint;
  };

}).call(this);
