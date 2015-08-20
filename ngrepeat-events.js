/**
 * Created by nemade_g on 07-07-2015.
 */
angular.module('gtpWebApp.core')
    .directive('ngRepeatEvents', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var onCompleteFn;
                if(attr['oncompleterender']) {
                    onCompleteFn = $parse(attr['oncompleterender'])
                }
              //scope.$watch('$last', function(newVal, oldVal){
                if(!!scope.$last){
                  $timeout(function () {
                    scope.$apply(function(){
                      if(onCompleteFn) {
                        onCompleteFn(scope);
                      }

                    })
                  });
                }
              //})
            }
        }
    }]);
