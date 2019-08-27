(function (win, $, doc) {
    'use strict';
    win.uio = win.uio || {};
    win.uio.components = win.uio.components || {};
    win.uio.components.common = win.uio.components.common || {};
    win.uio.components['commonDaumMap'] = win.uio.components['commonDaumMap'] || {};

    var COMPONENTS = win.uio.components['commonDaumMap'],
        UTIL = win.uio.components.common.util,
        dataURL = './json/data.json',
        pluginName = 'daumMap';

    COMPONENTS[pluginName] = function (container, args) {
        var defParams = {
            obj : container,
            jsonURL : dataURL,
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
            markerOverlay : [],
            markerContentInfo : [],
            imageSrc : "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            imageSize : new win.kakao.maps.Size(24, 35),
            customEvent : '.' + pluginName + (new Date()).getTime()
        }
        this.opts = UTIL.def({}, defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    }
    COMPONENTS[pluginName].prototype = {
        init : function () {
            this.setElements();
            this.initMap();
            this.bindEvents();
            this.getJsonData();
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
            });
        },
        changeEvents : function (event) {
            var events = [],
            eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
            }
            return events.join(' ');
        },
        initMap : function () { // 초기 맵 생성
            var mapObj = this.mapContainer.find(this.opts.map)[0];
            var mapOption = {
                center : new win.kakao.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng),
                level : this.opts.centerMarkerData.level
            };
            this.map = new win.kakao.maps.Map(mapObj, mapOption);
            this.createMainMarker();
        },
        createMainMarker : function () { // 메인 마커 생성
            var marker = new win.kakao.maps.Marker({
                position : new win.kakao.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng)
            });
            marker.setMap(this.map);
        },
        getJsonData : function () { // JSON 데이터 받아와서 초기 마커 생성
            var getJson = $.ajax({
                url : this.opts.jsonURL,
                type : 'get',
                async : false,
                context : this,
                success : function (res) {
                    for (var i = 0, imax = res.length; i < imax; i++) {
                        var data = {
                            title : res[i].title,
                            lat : res[i].lat,
                            lng : res[i].lng,
                            desc : res[i].desc
                        }
                        this.opts.markerContentInfo.push(data); // 마커 컨텐츠 데이터 배열에 담아둠
                        this.createMarker(data); // 마커 생성
                        this.createOverlay(data); // 마커 오버레이 생성
                        this.createDataHistory(data); // 마커 히스토리 생성
                    }
                }
            });
            this.markerBindEvent(true); // 마커 클릭 이벤트 활성화
            console.log('마커 :',this.opts.markers);
            console.log('마커 오버레이 :',this.opts.markerOverlay);
            console.log('마커 컨텐츠 :',this.opts.markerContentInfo);
        },
        getClickMarkerInfo : function (mouseEvent) { // 마우스 클릭시 해당 위치 위도,경도 값 입력창으로 받아옴
            if (this.overlayActive) return; // marker overlay 열린 상태면 실행하지 않음
            var latLng = mouseEvent.latLng;
            for (var i = 0, imax = this.option.length; i < imax; i++) { 
                var target = this.option.eq(i),
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
            this.opts.markers.push(marker); // 생성된 마커 데이터 배열에 담아둠
        },
        deleteMarker : function (index) { // 삭제된 히스토리 인덱스 값 인자값으로 받아옴
            this.opts.markers[index].setMap(null); // 선택된 index map에서 marker 지움
            this.opts.markers.splice(index, 1); // marker map api data array 지움
        },
        createMarkerContentInfo : function () {
            for (var i = 0, imax = this.option.length; i < imax; i++) {
                var target = this.option.eq(i),
                    targetId = target.attr('id');
                if (targetId === 'data-title') {
                    var targetTitle = target.val();
                } else if (targetId === 'data-lat') {
                    var targetLat = target.val();
                } else if (targetId === 'data-lng') {
                    var targetLng = target.val();
                } else if (targetId === 'data-desc') {
                    var targetDesc = target.val();
                }
                if (!target.val().length) {
                    alert('데이터 값을 입력해주세요');
                    return;
                }
            }
            var data = {
                title : targetTitle,
                lat : targetLat,
                lng : targetLng,
                desc : targetDesc
            };
            this.opts.markerContentInfo.push(data); // 마커 컨텐츠 데이터 배열에 담아둠
            this.createMarker(data);
            this.createOverlay(data);
            this.createDataHistory(data);
            this.markerBindEvent(true); // 마커 클릭 이벤트 활성화
        },
        createDataHistory : function (data) { // 하단 마커 히스토리 생성 메소드 (마커 생성될 때마다 업데이트 됨)
            var tag = '<li><div class="option">' +
                    '<span class="box title"><strong>타이틀 : </strong><span>' + data.title + '</span></span>' +
                    '<span class="box"><strong>위도 : </strong><span>' + data.lat + '</span></span>' +
                    '<span class="box"><strong>경도 : </strong><span>' + data.lng + '</span></span></div>' +
                    '<button class="btn_delete"><span>삭제</span></button>' +
                    '</li>';
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
                '</div></div>';
            var currentOverlay = new win.kakao.maps.CustomOverlay({
                content: overlayContent,
                map: this.map,
                position : overlayPosition
            });
            currentOverlay.setVisible(false);
            this.opts.markerOverlay.push(currentOverlay);
        },
        deleteOverlay : function (index) {
            this.opts.markerOverlay[index].setMap(null); // 선택된 index map에서 overlay 지움
            this.opts.markerOverlay.splice(index, 1); // overlay array 지움
        },
        bindEvents : function () {
            win.kakao.maps.event.addListener(this.map, 'click', $.proxy(this.getClickMarkerInfo, this));
            this.saveBtn.on(this.changeEvents('click'), $.proxy(this.onClickCreateMarker, this));
            this.historyWrap.on(this.changeEvents('click'), this.opts.deleteBtn, $.proxy(this.onClickDeleteMarker, this));
            this.obj.on(this.changeEvents('click'), this.opts.closeBtn, $.proxy(this.onClickCloseOverlay, this));
        },
        markerBindEvent : function (type) {
            var marker = this.opts.markers;
            console.log('마커 클릭 이벤트 활성화 :', type);
            console.log('활성화된 마커 :', marker);
            if (type) {
                for (var i = 0, imax = marker.length; i < imax ; i++) {
                    win.kakao.maps.event.addListener(marker[i], 'click', $.proxy(this.onClickMarker, this, i));
                }
            } else {
                console.log('remove');
                for (var i = 0, imax = marker.length; i < imax ; i++) {
                    marker[i].m = {}; // 마커 바인드 이벤트 객체 강제로 지움
                    // win.kakao.maps.event.removeListener(marker[i], 'click', this.onClickMarker);
                }
            }
        },
        onClickMarker : function (index) {
            this.currentMarker = index;
            this.map.panTo(this.opts.markerOverlay[this.currentMarker].getPosition()); // 클릭한 마커로 부드럽게 이동
            for (var i = 0, imax = this.opts.markerOverlay.length; i < imax; i++) { // 오버레이 전체 hidden
                this.opts.markerOverlay[i].setVisible(false);
            }
            console.log('oldIndex :',this.oldMarker);
            if (this.oldMarker === this.currentMarker) {
                this.onClickCloseOverlay();
            } else {
                console.log('currentIndex :',this.currentMarker);
                this.overlayActive = true; // 오버레이 열린 상태에서 getClickMarkerInfo 메소드 실행하지 않게 하기 위해 사용
                this.map.setZoomable(false); // 맵 터치, 드래그 확대 축소 기능 막음
                this.opts.markerOverlay[this.currentMarker].setVisible(true); // 선택된 마커 오버레이 활성화
                this.oldMarker = this.currentMarker;
            }
        },
        onClickCloseOverlay : function () {
            console.log('overlayClose');
            this.overlayActive = false;
            this.map.setZoomable(true); // 맵 터치, 드래그 확대 축소 기능 풀어줌
            this.opts.markerOverlay[this.currentMarker].setVisible(false); // 선택된 마커 오버레이 비활성화
            this.oldMarker = null; // oldmarker index 초기화
        },
        onClickCreateMarker : function () {
            this.markerBindEvent(false); // 기존 마커 바인드 이벤트 제거 후 마커 생성하면서 createMarkerContentInfo 실행하면서 다시 이벤트 재 할당
            this.createMarkerContentInfo();
        },
        onClickDeleteMarker : function (e) {
            var target = $(e.currentTarget).parent(),
                targetIndex = target.index();
            target.remove(); // 히스토리 li 제거
            this.markerBindEvent(false); // 기존 마커 바인드 이벤트 제거
            this.deleteMarker(targetIndex); // 지도 마커 제거
            this.deleteOverlay(targetIndex); // 지도 overlay 제거
            this.markerBindEvent(true); // 마커, 오버레이 제거되면 다시 이벤트 재 할당
            this.opts.markerContentInfo.splice(targetIndex, 1); // 지워진 마커 info 데이터 배열에서 제거

            console.log('마커 :',this.opts.markers);
            console.log('마커 오버레이 :',this.opts.markerOverlay);
            console.log('마커 컨텐츠 :',this.opts.markerContentInfo);
        }
    }
    $(function () {
        var mapDaum = new COMPONENTS[pluginName]('.map_section');
    });
})(window, window.jQuery, window.document);