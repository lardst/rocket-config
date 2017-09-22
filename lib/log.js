/* global require, module */
var bunyan = require('bunyan'),
    config = require('../package'),
    fs = require('fs'),
    path = require('path');

class Log {
    constructor () {
        var logFolder = './logs';

        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder);
        }
        this.logger = bunyan.createLogger({
            name: config.name,
            streams: [{
                level: 'error',
                path: path.resolve(logFolder, config.name + '-error.log')
            }]
        });
    }

    write (message) {
        this.logger(message);
    }
}

module.exports = new Log();
