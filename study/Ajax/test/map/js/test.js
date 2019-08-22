(function (win, $, doc) {
    'use strict';
    win.map = win.map || {};

    win.map.daum = function (container, args) {
        var defParams = {
            obj : container,
            saveBtn : '.btn_save',
            deleteBtn : '.btn_delete',
            closeBtn : '.btn_close',
            mapWrap : '.map_wrap',
            overlayWrap : '.overlay_wrap',
            historyWrap : '.js-history_wrap',
            optionWrap : '.js-option-data',
            map : '#map',
            centerMarkerData : {
                title : 'hivelab',
                lat : '37.4004877',
                lng : '127.1064614',
                level : 3
            },
            markerData : [],
            markerApiData : [],
            markerOverlay : []
        }
        this.opts = $.extend({}, defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    }
    win.map.daum.prototype = {
        init : function () {
            this.setElements();
            this.initMap();
            this.getJsonData();
            this.bindEvents();
        },
        setElements : function () {
            this.mapContainer = this.obj.find(this.opts.mapWrap);
            this.optionWrap = this.obj.find(this.opts.optionWrap);
            this.optionInp = this.optionWrap.find('input');
            this.historyWrap = this.obj.find(this.opts.historyWrap);
            this.saveBtn = this.obj.find(this.opts.saveBtn);
        },
        initMap : function () {
            var mapObj = this.mapContainer.find(this.opts.map)[0];
            var mapOption = {
                center : new win.kakao.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng), // 지도 중심좌표
                level : this.opts.centerMarkerData.level // 초기 지도 확대 레벨
            }
            this.map = new win.kakao.maps.Map(mapObj, mapOption); // map 생성  
            this.createMainMarker(); // main marker 생성
        },
        createMainMarker : function () {
            var markerPosition = new win.kakao.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng); // 중심 position 생성
            var marker = new win.kakao.maps.Marker({ // 중심 마커 생성
                position : markerPosition
            });
            marker.setMap(this.map); // 마커 지도 위에 표시
        },
        bindEvents : function () {
            win.kakao.maps.event.addListener(this.map, 'click', $.proxy(this.getClickMarkerInfo, this));
            this.saveBtn.on('click', $.proxy(this.onClickSaveFunc, this));
            // this.historyWrap.on('click', this.opts.deleteBtn, $.proxy(this.onClickDeleteHistory, this));
        },
        getClickMarkerInfo : function (mouseEvent) {
            if (this.overlayActive) return; // marker overlay 열린 상태면 실행하지 않음
            var latLng = mouseEvent.latLng;
            // 지도에서 받아온 latLng 값을 input value값으로 뿌려줌
            for (var i = 0, imax = this.optionInp.length; i < imax; i++) { 
                var target = this.optionInp.eq(i),
                    targetId = target.attr('id');
                if (targetId === 'data-lat') {
                    target.val(latLng.getLat());
                } else if (targetId === 'data-lng') {
                    target.val(latLng.getLng());
                }
            }
            console.log('클릭한 위치 위도 :', latLng.getLat());
            console.log('클릭한 위치 경도 :', latLng.getLng());
        },
        getJsonData : function () { // 초기 Json Data값 가져오기
            var data = $.ajax({
                url : './json/data.json',
                type : 'get',
                async : false, // 동기방식으로 적용 (전역변수에 값을 담기 위함)
                context: this,
                success : function (res) {
                    var _this = this;
                    $.map(res, function(value, key){ // 새로운 배열로 생성하기 위해 사용
                        var title = res[key].title,
                            lat = res[key].lat,
                            lng = res[key].lng,
                            desc = res[key].desc
                        var data = {
                            title : title,
                            lat : lat,
                            lng : lng,
                            desc : desc
                        }
                        _this.opts.markerData.push(data); // 생성된 markerdata 배열에 담음
                        _this.createDataHistory(data);
                    });
                }
            });
            this.createMarker();
        },
        onClickSaveFunc : function () {
            for (var i = 0, imax = this.marker.length; i < imax; i++) {
                this.marker[i].setMap(null)
            }
            this.createMarkerData();
        },
        createMarker : function () {
            var _this = this;
            var data = this.opts.markerData;
            this.marker = $(data).map(function (i) {
                var title = data[i].title,
                    position = new win.kakao.maps.LatLng(data[i].lat, data[i].lng),
                    imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                    imageSize = new win.kakao.maps.Size(24, 35),
                    markerImage = new win.kakao.maps.MarkerImage(imageSrc, imageSize);
                return new win.kakao.maps.Marker({
                    map : _this.map,
                    title : title,
                    position : position,
                    image : markerImage
                });
            });

            // $(data).map(function (i) {
            //     win.kakao.maps.event.addListener(_this.marker[i], 'click', function () {
            //         var overlayTitle = data[i].title,
            //             overlayDesc = data[i].desc,
            //             overlayPosition = new win.kakao.maps.LatLng(data[i].lat, data[i].lng);
            //         var overlayContent = 
            //             '<div class="overlay_wrap"><div class="overlay_inner">' +
            //                 '<div class="overlay_title_wrap">' +
            //                     '<strong class="overlay_title">' + overlayTitle + '</strong>' +
            //                 '</div>' +
            //                 '<div class="overlay_content_wrap">' +
            //                     '<div class="overlay_content">' +
            //                         '<p class="desc">' + overlayDesc + '</p>' +
            //                     '</div>' +
            //                 '</div>' +
            //                 '<button type="button" class="btn_close"><span class="blind">닫기</span></button>' +
            //             '</div></div>'
            //         var currentOverlay = new win.kakao.maps.CustomOverlay({
            //             content: overlayContent,
            //             map: _this.map,
            //             position : overlayPosition
            //         });
            //     });
            // });
        },
        createMarkerData : function () {
            for (var i = 0, imax = this.optionInp.length; i < imax; i++) {
                var target = this.optionInp.eq(i),
                    targetId = target.attr('id');
                if (targetId === 'data-title') {
                    var targetTitle = target.val();
                } else if (targetId === 'data-lat') {
                    var targetLat = target.val();
                } else if (targetId === 'data-lng') {
                    var targetLng = target.val();
                }
                if (!target.val()) {
                    alert('데이터 값을 입력해주세요');
                    return;
                }
            }
            var data = {
                title : targetTitle,
                lat : targetLat,
                lng : targetLng
            };
            this.opts.markerData.push(data);
            this.createMarker();
            this.createDataHistory(data);
            this.optionInp.val('');
        },
        onClickOverlay : function () {
            var _this = this;
            var data = this.opts.markerData;
            $(data).map(function (i) {
                win.kakao.maps.event.addListener(_this.marker[i], 'click', $.proxy(this.createOverlay, this));
            });
        },
        createOverlay : function (index) {
            console.log(index)
            // var overlayTitle = data.title,
            //     overlayDesc = data.desc,
            //     overlayPosition = new win.kakao.maps.LatLng(data.lat, data.lng);
            // var overlayContent = 
            //     '<div class="overlay_wrap"><div class="overlay_inner">' +
            //         '<div class="overlay_title_wrap">' +
            //             '<strong class="overlay_title">' + 'title' + '</strong>' +
            //         '</div>' +
            //         '<div class="overlay_content_wrap">' +
            //             '<div class="overlay_content">' +
            //                 '<p class="desc">' + 'desc' + '</p>' +
            //             '</div>' +
            //         '</div>' +
            //         '<button type="button" class="btn_close"><span class="blind">닫기</span></button>' +
            //     '</div></div>'
            // var currentOverlay = new win.kakao.maps.CustomOverlay({
            //     content: overlayContent,
            //     map: this.map,
            //     position : this.marker.getPosition()
            // });
            // this.opts.markerOverlay.push(currentOverlay);
            // $(this.opts.overlayWrap).hide(); // 노출된 overlay hide
        },
        createDataHistory : function (data) {
            var tag = '<li><div class="option">' +
                    '<span class="box title"><strong>타이틀 : </strong><span>' + data.title + '</span></span>' +
                    '<span class="box"><strong>위도 : </strong><span>' + data.lat + '</span></span>' +
                    '<span class="box"><strong>경도 : </strong><span>' + data.lng + '</span></span></div>' +
                    '<button class="btn_delete"><span>삭제</span></button>' +
                    '</li>'
            this.historyWrap.append(tag);
        }        
    }
    $(function () {
        var mapDaum = new win.map.daum('.map_section');
    });
})(window, window.jQuery, window.document);