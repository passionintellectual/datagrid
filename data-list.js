angular.module('gtpWebApp.core')
    .directive('datagrid', ['$timeout', '$parse', '$compile', 'pagingService', 'guidService', function($timeout, $parse, $compile, pagingService, guidService) {
        return {
            restrict: 'E',
            transclude: true,
             scope:true,
            template: '<div class="gridContainer {{gridClass}}"><element-spinner blocked="blocked"><div  class="content"  ><ng-transclude></ng-transclude></div></element-spinner> </div>',
            // template: '<div class="gridContainer {{gridClass}}"><div  class="content"  ><ng-transclude></ng-transclude></div> </div>',
            priority: 920,
            link: {
                pre: function preLink(scope, element, attrs, controller, transclude) {
                    if (attrs.onIndexChanged) {
                        controller.onIndexChanged =  attrs.onIndexChanged ;
                    }
                     
                    controller.repeatExpression = $(element).attr('repeat');
                    var repeatAttrs = checkExpression(controller.repeatExpression);

                    controller.repeatAttrs = repeatAttrs;
                    console.log('datagrid scope', scope);
                    var pagingKey = element.find('.paging').attr('uniquekey');
                    if (!pagingKey || pagingKey.length === 0) {
                        pagingKey = guidService.new();
                        element.find('.gridContainer').attr('uniquekey', pagingKey);
                    }
                    //scope is shared so have to store it in controller.
                    controller.pagingUniqueKey = pagingKey;




                    function checkExpression(expression) {
                        var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

                        if (!match) {
                            throw ngRepeatMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
                                expression);
                        }

                        var lhs = match[1];
                        var rhs = match[2];
                        var aliasAs = match[3];
                        var trackByExp = match[4];

                        match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);

                        if (!match) {
                            throw ngRepeatMinErr('iidexp', "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",
                                lhs);
                        }

                        return {
                            lhs: lhs,
                            rhs: rhs,
                            aliasAs: aliasAs,
                            trackByExp: trackByExp
                        };
                    }

                },
                post: function postLink(scope, element, iAttrs, controller) {

                }
            },

            controller: 'dataListCntrl'
        }
    }]).controller('dataListCntrl', ['$scope', 'pagingService', function($scope, pagingService) {
            this.block = function(){
                $scope.blocked = true;
            }
            this.unBlock = function(){
                
             $scope.blocked = false;   
            }
            
    }]);