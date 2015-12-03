;(function (angular) {
    'use strict';

    var app = angular.module('directives.TagEdit', []);

    app.directive('tagEdit', function () {
        return {
            restrict: 'E',
            controller: 'PaginationCtrl',
            scope: {
                tag: '=',
                item: '=',
                idx: '='
            },
            template: '<span id="lbl{{ guid }}" class="ui purple basic label">{{ tag }}</span><input id="{{ guid }}" class="ui basic purple label" type="text" ng-model="tag">',
            link: function (scope, element, attrs, controller) {
                var guid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                scope.guid = '_' + guid;

                var label = element.find('span');
                label.on('click', edit);

                var input = element.find('input');
                input.addClass('hide');
                input.on('keydown', keydown);
                input.on('blur', update);

                var originalTag = angular.copy(scope.tag);

                function edit () {
                    $('#_' + guid).width(label[0].offsetWidth);
                    label.addClass('hide');
                    input.removeClass('hide');
                    _getInputField().focus();
                }

                function keydown (event) {
                    if (event.which === 32 || event.which === 13 || event.which === 27) {
                        _getInputField().blur();
                    }
                }

                function update () {
                    input.addClass('hide');
                    label.removeClass('hide');
                    if (scope.tag === '') {
                        scope.tag = originalTag;
                        scope.$apply();
                    }
                    scope.item.tags[scope.idx] = scope.tag;
                    controller.update(scope.item);
                }

                function _getInputField () {
                    return document.querySelector('#_' + guid);
                }
            }
        };
    });

})(angular);