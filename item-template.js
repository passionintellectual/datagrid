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
               
              
               tempElement.attr('testdirective', '');
               tempElement.attr('paging-mode', attrs.pagingMode || 'infinite');
                console.log('attrs is:-', attrs);
                var attributs = Object.keys(attrs);
                console.log('attributs', attributs);
                    for (var i = attributs.length; i--; ) {
                        console.log('current Attr', attributs[i], 'currentValue', attrs[attributs[i]] );
                         
                    if(attributs[i].charAt(0) != '$'){
                     var key = attrs.$attr[attributs[i]];
                     tempElement.attr(key, attrs[attributs[i]]);
                    }
                }
  

                if(attrs.pagerDirective){
                     tempElement.attr(attrs.pagerDirective,'');
                }else{
                     tempElement.attr('pager','');
                }

 if(attrs.pageSize){
                       tempElement.attr('page-size', attrs.pageSize);
                        
                    }

               var transcludeHtml = $(element).html();
                var transcludeElement = angular.element('<div class="ngRContent"></div>');
               $(transcludeElement).html(   transcludeHtml);
              

               transcludeElement.attr('ng-repeat-events', '');
               transcludeElement.attr('oncompleterender', "onNgRepeatCompleteRendering()");
                element.html('');


               var link ={

                       pre: function preLink(scope, element, attrs, controller, transclude) {
                      
                                  // scope.repeatExpression = controller.repeatExpression.replace(' in ', ' in filtered = ( ');
                    // scope.repeatExpression += ') | myLimitTo:dgEnd:dgStart';

                    scope.repeatExpression = controller.repeatExpression.replace(controller.repeatAttrs.rhs, ' filtered = (' + controller.repeatAttrs.rhs + ') | myLimitTo:dgEnd:dgStart ');

                    console.log('iscroll pager ', scope);


                    scope.onIndexChanged = $parse(controller.onIndexChanged);


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
                  
                        element.append(tempElement)
                          $compile(tempElement)(scope);
                        
                    
                    
                       },
                       post: function postLink(scope, element, attrs, controller, transclude) {
                           //element.find('.itemdetails').first().append(tempElement);
                           element.find('.pagerimpl').first().append(transcludeElement)
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