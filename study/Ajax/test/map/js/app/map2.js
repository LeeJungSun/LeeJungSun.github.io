(function (win, $, doc) {
    'use strict';

    win.uio = win.uio || {};
    win.uio.components = win.uio.components || {};
    win.uio.components.common = win.uio.components.common || {};
    win.uio.components['commonGoogleMap'] = win.uio.components['commonGoogleMap'] || {};

    var COMPONENTS = win.uio.components['commonGoogleMap'],
        UTIL = win.uio.components.common.util,
        dataURL = './json/data.json',
        pluginName = 'googleMap';

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
                level : 16 // daum보다 zoom level 단위가 큼
            },
            markerImage : {
                url : "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size : new google.maps.Size(24, 35)
            },
            markers : [],
            markerOverlay : [],
            markerContentInfo : [],
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
            });
        },
        initMap : function () {
            var mapObj = this.mapContainer.find(this.opts.map)[0];
            var mapOption = {
                center : new google.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng),
                zoom : this.opts.centerMarkerData.level
            };
            this.map = new google.maps.Map(mapObj, mapOption);
            this.createMainMarker();
        },
        createMainMarker : function () {
            var marker = new google.maps.Marker({
                position : new google.maps.LatLng(this.opts.centerMarkerData.lat, this.opts.centerMarkerData.lng)
            });
            marker.setMap(this.map);
        },
        getJsonData : function () {
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
                        this.opts.markerContentInfo.push(data);
                        this.createMarker(data);
                    }
                }
            });
            console.log('마커 :',this.opts.markers);
            console.log('마커 오버레이 :',this.opts.markerOverlay);
            console.log('마커 컨텐츠 :',this.opts.markerContentInfo);
        },
        getClickMarkerInfo : function (mouseEvent) {
            var latLng = mouseEvent.latLng;
            for (var i = 0, imax = this.option.length; i < imax; i++) { 
                var target = this.option.eq(i),
                    targetId = target.attr('id');
                if (targetId === 'data-lat') {
                    target.val(latLng.lat());
                } else if (targetId === 'data-lng') {
                    target.val(latLng.getLng());
                }
            }
            console.log('클릭한 위치 위도 :', latLng.lat());
            console.log('클릭한 위치 경도 :', latLng.lng());
        },
        createMarker : function (data) {
            var marker = new google.maps.Marker({
                map : this.map,
                title : data.title,
                position : new google.maps.LatLng(data.lat, data.lng),
                icon : this.opts.markerImage // new kakao.maps.MarkerImage 처럼 별도 제공하는 생성 객체는 없음
            });
            this.opts.markers.push(marker);
        },
        changeEvents : function (event) {
            var events = [],
            eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
            }
            return events.join(' ');
        },
        bindEvents : function () {
            google.maps.event.addListener(this.map, 'click', $.proxy(this.getClickMarkerInfo, this));
        }
    }

    $(function () {
        var googleMap = new COMPONENTS[pluginName]('.map_section');
    });

})(window, window.jQuery, window.document)