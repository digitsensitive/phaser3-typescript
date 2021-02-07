const path = require('path');

module.exports = {
  entry: './main.js',
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    host: '127.0.0.1',
    port: 8000,
    open: true
  }
};
