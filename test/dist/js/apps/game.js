(function ($, win, doc) {
  'use strict';

  win.cjmall = win.cjmall || {};

  // 축구 게임
  win.cjmall.soccerGame = function (args) {
    var defParams = { //파라미터 값 정의
      gameWrap : '.soccer_game_wrap',
      human : '.human',
      btnLeft : '.btn_left',
      btnCenter : '.btn_center',
      btnRight : '.btn_right',
      noticeText : '.notice_text',
      ball : '.ball'
    };
    this.opts = $.extend({}, defParams, (args || {}));
    if (!(this.gameWrap = $(this.opts.gameWrap)).length) return;
    this.init();
  };
  win.cjmall.soccerGame.prototype = {
    init : function () {
      this.setElements();
      this.bindEvents();
      // this.humanMove();
      // this.textAnimation();
    },
    setElements : function () {
      this.gameWrap = $(this.opts.gameWrap);
      this.human = this.gameWrap.find(this.opts.human);
      this.btnLeft = this.gameWrap.find(this.opts.btnLeft);
      this.btnCenter = this.gameWrap.find(this.opts.btnCenter);
      this.btnRight = this.gameWrap.find(this.opts.btnRight);
      this.noticeText = this.gameWrap.find(this.opts.noticeText);
      this.ball = this.gameWrap.find(this.opts.ball);
    },
    bindEvents : function () {
      this.btnLeft.on('click', $.proxy(this.ballLeft, this));
      // this.btnCenter.on('click', $.proxy(this.gameEvent, this));
      // this.btnRight.on('click', $.proxy(this.gameEvent, this));
    },
    textAnimation : function () {
      var _this = this;

      setInterval(function () {
        _this.noticeText.fadeOut(600);
        _this.noticeText.fadeIn(600);
      })
    },
    humanMove : function () {
      var _this = this;

      setInterval(function () {
        _this.human.animate({left:47+'%'}, 600);
        _this.human.animate({left:53+'%'}, 600);
      });
    },
    ballLeft : function () {
      console.log(this.ball)
      this.ball.animate({bottom:50+'%', left:40+'%'}, 800);
    }
  };

  // 키보드 타자 게임
  win.cjmall.keyboredGame = function (args) {
    var defParams = { //파라미터 값 정의
      gameWrap : '.keybored_game_wrap',
      gameViewArea : '.game_view_area',
      gameControlArea : '.game_control_area',
      gameCountArea : '.game_count_area',
      gameSoundArea : '.game_sound_area',
      startLayout : '.start_area',
      endLayout : '.end_area',
      gameStartBtn : '.btn_start',
      enterBtn : '.btn_enter',
      soundBtn : '.btn_sound'
    };
    this.opts = $.extend({}, defParams, (args || {}));
    if (!(this.gameWrap = $(this.opts.gameWrap)).length) return;
    this.init();
  };
  win.cjmall.keyboredGame.prototype = {
    init : function () {
      this.setElements();
      this.bindEvents();
    },
    setElements : function () {
      this.gameWrap = $(this.opts.gameWrap);
      this.gameViewArea = this.gameWrap.find(this.opts.gameViewArea);
      this.wordArea = this.gameViewArea.find('.word_area');
      this.trueMessage = this.gameViewArea.find('.message_true');
      this.falseMessage = this.gameViewArea.find('.message_false');
      this.gameoverMessage = this.gameViewArea.find('.message_gameover');
      this.gameCountArea = this.gameWrap.find(this.opts.gameCountArea);
      this.gameSoundArea = this.gameWrap.find(this.opts.gameSoundArea);
      this.countMinutes = this.gameCountArea.find('.min');
      this.countseconds = this.gameCountArea.find('.second');
      this.gameControlArea = this.gameWrap.find(this.opts.gameControlArea);
      this.textInput = this.gameControlArea.find('input');
      this.startLayout = this.gameWrap.find(this.opts.startLayout);
      this.endLayout = this.gameWrap.find(this.opts.endLayout);
      this.gameStartBtn = this.gameWrap.find(this.opts.gameStartBtn);
      this.enterBtn = this.gameWrap.find(this.opts.enterBtn);
      this.soundBtn = this.gameSoundArea.find(this.opts.soundBtn);
    },
    bindEvents : function () {
      this.gameStartBtn.on('click', $.proxy(this.gameEvent, this));
      this.gameStartBtn.on('click', $.proxy(this.offsetTop, this));
      this.textInput.on('click', $.proxy(this.offsetTop, this));
      this.textInput.on('keypress', $.proxy(this.wordCheck, this));
      this.enterBtn.on('click', $.proxy(this.wordCheck, this));
      this.soundBtn.on('click', $.proxy(this.gameSoundFunc, this));
    },
    gameEvent : function () { // 게임 start 되었을때 실행
      this.gameWrap.addClass('game_playing');
      this.gameStartView();
      this.gameSoundInitFunc();
      this.wordView();
      this.setTimer();
    },
    setTimer : function () {
      var _this = this,
      // 제한시간 제어
      timer = 60;

      timer--;

      this.timeInterval = setInterval(function () {
        var minutes = parseInt(timer / 60, 10),
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        _this.countMinutes.text(minutes);
        _this.countseconds.text(seconds);

        // 시간 종료 되었을 경우
        if (--timer < 0) {
          timer = 0;
          _this.gameFailedFunc();
        }
        // 시간 내 단어입력 모두 완료 되었을 경우
        if (_this.wordArea.children().length === 0) {
          // 마지막 단어 입력후 노출되는 WOW 메세지와 게임 종료 후 노출되는 메세지가 겹치는 이슈로 setTimeout 적용
          setTimeout(_this.gameSuccessFunc(), 600);
        }                      
      }, 1000);
    },
    gameStartView : function () { // 게임 스타트 후 초기 노출되는 화면
      this.startLayout.hide();
      this.gameControlArea.show();
      // 게임 스타트 후 단어 입력창에 포커스 이동
      this.textInput.focus();
    },
    gameEndView : function () { // 게임 종료 후 노출되는 화면
      this.gameWrap.removeClass('game_playing');
      this.gameWrap.addClass('game_end');
      this.endLayout.show();
      this.soundOffFunc();
      this.textInput.hide();
      this.enterBtn.blur();
    },
    gameSuccessFunc : function () { // 게임 성공되었을때 호출
      clearInterval(this.timeInterval); // 타이머 종료
      clearInterval(this.wordMove);
      this.gameEndView();
      this.soundBtn.off();
      this.gamePopupFunc();
    },
    gameFailedFunc : function () { // 게임 실패되었을때 호출
      clearInterval(this.timeInterval);
      this.gameEndView();
      this.soundBtn.off();
      this.gamePopupFunc();
    },
    gamePopupFunc : function () {
      // [D] 팝업 노출 코드 넣어주세요.
    },
    gameSoundInitFunc : function () { // 게임 초기 스타트시 BGM 호출
      this.gameAudio = document.getElementById('game_audio');
      this.gameAudio.play();

      if (this.soundBtn.hasClass('off')) {
        this.soundBtn.addClass('off');
        this.gameAudio.pause(); 
      }
    },
    gameSoundFunc : function () { // 게임 중 BGM 버튼 클릭시 on/off 기능
      this.gameAudio = document.getElementById('game_audio');

      if (this.soundBtn.hasClass('off')) {
        this.soundOnFunc();
      } else {
        this.soundOffFunc();                      
      };                  
    },
    soundOnFunc : function () { // BGM ON
      this.soundBtn.removeClass('off')
      this.gameAudio.play();
    },
    soundOffFunc : function () { // BGM OFF
      this.soundBtn.addClass('off');
      this.gameAudio.pause();
    },
    wordView : function () { // 게임 시작 후 단어 노출되는 구문 호출
      this.wordArrayCreate();
      this.wordCreate();
      this.speedInterval = [];
      this.wordMove(0);                    
      setTimeout($.proxy(this.wordMove, this, 1), 1000);  
      setTimeout($.proxy(this.wordMove, this, 2), 3000);
      setTimeout($.proxy(this.wordMove, this, 3), 5000);
      setTimeout($.proxy(this.wordMove, this, 4), 7000);
      setTimeout($.proxy(this.wordMove, this, 5), 9000);
    },
    wordArrayCreate : function () {
      // [D] 랜덤하게 추출한 텍스트 배열로 넣어주세요.
      this.wordArray = ['가가가가', '나나나나', '다다다다', '라라라라', '마마마마', '바바바바']
    },
    wordCreate : function () { // 배열에 담긴 단어 노드로 생성
      for (var i = 0, imax = this.wordArray.length ; i < imax ; i++) {
        var word = '<div class="word '+'type'+i+'"'+'style="top:-50px"'+'>'+this.wordArray[i]+'</div>'

        this.wordArea.append(word);
      };
    },
    wordMove : function (index) { // 노드로 생성된 단어 움직이는 인터렉션
      var _this = this,
          idx = index,
          word = this.wordArea.children(),
          speedInit = -50,
          speed = word.innerHeight();

      this.speedInterval[idx] = setInterval(function () {
        speedInit = speedInit + speed;
        word.eq(idx).css('top', speedInit);

        if (speedInit >= _this.wordArea.innerHeight() - _this.gameControlArea.innerHeight()) { 
          clearInterval(_this.speedInterval[idx])
          word.eq(idx).css('top', '-50');
          _this.wordMove(idx);
        };
        if (_this.gameWrap.hasClass('game_end')) {
          clearInterval(_this.speedInterval[idx]);
        };
      }, 1000);
    },
    wordCheck : function (e) { // 단어 입력후 엔터 혹은 엔터 버튼 클릭하였을때 유효성 검사
      var typingText = this.textInput.val();

      if (e.keyCode === 13 || e.type === 'click') {
        this.textInput[0].value = ''; //[D]180503 수정

        if (e.type === 'click')  {
          this.textInput.focus();
        };

        for (var i = 0; i < this.wordArray.length; i++) {
          var onWord = this.wordArea.children().eq(i); // 생성된 텍스트 순서

          if (typingText === onWord.text() && typingText !== '') { // 타이핑한 텍스트와 생성된 텍스트값이 일치할 경우
              onWord.remove(); // 일치하는 텍스트 제거
              this.wordTrueEffect();
              return this.textInput[0].value = ''; //[D]180503 수정
          };
        };
        this.wordFalseEffect();
      };
    },
    wordTrueEffect : function () {
      var _this = this;

      this.trueMessage.show();
      setTimeout(function () {
        _this.trueMessage.hide();
      }, 500);
    },
    wordFalseEffect : function () {
      var _this = this;

      this.falseMessage.show();
      setTimeout(function () {
        _this.falseMessage.hide();
      }, 500);
    },
    offsetTop : function () { // 인풋에 포커스 갈 경우 키보드 노출되면서 컨텐츠 밀리는 이슈 대응하기 위한 코드 (해당 이벤트 섹션으로 스크롤바 강제 이동)
      var gameOffsetTop = $('.game_section').offset().top;

      if ($(window).innerWidth() <= 320) {
        $('html, body').animate({scrollTop : gameOffsetTop + 20}, 100);
      } else {
        $('html, body').animate({scrollTop : gameOffsetTop}, 100);
      };
    }
  };

  $(function () {
      win.cjoshopping = new win.cjmall.keyboredGame();
      win.cjoshopping = new win.cjmall.soccerGame();
  });
})(jQuery, window, document);