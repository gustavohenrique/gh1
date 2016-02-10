;(function (angular) {
    'use strict';

    angular
        .module('MainRouter', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/pagination-list.html',
                    controller: 'PaginationCtrl',
                    controllerAs: 'vm'
                });
            }
        ]);
})(angular);
