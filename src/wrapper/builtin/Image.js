const screencanvas = $global.screencanvas;

function Image() {
  // empty constructor
}
const ImageProxy = new Proxy(Image, {
  construct(target, args) {
    let img = screencanvas.createImage();
    if (!img.addEventListener) {
      img.addEventListener = function (eventName, eventCB) {
        if (eventName === 'load') {
          img.onload = eventCB;
        } else if (eventName === 'error') {
          img.onerror = eventCB;
        }
      };
    }

    if (!img.removeEventListener) {
      img.removeEventListener = function (eventName) {
        if (eventName === 'load') {
          img.onload = null;
        } else if (eventName === 'error') {
          img.onerror = null;
        }
      };
    }
    return img;
  },
});

module.exports = ImageProxy
