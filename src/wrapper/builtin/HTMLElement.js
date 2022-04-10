const Element = require('./Element');
const util = require('./util/index');
const WindowProperties = require('./WindowProperties');

class HTMLElement extends Element {
  className = ''
  childern = []
  style = {
    width: `${WindowProperties.innerWidth}px`,
    height: `${WindowProperties.innerHeight}px`
  }

  insertBefore = util.noop

  innerHTML = ''

  constructor(tagName = '') {
    super()
    this.tagName = tagName.toUpperCase()
  }

  setAttribute(name, value) {
    this[name] = value
  }

  getAttribute(name) {
    return this[name]
  }

  get clientWidth() {
    const ret = parseInt(this.style.fontSize, 10) * this.innerHTML.length

    return Number.isNaN(ret) ? 0 : ret
  }

  get clientHeight() {
    const ret = parseInt(this.style.fontSize, 10)

    return Number.isNaN(ret) ? 0 : ret
  }

  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: WindowProperties.innerWidth,
      height: WindowProperties.innerHeight
    }
  }

  focus() {

  }
}

module.exports = HTMLElement
