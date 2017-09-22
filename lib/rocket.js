/* global require, console, module, process */
(function () {
    'use strict';

    var path = require('path'),
        glob = require('glob'),
        fs = require('fs'),
        os = require('os').platform().toLowerCase(),
        extend = require('extend');

    function loadConfig(configFilePaths = []) {
        var returnObject = {},
            i = 0,
            configFileContents,
            thisFile,
            domain;

        for (i in configFilePaths) {
            thisFile = configFilePaths[i];
            domain = thisFile.domain;

            try {
                configFileContents = fs.readFileSync(path.join(thisFile.dir, thisFile.base));
                if (!returnObject[domain]) {
                    returnObject[domain] = {};
                }
                extend(returnObject[domain], JSON.parse(configFileContents));
            } catch (error) {

            }
        }
        return returnObject;
    }

    class RocketConfig {
        constructor (configRelativePath, environmentOverride) {
            var configPath = path.normalize(configRelativePath || './config'),
                env = environmentOverride || process.env.NODE_ENV || 'development',
                configFiles = [],
                configFilesRaw = glob.sync(configPath + '/*.json'),
                baseFileRegExString = '^[^\\.]+\\.json$',
                fileOSRegExString = '^[^\\.]+\\.' + os + '\\.json$',
                fileEnvironmentRegExString = '^[^\\.]+\\.' + env + '\\.json$',
                fileEnvOSCombineRegExString = '^[^\\.]+\\.' + env + '\\.' + os + '\\.json$',
                baseFileRegExp = new RegExp(baseFileRegExString, 'i'),
                osRegExp = new RegExp(fileOSRegExString, 'i'),
                environmentRegExp = new RegExp(fileEnvironmentRegExString, 'i'),
                envOSCombineRegExp = new RegExp(fileEnvOSCombineRegExString, 'i'),
                compiledConfig,
                domain;

            configFilesRaw.forEach (function (fileName) {
                var thisFile = path.parse(fileName),
                    baseFileMatch = thisFile.base.match(baseFileRegExp),
                    envMatch = thisFile.base.match(environmentRegExp),
                    osMatch = thisFile.base.match(osRegExp),
                    envOSMatch = thisFile.base.match(envOSCombineRegExp);

                thisFile.domain = thisFile.name.match(/^([^\.$]+)/i)[0];

                if (baseFileMatch) {
                    thisFile.order = 1;
                } else if (osMatch) {
                    thisFile.order = 2;
                } else if (envMatch) {
                    thisFile.order = 3;
                } else if (envOSMatch) {
                    thisFile.order = 4;
                } else {
                    thisFile = null;
                }

                if (thisFile) {
                    configFiles.push(thisFile);
                }
            });

            configFiles.sort(function (a, b) {
                var orderA = a.order,
                    orderB = b.order;

                if (orderA < orderB) {
                    return -1;
                } else if (orderA > orderB) {
                    return 1;
                }
                return 0;
            });

            compiledConfig = loadConfig(configFiles);

            for (domain in compiledConfig) {
                Object.defineProperty(this, domain, {value: compiledConfig[domain]});
            }
        }
    }

    module.exports = function (configRelativePath, environmentOverride) {
        return new RocketConfig(configRelativePath, environmentOverride);
    };
})();
