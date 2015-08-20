angular.module('gtpWebApp.core')
    .directive('itemtemplate', [ '$compile', '$timeout', '$parse','pagingService','guidService', function ($compile, $timeout, $parse, pagingService, guidService) {
        return {
            restrict: 'E',
            priority:919,
            transclude: true,
          
            require:'^datagrid',
            template: '<div class="itemdetails  " >  </div>',
            link: {
                pre: function preLink(scope, element, attrs, controller, transclude) {
                    var tempElement = $(element).find('.itemdetails').first();
                    tempElement.attr('infinitepager','');
                    tempElement.attr('paging-mode', attrs.pagingMode || 'infinite');
                    
                    scope.onCompleteRender = $parse(controller.onCompleteRender);
                    console.log('itemtemplate scope', scope);
                
                    $compile(tempElement)(scope);
                },
                post: function postLink(scope, element, attrs, controller, transclude) {

                    var expression = scope.repeatExpression || controller.repeatExpression;
                    
                      
                    $(element).html('<div class="ngRContent"></div>');
                    var tempElement = $(element).find('.ngRContent').first();
                    tempElement.attr('ng-repeat',expression);
                    tempElement.attr('ng-repeat-events', '');
                    tempElement.attr('oncompleterender', "onNgRepeatCompleteRendering()");
                    


                    transclude(scope, function(clone) {

                        var destination =   $( element).find('.ngRContent').first();
                        angular.forEach(clone, function(cloneEl) {
                            // cloneEl.forEach(function(item, index){
                             
                            console.log('cloneEl', cloneEl);
                            destination.append( cloneEl);
                        });

                    }); // end of transclude function

                    console.log('scope in itemtemplate', scope);
                    $compile($(element).find('.ngRContent'))(scope);
                },

                //post: function postLink(scope, iElement, iAttrs, controller) {  }
            },
            controller:['$scope',function($scope){
                  $scope.onNgRepeatCompleteRendering = function(){
                         $scope.refreshouter = true;
                          if($scope.onCompleteRender){
                              var data = {
                                  e:$scope,
                              };
                              $scope.onCompleteRender($scope, data);
                          }
                         
                    }
            }]
        }
    }]);