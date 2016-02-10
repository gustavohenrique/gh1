;(function (angular) {
    'use strict';

    var app = angular.module('MainApp', [
        'MainRouter',
        'angular-loading-bar',
        'controllers.Pagination',
        'services.Pagination',
        'directives.Pagination',
        'directives.Tabular',
        'directives.TagEdit',
        'monospaced.qrcode'
    ]);

    app.constant('Constants', {
        // apiBaseUrl: 'http://localhost:5000/',
        apiBaseUrl: 'https://gh1.herokuapp.com/',
        shortenerUrl: 'http://gh1.co/',
        shortenerDomain: 'gh1.co'
    });

    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        // CORS
        // $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    }]);

    // app.factory('AuthInterceptor', [function () {
    //     return {
    //         request: function (config) {
    //             var token = '';
    //             config.headers = config.headers || {};
    //             // config.headers.Authorization = 'Bearer ' + token;
    //             config.headers.origin = '*';
    //             return config;
    //         }
    //     };
    // }]);

})(angular);
