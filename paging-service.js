angular.module('gtpWebApp.core')
    .factory('pagingService', ['$timeout', '$parse', function($timeout, $parse) {
        var pagingService = {};
        var paging = function(key, data) {
            if (pagingService[key]) {
                return pagingService[key];
            }

            this.key = key;
            this.currentPage = undefined;
            var thisobj = this;
            $timeout(function   (argument) {
                // body...
                thisobj.currentPage  = 0;
            }  )
            this.pageSize = 10;
            this.collectionLength = undefined;
            if (data) {
                angular.extend(this, data);
            }
            pagingService[key] = this;
        };

        paging.prototype.setCollectionLength = function(length) {
            this.collectionLength = length;
        }
        paging.prototype.getAllPagings = function() {
            return pagingService;
        };

        paging.prototype.goTo = function(pageNumber) {
            if (pageNumber > this.currentPage && this.collectionLength && this.collectionLength > (pageNumber * this.pageSize)) {
                this.currentPage = pageNumber;
            }
            else if(pageNumber >= 0){
                this.currentPage = pageNumber;
            }

        };
        paging.prototype.goNext = function() {
            if (this.collectionLength && this.collectionLength > ((this.currentPage +1) * this.pageSize)) {
                this.goTo(this.currentPage + 1);
            }


        };
        paging.prototype.goBack = function() {
            if (this.currentPage > 0) {
                this.goTo(this.currentPage - 1)
            } else {
                //console.log('currentPage has reached 0');
            }
        };
        paging.prototype.setSize = function(size) {
            this.pageSize = size;
        };
        paging.prototype.getTotalPageCount = function(totalLength) {
            return totalLength / this.pageSize;
        };
        paging.prototype.getRange = function(pageNumber) {

            var pNum = pageNumber || this.currentPage || 0;

            var start = this.pageSize * pNum;
            var end = start + this.pageSize;
            return [start, end];

        } 
        return paging;
        //return{
        //    get:function(key){
        //
        //
        //
        //
        //        if(!pagingService[key]){
        //
        //            pagingService[key] = new paging(key);
        //        }
        //        return pagingService[key];
        //    }
        //}
    }]);