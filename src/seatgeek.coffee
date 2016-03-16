root = exports ? (this.seatgeek = {})

_url = 'https://api.seatgeek.com/2'

# Handles user-defined callbacks when using jsonp
root.callback = null

root.events = (options, callback) ->
  _request '/events/', options, callback
      
root.performers = (options, callback) ->
  _request '/performers/', options, callback
  
root.venues = (options, callback) ->
  _request '/venues/', options, callback

root.taxonomies = (options, callback) ->
  _request '/taxonomies/', options, callback

_request = (resource, options, callback) ->
  if typeof options is "function"
    callback = options
    options = {}

  # Determine response body format (json|xml)
  _format = options?.format ? 'json'
  
  # Force jsonp if using in browser.
  if not exports?
    options.callback = 'seatgeek.callback'
    root.callback = callback
  else if not request
    request = require 'request'

  # Construct the URL
  url = _endpoint resource, options

  # Make the API request
  if not exports?
    script = document.createElement 'script'
    script.type = 'text/javascript'
    script.src = url
    document.body.appendChild script
  else
    req = request.get url, (error, response, body) ->
      if error?
        return callback error, null
      if _format is 'json'
        callback null, JSON.parse body
      else
        callback null, body

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
