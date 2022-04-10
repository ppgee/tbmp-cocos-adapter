const WindowProperties = require('./WindowProperties');
const window = $global;

function Canvas() { }

let CanvasProxy = new Proxy(Canvas, {
  construct() {

    const canvas = my.createOffscreenCanvas()

    canvas.type = 'canvas'

    // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

    const _getContext = canvas.getContext

    canvas.getBoundingClientRect = () => {
      const ret = {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }
      return ret
    }

    canvas.style = {
      top: '0px',
      left: '0px',
      width: WindowProperties.innerWidth + 'px',
      height: WindowProperties.innerHeight + 'px',
    }

    canvas.addEventListener = function (type, listener, options = {}) {
      // console.log('canvas.addEventListener', type);
      $global.document.addEventListener(type, listener, options);
    }

    canvas.removeEventListener = function (type, listener) {
      // console.log('canvas.removeEventListener', type);
      $global.document.removeEventListener(type, listener);
    }

    canvas.dispatchEvent = function (event = {}) {
      console.log('canvas.dispatchEvent', event.type, event);
      // nothing to do
    }

    Object.defineProperty(canvas, 'clientWidth', {
      enumerable: true,
      get: function get() {
        return WindowProperties.innerWidth
      }
    })

    Object.defineProperty(canvas, 'clientHeight', {
      enumerable: true,
      get: function get() {
        return WindowProperties.innerHeight
      }
    })

    return canvas
  },
});

module.exports = CanvasProxy
