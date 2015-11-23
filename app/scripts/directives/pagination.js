;(function (angular) {
    'use strict';

    var app = angular.module('directives.Pagination', []);

    app.directive('pagination', [function () {
        return {
            restrict: 'E',
            template: '<div class="ui pagination menu"> \
                <a class="icon item" ng-click="vm.previous()"><i class="left arrow icon"></i></a> \
                <span class="icon disabled item"><input style="border:0;width:20px" ng-model="vm.paginationData.currentPage"></span> \
                <a class="icon item" ng-click="vm.refresh()"><i class="refresh icon"></i></a> \
                <a class="icon item" ng-click="vm.next()"><i class="right arrow icon"></i></a> \
                </div>',
            scope: '=',
            link: function (scope, element, attrs) {
                var vm = scope.vm;
                vm.paginationData.currentPage = 1;

                vm.refresh = function () {
                    vm.paginate(vm.paginationData.currentPage);
                };

                vm.next = function () {
                    vm.paginationData.currentPage++;
                    vm.refresh();
                };

                vm.previous = function () {
                    vm.paginationData.currentPage--;
                    if (vm.paginationData.currentPage < 1) {
                        vm.paginationData.currentPage = 1;
                    }
                    vm.refresh();
                };
            }
        };
    }]);

})(angular);
