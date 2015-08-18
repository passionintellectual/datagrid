/**
 * Created by nemade_g on 08-07-2015.
 */
/**
 * Created by nemade_g on 07-07-2015.
 */
angular.module('gtpWebApp.core')
  .directive('iScrollable', [ '$timeout', '$parse', function ($timeout, $parse) {
    return {
      restrict: 'AE',
    //   transclude:true,
    //   scope:{
         
    //      onScrollEnd:'&',
    //      onScrollStart:'&',
         
    //   },
    // scope:true,
      // template:'<div id="{{scrollid}}" style="position:relative;overflow:hidden;height:{{height}}px;"  > <div id="scroller" ng-transclude> </div></div>',
      template:'',
      priority:1500,
      link: function (scope, element, attrs) {
          
          $timeout(function() {
               
            
           
            scope.scroll = scope.scroll  || {};
            
            
      
               scope.scroll = new IScroll('#'+scope.scrollid, {
                            bounce: true,
                            momentum: true,
                            scrollbars: true,
                            click: true,
                            // snap: ".item",
                            mouseWheel: true,
                            interactiveScrollbars: true
                            // startY:  $scope.supplierTabScrollPosn[$scope.currentTab] || 0
                        });
              
             
               
                
                function refreshScroll(   time) {
                    // body...
                     $timeout(function (argument) {
                             
                          if(scope.scroll){
                                scope.scroll.refresh();     
                          }
                      },  time || 300);
                }
               
                
                scope.$watch('height', function(newVal, oldVal){
                     refreshScroll();
                }, true);
                
          });
         
         
          
          

         

      },
       controller:'iscrollerCntrl'
    }
  }]) .controller('iscrollerCntrl',['$scope',function($scope){
console.log('controller of iscrollable', this);

        }]);

