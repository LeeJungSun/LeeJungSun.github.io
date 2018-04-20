(function ($, win, doc) {
    'use strict';

    win.example = win.example || {}; //examProject 객체가 있으면 가져오고, 없으면 빈 객체 생성
    win.example.keyboredGame = function (args) { //examProject 내 commonLayer 함수 생성
        var defParams = { //파라미터 값 정의
            gameWrap : '.keybored_game_wrap',
            gameViewArea : '.game_view_area',
            gameControlArea : '.game_control_area',
            gameCountArea: '.game_count_area',
            startLayout : '.start_area',
            endLayout : '.end_area',
            gameStartBtn : '.btn_start',
            enterBtn : '.btn_enter'
        };
        this.opts = $.extend({}, defParams, (args || {})); //파라미터값을 this.opts에 저장
        if (!(this.gameWrap = $(this.opts.gameWrap)).length) return; //this.btnObj에 this.opts.btnElements값을 저장하고, 값이 없는 경우 리턴
        this.init(); //prototype 호출
    };
    win.example.keyboredGame.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
        },
        setElements : function () {
            this.gameWrap = $(this.opts.gameWrap);
            this.gameViewArea = this.gameWrap.find(this.opts.gameViewArea);
            this.wordArea = this.gameViewArea.find('.word_area');

            this.trueMessage = this.gameViewArea.find('.message_true');
            this.falseMessage = this.gameViewArea.find('.message_flase');

            this.gameCountArea = this.gameWrap.find(this.opts.gameCountArea);
            this.countMinutes = this.gameCountArea.find('.min');
            this.countseconds = this.gameCountArea.find('.second');
            this.gameControlArea = this.gameWrap.find(this.opts.gameControlArea);
            this.textInput = this.gameControlArea.find('input');
            this.startLayout = this.gameWrap.find(this.opts.startLayout);
            this.endLayout = this.gameWrap.find(this.opts.endLayout);
            this.gameStartBtn = this.gameWrap.find(this.opts.gameStartBtn);
            this.enterBtn = this.gameWrap.find(this.opts.enterBtn);
        },
        bindEvents : function () {
            this.gameStartBtn.on('click', $.proxy(this.gameEvent, this));
            this.textInput.on('keypress', $.proxy(this.wordCheck, this));
            this.enterBtn.on('click', $.proxy(this.wordCheck, this));
        },
        gameEvent : function () {
            this.gameStartView();
            this.wordView();
            this.setTimer(); // 남은 시간 카운트다운
        },
        setTimer : function () {
            var _this = this,
                timer = 60;

            timer--;

            this.timeInterval = setInterval(function () {
                var minutes = parseInt(timer / 60, 10),
                    seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                
                _this.countMinutes.text(minutes);
                _this.countseconds.text(seconds);

                if (--timer < 0) {
                    timer = 0;
                    _this.gameEndView();
                    clearInterval(_this.timeInterval);
                }                
            }, 1000);
        },
        gameStartView : function () {
            this.startLayout.hide(); // dimmed 및 start 버튼 제거
            this.textInput.focus(); // input focus 이동
        },
        gameEndView : function () {
            this.endLayout.show();
            this.textInput.blur();
            // 팝업 노출
        },
        wordView : function () {
            this.wordArrayCreate();
            this.wordCreate();
        },
        wordArrayCreate : function () {
            this.wordArray = ['가가가가', '나나나나', '다다다다', '라라라라', '마마마마', '바바바바']
        },
        wordCreate : function () {
            for (var i = 0, imax = this.wordArray.length ; i < imax ; i++) {
                var word = '<div class="word '+'type'+i+'">'+this.wordArray[i]+'</div>'

                this.wordArea.append(word)
            }
        },
        wordCheck : function (e) {
            var typingText = this.textInput.val();
            if (e.keyCode === 13 || e.type === 'click') { // 키보드 엔터 또는 버튼 클릭했을때
                this.textInput.val('') // 인풋창 value 값 clear

                for (var i = 0, imax = this.wordArray.length ; i < imax ; i++) {
                    var onWord = this.wordArea.children().eq(i); // 생성된 텍스트 순서

                    if (typingText === onWord.text()) { // 타이핑한 텍스트와 생성된 텍스트값이 일치할 경우
                        onWord.remove(); // 제거
                        this.trueMessage.show();
                    }
                }
                console.log(typingText)
            }
        }
    };

    $(function () {
        win.exam = new win.example.keyboredGame();
    });

})(jQuery, window, document);