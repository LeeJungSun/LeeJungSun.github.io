(function ($, win, doc) {
    'use strict';

    win.attendance = win.attendance || {};

    win.attendance.touchGame = function (args) {
        var defParams = {
            wrap : '#wrap',
            touchArea : '.touch_area'
        };
        this.opts = $.extend({}, defParams, (args || {}));
        if (!(this.touchArea = $(this.opts.touchArea)).length) return;
        this.init();
    };
    win.attendance.touchGame.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
        },
        setElements : function () {
            this.wrap = $(this.opts.wrap);
            this.touchArea = this.wrap.find(this.opts.touchArea);
            this.countCont = this.wrap.find('.touch_count');
            this.count = 0
        },
        bindEvents : function () {
            this.touchArea.on('touchstart', $.proxy(this.btnFunc, this));
        },
        btnFunc : function () {
            if (this.count >= 10) return;

            this.count++;
            this.countCont.html(this.count);
        },
        imageArray : function (type) {
            var imgTypeLength = 5;

            console.log(type);

            if (type === 1) {
                
            }

        }
        // 랜덤하게 노출될 이미지값 받아오기
        // 받아온 이미지값 기준으로 기본 뷰 화면 셋팅
        // 남은 시간 초기값 노출

        // 게임 스타트
        // 남은 시간 줄어듦

        // 터치 횟수(2회당)
        // 받아온 얼음 이미지 교체 (총 5장)
        // 캐릭터 이미지 교체
        // 캐릭터 모션 총 10가지 (1회 터치망 모션 2번 반복되도록)
        

        // 실패한 경우
        // 성공한 경우
        // 성공한 경우 남은 시간 멈춤

        
        // 터치 횟수마다(1회당) 캐릭터 이동
        // 터치 횟수마다(2회당) 캐릭터 교체
    
    }

})(jQuery, window, document);