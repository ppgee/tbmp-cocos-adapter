const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

class InvalidCharacterError extends Error {
  constructor(message) {
    super(message)

    this.name = 'InvalidCharacterError'
    this.message = message
  }
}

function btoa(input) {
  var str = String(input);
  var output = '';

  for ( // initialize result and counter
    var block, charCode, idx = 0, map = chars; // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1); // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
    charCode = str.charCodeAt(idx += 3 / 4);

    if (charCode > 0xFF) {
      throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    }

    block = block << 8 | charCode;
  }

  return output;
} // decoder

function atob(input) {
  var str = String(input).replace(/[=]+$/, '');
  var output = '';

  for ( // initialize result and counters
    var bc = 0, bs, buffer, idx = 0; // get next character
    buffer = str.charAt(idx++); // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }

  return output;
}

module.exports = {
  btoa,
  atob
}