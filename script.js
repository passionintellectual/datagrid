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
            console.log('outer scope' ,$scope);
            $scope.servergridblocked = true;
        $scope.onCurrentPageChangedServer = function(event) {
           
            var start = event.newCurrentPage * event.pageSize;
            var end = start + event.pageSize;
            
           return  PostRepository.query({
               _start:start,
               _end:end
           }, function(res) {

                console.log('response from query is ', res);
                res.collectionLength = 100;
               // $scope.posts = res;
            }).$promise;

        }
         

        // $timeout(function () {
        //     $scope.members.pop();
        // }, 1000);
        // $timeout(function () {
        //     $scope.members.pop();
        // }, 2000);
        // $timeout(function () {
        //     $scope.members.pop();
        // }, 3000)
    }
])