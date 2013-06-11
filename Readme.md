#overshadow-listeners

Add an event listener before existing listeners.

## Example

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

# Licence

MIT
