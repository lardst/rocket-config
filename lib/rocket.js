/* global require, module, process */
(function () {
    'use strict';

    var path = require('path'),
        glob = require('glob'),
        fs = require('fs'),
        os = require('os').platform().toLowerCase(),
        extend = require('extend'),
        log = require('./log');

    function loadConfig(configFilePaths = []) {
        var returnObject = {},
            i = 0,
            configFileContents,
            thisFile,
            domain,
            parsedData;

        for (i in configFilePaths) {
            thisFile = configFilePaths[i];
            domain = thisFile.domain;

            try {
                configFileContents = fs.readFileSync(path.join(thisFile.dir, thisFile.base));
                parsedData = JSON.parse(configFileContents);
                if (!returnObject[domain]) {
                    returnObject[domain] = {'data': {}, domainData: {}};
                }
                thisFile.data = parsedData;
                returnObject[domain].domainData[thisFile.name.replace('.', '_')] = thisFile;
                extend(true, returnObject[domain].data, parsedData);
            } catch (error) {
                log.write(error);
            }
        }
        return returnObject;
    }

    class RocketConfig {
        constructor (configRelativePath, optionsOverride) {
            var baseFileRegExString             = '^[^\\.]+\\.json$',
                configFilePatterns              = [],
                configFilePatternForSearch      = '',
                configFiles                     = [],
                configPath                      = configRelativePath.replace(/\/$/i, '') || './config',
                options                         = {
                    domain  : '',
                    env     : process.env.NODE_ENV || 'development',
                    os      : os
                },

                // Placeholder variables
                baseFileRegExp,
                compiledConfig,
                configFilesRaw,
                configPathParsed,
                configRelativePathStats,
                domain,
                environmentRegExp,
                envOSCombineRegExp,
                fileEnvironmentRegExString,
                fileEnvOSCombineRegExString,
                fileOSRegExString,
                osRegExp;

            extend(options, optionsOverride);

            fileOSRegExString               = '^[^\\.]+\\.' + options.os + '\\.json$';
            fileEnvironmentRegExString      = '^[^\\.]+\\.' + options.env + '\\.json$';
            fileEnvOSCombineRegExString     = '^[^\\.]+\\.' + options.env + '\\.' + options.os + '\\.json$';

            baseFileRegExp                  = new RegExp(baseFileRegExString, 'i');
            osRegExp                        = new RegExp(fileOSRegExString, 'i');
            environmentRegExp               = new RegExp(fileEnvironmentRegExString, 'i');
            envOSCombineRegExp              = new RegExp(fileEnvOSCombineRegExString, 'i');

            try {
                configRelativePathStats = fs.lstatSync(configPath);
                configFilePatternForSearch = configPath + '/*.json';
            } catch (error) {
                configPathParsed = path.parse(configPath);
                options.domain = configPathParsed.base;
                configFilePatterns.push(options.domain);
                configFilePatterns.push(options.domain + '.' + options.os);
                configFilePatterns.push(options.domain + '.' + options.env);
                configFilePatterns.push(options.domain + '.' + options.os + '.' + options.env);
                configFilePatternForSearch = configPathParsed.dir + '/{' + configFilePatterns.join(',') + '}.json';
            }

            configFilesRaw = glob.sync(configFilePatternForSearch);

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
                Object.defineProperty(this, domain, {
                    value       : compiledConfig[domain].data,
                    enumerable  : true
                });
            }
        }
    }

    module.exports = function (configRelativePath, options = {}) {
        return new RocketConfig(configRelativePath, options);
    };
})();
