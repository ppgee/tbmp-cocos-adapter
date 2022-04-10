const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'adapter.js',
    path: path.resolve(__dirname, 'lib'),
  },
  plugins: []
};