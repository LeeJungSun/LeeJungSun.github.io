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
            this.bindEvent();
        },
        setElements : function () {
            this.mapContainer = this.obj.find(this.opts.mapWrap);
            this.optionWrap = this.obj.find(this.opts.optionWrap);
            this.optionInp = this.optionWrap.find('input');
            this.historyWrap = this.obj.find(this.opts.historyWrap);
            this.saveBtn = this.obj.find(this.opts.saveBtn);
            // this.postBtn = this.obj.find('.btn_post');
        },
        bindEvent : function () {
            win.kakao.maps.event.addListener(this.map, 'click', $.proxy(this.getClickMarkerInfo, this));
            this.saveBtn.on('click', $.proxy(this.onClickSaveFunc, this));
            this.obj.on('click', this.opts.deleteBtn, $.proxy(this.onClickDeleteHistory, this));

            for (var i = 0, imax = this.opts.markerApiData.length; i < imax; i++) {
                win.kakao.maps.event.addListener(this.opts.markerApiData[i], 'click', $.proxy(this.createOverlay, this, i));
            }
            this.obj.on('click', this.opts.closeBtn, $.proxy(this.onClickCloseOverlay, this));
        },
        onClickSaveFunc : function () {
            this.createMarkerData();
            console.log(this.opts.markerData);
            console.log(this.opts.markerApiData)
        },
        onClickDeleteHistory : function (e) {
            var target = $(e.currentTarget).parent(),
                targetIndex = target.index();
            this.deleteMarker(targetIndex);
            target.remove();
            this.opts.markerData.splice(targetIndex, 1);
            console.log(this.opts.markerData);
            console.log(this.opts.markerApiData)
        },
        getJsonData : function () {
            var data = $.ajax({
                url : './json/data.json',
                type : 'get',
                async : false, // 동기방식으로 적용 (전역변수에 값을 담기 위함)
                context: this,
                success : function (res) {
                    var _this = this;
                    $.map(res, function(value, key){
                        var title = res[key].title,
                            lat = res[key].lat,
                            lng = res[key].lng,
                            desc = res[key].desc
                        var getData = {
                            title : title,
                            lat : lat,
                            lng : lng,
                            desc : desc
                        }
                        _this.opts.markerData.push(getData);
                        _this.createDataHistory(getData);
                        _this.createAddMarker(getData);
                    });
                }
            });
            // console.log(this.opts.markerData)
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
                } else if (targetId === 'data-desc') {
                    var targetDesc = target.val();
                }
                if (!target.val()) {
                    alert('데이터 값을 입력해주세요');
                    return;
                }
            }
            var getData = {
                title : targetTitle,
                lat : targetLat,
                lng : targetLng,
                desc : targetDesc
            };
            this.opts.markerData.push(getData);
            this.createDataHistory(getData);
            this.createAddMarker(getData);
            this.optionInp.val('');
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
        initMap : function () {
            var mapObj = this.mapContainer.find(this.opts.map)[0];
            var mapOption = {
                center : new win.kakao.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng),
                level : this.opts.centerMarkerData.level
            }
            this.map = new win.kakao.maps.Map(mapObj, mapOption); // map 생성  
            this.createMainMarker();
        },
        createMainMarker : function () {
            var markerPosition = new win.kakao.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng);
            var marker = new win.kakao.maps.Marker({
                position : markerPosition
            });
            marker.setMap(this.map); // 마커 지도 위에 표시
        },
        getClickMarkerInfo : function (mouseEvent) {
            if (this.overlayActive) return;
            var latLng = mouseEvent.latLng;
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
        createAddMarker : function (data) {
            var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                imageSize = new win.kakao.maps.Size(24, 35),
                markerImage = new win.kakao.maps.MarkerImage(imageSrc, imageSize); 
            var marker = new win.kakao.maps.Marker({
                map : this.map,
                title : data.title,
                position : new win.kakao.maps.LatLng(data.lat, data.lng),
                image : markerImage
            });
            this.opts.markerApiData.push(marker);
        },
        deleteMarker : function (index) {
            this.opts.markerApiData[index].setMap(null);
            this.opts.markerApiData.splice(index, 1);
        },
        createOverlay : function (index) {
            console.log(index)
            console.log(this.opts.markerData[index])
            console.log(this.opts.markerApiData)
            if (this.oldOverlay) {
                this.oldOverlay.setMap(null);
            }
            this.overlayActive = true;
            var title = this.opts.markerData[index].title,
                desc = this.opts.markerData[index].desc,
                position = new win.kakao.maps.LatLng(this.opts.markerData[index].lat, this.opts.markerData[index].lng);
            var content = 
            '<div class="overlay_wrap"><div class="overlay_inner">' +
                '<div class="overlay_title_wrap">' +
                    '<strong class="overlay_title">' + title + '</strong>' +
                '</div>' +
                '<div class="overlay_content_wrap">' +
                    '<div class="overlay_content">' +
                        '<p class="desc">' + desc + '</p>' +
                    '</div>' +
                '</div>' +
                '<button type="button" class="btn_close"><span class="blind">닫기</span></button>' +
            '</div></div>'
            
            this.currentOverlay = new win.kakao.maps.CustomOverlay({
                content: content,
                map: this.map,
                position : position
            });
            console.log(this.currentOverlay)
            this.oldOverlay = this.currentOverlay;
            // this.map.panTo(position);
        },
        onClickCloseOverlay : function () {
            this.currentOverlay.setMap(null);
        }
    }
    $(function () {
        var mapDaum = new win.map.daum('.map_section');
    });
})(window, window.jQuery, window.document);