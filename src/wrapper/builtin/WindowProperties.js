const {
  pixelRatio,
  windowWidth,
  windowHeight
} = my.getSystemInfoSync()
const devicePixelRatio = pixelRatio;

let width, height;
if ($global.screencanvas.getBoundingClientRect) {
  let rect = $global.screencanvas.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
} else {
  width = windowWidth;
  height = windowHeight;
}
const innerWidth = width;
const innerHeight = height;

const screen = {
  width,
  height,
  availWidth: innerWidth,
  availHeight: innerHeight,
  availLeft: 0,
  availTop: 0,
}

const performance = {
  now: Date.now
};

const ontouchstart = null;
const ontouchmove = null;
const ontouchend = null;

module.exports = {
  innerWidth,
  innerHeight,
  devicePixelRatio,
  screen,
  performance,
  ontouchstart,
  ontouchmove,
  ontouchend
}
