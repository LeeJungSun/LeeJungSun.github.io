(function(win, $, doc) {
    'use strict';

    win.examProject = win.examProject || {};
    win.examProject.randomObj = function (args) {
        var defParams = {
            obj : '.create_wrap',
            avatarWrap : '.swiper-wrapper',
            avatarArea : '.swiper-slide',
            randomBtn : '.btn_random'
        }
        this.opts = $.extend({}, defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    }
    win.examProject.randomObj.prototype = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.blindEvent();
        }, 
        setElements : function () {
            this.obj = $(this.opts.obj);
            this.avatarWrap = this.obj.find(this.opts.avatarWrap);
            this.avatarArea = this.avatarWrap.find(this.opts.avatarArea);
            this.randomBtn = this.obj.find(this.opts.randomBtn);
        },
        initLayout : function () {
            this.avatarArea.hide();
            this.createArray(); // array 생성
            this.viewLayoutFunc();
        },
        blindEvent : function () {
            this.randomBtn.on('click', $.proxy(this.btnFunc, this));
        },
        btnFunc : function () {
            if (this.createArr.length === 0) {
                this.createArray();
            }
            this.viewLayoutFunc();
        },
        createArray : function () {
            this.createArr = [];
            for (var i = 0, imax = this.avatarArea.length ; i < imax ; i++ ) {
                this.createArr.push(i)
            }
        },
        createRandomIndex : function () {
            // console.log(this.createArr);
            this.arrRandom = Math.floor(Math.random() * this.createArr.length);
            this.currentIndex = this.createArr[this.arrRandom];
            // console.log('currentIndex :', this.currentIndex);
            // console.log('oldIndex : ', this.oldIndex);
            if (this.oldIndex === this.currentIndex) {
                // console.log('return');
                this.createRandomIndex();
                return false;
            }
            this.createArr.splice(this.arrRandom, 1);
        },
        viewLayoutFunc : function () {
            // console.log(this.currentIndex);
            this.createRandomIndex(); // 생성된 array에서 랜덤하게 index값 추출
            this.avatarArea.eq(this.oldIndex).hide(); // oldindex hide
            this.avatarArea.eq(this.currentIndex).show(); // 추출된 index로 show
            this.oldIndex = this.currentIndex; // 이미 노출된 index는 oldindex로
            // console.log(this.oldIndex);
        }
    }
    $(function () {
        new win.examProject.randomObj();
    })
})(window, window.jQuery, window.document);