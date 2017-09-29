(function ($, win, doc) {
    'use strict';

    win.examProject = win.examProject || {};
    var parser = new UAParser();
    var result = parser.getResult();

    win.ProjectName = win.ProjectName || {};

    // Auto Video Play
    win.ProjectName.videoAutoPlay = (function () {
        return {
            init: function () {
                this.setElements();
                this.setVideoCode();
            },
            setElements: function () {
                this.videoSection = $('.video_section');
                this.videoTag = this.videoSection.find('.video_area');
            },
            setVideoCode: function () {
                var _this = this,
                    introVideoHTML = "<video preload='auto' id='video01' autobuffer autoplay muted playsinline loop><source id='mp4' src='../video/video.mp4' type='video/mp4'></video>",
                    introImgHTML = "<div class='img'></div>"

                if (result.os.name === 'iOS') {
                    // iOS
                    if (result.browser.major >= 10) {
                        // Video
                        _this.videoTag.html(introVideoHTML);
                    }
                } else if (result.os.name === 'Android') {
                    // Android
                    if (result.browser.name === 'Chrome' && result.browser.major >= 54) {
                        // Video
                        _this.videoTag.html(introVideoHTML);
                    }
                } else {
                    // PC
                    _this.videoTag.html(introVideoHTML);
                }
            }
        };
    })();

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
        win.ProjectName.page.init();
        win.ProjectName.videoAutoPlay.init();

        $('.tab_wrap').tabPlugin();

        setTimeout(function () {
            win.scrollTo(0, 0);
        }, 100);
    })

})(jQuery, window, document);