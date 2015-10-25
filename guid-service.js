
angular.module('WebApp.core')
    .factory('guidService', [  function () {
        function seed() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return{
            new:function(){
                guid = (seed() + seed() + "-" + seed() + "-4" + seed().substr(0,3) + "-" + seed() + "-" + seed() + seed() + seed()).toLowerCase();
                guid = (seed() + seed() + "-" + seed() + "-4" + seed().substr(0,3) + "-" + seed() + "-" + seed() + seed() + seed()).toLowerCase();
                return guid;
            }
        }
    }]);