const cancelAnimationFrame = require('./cancelAnimationFrame');
const HTMLCanvasElement = require('./HTMLCanvasElement');
const HTMLElement = require('./HTMLElement');
const HTMLImageElement = require('./HTMLImageElement');
const HTMLMediaElement = require('./HTMLMediaElement')
const HTMLVideoElement = require('./HTMLVideoElement')
const FileReader = require('./FileReader')
const Image = require('./Image');
const ImageBitmap = require('./ImageBitmap');
const localStorage = require('./localStorage');
const location = require('./location');
const navigator = require('./navigator');
const requestAnimationFrame = require('./requestAnimationFrame');
const WebGLRenderingContext = require('./WebGLRenderingContext');
const WebSocket = require('./WebSocket');
const WindowProperties = require('./WindowProperties');
const { MouseEvent, TouchEvent } = require('./event-initer')
const { btoa, atob } = require('./util/Base64')

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

const alert = my.alert
function focus() { }
function blur() { }

module.exports = {
  cancelAnimationFrame,
  HTMLCanvasElement,
  HTMLElement,
  HTMLMediaElement,
  HTMLImageElement,
  HTMLVideoElement,
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
  screen,
  FileReader,
  alert,
  focus,
  blur,
  MouseEvent,
  TouchEvent,
  btoa,
  atob,
}
