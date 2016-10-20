var app = angular.module('demo-app', ['xLogger']);

app.config(['xLoggerProvider', function (xLoggerProvider) {
    'use strict';
    xLoggerProvider.writeToServer(false);
    xLoggerProvider.setDateFormat('dd-MMMM-yyyy');
    xLoggerProvider.getContext('mycmd');
    xLoggerProvider.setCustomCss('log', 'background:#333;color:#2ee8a1;');
}]);

app.controller('demoController', ['xLogger', function (logger) {
    'use strict';
}]);