;(function (angular) {
    'use strict';

    angular
        .module('controllers.Pagination', [])
        .controller('PaginationCtrl', PaginationCtrl);

    PaginationCtrl.$inject = [
        '$location', '$routeParams',
        '$timeout', 'paginationService',
        'Constants'
    ];

    function PaginationCtrl ($location, $routeParams, $timeout, paginationService, Constants) {
        var vm = this;
        vm.paginationData = {
            perPage: 20,
            currentPage: 1
        };
        vm.save = save;
        vm.paginate = paginate; // called by directives
        vm.error = {};
        vm.website = {};
        vm.longUrl = '';
        vm.shortUrl = Constants.shortenerUrl;

        paginate(vm.paginationData.currentPage);

        function save () {
            vm.website = _putHttpPreffixInLongUrl(vm.longUrl);
            paginationService.save(vm.website)
                .then(function (res) {
                    vm.website = res.data;
                    vm.website.shortUrl = Constants.shortenerUrl + res.data.code;
                    vm.longUrl = '';
                    _setError('Add', res);
                })
                .catch(function (e) {
                    _setError('Add', e);
                });
        }

        function paginate (pageNumber, perPage) {
            var paginationData = vm.paginationData || {};
            if (! perPage) {
                perPage = paginationData.perPage;
            }
            paginationService.findAll(perPage, pageNumber)
                .then(function (res) {
                    paginationData.items = res.data.content;
                    _setError('Find', res);
                })
                .catch(function (e) {
                    _setError('Find', e);
                });
        }

        function _putHttpPreffixInLongUrl (longUrl) {
            if (! longUrl.startsWith('http')) {
                longUrl = 'http://' + longUrl;
            }
            return {'longUrl': longUrl};
        }

        function _setError(key, res) {
            var status = res.status;
            var hasError = false;
            if (status >= 400) {
                hasError = true;
            }
            vm.errors = {};
            vm.errors[key] = {
                'status': status,
                'message': res.data,
                'hasError': hasError
            };
        }

    }

})(angular);
