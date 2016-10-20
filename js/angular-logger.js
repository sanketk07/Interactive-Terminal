var xlogger = angular.module('xLogger', []);

xlogger.provider('xLogger', function () {
    'use strict';
    var loggerCongif = {
        writeToServer : true,
        context : undefined,
        typeOfLogsToWrite : undefined,
        dateFormat : 'dd-MMM-yyyy HH:mm:ss',
        method : 'POST',
        serviceURLs : {
            info : undefined,
            error : undefined,
            warn : undefined,
            debug : undefined,
            log : undefined
        },
        logCustomCss : {
            info : undefined,
            error : undefined,
            warn : undefined,
            debug : undefined,
            log : undefined
        }
    };
    this.writeToServer = function (condition) {
        loggerCongif.writeToServer = !!condition;
    };
    this.setMethod = function (method) {
        if (method.toLowerCase() === 'post' || method.toLowerCase() === 'get') {
            loggerCongif.method = method;
        } else {
            throw new Error('Invalid Method');
        }
    };
    this.setTypesOfLogsToWrite = function (types) {
        var typesArr = types.split(','), index = 0;
        for (index = 0; index < typesArr.length; index = index + 1) {
            typesArr[index] = typesArr[index].trim();
        }
        loggerCongif.typeOfLogsToWrite = typesArr;
    };
    this.getContext = function (context) {
        loggerCongif.context = context;
    };
    this.setDateFormat = function (dateFormat) {
        loggerCongif.dateFormat = dateFormat;
    };
    this.setServiceURLs = function (type, url) {
        type = type.toLowerCase();
        loggerCongif.serviceURLs[type] = url;
    };
    this.setCustomCss = function (type, style) {
        type = type.toLowerCase();
        loggerCongif.logCustomCss[type] = style;
    };
    this.$get = ['$log', 'dateFilter', '$http', function ($log, dateFilter, http) {
        if (!loggerCongif.context) {
            throw new Error('Context Is Not Set For Logger Instance');
        }
        var checkArrayContains = function (a, obj) {
            var i = 0;
            for (i = 0; a && obj && i < a.length; i = i + 1) {
                if (a[i].toLowerCase() === obj.toLowerCase()) {
                    return true;
                }
            }
            return false;
        },
            checkAndWriteToServer = function (input, type) {
                if (loggerCongif.writeToServer && checkArrayContains(loggerCongif.typeOfLogsToWrite, type)) {
                    var urlToHit;
                    switch (type) {
                    case 'LOG':
                        urlToHit = loggerCongif.serviceURLs.log;
                        break;
                    case 'INFO':
                        urlToHit = loggerCongif.serviceURLs.info;
                        break;
                    case 'WARN':
                        urlToHit = loggerCongif.serviceURLs.warn;
                        break;
                    case 'DEBUG':
                        urlToHit = loggerCongif.serviceURLs.debug;
                        break;
                    case 'ERROR':
                        urlToHit = loggerCongif.serviceURLs.error;
                        break;
                    }
                    http({method : loggerCongif.method,
                               url : urlToHit,
                               data : {logData : input}
                              })
                        .success(function () {
                            $log.info('Written To Server');
                        });
                }
            },
            generateLog = function (input, type) {
                var date = dateFilter(new Date(), loggerCongif.dateFormat), logOutPut;
                try {
                    input = JSON.stringify(input);
                } catch (e) {
                    input = input.trim();
                }
                logOutPut = loggerCongif.context + ' | ' + type + ' | ' + input + ' - ' + date;
                checkAndWriteToServer(logOutPut, type);
                return logOutPut;
            };
        return {
            log : function (input) {
                var logStateMent = generateLog(input, 'LOG');
                if (loggerCongif.logCustomCss.log) {
                    $log.log('%c' + logStateMent, loggerCongif.logCustomCss.log);
                } else {
                    $log.log(logStateMent);
                }
            },
            warn : function (input) {
                var logStateMent = generateLog(input, 'WARN');
                if (loggerCongif.logCustomCss.warn) {
                    $log.warn('%c' + logStateMent, loggerCongif.logCustomCss.warn);
                } else {
                    $log.warn(logStateMent);
                }
            },
            info : function (input) {
                var logStateMent = generateLog(input, 'INFO');
                if (loggerCongif.logCustomCss.info) {
                    $log.info('%c' + logStateMent, loggerCongif.logCustomCss.info);
                } else {
                    $log.info(logStateMent);
                }
            },
            error : function (input) {
                var logStateMent = generateLog(input, 'ERROR');
                if (loggerCongif.logCustomCss.error) {
                    $log.error('%c' + logStateMent, loggerCongif.logCustomCss.error);
                } else {
                    $log.error(logStateMent);
                }
            },
            debug : function (input) {
                var logStateMent = generateLog(input, 'DEBUG');
                if (loggerCongif.logCustomCss.debug) {
                    $log.debug('%c' + logStateMent, loggerCongif.logCustomCss.debug);
                } else {
                    $log.debug(logStateMent);
                }
            }
        };
    }];
});