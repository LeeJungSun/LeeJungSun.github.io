(function ($, win, doc) {
    'use strict';

    win.ProjectName = win.ProjectName || {};

    win.ProjectName.rollingBanner = function (args) {
        var defParams = { //파라미터 값 정의
            bannerWrap : '.banner_wrap',
            bannerArea : '.banner_area',
            bannerList : '.banner_list'
        };
        this.opts = $.extend({}, defParams, (args || {}));
        if (!(this.bannerWrap = $(this.opts.bannerWrap)).length) return;
        this.init();
    };
    win.ProjectName.rollingBanner.prototype = {
        init : function () {
            this.setElements();					
            this.bannerinit();
        },
        setElements : function () {
            this.bannerWrap = $(this.opts.bannerWrap);
            this.bannerArea = this.bannerWrap.find(this.opts.bannerArea);
            this.bannerList = this.bannerWrap.find(this.opts.bannerList);
            this.bannerAreaWidth = this.bannerArea.outerWidth() - 50;
        },
        bannerinit : function () {
            this.listWidthCreate();
            this.bannerTrue();
            this.bannerFalse();
        },
        bannerTrue : function () {
            if (this.bannerAreaWidth <= this.totalWidth) {
                this.cloneBannerList();
                this.listWidthInit();
                this.listPositionInit();
                this.bannerMove();
            };
        },
        bannerFalse : function () {
            if (this.bannerAreaWidth >= this.totalWidth) {
                this.bannerList.css({
                    width : this.totalWidth,
                    left : '50%',
                    marginLeft : Math.ceil(-this.totalWidth/2)
                });
            };
        },
        cloneBannerList : function () {
            this.bannerListClone = this.bannerList.clone();
            this.bannerArea.append(this.bannerListClone);
        },
        listWidthInit : function () {
            this.bannerList.css('width', this.totalWidth);
            this.bannerListClone.css('width', this.totalWidth);
        },
        listWidthCreate : function () {
            var _this = this,
                totalWidth = 0,
                obj = this.bannerList.children('li');

            obj.each(function () {
                totalWidth = totalWidth + $(this).outerWidth()+1;
            })

            this.totalWidth = Math.ceil(totalWidth);
        },
        listPositionInit : function () {
            this.bannerListClone.css('left', this.totalWidth);
        },				
        bannerMove : function () {
            var _this = this,
                    speed = 70,
                    startNum = 0,
                startNum2 = this.totalWidth,
                    addNum = 1,
                    compareNum = this.totalWidth * -1;

            this.move = setInterval(function () {
                startNum - addNum;
                startNum --;

                _this.bannerList.css('left', startNum);

                if (startNum === compareNum) {
                    startNum = _this.totalWidth;
                };
            }, speed);

            this.move2 = setInterval(function () {
                startNum2 - addNum;
                startNum2 --;

                _this.bannerListClone.css('left', startNum2);

                if (startNum2 === compareNum) {
                    startNum2 = _this.totalWidth;
                };						
            }, speed);
        }
    };

    $(window).on('load', function () {
        win.ProjectName = new win.ProjectName.rollingBanner();
    });

})(jQuery, window, document);