module.exports = function(emitter, event, handler) {
  var oldListeners = emitter.listeners(event).slice(0);
  emitter.removeAllListeners(event);
  //var new_handler = function() {
    //var listener, _i, _len;
    //if (handler.apply(this, arguments) !== true) {
      //for (var i = 0; i < old_listeners.length; i++) {
        //listener = old_listeners[i];
        //listener.apply(this, arguments);
      //}
      //return false;
    //}
    //return true;
  //};
  emitter.addListener(event, handler);
  oldListeners.forEach(function(oldHandler) {
    emitter.addListener(event, oldHandler)
  })
};
