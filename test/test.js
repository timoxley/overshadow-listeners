"use strict"

var EventEmitter = require('events').EventEmitter
var assert = require('assert')
var Overshadow = require('../')

var test = require('tape')

test('overshadowing', function(t) {
  t.plan(3)

  var emitter = new EventEmitter()
  var count = 0

  emitter.once('ping', function() {
    t.equal(++count, 2, 'should happen after overshadowed listener.')
  })

  emitter.once('ping', function() {
    t.equal(++count, 3, 'should happen after first listener.')

    // wait for bad events then end
    setTimeout(function() {
      clearTimeout(timeout)
      t.end()
    }, 10)

  })

  Overshadow(emitter)('ping', function() {
    t.equal(++count, 1, 'overshadowed listener called')
  })

  var timeout = setTimeout(function() {
    t.fail('tests timed out!')
  }, 1000)

  emitter.emit('ping')
})

test('detach reattach', function(t) {
  t.plan(3)

  var emitter = new EventEmitter()
  var count = 0

  emitter.once('ping', function() {
    t.equal(++count, 2, 'should happen after overshadowed listener.')
  })

  emitter.once('ping', function() {
    t.equal(++count, 3, 'should happen after first listener.')

    // wait for bad events then end
    setTimeout(function() {
      clearTimeout(timeout)
      t.end()
    }, 10)

  })

  var overshadow = Overshadow(emitter)

  overshadow.detach('ping')

  emitter.once('ping', function() {
    t.equal(++count, 1, 'overshadowed listener called')
  })

  overshadow.reattach('ping')

  var timeout = setTimeout(function() {
    t.fail('tests timed out!')
  }, 1000)

  emitter.emit('ping')
})
