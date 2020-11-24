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
                this.bindEvents();
                // this.playVideo();
            },
            setElements: function () {
                this.videoSection = $('.video_section');
                this.videoTag = this.videoSection.find('.video_area');
                this.btn = this.videoSection.find('.btn-muted');
            },
            bindEvents : function () {
                this.btn.on('click', $.proxy(this.clickFunc, this));
            },
            clickFunc : function () {
                // this.videoTag.find('video')[0].muted = false;
                // this.setVideoCode();
            },
            setVideoCode: function () {
                var _this = this,
                    introVideoHTML = "<video preload='auto' id='video01' autobuffer autoplay muted playsinline><source id='mp4' src='http://192.168.0.12:8280/hivelab_gitlab/gransaga/pc/dist/video/intro.mp4' type='video/mp4'></video>",
                    introImgHTML = "<div class='img'></div>"

                this.videoTag.html(introVideoHTML);
                // this.videoTag.find('video')[0].muted = false;
                // if (result.os.name === 'iOS') {
                //     // iOS
                //     if (result.browser.major >= 10) {
                //         // Video
                //         _this.videoTag.html(introVideoHTML);
                //     }
                // } else if (result.os.name === 'Android') {
                //     // Android
                //     if (result.browser.name === 'Chrome' && result.browser.major >= 54) {
                //         // Video
                //         _this.videoTag.html(introVideoHTML);
                //     }
                // } else {
                //     // PC
                //     _this.videoTag.html(introVideoHTML);
                // }


            },
            playVideo : function () {
                // console.log(this.videoTag.find('video')[0]);
                var _this = this;
                var video = _this.videoTag.find('video');
                var promise = _this.videoTag.find('video')[0].play();

                if (promise !== undefined) {
                    promise.then(function () {
                        console.log('aaa');
                    }).catch(function (error) {
                        // _this.videoTag.find('video')[0].play();
                        console.log('bbb', error);
                    });
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