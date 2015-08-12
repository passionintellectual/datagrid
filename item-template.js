angular.module('gtpWebApp.core')
    .directive('itemtemplate', [ '$compile', '$timeout', '$parse','pagingService','guidService', function ($compile, $timeout, $parse, pagingService, guidService) {
        return {
            restrict: 'E',
            priority:919,
            transclude: true,
            require:'^datagrid',
            template: '<div class="itemdetails  " ><div class="content"></div>    </div>',
            link: {
                pre: function preLink(scope, element, attrs, controller, transclude) {
                    var tempElement = $(element).find('.itemdetails');
                    tempElement.attr('infinitepager','');
                    tempElement.attr('paging-mode', attrs.pagingMode || 'infinite');
                    
                    console.log('itemtemplate scope', scope);
                
                    $compile(tempElement)(scope);
                },
                post: function postLink(scope, element, attrs, controller, transclude) {

                    var expression = scope.repeatExpression || controller.repeatExpression;
                    console.log('fromchild directive', scope.repeatExpression);
                    var tempElement = $(element).find('.content');
                    tempElement.attr('ng-repeat',expression);


                    transclude(scope, function(clone) {

                        var destination =   $( element).find('.content');
                        angular.forEach(clone, function(cloneEl) {
                            // cloneEl.forEach(function(item, index){
                            destination.append( cloneEl);
                        });

                    }); // end of transclude function

                    console.log('scope in itemtemplate', scope);
                    $compile($(element).find('.content'))(scope);
                },

                //post: function postLink(scope, iElement, iAttrs, controller) {  }
            },
            controller:['$scope',function($scope){

            }]
        }
    }]);