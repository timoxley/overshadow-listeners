module.exports = function(emitter) {
  var oldListeners = {}
  function overshadow(event, handler) {
    detach(event)
    emitter.addListener(event, handler);
    reattach(event)
  }

  function once(event, handler) {
    detach(event)
    emitter.once(event, handler);
    reattach(event)
  }

  function reattach(event) {
    var listeners = oldListeners[event] || []
    listeners.forEach(function(oldHandler) {
      emitter.addListener(event, oldHandler)
    })
  }

  function detach(event) {
    if (oldListeners[event]) return
    oldListeners[event] = emitter.listeners(event).slice(0);
    emitter.removeAllListeners(event);
  }

  overshadow.overshadow = overshadow
  overshadow.once = once
  overshadow.detach = detach
  overshadow.reattach = reattach

  return overshadow
}
