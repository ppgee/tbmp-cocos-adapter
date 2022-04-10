const Window = require('./window')
const HTMLElement = require('./HTMLElement')
const Image = require('./Image')
const Canvas = require('./Canvas')
const Audio = require('./Audio')

const events = {}

const document = {
  readyState: 'complete',
  visibilityState: 'visible',
  documentElement: Window,
  hidden: false,
  style: {},
  location: Window.location,
  ontouchstart: null,
  ontouchmove: null,
  ontouchend: null,

  head: new HTMLElement('head'),
  body: new HTMLElement('body'),

  createElement(tagName) {
    tagName = tagName.toLowerCase();
    if (tagName === 'canvas') {
      return new Canvas()
    } else if (tagName === 'audio') {
      return new Audio()
    } else if (tagName === 'img') {
      return new Image()
    }

    return new HTMLElement(tagName)
  },

  createElementNS(nameSpace, tagName) {
    return this.createElement(tagName);
  },

  getElementById(id) {
    if (id === Window.canvas.id) {
      return Window.canvas
    }
    return null
  },

  getElementsByTagName(tagName) {
    if (tagName === 'head') {
      return [document.head]
    } else if (tagName === 'body') {
      return [document.body]
    } else if (tagName === 'canvas') {
      return [Window.canvas]
    }
    return []
  },

  getElementsByName(tagName) {
    if (tagName === 'head') {
      return [document.head]
    } else if (tagName === 'body') {
      return [document.body]
    } else if (tagName === 'canvas') {
      return [Window.canvas]
    }
    return []
  },

  querySelector(query) {
    if (query === 'head') {
      return document.head
    } else if (query === 'body') {
      return document.body
    } else if (query === 'canvas') {
      return Window.canvas
    } else if (query === `#${Window.canvas.id}`) {
      return Window.canvas
    }
    return null
  },

  querySelectorAll(query) {
    if (query === 'head') {
      return [document.head]
    } else if (query === 'body') {
      return [document.body]
    } else if (query === 'canvas') {
      return [Window.canvas]
    }
    return []
  },

  addEventListener(type, listener) {
    if (!events[type]) {
      events[type] = []
    }
    events[type].push(listener)
  },

  removeEventListener(type, listener) {
    const listeners = events[type]

    if (listeners && listeners.length > 0) {
      for (let i = listeners.length; i--; i > 0) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1)
          break
        }
      }
    }
  },

  dispatchEvent(event) {
    const listeners = events[event.type]

    if (listeners) {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](event)
      }
    }
  }
}

module.exports = document
