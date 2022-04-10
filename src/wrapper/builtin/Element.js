const Node = require('./Node');

class Element extends Node {
  className = ''
  children = []

  constructor() {
    super()
  }
}

module.exports = Element
