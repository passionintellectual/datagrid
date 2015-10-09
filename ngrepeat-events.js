/**
 * Created by nemade_g on 07-07-2015.
 */
angular.module('gtpWebApp.core')
    .directive('ngRepeatEvents', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var processLast = function () {
                    if (!!scope.$last) {
                        $timeout(function () {
                            var onCompleteFn;
                            if (attr['oncompleterender']) {
                                onCompleteFn = $parse(attr['oncompleterender'])
                            }
                            if (onCompleteFn) {
                                onCompleteFn(scope);
                            }
                        })
                    }
                };

                if(attr.repeatEventsInvoker){
                    attr.$observe('repeatEventsInvoker', function (newValue, oldValue) {
                        processLast()
                    });
                }
                processLast();

            }
        }
    }]);
