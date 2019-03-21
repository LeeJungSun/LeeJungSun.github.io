(function(win, $) {
    'use strict';

    var tabFunc = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.btnEvent();
        }, 
        setElements : function () {
            this.castBox = $('.cast_box');
            this.castTab = this.castBox.find('.cast_tab ul');
            this.castTabList = this.castTab.find('li');
            this.tab = this.castTabList.find('a');
            this.castCont = this.castBox.find('.cast_cont');
            this.castContChild = this.castCont.children();
            this.castBtnSet = this.castBox.find('.cast_setting');
            this.castBtnBox = this.castBtnSet.find('.cast_btn');
            this.castPrevBtn = this.castBtnBox.find('.btn_prev');
            this.castNextBtn = this.castBtnBox.find('.btn_next');
            this.castNumBox = this.castBtnSet.find('.cast_num');
            this.castNumCurrent = this.castNumBox.find('.current');
            this.castNumTotal = this.castNumBox.find('.total')
        },
        initLayout : function () {
            var initHash = win.location.hash,
                hashTarget = this.castContChild.filter(initHash);
            console.log(hashTarget)
            this.castTabList.removeClass('active');
            this.castContChild.hide();
            this.currentIndex = (hashTarget.length) ? hashTarget.index() : 0;
            this.castNumTotal.text(this.castTabList.length);
            this.viewLayout();
            this.numUpdate();
        },
        btnEvent : function () {
            this.tab.on('click', $.proxy(this.tabClickFunc, this));
            this.castPrevBtn.on('click', $.proxy(this.prevClickFunc, this));
            this.castNextBtn.on('click', $.proxy(this.nextClickFunc, this));
            $(win).on('hashchange', $.proxy(this.onHashChangeFunc, this));
        },
        tabClickFunc : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            this.currentIndex = target.closest('li').index();
            if (this.currentIndex === this.oldIndex) return;
            this.hashUpdate();
        },
        prevClickFunc : function () {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.castTabList.length - 1;
            }
            this.hashUpdate();
        },
        nextClickFunc : function () {
            this.currentIndex++;
            if (this.currentIndex >= this.castTabList.length) {
                this.currentIndex = 0;
            }
            this.hashUpdate();
        },
        onHashChangeFunc : function () {
            var initHash = win.location.hash;
            this.currentIndex = (initHash) ? $(initHash).index() : 0;
            this.viewLayout();
            this.numUpdate();
        },
        viewLayout : function () {
            this.castTabList.eq(this.currentIndex).addClass('active');//탭에서 선택된 인덱스
            this.castContChild.eq(this.currentIndex).show();
            this.castTabList.eq(this.oldIndex).removeClass('active');
            this.castContChild.eq(this.oldIndex).hide();
            this.oldIndex = this.currentIndex;            
        },
        numUpdate : function () {
            var indexNum = this.currentIndex + 1;
            this.castNumCurrent.text(indexNum);
        },
        hashUpdate : function () {
            var hashName = this.castContChild.eq(this.currentIndex).attr('id');
            win.location.hash = '#' + hashName;
        }
    };

    var slideFunc = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.btnEvent();
        }, 
        setElements : function () {
            this.slideBox = $('.slide_box');
            this.slideTab = this.slideBox.find('.slide_tab ul');
            this.slideTabList = this.slideTab.find('li');
            this.tab = this.slideTabList.find('a');
            this.slideCont = this.slideBox.find('.slide_cont');
            this.slideContChild = this.slideCont.children();
            this.slideBtnSet = this.slideBox.find('.slide_setting');
            this.slidePrevBtn = this.slideBtnSet.find('.btn_prev');
            this.slideNextBtn = this.slideBtnSet.find('.btn_next');
        },
        initLayout : function () {
            var initHash = win.location.hash,
                hashTarget = this.slideContChild.filter(initHash);
            this.slideTabList.removeClass('active');
            this.slideContChild.hide();
            this.currentIndex = (hashTarget.length) ? hashTarget.index() : 0;
            this.direction = 'next';
            this.viewLayout();
        },
        btnEvent : function () {
            this.tab.on('click', $.proxy(this.tabClickFunc, this));
            this.slidePrevBtn.on('click', $.proxy(this.prevClickFunc, this));
            this.slideNextBtn.on('click', $.proxy(this.nextClickFunc, this));
            $(win).on('hashchange', $.proxy(this.onHashChangeFunc, this));
        },
        tabClickFunc : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            this.currentIndex = target.closest('li').index();
            // console.log(this.currentIndex)
            // console.log(this.oldIndex)
            if(this.currentIndex > this.oldIndex) {
                this.direction = 'next';
            } else {
                this.direction = 'prev';
            }
            if (this.currentIndex === this.oldIndex) return;
            this.hashUpdate();
        },
        prevClickFunc : function () {
            this.direction = 'prev';
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.slideTabList.length - 1;
            }
            this.hashUpdate();
        },
        nextClickFunc : function () {
            this.direction = 'next';
            this.currentIndex++;
            if (this.currentIndex >= this.slideTabList.length) {
                this.currentIndex = 0;
            }
            this.hashUpdate();
        },        
        onHashChangeFunc : function () {
            var initHash = win.location.hash;
            this.currentIndex = (initHash) ? $(initHash).index() : 0;
            this.viewLayout();
        },
        viewLayout : function () {
            if (this.direction === 'next') {
                this.slideContChild.eq(this.currentIndex).css({
                    'display' : 'block',
                    'left' : '100%'
                }).stop().animate({
                    'left' : '0'
                })
                this.slideContChild.eq(this.oldIndex).stop().animate({
                    'left' : '-100%'
                }, function () {
                    $(this).hide()
                })
            } else {
                this.slideContChild.eq(this.currentIndex).css({
                    'display' : 'block',
                    'left' : '-100%'
                }).stop().animate({
                    'left' : '0'
                })
                this.slideContChild.eq(this.oldIndex).stop().animate({
                    'left' : '100%'
                }, function () {
                    $(this).hide()
                })
            }
            this.slideTabList.eq(this.currentIndex).addClass('active');
            this.slideTabList.eq(this.oldIndex).removeClass('active');
            this.oldIndex = this.currentIndex;            
        },
        hashUpdate : function () {
            var hashName = this.slideContChild.eq(this.currentIndex).attr('id');
            win.location.hash = '#' + hashName;
        }
    };

    $(function () {
    	tabFunc.init();
        slideFunc.init();
    })
})(window, window.jQuery);