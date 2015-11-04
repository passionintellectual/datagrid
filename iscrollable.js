/**
 * Created by nemade_g on 08-07-2015.
 */
/**
 * Created by nemade_g on 07-07-2015.
 */
angular.module('WebApp.core')
  .directive('iScrollable', ['$timeout', '$parse', '$gq', function($timeout, $parse, $gq) {
    return {
      restrict: 'AE',
      priority: 1500,
      //   transclude:true,
      //   scope:{

      //      onScrollEnd:'&',
      //      onScrollStart:'&',

      //   },
      // scope:true,
      template: '',
      //require:'iscrollerCntrl',
      compile: function() {

        return {
          post: function(scope, element, attrs) {
              //if($(element).attr('attained') != 'true'){
              //    $(element).attr('attained', 'true');
              //    return;
              //}

              var scrollerKey;
              var timeOffset = parseInt($(element).attr('scroller-timeout')) || 0;
              if (!element.attr('scroller-key')) {
                return;
              }

              function createScrollerKey() {
                var atr = element.attr('scroller-key');
                var val = scope.$eval(atr);
                if (!val) {
                  val = atr;
                }
                return "scroller-wrapper-" + val;
              }

              function queueToScrollInitialised(fn) {
                if (scrollerKey && scope[scrollerKey] && scope[scrollerKey].scrollInitialised) {
                  scope[scrollerKey].scrollInitialised.promise().then(fn);
                }
                else {
                  var e = new Error('dummy');
                  var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
                    .replace(/^\s+at\s+/gm, '')
                    .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
                    .split('\n');
                  console.log(stack);
                }
              }
              var applyScrollPromise;
              if (attrs.applyScrollPromise) {
                applyScrollPromise = $parse(attrs.applyScrollPromise)(scope).promise;
              }

              function scrollInit(scrollerKey) {




                // storing initial height in scope.
                var height = attrs.scrollHeight || "100%";
                scope[scrollerKey].height = height;

                //           var el = $(element).wrap('<div style="position:relative;height:' + height + 'px;overflow:hidden;" id="wrapperpp111" ><div id="scroller" style="position:absolute;"  > </div> </div>')
                //scroller.wrap('<div id="scroller" style="position:absolute;overflow:hidden;"  > </div>');
                var tempEl = $(element).wrap('<div id="scroller" style="position:absolute;"  > </div> ').parent();

                var el = $(tempEl).wrap('<div style="position:relative;height:' + height + ';overflow:hidden;"' + 'id="' + scrollerKey + '" ></div>').parent();
                console.log('el', el);

                scope[scrollerKey].scroll = new IScroll(el[0], {
                  bounce: true,
                  momentum: true,
                  scrollbars: true,
                  click: true,

                  mouseWheel: true,
                  interactiveScrollbars: true,
                  startY: 0
                });

                scope[scrollerKey].scrollInitialised.resolve();

                applyScrollPromise = undefined;

              } //End of scrollInit.


              $timeout(function() {


                scrollerKey = createScrollerKey();
                element.addClass(scrollerKey);
                if (!scrollerKey) {
                  console.error('Element should have unique Id to apply iscroll.');
                }
                scope[scrollerKey] = scope[scrollerKey] || {};
                scope[scrollerKey].scrollInitialised = new $gq();
                if (applyScrollPromise && applyScrollPromise.then) {
                  applyScrollPromise.then(function(r) {


                    scrollInit(scrollerKey);

                  })
                }
                else {
                  scrollInit(scrollerKey);
                }
                queueToScrollInitialised(function(result) {
                  if (scope[scrollerKey] && scope[scrollerKey].scroll) {
                    scope[scrollerKey].scroll.refresh();

                    scope[scrollerKey].scroll.on('scrollEnd', function(e) {
                      var et = this;
                      et.scrollerKey = scrollerKey;
                      var data = {
                        e: et,

                      };

                      // e.getVisibleElements = function (argument) {
                      //   var childElements = $(element).children()
                        
                      // }
                      


                      if (attrs.onScrollEnd) {
                        $parse(attrs.onScrollEnd)(scope, data);
                      }

                      if (this.y == this.minScrollY) {
                        $parse(attrs.onScrollUp)(scope, data);
                      }
                      if (this.y == this.maxScrollY) {
                        $parse(attrs.onScrollBottom)(scope, data);
                      }
                    });


                  }
                })



              }, timeOffset);




              function refreshScroll(scrollerKey) {
                // body...
                $timeout(function() {

                  if (scope[scrollerKey].scroll) {
                    scope[scrollerKey].scroll.refresh();
                  }
                }, +timeOffset + 50);

              }

              scope.$watch(function() {
                return $(element).parent("#scroller").height();
              }, function(newval, oldval) {
                if (newval != oldval) {
                  // $timeout(function() {
                  //   queueToScrollInitialised(function(r) {

                  //     angular.element('#' + scrollerKey).height(val);
                      refreshScroll(scrollerKey);

                //    }); //promise end
                 // }, +timeOffset + 50); // timeout end
                }
              })

              scope.$watch(function() {
                return element.attr('scroll-height');
              }, function(val) {
                $timeout(function() {
                  queueToScrollInitialised(function(r) {

                    angular.element('#' + scrollerKey).height(val);
                    refreshScroll(scrollerKey);

                  }); //promise end
                }, +timeOffset + 50); // timeout end
              })

              scope.$watch(attrs.refreshScroll, function(val) {
                // body...
                // if (val) {
                //   angular.element('#' + scrollerKey).height(9);
                // }
                // else {
                //   angular.element('#' + scrollerKey).height(90);
                // }
                $timeout(function() {
                  queueToScrollInitialised(function(argument) {
                    // body...
                    refreshScroll(scrollerKey);
                  })
                }, +timeOffset + 50);


              });
            } // end of pre function
            //  } ///End of If to check if scrollable element is there 
        }; //return function
      },
      controller: 'iscrollerCntrl'
    }; //RETURNING FUNCTION FOR ENTIRE DIRECTIVE.
  }]).controller('iscrollerCntrl', ['$scope', function($scope) {
    console.log('controller of iscrollable', this);

  }]);
