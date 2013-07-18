#overshadow-listeners
[![Build Status](https://travis-ci.org/timoxley/overshadow-listeners.png?branch=master)](https://travis-ci.org/timoxley/overshadow-listeners)

Add an event listener before existing listeners.

## Why

Event listeners always fire in the order they are added, yet sometimes we have no control over
this ordering and require certain listeners to definitely run before any others.

## Example

```js
var http = require('http')
var overshadow = require('overshadow-listeners')

var server = http.createServer(function(req, res) {
  res.end('ok!')
})

overshadow(server, 'request', function(req, res) {
  // happens before any other request handlers
  // including the handler supplied to
  // http.createServer
  if (req.url !== '/') return res.end('no.') // reject any requests other than those for '/'
})

server.listen(9000)

```

# Licence

MIT
