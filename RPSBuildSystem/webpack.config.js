/**
 * Created by Brian on 9/26/2017.
 */

const path = require ('path');

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, 'js')
    }
};
