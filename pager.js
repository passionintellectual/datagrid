angular.module('gtpWebApp.core')
    .directive('pager', ['$compile', '$timeout', '$parse', 'pagingService', 'guidService', function($compile, $timeout, $parse, pagingService, guidService) {
        return {
            restrict: 'AEC',
            priority: 1010,
            require: '^datagrid',
            template: '<div class="pagerimpl" ></div>',
            link: {
                pre: function preLink(scope, element, attrs, controller, transclude) {

                    // scope.repeatExpression = controller.repeatExpression.replace(' in ', ' in filtered = ( ');
                    // scope.repeatExpression += ') | myLimitTo:dgEnd:dgStart';

                    scope.repeatExpression = controller.repeatExpression.replace(controller.repeatAttrs.rhs, ' filtered = (' + controller.repeatAttrs.rhs + ') | myLimitTo:dgEnd:dgStart ');

                    console.log('infinite pager ', scope);

                    scope.onIndexChanged = $parse(controller.onIndexChanged);

                    scope.pagingMode = attrs.pagingMode;

                    scope.paging = new pagingService(controller.pagingUniqueKey);
                    
                    if(attrs.pageSize){
                        scope.paging.setSize(+attrs.pageSize);
                         scope.paging.pageSizeChanged.promise().then(function (result) {
                            if (scope.onSizeChanged) {
                                    scope.onSizeChanged( result);
                                }
                        })
                        
                    }
                   
                    scope.collection = $parse(controller.repeatAttrs.rhs)(scope);
                    if (scope.collection) {
                        scope.collectionLength = scope.collection.length;
                        scope.paging.setCollectionLength(scope.collection.length);
                    }

                    scope.$watchCollection(controller.repeatAttrs.rhs, function(collection) {
                        if (collection) {

                            if (scope.pagingMode == 'server') {
                                scope.paging.setCollectionLength(collection.collectionLength);
                            }
                            else {
                                scope.paging.collectionLength = collection.length;
                            }
                        }
                    });
                    scope.block = controller.block;
                    scope.unBlock = controller.unBlock;


                    scope.onCurrentPageChanged = function(eventWrapper) {
                        var event = eventWrapper.info || eventWrapper;
                        //console.log('$scope.paging.currentPage', $scope.paging.currentPage);
                        //console.log('info onCurrentPageChanged received--> $currentPage', event);
                        //$scope.dgEnd += 1; //$scope.paging.pageSize;
                        // if (!$scope.$$phase) $scope.$apply();


                        switch (scope.pagingMode) {
                            case 'normal':
                                if (scope.collectionLength > event.extent.start) {
                                    scope.dgStart = event.extent.start;


                                }
                                break;
                            case 'infinite':
                                if (scope.collectionLength >= event.extent.end) {
                                    scope.dgEnd = event.extent.end;
                                }
                                break;
                            case 'server':
                                scope.block();

                                if (scope.onIndexChanged) {
                                  
                                        var prms = scope.onIndexChanged(scope, {
                                        event: event
                                    })
                                   
                                    if (prms && prms.then) {
                                        prms.then(function(res) {
                                            scope.paging.collectionLength = res.collectionLength; //res.length;
                                            scope.dgEnd = res.collectionLength;
                                            scope.dgStart = 0;
                                            scope.unBlock();
                                        });
                                    }
                                }
                                break;

                            default:
                                if (scope.collectionLength > event.extent.start) {
                                    scope.dgStart = event.extent.start;
                                }
                                // code
                        }
                        //$scope.dgEnd = event.extent.end;
                    }

                    scope.onPageSizeChanged = function(pageSize) {


                        scope.dgStart = 0; //$scope.paging.pageSize;
                        scope.dgEnd = scope.paging.pageSize;
                         if (!scope.$$phase) scope.$apply();
                    }

                    scope.paging.currentPageChanged.promise().then(function(result) {
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
                },
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