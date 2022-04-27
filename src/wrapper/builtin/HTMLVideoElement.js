const HTMLMediaElement = require('./HTMLMediaElement');

class HTMLVideoElement extends HTMLMediaElement {
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

module.exports = HTMLVideoElement
