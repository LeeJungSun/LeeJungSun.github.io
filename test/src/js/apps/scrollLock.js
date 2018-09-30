(function ($, win, doc) {
    'use strict';

    win.ProjectName = win.ProjectName || {};

    // Mobile GNB Layer - scrollLock
    win.ProjectName.page = (function () {
        return {
            init: function () {
                this.setOpts();
                this.setElements();
            },
            setOpts: function () {
                this.scrollLocked = false;
                this.prevStyles = {};
                this.lockStyles = {
                    'overflow-y': 'scroll',
                    'position': 'fixed',
                    'width': '100%'
                };
            },
            setElements: function () {
                this.html = $('html');
            },
            scrollLock: function (type) {
                var _this = this;

                function saveStyles() {
                    var styleAttr = _this.html.attr('style'),
                        styleStrs = [],
                        styleHash = {};
                    if (!styleAttr) return;
                    styleStrs = styleAttr.split(';');
                    $.each(styleStrs, function styleProp(styleString) {
                        var styleString = styleStrs[styleString];
                        if (!styleString) return;
                        var keyValue = styleString.split(':');
                        if (keyValue.length < 2) return;
                        styleHash[$.trim(keyValue[0])] = $.trim(keyValue[1]);
                    });
                    $.extend(_this.prevStyles, styleHash);
                }

                function saveScrolls() {
                    _this.prevScroll = {
                        scrollLeft: $(win).scrollLeft(),
                        scrollTop: $(win).scrollTop()
                    };
                }
                if (type) {
                    if (this.scrollLocked) return;
                    this.appliedLock = {};
                    saveStyles();
                    saveScrolls();
                    $.extend(this.appliedLock, this.lockStyles, {
                        'left': -this.prevScroll.scrollLeft,
                        'top': -this.prevScroll.scrollTop
                    });
                    this.html.css(this.appliedLock);
                    this.scrollLocked = true;
                } else {
                    if (!this.scrollLocked) return;
                    saveStyles();
                    for (var key in this.appliedLock) {
                        delete this.prevStyles[key];
                    }
                    this.html.attr('style', $('<x>').css(this.prevStyles).attr('style') || '');
                    $(win).scrollLeft(this.prevScroll.scrollLeft).scrollTop(this.prevScroll.scrollTop);
                    this.scrollLocked = false;
                }
            }
        };
    })();

    var PAGE = win.ProjectName.page;

    win.ProjectName.commonMenu = function (args) {
        var defParams = {
            btnMenu : '.btn_menu',
            layerMenu : '.layer_menu'
        };
        this.opts = $.extend({}, defParams, (args || {}));
        if (!(this.btnMenu = $(this.opts.btnMenu)).length) return;
        this.init();
    };
    win.ProjectName.commonMenu.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
        },
        setElements : function () {
            this.btnMenu = $(this.opts.btnMenu);
            this.layerMenu = $(this.opts.layerMenu);
        },
        bindEvents : function () {
            this.btnMenu.on('click', $.proxy(this.btnFunc, this));
        },
        btnFunc : function () {
            if (this.btnMenu.hasClass('on')) {
                this.btnMenu.removeClass('on');
                PAGE.scrollLock(false);
                this.layerMenu.hide();
            } else {
                this.btnMenu.addClass('on');                
                PAGE.scrollLock(true);
                this.layerMenu.show();
            }
        }
    }

    $(window).on('load', function () {
        win.ProjectName.page.init();
        win.ProjectName = new win.ProjectName.commonMenu();
    })

})(jQuery, window, document);