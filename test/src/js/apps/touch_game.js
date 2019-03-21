(function ($, win, doc) {
    'use strict';

    win.attendance = win.attendance || {};

    win.attendance.game = function (args) {
        var defParams = {
            gameWrap : '.game_wrap',
            gameArea : '.game_area',
            gameImageArea : '.game_image_area',
            btnWrap : '.btn_wrap',
            btnStart : '.btn_start',
            characterArea : '.character_area',
            character : '.character',
            touchArea : '.touch_area',
            countDown : '.start_countdown',
            timer : '.game_count_area .time',
            count : 0,
            readyCount : 3,
            limitedTime : 8000,
            timeCountDownSpeed : 10,
            missionFailed : function () {},
            missionComplete : function () {}
        };        
        this.opts =  $.extend({}, defParams, (args || {}));
        if (!(this.gameWrap = $(this.opts.gameWrap)).length) return;
        this.init();
    };
    win.attendance.game.prototype = {
        init : function () {
            this.setElements();
            this.createLoadImage();
            this.startInit();
            this.bindEvents();

            this.iceMotion();
        },
        setElements : function () {
            this.gameWrap = $(this.opts.gameWrap);
            this.gameArea = this.gameWrap.find(this.opts.gameArea);
            this.gameImageArea = this.gameWrap.find(this.opts.gameImageArea);
            this.startImage = this.gameImageArea.find('.bg_start');
            this.loadImage = this.gameImageArea.find('.load_image');
            this.character = this.gameWrap.find(this.opts.character);
            this.btnWrap = this.gameWrap.find(this.opts.btnWrap);
            this.characterArea = this.gameWrap.find(this.opts.characterArea);
            this.btnStart = this.btnWrap.find(this.opts.btnStart);
            this.touchArea = this.gameWrap.find(this.opts.touchArea);
            this.countDown = this.gameWrap.find(this.opts.countDown);
            this.timer = this.gameWrap.find(this.opts.timer);
            this.countSeconds = this.timer.find('.second');
            this.countMilliseconds = this.timer.find('.millisecond');
            this.count = 0;
        },
        arrayLoadImage : function () {
            var itemArray = ['AHC 썬스틱', '신일 에어써큘레이터', '비비고 삼계탕', '매그넘 아이스크림', '서포트라이트 선글라스'],
                itemNum = 6,
                imagePath = 'img/item/';

            this.array = [];
            for (var i = 1; i <= itemNum; i++) {
                var itemImageUrl = imagePath + 'game_image_type' + this.opts.imageNum + '_' + i + '.png';
                this.array.push(itemImageUrl);
            };
        },
        createLoadImage : function () {
            this.arrayLoadImage();
            for (var i = 0; i < this.array.length; i++) {
                var creatImg = '<img src="' + this.array[i] + '" alt="">';
                this.loadImage.append(creatImg);
            };
        },        
        startInit : function () {
            // 버튼 이미지 인터벌
            this.startBtnMotion();            
            // 캐릭터 이미지 인터벌
            this.startCharacterMotion();
        },
        startBtnMotion : function () {
            var speed = 500;
            this.toggle = false;
            this.btnInterval = setInterval ($.proxy(this.startBtnMotionInterval, this), speed);
        },
        startBtnMotionInterval : function () {            
            if (this.toggle) {
                this.btnWrap.css('backgroundPosition', '0 0')
            } else {
                this.btnWrap.css('backgroundPosition', '100% 0')
            }
            this.toggle = !this.toggle;
        },
        // 180731 수정
        startCharacterMotion : function () {
            var _this = this,
                speed = 5000;
            
            setTimeout (function () {        
                _this.startCharacterInterval();
            }, 1000);
            
            this.startMotionInterval = setInterval (function () {
                _this.startCharacterInterval();
            }, speed);
        },
        // 180731 수정
        startCharacterInterval : function () {
            var _this = this,
                speed = 1200;

            this.crateCharacterInterval(0, 2, 150);
            setTimeout (function () {
                _this.crateCharacterInterval(1, 2, 150);
            }, speed);
        },
        // 180731 수정
        crateCharacterInterval : function (index, number, speed) {
           var _this = this,
               motion = false,
               count = 0;

           var motionInterval = setInterval(function () {
                if (count < number)  {
                   // 모션 실행문
                   _this.character.eq(index).show();
                   if (motion) {
                        count++;
                        _this.character.eq(index).css('backgroundPosition', '0 0');
                    } else {
                        _this.character.eq(index).css('backgroundPosition', '100% 0');
                    }
                    motion = !motion;
               } else {
                   clearInterval(motionInterval);
                   _this.character.eq(index).hide();
               }
            }, speed);
        },
        bindEvents : function () {
            this.btnStart.on('click', $.proxy(this.startFunc, this));
            this.touchArea.on('touchstart', $.proxy(this.touchFunc, this));
        },
        startFunc : function () {            
            // 초기 애니메이션 제거
            this.clearStartInit();
            // 카운트 다운
            this.countDownEvent();
            this.btnStart.off('click', $.proxy(this.startFunc, this));
        },
        clearStartInit : function () {
            this.btnWrap.css('backgroundPosition', '0');
            this.btnWrap.find('button').attr('disabled', 'disabled');
            this.characterArea.hide();
            clearInterval(this.btnInterval);
            clearInterval(this.startMotionInterval);
        },
        countDownEvent : function () {
            this.countDown.show().attr('data-count', this.opts.readyCount);
            this.opts.readyCount--;
            this.startCountDownInterval = setInterval ($.proxy(this.countDownInterval, this), 1000);
        },
        countDownInterval : function () {
            if (this.opts.readyCount >= 0) {
                // 카운트 다운
                if (this.opts.readyCount === 0) {
                    this.countDown.children().html('Go');
                } else {
                    this.countDown.children().html(this.opts.readyCount);
                }
                this.countDown.attr('data-count', this.opts.readyCount--);
            } else {
                // 카운트 다운 종료 후 실행
                this.countDownEndEvent();
            }
        },
        countDownEndEvent : function () {
            clearInterval(this.startCountDownInterval);
            this.startView();
            this.previousTime = this.getTimeNow();
            this.countdownInterval = setInterval($.proxy(this.setTimer, this), this.opts.timeCountDownSpeed);
        },
        startView : function () {
            this.startImage.hide()
            this.gameArea.addClass('game_start');
            this.touchArea.css('zIndex', '8');
            this.countDown.hide();
            this.characterArea.show();
        },
        setTimer : function () {
            this.currentTime = this.getTimeNow();
            this.opts.limitedTime -= (this.currentTime - this.previousTime);
            this.previousTime = this.currentTime;
            if (this.opts.limitedTime > 0) {
                this.updateTimer(parseInt(this.opts.limitedTime / 10));
            } else {
                this.updateTimer(0);
                clearInterval(this.countdownInterval);
                this.missionFailed();
                // 180731 추가
                this.gameWrap.addClass('game_end');
            };
        },
        updateTimer : function (time) {
            var seconds = parseInt(time / 100),
                milliSeconds = this.addZero(time % 100);
                
            this.countSeconds.html(seconds);
            this.countMilliseconds.html(milliSeconds);
        },
        getTimeNow : function () {
            return Date.now();
        },
        addZero : function (number) {
            return (number < 10)? '0' + number : number;
        },
        touchFunc : function (e) {
            e.preventDefault();
            if (this.count >= 10) return;
            this.count++;

            // console.log(this.count);

            this.breakMotion();
            this.iceMotion();
        },
        iceMotion : function () {
            var _this = this,
               motion = false,
               count = 0,
               number = 2, // 캐릭터 모션 반복 횟수
               speed = 50; // 캐릭터 동작 속도

           var iceMotionInterval = setInterval(function () {
                if (count < number)  {
                   // 모션 실행문
                   if (motion) {
                        count++;
                        _this.loadImage.css('left', '-1px');
                    } else {
                        _this.loadImage.css('left', '1px');
                    }
                    motion = !motion;
               } else {
                   clearInterval(iceMotionInterval);
               }
            }, speed);
        },
        // 180731 수정
        breakMotion : function () {
            var _this = this;

            if (this.count === 1) {
                this.crateCharacterInterval(0, 1, 100);
            }
            if (this.count === 2) {
                this.crateCharacterInterval(1, 1, 100);
                setTimeout(function () {
                    _this.loadImage.find('img').eq(0).hide();
                }, 500)
            }
            if (this.count === 3) {
                this.crateCharacterInterval(2, 1, 100);
            }
            if (this.count === 4) {
                this.crateCharacterInterval(3, 1, 100);
                setTimeout(function () {
                    _this.loadImage.find('img').eq(1).hide();
                }, 500)
            }
            if (this.count === 5) {
                this.crateCharacterInterval(4, 1, 100);
            }
            if (this.count === 6) {
                this.crateCharacterInterval(5, 1, 100);
                setTimeout(function () {
                    _this.loadImage.find('img').eq(2).hide();
                }, 500)
            }
            if (this.count === 7) {
                this.crateCharacterInterval(6, 1, 100);
            }
            if (this.count === 8) {
                this.crateCharacterInterval(7, 1, 100);
                setTimeout(function () {
                    _this.loadImage.find('img').eq(3).hide();
                }, 500)
            }
            if (this.count === 9) {
                this.crateCharacterInterval(8, 1, 100);
            }
            if (this.count === 10) {
                this.crateCharacterInterval(9, 1, 100);
                setTimeout(function () {
                    _this.loadImage.find('img').eq(4).hide();
                }, 500)
                clearInterval(this.countdownInterval);
                this.opts.missionComplete();
                // 180731 추가
                this.gameWrap.addClass('game_end');
            }
        },
        missionFailed : function () {
            this.opts.missionFailed();
            this.touchArea.off('touchstart', $.proxy(this.touchFunc, this));
        }
    }

})(jQuery, window, document);
