#overshadow-listeners
[![Build Status](https://travis-ci.org/timoxley/overshadow-listeners.png?branch=master)](https://travis-ci.org/timoxley/overshadow-listeners)

Add an event listener before existing listeners.

## Why

Event listeners always fire in the order they are added, yet sometimes we have no control over
this ordering and require certain listeners to definitely run before any others.

## Example

```js
var http = require('http')
var Overshadow = require('overshadow-listeners')

var server = http.createServer(function(req, res) {
  res.end('ok!')
})

Overshadow(server).on('request', function(req, res) {
  // This handler runs before any other request handlers
  // (including the handler supplied to http.createServer!)
  if (req.url !== '/') return res.end('no.') // reject any requests other than those for '/'
})

Overshadow(server).once('request', function(req, res) {
  // happens only once, before any other request handlers
})

server.listen(9000)

```

### detach/reattach

Alternatively, manually detach and reattach listeners:

```js

var overshadow = Overshadow(server)
overshadow.detach('request')

// attach whatever listeners you need
server.on('request', function(req, res) {
  if (req.url !== '/') return res.end('no.')
})

// remember to reattach old listeners
overshadow.reattach('request')

```

## Also See

* [hughsk/on-first](https://github.com/hughsk/on-first)


# Licence

MIT
