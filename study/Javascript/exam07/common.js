(function(win, $) {
    'use strict'; // 스크립트 문법 검사 엄격하게 검사하겠다

    // 레이어 내에서 포커스 돌도록 구현(포커스 위치에따라 if문 돌림)
    var layerObj = { //관리 유지보수 측면에서 사용
    	init : function () {
    		this.setElements();
    		this.initLayout();
    		this.bindEvent();
    	},
    	setElements : function () {
    		this.obj = $('.layer_area');
    		this.objWrap = $('.js-layer_area');
    		this.btn = $('.js-btn_layer');
    		this.closeBtn = this.obj.find('.btn_layer_close');
    	},
    	initLayout : function () {
    		var focusoutTag = '<span class="js-focusout" tabindex="0"></span>';
    		this.obj.before(focusoutTag);
    		this.obj.after(focusoutTag);
    		this.obj.attr('tabIndex', 0); // 포커스 태그로 사용하겠다 인식 
    	},
    	bindEvent : function () {
    		this.btn.on('click', $.proxy(this.layerView, this)); //레이어 열기 버튼
    		this.closeBtn.on('click', $.proxy(this.layerClickOutside, this)); //레이어 닫기 버튼
    	},
    	outSideEvents : function () {
    		this.obj.on('clickoutside', $.proxy(this.layerClickOutside, this));
    		this.obj.next('.js-focusout').on('focus', $.proxy(this.keyEventNext, this));
    		this.obj.prev('.js-focusout').on('focus', $.proxy(this.keyEventPrev, this));
    	},
    	layerView : function () {
    		this.objWrap.show(); // 레이어가 열리면
    		this.obj.focus(); // 레이어에 포커스가 이동
    		setTimeout($.proxy(function () { //스크립트가 시간차로 실행될때 사용
    			this.outSideEvents();
    		}, this), 10);
    		//this.outSideEvents(); //레이어 바깥을 클릭했을때 실행되는 이벤트
    	},
    	layerClickOutside : function () {
    		// this.keyShift = false;
            this.obj.off('clickoutside');
    		this.objWrap.hide(); //레이어를 닫았을때
    		this.btn.focus(); //버튼에 포커스 이동
    	},
    	keyEventNext : function () {
    		this.obj.focus();
    	},
		keyEventPrev : function () {
			this.closeBtn.focus();
		},
    	keyfocusEvent : function (e) {
    		// 포커스가 레이어 밖으로 나감
    		// shift가 눌렸을때 레이어 닫기 버튼으로 이동 true (keydown)
    		// shift가 안눌렸을때 레이어창으로 이동 false (keyup)
    		// shift가 눌린 경우 안눌린 경우 체크 (keycord, 파이어폭스 작동 안되므로 e.which 같이 사용)
    		// if (e.type === 'keydown') {
    		// 	if (e.keycord === 16 || e.which === 16) {
    		// 		this.keyShift = true;
    		// 	}
    		// } else if (e.type === 'keyup') {
    		// 	if (e.keycord !== 16 || e.which !== 16) {
    		// 		this.keyShift = false;
    		// 	}
    		// } else if (e.type === 'focusoutside') {
    		// 	(this.keyShift) ? this.closeBtn.focus() : this.obj.focus();
    		// }
    	}
    }

    $(function () {
    	layerObj.init();
    })
})(window, window.jQuery);