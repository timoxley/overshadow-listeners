#overshadow-listeners
[![Build Status](https://travis-ci.org/timoxley/overshadow-listeners.png?branch=master)](https://travis-ci.org/timoxley/overshadow-listeners)

Add an event listener before any existing listeners.

```js
Overshadow(emitter).on('event', function() {
  // this handler will run before any other handlers for 'event'
})
```

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

overshadow.reattach('request')
// remember to reattach old listeners
```

#### detach/reattach is chainable

We've included a simple `.then(fn)` method you can call to make chainable the process of detaching, doing something then reattaching. `.then(fn)` does nothing but execute the supplied function

```js
Overshadow(server)
.detach('request')
.then(function() { // '.then' executes supplied fn & returns chain 
  server.once('request', function(req, res) {
    if (req.url !== '/') return res.end('no.')
  })
})
.reattach('request') // remember to reattach old listeners
```


## See Also

* [hughsk/on-first](https://github.com/hughsk/on-first)


# Licence

MIT
