const path = require('path');

module.exports = {
    entry: ['whatwg-fetch', './src/app.js'],
    output: {filename: 'app.js', path: path.resolve(__dirname, 'js')}
};