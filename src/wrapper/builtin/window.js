const cancelAnimationFrame = require('./cancelAnimationFrame');
const HTMLCanvasElement = require('./HTMLCanvasElement');
const HTMLElement = require('./HTMLElement');
const HTMLImageElement = require('./HTMLImageElement');
const Image = require('./Image');
const ImageBitmap = require('./ImageBitmap');
const localStorage = require('./localStorage');
const location = require('./location');
const navigator = require('./navigator');
const requestAnimationFrame = require('./requestAnimationFrame');
const WebGLRenderingContext = require('./WebGLRenderingContext');
const WebSocket = require('./WebSocket');
const WindowProperties = require('./WindowProperties');

const {
  devicePixelRatio,
  innerHeight,
  innerWidth,
  ontouchend,
  ontouchmove,
  ontouchstart,
  performance,
  screen
} = WindowProperties

module.exports = {
  cancelAnimationFrame,
  HTMLCanvasElement,
  HTMLElement,
  HTMLImageElement,
  Image,
  ImageBitmap,
  localStorage,
  location,
  navigator,
  requestAnimationFrame,
  WebGLRenderingContext,
  WebSocket,
  devicePixelRatio,
  innerHeight,
  innerWidth,
  ontouchend,
  ontouchmove,
  ontouchstart,
  performance,
  screen
}
