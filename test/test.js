"use strict"

var EventEmitter = require('events').EventEmitter
var assert = require('assert')
var emitter = new EventEmitter()
var overshadow = require('../')

var count = 0
emitter.once('ping', function() {
  console.log('should happen after overshadowed listener.')
  assert.strictEqual(count++, 1)
})

emitter.once('ping', function() {
  console.log('should happen after first listener.')
  assert.strictEqual(count++, 2)
})

overshadow(emitter, 'ping', function() {
  console.log('overshadowed listener called')
  assert.strictEqual(count++, 0)
})


setInterval(function() {
  if (count === 3) process.exit()
})
setTimeout(function() {
  console.error('tests timed out!')
  process.exit(1)
}, 1000)

emitter.emit('ping')
