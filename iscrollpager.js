angular.module('gtpWebApp.core')
    .directive('iscrollpager', ['$compile', '$timeout', '$parse', 'pagingService', '$q', function($compile, $timeout, $parse, pagingService, $q) {
        return {
            restrict: 'AEC',
            priority: 1010,
            require: '^datagrid',
            template: '<div class="pagerimpl" apply-scroll-promise="pagerimplScrollPromise"  i-scrollable scroller-timeout="500"  scroller-key="{{pagerimplScrollerKey}}" scroll-height="{{pagerimplScrollHeight}}" on-scroll-bottom="onScrollBottom(e)"  ></div>',
             compile:function(element, attrs){
                      
                 
             var link = {
                pre: function preLink(scope, element, attrs, controller, transclude) {

                    scope.pagerimplScrollHeight = attrs.scrollHeight;
                    scope.pagerimplScrollerKey = controller.uniqueKey;
                    // element.attr('iscrollable', '');
                    // element.attr('scroller-key', 'controller.uniqueKey');
                    // // on-scroll-end="innerScrollEnd(e)"
                    // element.attr('on-scroll-end', 'onscrollend(e)');
                    
                    scope.pagerimplScrollPromise = $q.defer();
    
                    scope.pagingMode = attrs.pagingMode;
                   
                    scope.onScrollBottom = function (argument) {
                        // scope.dgStart = 0; //$scope.paging.pageSize;
                       // scope.dgEnd += scope.paging.pageSize;
                       scope.paging.goNext();
                      
                      console.log('reached bottom', argument);
                    }
                  
                    scope.onCurrentPageChanged = function(eventWrapper) {
                        var event = eventWrapper.info || eventWrapper;
                          switch (scope.pagingMode) {
                   
                            case 'server':
                                scope.block();
                                
                                if (scope.onIndexChanged) {
                                  
                                        var prms = scope.onIndexChanged(scope, {
                                        event: event
                                    })
                                   
                                    if (prms && prms.then) {
                                        prms.then(function(res) {
                                            scope.paging.collectionLength = res.collectionLength; //res.length;
                                            scope.dgEnd = scope.dgEnd || 0;
                                            scope.dgEnd += res.collectionLength;
                                            scope.dgStart = 0;
                                            scope.pagerimplScrollPromise.resolve();
                                            scope.unBlock();
                                        });
                                    }
                                }
                                break;

                            default:
                                if (scope.collectionLength > event.extent.start) {
                                    scope.dgEnd += event.extent.end;
                                }
                                // code
                        }
                        
                        
                        
                    }

                    scope.onPageSizeChanged = function(pageSize) {


                        scope.dgStart = 0; //$scope.paging.pageSize;
                        scope.dgEnd += scope.paging.pageSize;
                         if (!scope.$$phase) scope.$apply();
                    }

                    scope.paging.currentPageChanged.then(function(result) {
                        scope.onCurrentPageChanged(result);
                    })
                    
                    scope.paging.goTo(0);
                    if (!scope.paging.pageSize)
                        scope.paging.setSize(1);

                },
                post: function postLink(scope, element, attrs, controller, transclude) {
                    // scope.paging = new pagingService(controller.pagingUniqueKey);
                    // scope.dgStart = 0;
                    // scope.dgEnd = scope.paging.pageSize;
                    // console.log('pagesize set initially ' + scope.paging.key, scope.paging.pageSize);
                    
                   //  $compile(element)(scope);
                },
             };
             
                return link;
            },
            controller: ['$scope', function($scope) {
                //console.log('infinite Pager controller--> $scope', $scope);



                // $scope.$watch(function() {
                //     return $scope.paging.currentPage;
                // }, function(newValue, oldValue) {
                //     //if (newValue && newValue != oldValue) {
                //         $scope.onCurrentPageChanged($scope.paging.pageChangeEvent);
                //     // }

                // }, true);


                // $scope.$watch('paging.pageSize', function(newValue, oldValue) {
                //   if (newValue.pageSize != oldValue.pageSize) {
                //     $scoppe.dgStart = 0;
                //     $scope.dgEnd = newValue.pageSize;
                //   }
                // }, true);
            }]
        }
    }]);