(function(win, $) {
    'use strict';

    var randomObj = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.blindEvent();
        }, 
        setElements : function () {
            this.obj = $('.swiper-slide');
            this.objLength = $('.swiper-slide').length;
            this.btn = $('.btn_random');            
        },
        initLayout : function () { //초기값
            this.obj.hide(); //전체 오브젝트 블라인드
            this.arrayCreate(); //배열 생성
            this.arrayRandom(); //생성된 배열 랜덤으로 돌림
            while (this.arrRandom === this.oldIndex) { //배열값이 추출된 인덱스값과 같을 경우
                this.arrayRandom(); //랜덤 다시 돌림
            }
            this.objView(); //돌려서 추출된값 show
        },
        btnFunc : function () {
            this.arrayextract(); //돌린 인덱스값
            this.arrayRandom(); //남은 값을 다시 돌림
            this.objView(); //돌린 인덱스값 view
            while (this.array.length === 0) { //배열에 담긴값이 없을 경우
                this.initLayout(); // 초기값으로 다시 돌림
            }
            // console.log(this.objIndex)
        },
        blindEvent : function () {
            this.btn.on('click', $.proxy(this.btnFunc, this));
        },
        arrayCreate : function () {
            this.array = [];
            for (var i = 0, imax = this.objLength ; i < imax ; i++) {
                this.array.push(i)
            }
        },
        arrayRandom : function () {
            this.arrRandom = Math.floor((Math.random() * this.array.length)); //생성한 배열을 랜덤하게 돌림
            this.objIndex = this.array[this.arrRandom]; //랜덤하게 돌린 배열을 obj index값으로 담음
            // console.log(this.objIndex)
        },
        objView : function () {
            this.obj.eq(this.objIndex).show();
        },
        objHide : function () {
            this.obj.eq(this.oldIndex).hide();
        },
        arrayextract : function () {
            // console.log(this.array)
            this.array.splice(this.arrRandom, 1); // objIndex 인덱스값을 제거함
            // console.log(this.arrRandom)
            // console.log(this.array)
            this.oldIndex = this.objIndex; // 제거된 인덱스를 담음
            // console.log(this.objIndex)
            this.objHide(); //이전에 선택된 값 hide
        }
    }

    $(function () {
    	randomObj.init();
    })
})(window, window.jQuery);