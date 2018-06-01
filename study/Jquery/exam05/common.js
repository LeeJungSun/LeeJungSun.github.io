(function(win, $) {
    var exam01 = {
        init: function () {
            this.setElements();
            this.bindEvents();
        },
        setElements: function () {
            this.idx = 0;
            this.examWrap = $('.exam_wrap').eq(0);
            this.examList = this.examWrap.find('li');
            this.btnPlus = this.examWrap.find('.btn_plus');
        },
        bindEvents: function () {
            this.btnPlus.on('click', $.proxy(this.examView, this));
        },
        examView: function () {
            this.examList.eq(this.idx).css('background', 'yellow');
            this.idx++;

            if (this.idx >= this.examList.length) {
                this.idx = 0;
            }
        }
    };
    var exam02 = {
        init: function () {
            this.setElements();
            this.bindEvents();
        },
        setElements: function () {
            this.idx = 0;
            this.examWrap = $('.exam_wrap').eq(1);
            this.examList = this.examWrap.find('li');
            this.listIndex = this.examList.length - 1;
            this.btnMinus = this.examWrap.find('.btn_minus');
        },
        bindEvents: function () {
            this.btnMinus.on('click', $.proxy(this.examView, this));
        },
        examView: function () {
            this.examList.eq(this.listIndex).css('background', 'yellow');
            this.listIndex --;

            if (this.listIndex < 0) {
                this.listIndex = this.examList.length - 1;
            }
        }
    };
    var exam03 = {
        init: function () {
            this.setElements();
            this.bindEvents();
        },
        setElements: function () {
            this.idx = 0;
            this.oldIndex = this.idx;
            this.examWrap = $('.exam_wrap').eq(2);
            this.examList = this.examWrap.find('li');
            this.btnPlus = this.examWrap.find('.btn_plus');
            this.btnMinus = this.examWrap.find('.btn_minus');
        },
        bindEvents: function () {
            this.btnPlus.on('click', $.proxy(this.examView, this));
            this.btnMinus.on('click', $.proxy(this.examView, this));
        },
        examView: function (e) {
            if ($(e.currentTarget).hasClass('btn_plus')) {
                this.idx++;

                if (this.idx >= this.examList.length) {
                    this.idx = 0;
                }
            } else if ($(e.currentTarget).hasClass('btn_minus')) {
                this.idx--;
                
                if (this.idx < 0) {
                    this.idx = this.examList.length - 1;
                }
            }
            this.examList.eq(this.oldIndex).css('background', '');
            this.examList.eq(this.idx).css('background', 'yellow');
            this.oldIndex = this.idx;
        }
    };
    var exam04 = {
        init: function () {
            this.setElements();
            this.bindEvents();
        },
        setElements: function () {
            this.idx = 0;
            this.oldIndex = this.idx;
            this.examWrap = $('.exam_wrap').eq(3);
            this.examList = this.examWrap.find('li');
            this.btnPlus = this.examWrap.find('.btn_plus');
            this.btnMinus = this.examWrap.find('.btn_minus');
        },
        bindEvents: function () {
            this.btnPlus.on('click', $.proxy(this.examView, this));
            this.btnMinus.on('click', $.proxy(this.examView, this));
        },
        examView: function (e) {
            if ($(e.currentTarget).hasClass('btn_plus')) {
                this.idx++;

                if (this.idx >= this.examList.length) {
                    this.idx = 0;
                }
            } else if ($(e.currentTarget).hasClass('btn_minus')) {
                this.idx--;
                
                if (this.idx < 0) {
                    this.idx = this.examList.length - 1;
                }
            }
            this.examList.eq(this.oldIndex).removeClass('active');
            this.examList.eq(this.idx).addClass('active');
            this.oldIndex = this.idx;
        }
    };
    var exam05 = {
        init: function () {
            this.setElements();
            this.bindEvents();
        },
        setElements: function () {
            this.examWrap = $('.exam_wrap').eq(4);
            this.exambox = this.examWrap.find('.exam_q');
            this.btnPlus = this.examWrap.find('.btn_plus');
        },
        bindEvents: function () {
            this.btnPlus.on('click', $.proxy(this.examView, this));
        },
        examView: function () {
            var tagPush = [],
                listLength = 5;
            for (var i = 1, imax = listLength ; i < 6 ; i++) {
                tagPush.push('<p>')
                if (i%2 === 0) {
                   tagPush.push('<input type="text" id="' + ('box' + i) + '"></input>')
                   tagPush.push('<label for="' + ('box' + i) + '">' + 'text' + '</label>')
                } else {
                    tagPush.push('<input type="checkbox" id="' + ('box' + i) + '"></input>')
                    tagPush.push('<label for="' + ('box' + i) + '">' + 'checkbox' + '</label>')
                }
                tagPush.push('<p>')
            }
            this.exambox.get(0).innerHTML = tagPush.join('');
        }
    };
    var exam06 = {
        init: function () {
            this.setElements();
            this.bindEvents();
        },
        setElements: function () {
            this.examWrap = $('.exam_wrap').eq(5);
            this.exambox = this.examWrap.find('.exam_q');
            this.btnPlus = this.examWrap.find('.btn_plus');
        },
        bindEvents: function () {
            this.btnPlus.on('click', $.proxy(this.examView, this));
        },
        examView: function () {
            var tagPush = [],
                i = 7;
            tagPush.push('<div>')
            tagPush.push('<strong>' + i + '단' + '</strong>')
            for(var a = 1 ; a < 10 ; a++){
                tagPush.push(i+' x '+a+' = '+i*a+'<br>')
            }
            tagPush.push('</div>')
            this.exambox.get(0).innerHTML = tagPush.join('');
            this.exambox.find('div').addClass('box');
        }
    };
    var exam07 = {
        init: function () {
            this.setElements();
            this.bindEvents();
        },
        setElements: function () {
            this.examWrap = $('.exam_wrap').eq(6);
            this.exambox = this.examWrap.find('.exam_q');
            this.btnPlus = this.examWrap.find('.btn_plus');
        },
        bindEvents: function () {
            this.btnPlus.on('click', $.proxy(this.examView, this));
        },
        examView: function () {
            var tagPush = []
            
            for(var i = 2 ; i < 10 ; i++){
                tagPush.push('<div>')
                tagPush.push('<strong>' + i + '단' + '</strong>')
                var a = 1
                while (a < 10) {
                    tagPush.push(i + ' x ' + a + ' = ' + i*a + '<br>')
                    a++
                }
                tagPush.push('</div>')
            }
            this.exambox.get(0).innerHTML = tagPush.join('');
            this.exambox.find('div').addClass('box');
        }
    };
    $(function() {
        exam01.init();
        exam02.init();
        exam03.init();
        exam04.init();
        exam05.init();
        exam06.init();
        exam07.init();
    });
})(window, window.jQuery);