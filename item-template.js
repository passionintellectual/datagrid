angular.module('gtpWebApp.core')
    .directive('itemtemplate', [ '$compile', '$timeout', '$parse','pagingService','guidService', function ($compile, $timeout, $parse, pagingService, guidService) {
        return {
            restrict: 'E',
            priority:1400,
         //   transclude: true,

            require:'^datagrid',
         //   template: '<div class="itemdetails  " >  </div>',
           compile:function(element, attrs){
               var tempElement = angular.element('<div class="itemdetails"></div>');
               tempElement.attr('pager','');
               tempElement.attr('testdirective', '');
               tempElement.attr('paging-mode', attrs.pagingMode || 'infinite');




               var transcludeHtml = $(element).html();
                var transcludeElement = angular.element('<div class="ngRContent"></div>');
               $(transcludeElement).html(   transcludeHtml);
              

               transcludeElement.attr('ng-repeat-events', '');
               transcludeElement.attr('oncompleterender', "onNgRepeatCompleteRendering()");
                element.html('');


               var link ={

                       pre: function preLink(scope, element, attrs, controller, transclude) {
                        element.append(tempElement)
                        $compile(tempElement)(scope);
                       },
                       post: function postLink(scope, element, attrs, controller, transclude) {
                           //element.find('.itemdetails').first().append(tempElement);
                           element.append(transcludeElement)
                            var ngrElement = element.find('.ngRContent');
                           var expression = scope.repeatExpression || controller.repeatExpression;
                           ngrElement.attr('ng-repeat', expression);
                           scope.onCompleteRender = $parse(controller.onCompleteRender);


                           //$compile(tempElement)(scope);



                           //transclude(function(clone) {
                           //
                           //    var destination =   $( element).find('.ngRContent').first();
                           //    angular.forEach(clone, function(cloneEl) {
                           //        // cloneEl.forEach(function(item, index){
                           //
                           //        console.log('cloneEl', cloneEl);
                           //        destination.append( cloneEl);
                           //    });
                           //
                           //}); // end of transclude function

                           console.log('scope in itemtemplate', scope);
                           $compile(ngrElement)(scope);
                       }
                   };



            return link;
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