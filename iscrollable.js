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
                        
                        scope[scrollerKey].scroll.on('scrollEnd', function(e){
                            var et = this;
                            et.scrollerKey = scrollerKey;
                              var data = {
       e:et,
       
     };
     
                            if(attrs.onScrollEnd){
                                $parse(attrs.onScrollEnd)(scope, data);
                            }
                        });
                        
              }
                
               function refreshScroll(scrollerKey) {
                 // body...
                     $timeout(function () {
                             
                          if(scope[scrollerKey].scroll){
                                scope[scrollerKey].scroll.refresh();     
                          }
                      },  50);
                
               }
            scope.$watch(function() {return element.attr('scroll-height'); }, function (val) {
              
              
              angular.element('#'+scrollerKey).height(val);
                refreshScroll(scrollerKey);
               
            })
            
            scope.$watch(attrs.refreshScroll, function (val) {
              // body...
              if(val){
                    angular.element('#'+scrollerKey).height(9);    
              }else{
                 angular.element('#'+scrollerKey).height(90);
              }
              
                refreshScroll(scrollerKey);
               
            })
             
                
          });
         
         
          
          

         

      },
       controller:'iscrollerCntrl'
    }
  }]) .controller('iscrollerCntrl',['$scope',function($scope){
console.log('controller of iscrollable', this);

        }]);

