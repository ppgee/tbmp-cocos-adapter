var window = $global
let _global = window
let adapter = _global.__globalAdapter = _global.__globalAdapter || {}

Object.assign(adapter, {
  init() {
    require('./wrapper/builtin/index')
    _global.DOMParser = require('./common/xmldom/dom-parser').DOMParser
    require('./wrapper/unify')
    require('./wrapper/fs-utils')
    require('./common/engine/globalAdapter/index')
    require('./wrapper/systemInfo')
  },
  adaptEngine() {
    require('./common/engine/index')
    require('./wrapper/builtin/engine/index')
  }
})