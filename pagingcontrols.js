angular.module('gtpWebApp.core')
    .directive('pagingcontrols', ['$compile', '$timeout', '$parse', 'pagingService', 'guidService', function($compile, $timeout, $parse, pagingService, guidService) {
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

                        if (attrs.pageSize) {


                            //scope.paging.pageSize = attrs.pageSize;
                            scope.paging.setSize(+attrs.pageSize);


                        }
                        scope.goNext = function() {
                            scope.paging.goNext();
                        }
                        scope.goBack = function() {
                            scope.paging.goBack();
                        };

                        scope.paging.pageSizeChanged.then(function (result) {
                            if (scope.onSizeChanged) {
                                    scope.onSizeChanged( result);
                                }
                        })
                         


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



    }]);