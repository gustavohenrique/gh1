;(function (angular) {
    'use strict';

    angular
        .module('services.Pagination', [])
        .service('paginationService', PaginationService);

    PaginationService.$inject = ['$http', '$q', 'Constants'];

    function PaginationService ($http, $q, Constants) {

        this.findAll = function (perPage, page) {
            var url = Constants.apiBaseUrl + 'find?1=1';
            if (page > 0) {
                url += '&page=' + page;
            }
            if (perPage > 0) {
                url += '&per_page=' + perPage;
            }
            return $http.get(url);
        };

        this.save = function (item) {
            if (item.longUrl && item.longUrl.length > 0) {
                var url = Constants.apiBaseUrl + 'add';
                return $http.post(url, item);
            }
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };
    }

})(angular);
