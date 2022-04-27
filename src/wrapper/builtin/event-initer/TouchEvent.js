const Event = require('./Event')
const document = require('../document')
const util = require('../util/index')

class TouchEvent extends Event {
  touches = []
  targetTouches = []
  changedTouches = []
  target = null
  currentTarget = null

  constructor(type) {
    super(type)

    this.target = $global.canvas;
    this.currentTarget = $global.canvas;
  }
}

function eventHandlerFactory(type) {
  return function (rawEvent) {
    if (util.isIDE) return;
    var event = new TouchEvent(type);
    event.changedTouches = rawEvent.touches;
    event.touches = rawEvent.touches;
    event.targetTouches = Array.prototype.slice.call(rawEvent.touches); // event.timeStamp = rawEvent.timeStamp

    document.dispatchEvent(event)
  };
}

my.onTouchStart && my.onTouchStart(eventHandlerFactory('touchstart'));
my.onTouchMove && my.onTouchMove(eventHandlerFactory('touchmove'));
my.onTouchEnd && my.onTouchEnd(eventHandlerFactory('touchend'));
my.onTouchCancel && my.onTouchCancel(eventHandlerFactory('touchcancel'));

module.exports = TouchEvent