root = exports ? (this.seatgeek = {})

_format = 'json'

root.events = (options, callback) ->
  _request '/events/', options, callback
      
root.performers = (options, callback) ->
  _request '/performers/', options, callback
  
root.venues = (options, callback) ->
  _request '/venues/', options, callback
  
_request = (resource, options, callback) ->
  if typeof options is "function"
    callback = options
    options = null

  # Determine response body format (json|jsonp|xml)
  _format = options?.format ? 'json'
  if options?.callback
    _format = 'jsonp'

  url = _endpoint resource, options
  _xhr url, (err, res) =>
    callback err, res

_xhr = (url, callback) ->
  if ActiveXObject?
    req = new ActiveXObject('Microsoft.XMLHTTP')
  else if XMLHttpRequest?
    req = new XMLHttpRequest()
  else if require?
    req = new (require('xmlhttprequest').XMLHttpRequest)
  
  req.onreadystatechange = ->
    if req.readyState is 4
      if req.status is 200
        try 
          if _format.toLowerCase() is 'json'
            body = JSON.parse req.responseText
          else if _format.toLowerCase() is 'xml'
            body = req.responseText
          else
            body = req.responseText
        catch err
          return callback err, null 
              
        callback null, body 
      else
        callback { code: req.status, message: req.statusText }, null 

  req.open 'GET', url, true
  req.send null 
 
# Build the endpoint URL by combining the base url, resource, and query string.
_endpoint = (resource, options) ->
  url = 'http://api.seatgeek.com/2'

  # Convert high-level library options to low-level SG params.
  params = options
  
  # Build the query string.
  query_string = []
  for key, value of params
    key = encodeURIComponent key 
    value = encodeURIComponent value 
    query_string.push(key + '=' + value)
  
  return url + resource + '?' + query_string.join '&' 

