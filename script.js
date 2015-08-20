// Code goes here
angular.module("gtpWebApp.core", ['ngResource']);
angular.module('gtpWebApp.core').controller('dg', ['$scope', '$timeout',
    'pagingService', 'PostRepository',
    function($scope, $timeout, pagingService, PostRepository) {

        $scope.model = {};
        $scope.managers = [{
            name: 'managers',
            age: 32
        }, {
            name: 'managers1',
            age: 321
        }, {
            name: 'managers2',
            age: 322
        }, {
            name: 'managers3',
            age: 323
        }, {
            name: 'managers4',
            age: 324
        }, {
            name: 'managers5',
            age: 325
        }, ];

        $scope.members = [{
            name: 'ganesh',
            age: 32
        }, {
            name: 'ganesh1',
            age: 321
        }, {
            name: 'ganesh2',
            age: 322
        }, {
            name: 'ganesh3',
            age: 323
        }, {
            name: 'ganesh4',
            age: 324
        }, {
            name: 'ganesh5',
            age: 325
        }, ];


        //  PostRepository.query( function(res) {

        //                 console.log('response from query is ', res);
        //                 $scope.posts = res;
        //             });
        console.log('outer scope', $scope);
        $scope.servergridblocked = true;
        $scope.onCurrentPageChangedServer = function(event) {

            var start = event.newCurrentPage * event.pageSize;
            var end = start + event.pageSize;

            return PostRepository.query({
                _start: start,
                _end: end
            }, function(res) {

                if (res.$promise) {
                    delete res.$promise;
                }
                if (res.$resolved) {
                    delete res.$resolved;
                }
                console.log('res is ', res);

                if (res) {
                    console.log('res', res);
                    var temp = res.map(function(itm, index) {
                        return itm.body;
                    });
                    //   for (var i = 0; i < res.length; i++) {
                    //       res[i].id = i;
                    //   }
                    var temp1 = temp.join('--');
                    console.log('temp', temp);
                    res[1].title = temp1;
                }
                res.collectionLength = 100;
                $scope.posts = res;
            }).$promise;

        }

$scope.onCurrentPageChangedServer1 = function(event) {

            var start = event.newCurrentPage * event.pageSize;
            var end = start + event.pageSize;

            return PostRepository.query({
                _start: start,
                _end: end
            }, function(res) {

                if (res.$promise) {
                    delete res.$promise;
                }
                if (res.$resolved) {
                    delete res.$resolved;
                }
                console.log('res is ', res);

                if (res) {
                    console.log('res', res);
                    var temp = res.map(function(itm, index) {
                        return itm.body;
                    });
                    //   for (var i = 0; i < res.length; i++) {
                    //       res[i].id = i;
                    //   }
                    var temp1 = temp.join('--');
                    console.log('temp', temp);
                    res[1].title = temp1;
                }
                res.collectionLength = 100;
                $scope.posts1 = res;
            }).$promise;

        }
        
        function dot() {
            // body...
            $timeout(function() {

                //  angular.element('#rep').attr('scroll-height', 90);
                //   if (!$scope.$$phase) $scope.$apply()
                $scope.refreshOuterScroll = !!!$scope.refreshOuterScroll;
                //angular.element('#rep').attr('scroll-height', 90);

                // dot();

            }, 2000);
        }

        dot();
        $scope.outerScrollEnd = function(e) {
            console.log('outer scroll end', e);
        }
        $scope.innerScrollEnd = function(e) {
                console.log('inner scroll end', e);
            }
            // $timeout(function () {
            //     $scope.members.pop();
            // }, 2000);
            // $timeout(function () {
            //     $scope.members.pop();
            // }, 3000)
    }
])