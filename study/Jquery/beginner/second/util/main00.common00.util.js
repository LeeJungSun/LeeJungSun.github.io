// Shop Common Util
(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.newShop = win.smg.newShop || {};

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    if (win.smg.newShop.common && !$.isEmptyObject(win.smg.newShop.common)) return;
    console.log(win.smg.newShop)
    win.smg.newShop.common = (function () {
        return {
            customEvent : {
                PAGEIS : {
                    EVENT_MANAGER : $('<div data-evt-manager=\'page\'/>'),
                    PAGEOBJS : [],
                    REPOSITION : 'PAGE_REPOSITION'
                }
            },
            stickyDatas : [],
            breakpoints : {
                MOBILE : 768
            },
            util : {
                isDetecting : (function () {
                    // navigator == user agent의 상태나 정보를 나타냄
                    var isMac = (navigator.appVersion.indexOf("Mac") !== -1),
                        isEmulator = navigator.connection && (navigator.platform.indexOf('Win') !== -1),
                        isWinSafari = (function () {
                            // window os 버전에서 safari 브라우저 일 경우 찾는 구문
                            var appNetscape = (navigator.appName === "Netscape"),
                                appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
                                userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
                                userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
                            return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                        })();
                    if ((isMac && !isEmulator) || isWinSafari) { // Mac OS이고 에뮬레이터가 아닐 경우 또는 윈도우 사파리 브라우저 일 경우
                        $('body').addClass('ios-safari');
                    }
                })(),
                isSupportTransform : (function () {
                    return ('WebkitTransform' in doc.body.style || 'MozTransform' in doc.body.style || 'msTransform' in doc.body.style || 'OTransform' in doc.body.style || 'transform' in doc.body.style);
                })(),
                isSupportTransition : (function () {
                    return ('WebkitTransition' in doc.body.style || 'MozTransition' in doc.body.style || 'msTransition' in doc.body.style || 'OTransition' in doc.body.style || 'transition' in doc.body.style);
                })(),
                isSupportTransforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                    var div = document.createElement('div').style;
                    return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
                })(),
                isDevice : (function () {
                    return ('ontouchstart' in win || (win.DocumentTouch && doc instanceof win.DocumentTouch));
                })(),
                isIOS : (function () {
                    return (/iPad|iPhone|iPod/.test(navigator.userAgent)); // userAgent 문자열에 iPad,iPhone,iPod가 포함일 경우(IOS 기종일 경우) 반환
                })(),
                isAemEditMode : function () {
                    return win.smg.aem.util.isAemEditMode();
                },
                def : function (org, src) { // $.extend 메소드 사용시 깊은 복사가 되지 않는 이슈 해결을 위해 사용하는 메소드
                    for (var prop in src) {
                        if (!hasOwnProperty.call(src, prop)) continue;
                        if ('object' === $.type(org[prop])) {
                            org[prop] = ('array' === $.type(org[prop])) ? src[prop].slice(0) : this.def(org[prop], src[prop]);
                        } else {
                            org[prop] = src[prop];
                        }
                    }
                    return org;
                },
                // setTimeout과 비슷한 기능 (비동기방식으로 처리하기 위해 사용?)
                // ex) UTIL.wait(aniObj.delay).done(function () { ~~~ => 딜레이 처리가 완료되었을때 .done 메소드 활용하여 다음 이벤트 처리
                wait : function(timeout){
                    var deferred = $.Deferred();
                    setTimeout(deferred.resolve, timeout);
                    return deferred.promise();
                },
                winSize : (function () { // 브라우저 사이즈 체크
                    var isWinSafari = (function () {
                        var appNetscape = (navigator.appName === "Netscape"),
                            appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
                            userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
                            userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
                        return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                    })();
                    if (isWinSafari) { // 윈도우 사파리 브라우저 일 경우
                        return function () { // 스크롤바 영향 없이 브라우저 전체 너비 구함
                            var win_wh = {
                                w : $(win).width(),
                                h : $(win).height()
                            };
                            return win_wh;
                        }
                    } else { // 사파리를 제외한 나머지 브라우저의 경우
                        return function () {
                            var win_wh = { // 사이즈에 스크롤바가 사이즈 영향을 주므로 추가 계산 조건 필요
                                w : win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
                                h : win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight
                            };
                            return win_wh;
                        }
                    }
                })(),
                requestAFrame : (function () {
                    return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame ||
                        function (callback) {
                            return win.setTimeout(callback, 1000 / 60);
                        };
                })(),
                cancelAFrame : (function () {
                    return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.webkitCancelRequestAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame ||
                        function (id) {
                            win.clearTimeout(id);
                        };
                })(),
                isDevTool : function (e, _target) {
                    var _devLayout = _target.closest('#devLayout');
                    return (_devLayout.length) ? true : false; // devLayout가 있을 경우 true 반환 아닐 경우 false 반환
                },
                getRestrictBytes : function (str, maxBytes) {
                    var strLeng = str.length,
                        rByte = 0,
                        rLen = 0,
                        strChar = '';
                    maxBytes = maxBytes || 100;
                    for (var i = 0; i < strLeng; i++) {
                        strChar = str.charAt(i);
                        if (escape(strChar).length > 4) {
                            rByte += 2;
                        } else {
                            rByte++;
                        }
                        if (rByte <= maxBytes) {
                            rLen = i+1;
                        }
                    }
                    return {
                        bytes : rByte,
                        rectLeng : rLen
                    }
                },
                imgLoader : function (selector, callback) {
                    $(selector).each(function () {
                        var cb = (callback || function () {});
                        if (this.complete || $(this).height() > 0) {
                            cb.apply(this);
                        } else {
                            $(this).on('load', function () {
                                cb.apply(this);
                                $(this).off('load');
                            });
                        }
                    });
                },
                // 생성자함수를 담은 변수에 .on/.off로 이벤트를 걸어서 프로토타입 객체 내에서 .emit 메소드로 호출하면 호출한 구문에서 걸어둔 이벤트가 실행된다. (프로토타입 함수 외부에서 이벤트 핸들링 가능하게끔 사용?)
                emitter : { 
                    subscribers : {},
                    on : function (event, cb, context) {
                        this.subscribers = $.extend({}, this.subscribers);
                        this.subscribers[event] = this.subscribers[event] || [];
                        this.subscribers[event].push({
                            callback : cb,
                            context : context
                        });
                    },
                    off : function (event, cb, context) {
                        var idx, subs = this.subscribers[event], sub;
                        if (subs) {
                            idx = subs.length - 1;
                            while (idx >= 0) {
                                sub = subs[idx];
                                if ((sub.callback === cb) && (!context || sub.context === context)) {
                                    subs.splice(idx, 1);
                                    break;
                                }
                                idx--;
                            }
                        }
                    },
                    emit : function (event) {
                        var subs = this.subscribers[event], idx = 0, args = Array.prototype.slice.call(arguments, 1), sub;
                        if (subs) {
                            while (idx < subs.length) {
                                sub = subs[idx];
                                sub.callback.apply(sub.context || this, args);
                                idx++;
                            }
                        }
                    }
                }
            }
        }
    })();

    var CST_EVENT = win.smg.newShop.common.customEvent,
        STICKYDATAS = win.smg.newShop.common.stickyDatas,
        UTIL = win.smg.newShop.common.util;

    if (win.smg.newShop.page && !$.isEmptyObject(win.smg.newShop.page)) return;

    win.smg.newShop.page = (function () {
        var defParams = {
            scrollDuration : 300,
            scrollLock : true,
            scrollLockClass : 'hive-scroll-lock',
            scrollLockOpts : {
                scrollLocked : false,
                lockElements : 'html',
                appliedLock : {},
                prevStyles : {},
                prevScroll : {},
                lockStyles : {
                    'overflow-y' : 'scroll',
                    'position' : 'fixed',
                    'width' : '100%'
                }
            }
        };
        return {
            init : function () {
                this.bindEvents();
            },
            bindEvents : function () {
                CST_EVENT.PAGEIS.EVENT_MANAGER.on(CST_EVENT.PAGEIS.REPOSITION, $.proxy(this.pageReposition, this));
                $(doc).on('click', '.js-top-go', $.proxy(this.pageTopgo, this));
                $(win).on('load', $.proxy(this.loadFunc, this));
            },
            pageReposition : function () {
                for (var i = 0, max = CST_EVENT.PAGEIS.PAGEOBJS.length; i < max; i++) {
                    CST_EVENT.PAGEIS.PAGEOBJS[i].reInit();
                }
            },
            loadFunc : function () {
                this.pageReposition();
            },
            stickyArea : function (targetScroll) {
                var offsetTops = [],
                    keyMins = [],
                    keyMin, height;
                for (var key in STICKYDATAS) {
                    var sticky = STICKYDATAS[key],
                        stickyData = $(sticky.name);
                    if (stickyData.offset().top <= targetScroll) {
                        keyMins.push(stickyData.offset().top);
                        keyMin = Math.max.apply(null, keyMins);
                    }
                }
                if (!keyMins.length) {
                    height = 0;
                } else {
                    for (var key in STICKYDATAS) {
                        var sticky = STICKYDATAS[key],
                            stickyData = $(sticky.name);
                        if (stickyData.offset().top === keyMin) {
                            height = stickyData.outerHeight();
                        }
                    }
                }
                return height;
            },
            scrollMoveFunc : function (target, callback) {
                if (!target.length) return;
                var scrollTop = Math.ceil(target.offset().top),
                    winTop = $(win).scrollTop(),
                    stickyHeight = this.stickyArea(scrollTop),
                    totalMoveTop = scrollTop - stickyHeight + 1,
                    cb = (callback || function () {});
                if (totalMoveTop === winTop) {
                    cb.apply(this);
                } else {
                    $('html, body').stop().animate({
                        'scrollTop' : totalMoveTop
                    }, defParams.scrollDuration, function () {
                        cb.apply(this);
                    });
                }
            },
            pageTopgo : function (e) {
                e.preventDefault();
                if ($(win).scrollTop() <= 0) return;
                $('html, body').stop().animate({
                    scrollTop : 0
                });
            },
            scrollLock : { // 스크롤생기지 않도록 스크롤 잠궈두는 메소드
                init : function (type) {
                    if (!defParams.scrollLock) return;
                    var lockClass = defParams.scrollLockClass,
                        lockOpts = defParams.scrollLockOpts,
                        lockElements = $(lockOpts.lockElements);
                    lockElements.toggleClass(lockClass, type);
                    if (type) {
                        if (UTIL.isDevice && UTIL.isIOS) {
                            if (lockOpts.scrollLocked || (lockElements.data('lockScroll') != null)) return;
                            lockOpts.appliedLock = {};
                            this.saveStyles();
                            this.saveScrolls();
                            $.extend(lockOpts.appliedLock, lockOpts.lockStyles, {
                                'left' : - lockOpts.prevScroll.scrollLeft,
                                'top' : - lockOpts.prevScroll.scrollTop
                            });
                            lockElements.css(lockOpts.appliedLock);
                            lockElements.data('lockScroll', {
                                'left' : lockOpts.prevScroll.scrollLeft,
                                'top' : lockOpts.prevScroll.scrollTop
                            });
                            lockOpts.scrollLocked = true;
                        }
                    } else {
                        if (UTIL.isDevice && UTIL.isIOS) {
                            if (!lockOpts.scrollLocked || (lockElements.data('lockScroll') == null)) return;
                            this.saveStyles();
                            for (var key in lockOpts.appliedLock) {
                                delete lockOpts.prevStyles[key];
                            }
                            lockElements.attr('style', $('<x>').css(lockOpts.prevStyles).attr('style') || '');
                            lockElements.data('lockScroll', null);
                            $(win).scrollLeft(lockOpts.prevScroll.scrollLeft).scrollTop(lockOpts.prevScroll.scrollTop);
                            lockOpts.scrollLocked = false;
                        }
                    }
                },
                saveStyles : function () {
                    var styleStrs = [],
                        styleHash = {},
                        lockOpts = defParams.scrollLockOpts,
                        lockElements = $(lockOpts.lockElements),
                        styleAttr =  lockElements.attr('style');
                    if (!styleAttr) return;
                    styleStrs = styleAttr.split(';');
                    $.each(styleStrs, function styleProp (styleString) {
                        var styleString = styleStrs[styleString];
                        if (!styleString) return;
                        var keyValue = styleString.split(':');
                        if (keyValue.length < 2) return;
                        styleHash[$.trim(keyValue[0])] = $.trim(keyValue[1]);
                    });
                    $.extend(lockOpts.prevStyles, styleHash);
                },
                saveScrolls : function () {
                    var lockOpts = defParams.scrollLockOpts;
                    lockOpts.prevScroll = {
                        scrollLeft : $(win).scrollLeft(),
                        scrollTop : $(win).scrollTop()
                    };
                }
            }
        }
    })();

    $(function () {
        win.smg.newShop.page.init();
    });
})(window, window.jQuery, window.document);
(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.newShop = win.smg.newShop || {};
    win.smg.newShop['productDetailSimple'] = win.smg.newShop['productDetailSimple'] || {};
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        HCOMPONENT = win.smg.newShop['productDetailSimple'];
    HCOMPONENT.common = win.smg.newShop.common;
})(window, window.jQuery, window.document);
