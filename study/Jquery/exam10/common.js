(function(win, $) {
    'use strict';

    var checkboxCustom = function (obj) {
        this.obj = obj;
        this.init();
    }
    var radioCustom = function (obj) {
        this.obj = obj;
        this.init();
    }
    var selectBoxCustom = function (obj) {
        this.obj = obj;
        this.init();
    }

    checkboxCustom.prototype = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.checkbox = $('.check_box');
            this.inputChk = this.checkbox.find('input[type="checkbox"]');
            this.chk = this.checkbox.find('.chk_box');
        },
        initLayout : function () {
            this.inputChk.filter(':checked').closest('.check_box').addClass('chk_active');
        },
        bindEvents : function () {
            this.inputChk.on('change', $.proxy(this.checkFunc, this));
        },
        checkFunc : function (e) {
            var target = $(e.currentTarget);
            target.closest('.check_box').toggleClass('chk_active', target.prop('checked'));
        }
    }
    radioCustom.prototype = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.checkbox = $('.radio_box'),
            this.inputRdo = this.checkbox.find('input[type="radio"]'),
            this.chk = this.checkbox.find('.rdo_box')
        },
        initLayout : function () {
            this.inputRdo.filter(':checked').closest('.radio_box').addClass('chk_active');
        },
        bindEvents : function () {
            this.chk.on('click', $.proxy(this.checkFunc, this));
        },
        checkFunc : function () {
            var target = $(e.currentTarget);
            target.closest('.radio_box').toggleClass('chk_active', target.prop('checked'));
        }
    }
    selectBoxCustom.prototype = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.selectBox = $('.select_box');
            this.selectMenu = this.selectBox.find('.select_menu');
            this.selectList = this.selectBox.find('.select_list');
            this.selectListMenu = this.selectList.find('li');
        },
        initLayout : function () {
            this.selectBox.removeClass('opened');
            this.selectList.hide();
            this.objCheck = false;
        },
        bindEvents : function () {
            this.selectMenu.on('click', $.proxy(this.clickEventFunc, this));
            this.selectListMenu.on('click', '>a', $.proxy(this.selectFunc, this));
        },
        clickEventFunc : function (e) {
            e.preventDefault();
            // 닫힌 상태면 클래스명 추가 밑 셀렉트리스트 오픈 ture
            // 열린 상태에서 다시 클릭하거나 바깥 영역 클릭시 removeClass, 셀렉트리스트 닫음 fasle
            if (this.objCheck) {
                this.selectList.hide();
                this.bindOutsideEvents(false)
            } else {
                this.selectList.show();
                this.bindOutsideEvents(true)
            }
            this.selectBox.toggleClass('opened', !this.objCheck);
            this.objCheck = !this.objCheck;
            //console.log(this.objCheck)
        },
        bindOutsideEvents : function (type) {
            (type) ? this.obj.on('clickoutside', $.proxy(this.outsideFunc, this)) : this.obj.off('clickoutside');
        },
        outsideFunc : function () {
            this.selectMenu.triggerHandler('click');
        },
        selectFunc : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget),
                targetText = target.text();
            this.selectMenu.text(targetText);
            this.outsideFunc();
        }
    }

    $.fn.checkboxCustomPlugin = function () {
        for (var i = 0, max = this.length; i < max; i++) {
            new checkboxCustom(this.eq(i));
        }
    };
    $.fn.radioCustomPlugin = function () {
        for (var i = 0, max = this.length; i < max; i++) {
            new radioCustom(this.eq(i));
        }
    };
    $.fn.selectBoxCustomPlugin = function () {
        for (var i = 0, max = this.length; i < max; i++) {
            new selectBoxCustom(this.eq(i));
        }
    }

    $(function () {
        $('.check_box').checkboxCustomPlugin();
        $('.radio_box').radioCustomPlugin();
        $('.select_box').selectBoxCustomPlugin();
    })
})(window, window.jQuery);