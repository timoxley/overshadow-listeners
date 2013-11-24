module.exports = function(emitter) {
  var oldListeners = Object.create(null)
  function on(event, handler) {
    detach(event)
    emitter.addListener(event, handler)
    reattach(event)
    return on
  }

  function once(event, handler) {
    detach(event)
    emitter.once(event, handler)
    reattach(event)
    return on
  }

  function reattach(event) {
    var listeners = oldListeners[event] || []
    listeners.forEach(function(oldHandler) {
      emitter.addListener(event, oldHandler)
    })
    return on
  }

  function detach(event) {
    if (oldListeners[event]) return
    oldListeners[event] = emitter.listeners(event).slice(0);
    emitter.removeAllListeners(event);
    return on
  }

  function then(fn) {
    fn() 
    return on
  }

  on.on = on
  on.once = once
  on.detach = detach
  on.reattach = reattach
  on.then = then

  return on
}
