const { btoa } = require('./Base64')

const isIDE = my.isIDE || false

function noop() { }

function transformArrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);

  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

function encode(str) {
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var string = String(str);
  var result = '';
  var currentIndex = 0;
  var sum = void 0;

  while (string.charAt(0 | currentIndex) || (encodings = '=', currentIndex % 1)) {
    currentIndex += 0.75; // 每次移动3/4个位置

    var currentCode = string.charCodeAt(currentIndex); // 获取code point

    if (currentCode > 255) {
      // 大于255无法处理
      throw new Error('"btoa" failed');
    }

    sum = sum << 8 | currentCode; // 每次在上次的基础上左移8位再加上当前code point

    var encodeIndex = 63 & sum >> 8 - currentIndex % 1 * 8; // 去除多余的位数，再去最后6位

    result += encodings.charAt(encodeIndex);
  }

  return result;
}

function decode(str) {
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var res = '';
  var string = String(str).replace(/[=]+$/, '');
  var o,
    r,
    i = 0,
    currentIndex = 0;

  while (r = string.charAt(currentIndex)) {
    currentIndex = currentIndex + 1;
    r = encodings.indexOf(r);

    if (~r) {
      o = i % 4 ? 64 * o + r : r;

      if (i++ % 4) {
        res += String.fromCharCode(255 & o >> (-2 * i & 6));
      }
    }
  }

  return res;
}

function arrayBufferToBase64(buffer) {
  var result = '';
  var uintArray = new Uint8Array(buffer);
  var byteLength = uintArray.byteLength;

  for (var i = 0; i < byteLength; i++) {
    result += String.fromCharCode(uintArray[i]);
  }

  return encode(result);
}

function base64ToArrayBuffer(base64) {
  var string = decode(base64);
  var length = string.length;
  var uintArray = new Uint8Array(length);

  for (var i = 0; i < length; i++) {
    uintArray[i] = string.charCodeAt(i);
  }

  return uintArray.buffer;
}

module.exports = {
  isIDE,
  noop,
  transformArrayBufferToBase64,
  arrayBufferToBase64,
  base64ToArrayBuffer,
}
/***/