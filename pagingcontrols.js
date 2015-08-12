angular.module('gtpWebApp.core')
    .directive('pagingcontrols', ['$compile','$timeout', '$parse', 'pagingService', 'guidService', function($compile, $timeout, $parse, pagingService, guidService) {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            template: '<div class="paging"  on-size-changed="onPageSizeChanged(event)"  ><button ng-click="goBack()">Prev</button><button ng-click="goNext()">Next</button></div>',
            scope: {
                pageSize: '@',
                currentPage: '=',
                mode: '@',
                onIndexChanged: '&',
                onSizeChanged: '&'
            },
            compile: function(scope, tElem, tAttrs) {
                
                            //  angular.element(  element).attrs( 'on-index-changed', 'onCurrentPageChanged(currentPage)');
                  
                return {
                    pre: function(scope, element, attrs) {
                        console.log('paging pre function scope', scope);
                        //var element = $element.find('.paging');
                        var uniquek = element.parents('.gridContainer').attr('uniquekey');
                        var uniqueKey = (uniquek && uniquek.length > 0) ? uniquek : guidService.new();
                        console.log('uniqueKey at paging direcitve', uniqueKey);
                        element.attr('uniquekey', uniqueKey);
                        scope.paging = new pagingService(uniqueKey);
                                
                    // $(element).attr('on-index-changed', 'onCurrentPageChanged(currentPage)');
                    //   $compile(element)(scope);
                    if(!attrs.onIndexChanged){
                       scope.onIndexChanged = scope.$parent.onCurrentPageChanged;
                    }
                        if (attrs.pageSize) {
                            $timeout(function() {

                                //scope.paging.pageSize = attrs.pageSize;
                                scope.paging.setSize(+attrs.pageSize);

                            });
                        }

                        //
                        //$timeout(function(){
                        //    scope.paging.setSize(3);
                        //},10000);


                        //console.log('iin directive paging',scope.paging);

                    },
                    post: function(scope, element, attrs) {
                        console.log('element contents', element.contents());
                        // $compile(element.contents())(scope);
                    }
                };
            },
            controller: 'pagingCntrl'
        }
    }]).controller('pagingCntrl', ['$timeout', '$scope', 'pagingService', function($timeout, $scope, pagingService) {
        console.log('pagingcontroller', $scope);
        $scope.goNext = function() {
            $scope.paging.goNext();
        }
        $scope.goBack = function() {
            $scope.paging.goBack();
        };
        $scope.$watch('paging.currentPage', function(newVal, oldVal) {
            if (newVal != oldVal) {
                //console.log('current page size is changed.' + newVal);
                if ($scope.onIndexChanged) {
                    var object = {
                        start: 0,
                        end: $scope.paging.pageSize
                    };
                    object.start = $scope.paging.pageSize * ($scope.paging.currentPage);
                    object.end = object.start + $scope.paging.pageSize;
                    
                    $scope.onIndexChanged.apply($scope, [{
                        event:{
                            newCurrentPage: newVal,
                            oldCurrentPage: oldVal,
                            extent: object,
                            pageSize: $scope.paging.pageSize
                        }
                    }])
                    
                }
            }
        });


        $scope.$watch(function() {
            return $scope.paging.pageSize;
        }, function(newVal, oldVal) {
            if (newVal != oldVal) {
                console.log('  pageSize is changed.' + newVal);
                if ($scope.onSizeChanged) {
                    $scope.onSizeChanged({
                        currentPage: {
                            newPageSize: newVal,
                            oldPageSize: oldVal
                        }
                    });
                }
            }
        });
    }]);