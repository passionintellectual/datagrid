angular.module('gtpWebApp.core')
    .factory('$gq', ['$timeout', '$q', function($timeout, $q) {
        var $gq = {};

        function getNewDefer() {
           
            var oldQ = this.q;
            // IF you want to maintain the history of resolved promises.
            //  this.qCollection = this.qCollection || [];
            //this.qCollection.push(oldQ); 
            this.q = $q.defer();
            var thisobj = this;
            this.thenFunctions.forEach(function(itm, index) {
                thisobj.q.promise.then(itm[0], itm[1]);
            });
            this.catchFunctions.forEach(function(itm, index) {
                thisobj.q.promise.catch(itm);
            });
            this.finallyFunctions.forEach(function(itm, index) {
                thisobj.q.promise.finally(itm);
            });
        }
        var gq = function(key) {


            this.thenFunctions = this.thenFunctions || [];
            this.catchFunctions = this.catchFunctions || [];
            this.finallyFunctions = this.finallyFunctions || [];
            var thisobj = this;
            getNewDefer.bind(this)();

        };



        gq.prototype.resolve = function(value) {
            // body... promise.$$state.status === 1 // resolved
            //promise.$$state.status === 2 // rejected
              this.q.resolve(value);
             
                getNewDefer.bind(this)();

             
          
        }


        gq.prototype.then = function(fn, errorFn) {
            // body...
            this.q.promise.then(fn, errorFn);

            this.thenFunctions.push([fn, errorFn]);
        }

        gq.prototype.reject = function(val) {
            this.q.reject(val);
             getNewDefer.bind(this)();
        }
        gq.prototype.catch = function(fn) {
            this.q.promise.catch(fn)
        }

        gq.prototype.finally = function(fn) {
            this.q.promise.finally(fn)
        }
       return gq;

    }]);