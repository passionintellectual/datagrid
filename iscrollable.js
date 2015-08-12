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
      template:'',
      link: function (scope, element, attrs) {
          console.log('iScrollable scope', scope);
            var elementId = element.attr('id');
            if(!elementId){
                console.error('Element should have unique Id to apply iscroll.');
            }
        //   $timeout(function() {
              var height = attrs.scrollerHeight;
              var container = $(element).wrap('<div style="position:relative;overflow:hidden;height:'+height+'px;" id="wrapper-'+elementId+'" > </div>')
              var scroller = container.wrap('<div id="scroller"> </div>');
              scope.scroll = new IScroll("#wrapper-"+elementId, {
                            bounce: true,
                            momentum: true,
                            scrollbars: true,
                            click: true,
                            // snap: ".item",
                            mouseWheel: true,
                            interactiveScrollbars: true
                            // startY:  $scope.supplierTabScrollPosn[$scope.currentTab] || 0
                        });
                scope.scroll.on('scrollEnd', function(e){
                     if(scope.onScrollEnd){
                         scope.onScrollEnd(e)
                     }
                })
                
        //   });
          window.scroll=scope.scroll;
          $timeout(function (argument) {
              if(scope.scroll){
                    scope.scroll.refresh();     
              }
          }, 200)
          
          

         

      },
       controller:'iscrollerCntrl'
    }
  }]) .controller('iscrollerCntrl',['$scope',function($scope){


        }]);

