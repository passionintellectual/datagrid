angular.module('gtpWebApp.core').filter('myLimitTo', function() {
    return function(input, limit, begin) {
    if(input){    return input.slice(begin, begin + limit);}
    };
});