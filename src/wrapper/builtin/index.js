const document = require('./document');
const window = require('./window');
const { isIDE } = require('./util')

function inject() {
  // 暴露全局的 canvas
  window.canvas = $global.screencanvas;
  window.document = document;

  window.addEventListener = (type, listener) => {
    window.document.addEventListener(type, listener)
  }
  window.removeEventListener = (type, listener) => {
    window.document.removeEventListener(type, listener)
  }
  window.dispatchEvent = window.document.dispatchEvent;

  // const { platform } = my.getSystemInfoSync()

  if (isIDE) {
    $global.parent = window
  }

  $global.my = my
  Object.assign($global, window);
}

if (!$global.__isAdapterInjected) {
  $global.__isAdapterInjected = true
  inject()
}
