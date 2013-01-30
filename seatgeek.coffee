root = exports ? (this.seatgeek = {})

_url = 'http://api.seatgeek.com/2'

# Handles user-defined callbacks when using jsonp
root.callback = null

root.events = (options, callback) ->
  _request '/events/', options, callback
      
root.performers = (options, callback) ->
  _request '/performers/', options, callback
  
root.venues = (options, callback) ->
  _request '/venues/', options, callback

_request = (resource, options, callback) ->
  if typeof options is "function"
    callback = options
    options = {}

  # Force jsonp if using in browser.
  if not exports?
    options.callback = 'seatgeek.callback'
    root.callback = callback
  else if not http
    http = require 'http'

  # Construct the URL
  url = _endpoint resource, options

  # Make the API request
  if not exports?
    script = document.createElement 'script'
    script.type = 'text/javascript'
    script.src = url
    document.body.appendChild script 
  else
    req = http.get url, (res) ->
      body = ''
      res.on 'data', (chunk) ->
        body += chunk
      res.on 'end', ->
        callback null, body
    req.on 'error', (err) ->
      callback err, null

# Build the endpoint URL by combining the base url, resource, and query string.
_endpoint = (resource, params) ->
  endpoint = _url + resource

  # Build the query string.
  query_string = []
  for key, value of params
    key = encodeURIComponent key 
    value = encodeURIComponent value 
    query_string.push(key + '=' + value)

  if query_string.length
    endpoint += '?' + query_string.join '&'

  return endpoint

