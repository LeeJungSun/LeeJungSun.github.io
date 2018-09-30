(function ($, win, doc) {
    'use strict';

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

    $(window).on('load', function () {
        win.ProjectName.videoAutoPlay.init();

        setTimeout(function () {
            win.scrollTo(0, 0);
        }, 100);
    })

})(jQuery, window, document);