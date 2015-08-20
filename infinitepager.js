angular.module('gtpWebApp.core')
    .directive('infinitepager', ['$compile', '$timeout', '$parse', 'pagingService', 'guidService', function($compile, $timeout, $parse, pagingService, guidService) {
        return {
            restrict: 'AEC',
            priority: 913,
            require: '^datagrid',
            template: '',
            link: {
                pre: function preLink(scope, element, attrs, controller, transclude) {
                    
                    // scope.repeatExpression = controller.repeatExpression.replace(' in ', ' in filtered = ( ');
                    // scope.repeatExpression += ') | myLimitTo:dgEnd:dgStart';
                    
                    scope.repeatExpression = controller.repeatExpression.replace(controller.repeatAttrs.rhs, ' filtered = (' + controller.repeatAttrs.rhs
                    + ') | myLimitTo:dgEnd:dgStart ');
                    
                  
                    
                    scope.onIndexChanged = $parse(controller.onIndexChanged);
                   
                    scope.pagingMode = attrs.pagingMode;

                    scope.paging = new pagingService(controller.pagingUniqueKey);
                    scope.collection = $parse(controller.repeatAttrs.rhs)(scope);
                    if (scope.collection) {
                        scope.collectionLength = scope.collection.length;
                        scope.paging.setCollectionLength(scope.collection.length);
                    }
                    
                    scope.$watchCollection(controller.repeatAttrs.rhs, function(collection) {
                        if (collection) {
                           // scope.paging.collectionLength = collection.length;
                            if(scope.pagingMode != 'server'){
                                scope.paging.setCollectionLength(collection.length);
                            }
                       }
                    });
                    scope.block = controller.block;
                    scope.unBlock = controller.unBlock;


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

                $scope.onCurrentPageChanged = function(eventWrapper) {
                var event = eventWrapper.event || eventWrapper;
                    //console.log('$scope.paging.currentPage', $scope.paging.currentPage);
                    //console.log('info onCurrentPageChanged received--> $currentPage', event);
                    //$scope.dgEnd += 1; //$scope.paging.pageSize;
                    // if (!$scope.$$phase) $scope.$apply();

 
                    switch ($scope.pagingMode) {
                        case 'normal':
                            if ($scope.collectionLength > event.extent.start) {
                                $scope.dgStart = event.extent.start;
                               
                           
                            }
                            break;
                        case 'infinite':
                            if ($scope.collectionLength >= event.extent.end) {
                                $scope.dgEnd = event.extent.end;
                            }
                            break;
                        case 'server':
                            $scope.block();
                            
                            if($scope.onIndexChanged){
                                $scope.onIndexChanged( $scope, {event:event})
                                .then(function (res) {
                                    $scope.paging.collectionLength =  res.collectionLength;//res.length;
                                    $scope.dgEnd = res.collectionLength;
                                    $scope.dgStart = 0;
                                     $scope.unBlock();
                                });
                                 
                            }
                            break;

                        default:
                            if ($scope.collectionLength > event.extent.start) {
                                $scope.dgStart = event.extent.start;
                            }
                            // code
                    }
                    //$scope.dgEnd = event.extent.end;
                }

                $scope.onPageSizeChanged = function(pageSize) {
                    
                    
                    $scope.dgStart = 0; //$scope.paging.pageSize;
                    $scope.dgEnd = $scope.paging.pageSize;
                    // if (!$scope.$$phase) $scope.$apply();
                }



                // $scope.$watch(function() {
                //   return $scope.paging.currentPage;
                // }, function(newValue, oldValue) {
                //   if (newValue && newValue != oldValue) {
                //     $scope.dgEnd += 1;
                //   }

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