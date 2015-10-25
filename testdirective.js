/**
 * Created by nemade_g on 31-08-2015.
 */

angular.module('WebApp.core')
    .directive('testdirective', ['$timeout', '$parse', '$gq', function($timeout, $parse, $gq) {
        return {
            restrict: 'AE',
            priority: 1500,
            //   transclude:true,
            //   scope:{

            //      onScrollEnd:'&',
            //      onScrollStart:'&',

            //   },
            // scope:true,
            template: '',
            //require:'iscrollerCntrl',
            compile: function () {

                return {
                    post: function (scope, element, attrs) {

                        var i = $(element).attr('cnt') || 0;
                        i = +i + 1;
                        $(element).attr('cnt', i);

                    }

                }
            }
        }
    }]);