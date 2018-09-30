(function ($, win, doc) {
    'use strict';

    win.ProjectName = win.ProjectName || {};

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
            this.tab = this.tabWrap.find('a');
            this.tabContentBox = this.obj.find('.tab_content');
            this.tabContent = this.tabContentBox.find('.content');
            console.log('aaa')
        },
        initLayout: function () {
            this.tabContentBox.find('.content:first-child').addClass('active');
            this.tabWrap.find('a:first-child').addClass('active');
        },
        bindEvents: function () {
            this.tab.on('click', $.proxy(this.tabClickFunc, this));
        },
        tabClickFunc: function (e) {
            e.preventDefault();
            var tabTarget = $(e.currentTarget);


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