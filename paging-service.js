angular.module('gtpWebApp.core')
    .factory('pagingService', ['$timeout', '$parse', '$gq', function($timeout, $parse, $gq) {
        var pagingService = {};
        var paging = function(key, data) {
            if (pagingService[key]) {
                return pagingService[key];
            }
            this.currentPageChanged = new $gq();
            this.pageSizeChanged = new $gq();
            
            if(!key)
            key =guidService.new();
            this.key = key;
            

            var thisobj = this;
            // $timeout(function(argument) {
            //     // body...
            //     thisobj.currentPage = 0;
            // })
            
            
           // this.pageSize = 10; //setting defult pagesize as 10.
           // this.goTo(0); // setting current page number to 0
            
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
            var oldVal = this.currentPage;
            if (pageNumber > this.currentPage && this.collectionLength && this.collectionLength > (pageNumber * this.pageSize)) {
                this.currentPage = pageNumber;
            }
            else if (pageNumber >= 0) {
                this.currentPage = pageNumber;
            }
            if (oldVal != this.currentPage) {
                this.populatePageChangeEvent(pageNumber, oldVal);
                this.currentPageChanged.resolve(this.pageChangeEvent);
            }
        };

        paging.prototype.populatePageChangeEvent = function(currentPage, oldVal) {
            // body...
            // if (currentPage != oldVal) {
            var object = {
                start: 0,
                end: this.pageSize
            };
            object.start = this.pageSize * (this.currentPage);
            object.end = object.start + this.pageSize;
            this.pageChangeEvent = {
                info: {
                    newCurrentPage: currentPage, //Changed page number
                    oldCurrentPage: oldVal,
                    extent: object,
                    pageSize: this.pageSize
                }
            };
            // }
        };

        paging.prototype.goNext = function() {
            if (this.collectionLength && this.collectionLength > ((this.currentPage + 1) * this.pageSize)) {
                this.goTo(this.currentPage + 1);
            }


        };
        paging.prototype.goBack = function() {
            if (this.currentPage > 0) {
                this.goTo(this.currentPage - 1)
            }
            else {
                //console.log('currentPage has reached 0');
            }
        };
        paging.prototype.setSize = function(size) {
            this.pageSize = size;
            this.populatePageChangeEvent(0, this.currentPage);
            this.pageSizeChanged.resolve(this.pageChangeEvent);


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