const HTMLElement = require('./HTMLElement');

class HTMLMediaElement extends HTMLElement {
  constructor(tagName) {
    super(tagName)
  }

  addTextTrack() {}
  capureStream() {}
  fastSeek() {}
  load() {}
  pause() {}
  play() {}
  canPlayType() {}
}

module.exports = HTMLMediaElement
