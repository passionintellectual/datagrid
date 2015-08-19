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
      template:'',
      priority:1500,
      link: function (scope, element, attrs) {
          console.log('iScrollable scope', scope);
           
          $timeout(function() {
              if( !element.attr('id')){
                  return;
              }
            var scrollerKey = "scroller-wrapper-" + element.attr('id');
            if(!scrollerKey){
                console.error('Element should have unique Id to apply iscroll.');
            }
            scope[scrollerKey] = scope[scrollerKey]  || {};
            
            
              var height = attrs.scrollHeight;
              scope[scrollerKey].height = height;
              
             // console.log('iscrollable ',scope);
              var scroller = $(element)
              .wrap('<div style="position:relative;overflow:hidden;height:'+height+'px;" id="'+scrollerKey+'" > </div>')
              .wrap('<div id="scroller"> </div>');
              if($('#'+scrollerKey).length > 0){
               scope[scrollerKey].scroll = new IScroll('#'+scrollerKey, {
                            bounce: true,
                            momentum: true,
                            scrollbars: true,
                            click: true,
                            // snap: ".item",
                            mouseWheel: true,
                            interactiveScrollbars: true
                            // startY:  $scope.supplierTabScrollPosn[$scope.currentTab] || 0
                        });
                        
              }
                
               function refreshScroll(scrollerKey) {
                 // body...
                     $timeout(function () {
                            debugger;
                          if(scope[scrollerKey].scroll){
                                scope[scrollerKey].scroll.refresh();     
                          }
                      },  50);
                
               }
            scope.$watch(function() {return element.attr('scroll-height'); }, function (val) {
              // body...
              debugger;
              angular.element('#'+scrollerKey).height(val);
                refreshScroll(scrollerKey);
               
            })
                scope.$watch(scrollerKey+'.height', function(newVal, oldVal){
                     refreshScroll(scrollerKey);
                }, true);
                
          });
         
         
          
          

         

      },
       controller:'iscrollerCntrl'
    }
  }]) .controller('iscrollerCntrl',['$scope',function($scope){
console.log('controller of iscrollable', this);

        }]);

