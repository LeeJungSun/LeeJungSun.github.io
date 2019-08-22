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
            optionBox : '.js-input',
            map : '#map',
            centerMarkerData : {
                title : 'hivelab',
                lat : '37.4004877',
                lng : '127.1064614',
                level : 3
            },
            markers : [],
            markerData : [],
            markerOverlay : [],
            imageSrc : "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            imageSize : new win.kakao.maps.Size(24, 35)
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
            this.optionBox = this.optionWrap.find(this.opts.optionBox);
            this.optionInp = this.optionWrap.find('input');
            this.historyWrap = this.obj.find(this.opts.historyWrap);
            this.saveBtn = this.obj.find(this.opts.saveBtn);

            this.option = this.optionBox.children().filter(function () {
                return $(this).attr('id');
            })
        },
        initMap : function () { // 초기 맵 생성
            var mapObj = this.mapContainer.find(this.opts.map)[0];
            var mapOption = {
                center : new win.kakao.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng),
                level : this.opts.centerMarkerData.level
            }
            this.map = new win.kakao.maps.Map(mapObj, mapOption);
            this.createMainMarker();
        },
        createMainMarker : function () { // 메인 마커 생성
            var marker = new win.kakao.maps.Marker({
                position : new win.kakao.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng)
            });
            marker.setMap(this.map);
        },
        getJsonData : function () { // JSON 데이터 마커 생성
            var getJson = $.ajax({
                url : './json/data.json',
                type : 'get',
                async : false,
                context: this,
                success : function (res) {
                    var _this = this;
                    for (var i = 0, imax = res.length; i < imax; i++) {
                        var data = {
                            title : res[i].title,
                            lat : res[i].lat,
                            lng : res[i].lng,
                            desc : res[i].desc
                        }
                        this.opts.markerData.push(data); // 마커 컨텐츠 데이터 생성
                        this.createMarker(data); // 마커 생성
                        this.createDataHistory(data); // 마커 히스토리 생성
                    }
                }
            });
            this.markerBindEvent(true); // 마커 클릭 이벤트 활성화
        },
        getClickMarkerInfo : function (mouseEvent) { // 마우스 클릭시 해당 위치 위도/경도 값 입력창으로 받아옴
            var latLng = mouseEvent.latLng;
            for (var i = 0, imax = this.option.length; i < imax; i++) { 
                var target = this.optionBox.find(this.option[i]),
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
        createMarker : function (data) {
            var marker = new win.kakao.maps.Marker({
                map : this.map,
                title : data.title,
                position : new win.kakao.maps.LatLng(data.lat, data.lng),
                image : new win.kakao.maps.MarkerImage(this.opts.imageSrc, this.opts.imageSize)
            });
            this.opts.markers.push(marker);
            this.createOverlay(data);
        },
        createMarkerData : function () {
            for (var i = 0, imax = this.option.length; i < imax; i++) {
                var target = this.optionBox.find(this.option[i]);
                if (!target.val().length) {
                    alert('데이터 값을 입력해주세요');
                    return;
                }
                if (target === 'data-title') {
                    var targetTitle = target.val();
                } else if (target === 'data-lat') {
                    var targetLat = target.val();
                } else if (target === 'data-lng') {
                    var targetLng = target.val();
                } else if (target === 'data-desc') {
                    var targetDesc = target.val();
                }
            }
            var data = {
                title : targetTitle,
                lat : targetLat,
                lng : targetLng
            };
            this.opts.markerData.push(data);
            this.createDataHistory(data);
            this.createMarker(data);
            this.markerBindEvent(true);
            this.optionInp.val('');
        },
        deleteMarker : function (index) {
            this.opts.markers[index].setMap(null); // 선택된 index map에서 marker 지움
            this.opts.markers.splice(index, 1); // 지운 marker map api data array 지움
        },
        createDataHistory : function (data) {
            var tag = '<li><div class="option">' +
                    '<span class="box title"><strong>타이틀 : </strong><span>' + data.title + '</span></span>' +
                    '<span class="box"><strong>위도 : </strong><span>' + data.lat + '</span></span>' +
                    '<span class="box"><strong>경도 : </strong><span>' + data.lng + '</span></span></div>' +
                    '<button class="btn_delete"><span>삭제</span></button>' +
                    '</li>'
            this.historyWrap.append(tag);
        },
        createOverlay : function (data) {
            var overlayTitle = data.title,
                overlayDesc = data.desc,
                overlayPosition = new win.kakao.maps.LatLng(data.lat, data.lng);
            var overlayContent = 
                '<div class="overlay_wrap"><div class="overlay_inner">' +
                    '<div class="overlay_title_wrap">' +
                        '<strong class="overlay_title">' + overlayTitle + '</strong>' +
                    '</div>' +
                    '<div class="overlay_content_wrap">' +
                        '<div class="overlay_content">' +
                            '<p class="desc">' + overlayDesc + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<button type="button" class="btn_close"><span class="blind">닫기</span></button>' +
                '</div></div>'
            var currentOverlay = new win.kakao.maps.CustomOverlay({
                content: overlayContent,
                map: this.map,
                position : overlayPosition
            });
            this.opts.markerOverlay.push(currentOverlay);
        },
        bindEvents : function () {
            win.kakao.maps.event.addListener(this.map, 'click', $.proxy(this.getClickMarkerInfo, this));
            this.saveBtn.on('click', $.proxy(this.onClickSaveFunc, this));
            this.historyWrap.on('click', this.opts.deleteBtn, $.proxy(this.onClickDeleteHistory, this));
        },
        markerBindEvent : function (type) {
            var marker = this.opts.markers;
            console.log(type)
            console.log(marker);
            if (type) {
                for (var i = 0, imax = marker.length; i < imax ; i++) {
                    win.kakao.maps.event.addListener(marker[i], 'click', $.proxy(this.onMarkerClick, this, i));
                }
            } else {
                console.log('remove');
                for (var i = 0, imax = marker.length; i < imax ; i++) {
                    marker[i].m = {}; // 마커 바인드 이벤트 객체 강제로 지움
                    // win.kakao.maps.event.removeListener(marker[i], 'click', this.onMarkerClick);
                }
            }
        },
        onMarkerClick : function (index) {
            console.log(index);
        },
        onClickSaveFunc : function () {
            this.markerBindEvent(false); // 기존 마커 바인드 이벤트 제거 후 마커 생성하면서 createMarkerData 실행하면서 다시 이벤트 재 할당
            this.createMarkerData();
        },
        onClickDeleteHistory : function (e) {
            var target = $(e.currentTarget).parent(),
                targetIndex = target.index();
            this.markerBindEvent(false);

            this.deleteMarker(targetIndex); // 지도 마커 제거
            // this.deleteOverlay(targetIndex); // 지도 overlay 제거
            target.remove(); // 히스토리 li 제거
            this.opts.markerData.splice(targetIndex, 1); // 마커 info 데이터 배열 제거
            console.log(this.opts.markerData);
            console.log(this.opts.markers);
            // console.log(this.opts.markerOverlay);
        }
    }
    $(function () {
        var mapDaum = new win.map.daum('.map_section');
    });
})(window, window.jQuery, window.document);