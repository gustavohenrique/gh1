;(function (angular) {
    'use strict';

    var app = angular.module('MainApp', [
        'MainRouter',
        'angular-loading-bar',

        'controllers.Auth',
        'controllers.Menu',
        'controllers.Pagination',

        'services.Pagination',

        'directives.Pagination',
        'directives.Tabular'
    ]);

    app.constant('Constants', {
        apiBaseUrl: 'http://gh1.herokuapp.com/',
        shortenerUrl: 'http://gh1.co/'
    });

    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        // CORS
        //$httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    }]);

    /*
    app.factory('AuthInterceptor', [function () {
        return {
            request: function (config) {
                var token = '';
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
                return config;
            }
        };
    }]);
    */

})(angular);
