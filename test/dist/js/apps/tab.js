(function ($, win, doc) {
    'use strict';

    // tab
    var tabCustom = function (obj) {
        this.obj = obj;
        this.init();
    }
    tabCustom.prototype = {
        init: function () {
            this.setElements();
            this.initLayout();
            this.bindEvents();
        },
        setElements: function () {
            this.oldIndex = 0;
            this.tabWrap = this.obj.find('.tab');
            this.tabList = this.tabWrap.find('li');
            this.tab = this.tabWrap.find('a');
            this.tabContentBox = this.obj.find('.tab_content');
            this.tabContent = this.tabContentBox.find('.article');
        },
        initLayout: function () {
            this.tabContentBox.find('.content:first-child').addClass('active');
            this.tabWrap.find('li:first-child').addClass('active');
        },
        bindEvents: function () {
            this.tab.on('click', $.proxy(this.tabClickFunc, this));
        },
        tabClickFunc: function (e) {
            e.preventDefault();
            var tabTarget = $(e.currentTarget);
            this.currentIndex = tabTarget.closest('li').index();

            if (this.oldIndex === this.currentIndex) return;
            this.tabList.eq(this.currentIndex).addClass('active');
            this.tabContent.eq(this.currentIndex).addClass('active');
            this.tabList.eq(this.oldIndex).removeClass('active');
            this.tabContent.eq(this.oldIndex).removeClass('active');
            this.oldIndex = this.currentIndex
        }
    };
    $.fn.tabPlugin = function () {
        for (var i = 0, max = this.length; i < max; i++) {
            new tabCustom(this.eq(i));
        }
    };

    $(window).on('load', function () {
        $('.tab_wrap').tabPlugin();
    })

})(jQuery, window, document);