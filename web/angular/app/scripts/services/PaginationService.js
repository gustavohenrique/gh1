;(function (angular) {
    'use strict';

    angular
        .module('services.Pagination', [])
        .service('paginationService', PaginationService);

    PaginationService.$inject = ['$http', '$q', 'Constants'];

    function PaginationService ($http, $q, Constants) {

        var ENDPOINT = Constants.apiBaseUrl + 'shortener'

        this.search = function (perPage, page) {
            var url = ENDPOINT + '?1=1';
            if (page > 0) {
                url += '&page=' + page;
            }
            if (perPage > 0) {
                url += '&per_page=' + perPage;
            }
            return $http.get(url);
        };

        this.create = function (item) {
            if (item.longUrl && item.longUrl.length > 0) {
                return $http.post(ENDPOINT, item);
            }
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        this.update = function (item) {
            if (item && item.code.length > 0) {
                return $http.put(ENDPOINT, item);
            }
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };
    }

})(angular);
