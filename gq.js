/**
 * Created by nemade_g on 18-09-2015.
 */
angular.module('WebApp.core')
    .factory('$gq', ['$timeout', '$q', function ($timeout, $q) {
        var $gq = {};

        function getNewDefer() {

            var oldQ = this.q;
            // IF you want to maintain the history of resolved promises.
            //  this.qCollection = this.qCollection || [];
            //this.qCollection.push(oldQ);
            this.q = $q.defer();
            this.gPromise.q = this.q;
            var thisobj = this.gPromise;


            if (this.resetOnResolvePromise) {
                this.gPromise.reset();
            } else {
                this.gPromise.thenFunctions.forEach(function (itm, index) {
                    thisobj.q.promise.then(itm[0], itm[1]);
                });
                this.gPromise.catchFunctions.forEach(function (itm, index) {
                    thisobj.q.promise.catch(itm);
                });
                this.gPromise.finallyFunctions.forEach(function (itm, index) {
                    thisobj.q.promise.finally(itm);
                });
            }

        }

        var gPromise = function (q) {
            this.q = q;
            this.thenFunctions = this.thenFunctions || [];
            this.thenAlwaysFunctions = this.thenAlwaysFunctions || [];
            this.catchFunctions = this.catchFunctions || [];
            this.finallyFunctions = this.finallyFunctions || [];
        }
        gPromise.prototype.then = function (fn, errorFn) {
            // body...
            this.q.promise.then(fn, errorFn);

            this.thenFunctions.push([fn, errorFn]);
        }

        gPromise.prototype.thenAlways = function (fn, errorFn) {
            // body...
            this.q.promise.then(fn, errorFn);

            this.thenAlwaysFunctions.push([fn, errorFn]);
        }

        gPromise.prototype.reject = function (val) {
            this.q.reject(val);
            getNewDefer.bind(this)();
        }
        gPromise.prototype.catch = function (fn) {
            this.q.promise.catch(fn)
        }

        gPromise.prototype.finally = function (fn) {
            this.q.promise.finally(fn)
        }
        gPromise.prototype.reset = function () {
            this.thenFunctions = [];
            //Commmenting this cause, we don't want to delete thenAlways functions after each resolve.
            //this.thenAlwaysFunctions = [];
            this.catchFunctions = [];
            this.finallyFunctions = [];
        }

        var gq = function (key) { // This is the constructor function.



            var thisobj = this;
            this.gPromise = new gPromise();
            getNewDefer.bind(this)();
        };
        gq.prototype.promise = function () {
            return this.gPromise;
        }
        gq.prototype.innerPromise = function () {
            return this.q.promise();
        }

        gq.prototype.resestOnResolve = function () {
            this.resetOnResolvePromise = true;
            return this;
        }
        gq.prototype.resolve = function (value) {
            // body... promise.$$state.status === 1 // resolved
            //promise.$$state.status === 2 // rejected
            this.q.resolve(value);

            getNewDefer.bind(this)();


        }


        return gq;

    }]);
