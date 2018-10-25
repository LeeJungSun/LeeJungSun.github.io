var memXpos = 0;
var memYpos = 0;

// 중개사 데이터 처리
$.get('js/data/estateInfo_member.json', function(data) {
	$.map(data, function(value, key){
		memXpos = data[0].member_xpos;
		memYpos = data[0].member_ypos;

		$('.memXpos').val(memXpos);
		$('.memYpos').val(memYpos);
	});
	
}).done(function(){
	var memXpos = Number($('.memXpos').val());
	var memYpos = Number($('.memYpos').val());
	
	var map = new daum.maps.Map(document.getElementById('map'), {
		center: new daum.maps.LatLng(memYpos, memXpos), // 중개사 좌표로 지도 중심 설정
		level : 3
	});

	// 마커를 생성하고 지도위에 표시하는 함수입니다
	var markers = [];
	var imageSrc = 'img/marker/marker01_on.png',
		imageSrc2 = 'img/marker/marker03.png',
    	imageSize = new daum.maps.Size(38, 52),
    	imageSize2 = new daum.maps.Size(24, 32),
    	imageOption = {offset: new daum.maps.Point(27, 53)},
		imageOption2 = {offset: new daum.maps.Point(20, 75)},
		markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
		markerImage2 = new daum.maps.MarkerImage(imageSrc2, imageSize2, imageOption2)

	function addMarker(position) {
		// 마커를 생성합니다
		var marker = new daum.maps.Marker({
			position: position,
			zIndex: 1,
			image: markerImage2
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);

		// 생성된 마커를 배열에 추가합니다
		markers.push(marker);
	}
	
	
	// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
	function setMarkers(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	// 중개사 마커 생성
	var marker = new daum.maps.Marker({
		position: new daum.maps.LatLng(memYpos, memXpos),
		zIndex: 3,
		image: markerImage,
		clickable: true
	});

	marker.setMap(map);
	
	// 중개사 오버레이 생성
	var ovContent = '<dl class="ly_marker_info">' +
				'   <dt class="blind">중개소명</dt>' +
				'   <dd class="marker_tit">골든키 공인중개소</dd>' +
				'   <dt class="blind">주소</dt>' +
				'   <dd class="marker_info address">경기도 용인시 기흥구 동백중앙로 175 우함빌딩</dd>' +
				'   <dt class="blind">전화번호</dt>' +
				'   <dd class="marker_info tel">031-639-9000</dd>' +
				'</dl>',
		ovCondition = false;

	var overlay = new daum.maps.CustomOverlay({
	    content: ovContent,
	    map: map,
	    position: marker.getPosition(),
	    zIndex: 2
	});

	overlay.setMap(null);

	// 중개사 마커 클릭이벤트
	daum.maps.event.addListener(marker, 'click', function() {
		if ( ovCondition == false ) {
	    	overlay.setMap(map);
	    	ovCondition = true;
		}else {
			overlay.setMap(null);
	    	ovCondition = false;
		}
	});

	var bWh = '40px';
	var bWh2 = '60px';
	var bWh3 = '80px';
	var bWh4 = '100px';

	// 마커 클러스터러 생성
	var clusterer = new daum.maps.MarkerClusterer({
		map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
		averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
		minLevel: 1, // 클러스터 할 최소 지도 레벨
		disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
		calculator: [10, 30, 50, 80],
		// calculator 각 사이 값 마다 적용될 스타일을 지정한다
		styles: [
			{display:'flex', alignItems:'center', justifyContent: 'center', width : bWh, height : bWh, border:'1px solid #3a78bd', background: '#3884dc', borderRadius: '50%', color: '#fff', textAlign: 'center', fontWeight: 'bold', opacity:.85, transform: 'scale(1)', transition: 'all .05s ease-out',},
			{display:'flex', alignItems:'center', justifyContent: 'center', width : bWh2, height : bWh2, border:'1px solid #3a78bd', background: '#3884dc', borderRadius: '50%', color: '#fff', textAlign: 'center', fontWeight: 'bold', opacity:.85, transform: 'scale(1)', transition: 'all .05s ease-out'},
			{display:'flex', alignItems:'center', justifyContent: 'center', width : bWh3, height : bWh3, border:'1px solid #3a78bd', background: '#3884dc', borderRadius: '50%', color: '#fff', textAlign: 'center', fontWeight: 'bold', opacity:.85, transform: 'scale(1)', transition: 'all .05s ease-out'},
			{display:'flex', alignItems:'center', justifyContent: 'center', width : bWh4, height : bWh4, border:'1px solid #3a78bd', background: '#3884dc', borderRadius: '50%', color: '#fff', textAlign: 'center', fontWeight: 'bold', opacity:.85, transform: 'scale(1)', transition: 'all .05s ease-out'}
		]
	});

	// 최소 클러스터 개수 설정
	clusterer.setMinClusterSize(1);

	// 매물 JSON 데이터 저장 객체
	var struct = {}
	// 추천 매물 JSON 데이터 저장 객체
	var struct2 = {}

	// 단지 시퀀스 배열
	var danjiSeq = [];
	// 단지명
	var danjiName = [];

	// 추천 단지 시퀀스 배열
	var danjiSeq2 = [];

	// 매물 종류 배열
	var memulClass = [];

	// 콤마 처리
	var comma = function(str) {
		str = String(str);
		return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	}

	// 화폐 단위 조정
	var moneyUnit = function(){
		var unit = $('.unit');
		for(var i=0;i<unit.length;i++){
			if(unit.eq(i).text().length > 4){
				var base = Math.floor(Number(unit.eq(i).text())/10000);
				var rest = Number(unit.eq(i).text())%10000;
				if(rest == 0){
					unit.eq(i).text(comma(base+'억'));
				}else{
					unit.eq(i).text(String(base)+'억'+comma(rest));
				}
			}
			unit.eq(i).text(comma(unit.eq(i).text()));
		}
	}

	// 날짜 포멧 조정
	var dateUnit = function(){
		var unit = $('.tag_type span');
		for(var i=0;i<unit.length;i++){
			unit.eq(i).text(unit.eq(i).text().substr(2).replace(/\-/g, '.'))
		}
	}

	// Handlebars.js를 활용한 데이터 바인딩
	var bind = function(arr, template, obj, recomm){
		var hbs = $.ajax({
			url: 'js/hbs/' + template + '.hbs'
		});
		var hbsThen = function(hbs){
			var template = Handlebars.compile(hbs);
			var target = $(''+obj+'');
			for(var i in arr){
				var html = template(arr[i]);
				target.append(html);
			}
			
			if(recomm != 'y'){
				$('.num').text(arr.length);
				// 화폐 단위 조정
				moneyUnit();
				// 날짜 포멧 조정
				dateUnit();
			}
		}

		var hbsThen2 = function(){
			// 리스트 마우스 이벤트 대응 마커 추가 및 좌표 이동
			curPos();
		}
		
		// UI 인터렉션 관련 스크립트 적용
		var hbsThen3 = function(){
			if(template == 'lst3'){
				setTimeout(function(){
					var $slickRegular = $('.regular'),
						$slickRegularAll = $('.bx_recommend .all_page'),
						prevBtn = $('.slide_pagination .btn_prev'),
						nextBtn = $('.slide_pagination .btn_next'),
						$slickAuto = $('.auto_slide'),
						$slickAutoAll = $('.bx_banner .all_page');

					$slickRegular.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
						var i = (currentSlide ? currentSlide : 0) + 1;
						$slickRegularAll.html('<span class="now">' + i + '</span>' +' / ' + slick.slideCount);
					});

					$slickRegular.slick({
						infinite: true,
						arrows: true,
						dot: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						prevArrow: prevBtn,
						nextArrow: nextBtn
					});

					$slickAuto.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
						var i = (currentSlide ? currentSlide : 0) + 1;
						$slickAutoAll.html(i + '/' + slick.slideCount);
					});

					$slickAuto.slick({
						infinite: true,
						arrows: false,
						dot: false,
						autoplay: true,
						autoplaySpeed: 4000,
						pauseOnHover: true,
						pauseOnFocus: true,
						slidesToShow: 1,
						slidesToScroll: 1
					});
				})
				
			}
		}
		
		hbs.then(hbsThen);
		hbs.then(hbsThen2);
		hbs.then(hbsThen3);
	}

	// 목록 아이템 마우스 이벤트 대응
	var curPos = function(){

		$('.lst_item_type2, .lst_item_type3').on('mouseenter', function(){
			
			var xpos = Number($(this).find('.xPos').attr('value'));
			var ypos = Number($(this).find('.yPos').attr('value'));
			addMarker(new daum.maps.LatLng(ypos, xpos));
			$("img[src*='marker03']").after('<span class="marker_area"></span>');
		});

		$('.lst_item_type2, .lst_item_type3').on('mouseleave', function(){
			setMarkers(null);
		});
	}

	// JSON 데이터 호출
	$.get('js/data/estateInfo_recomm.json', function(data) {
		// 단지 식별을 위해 danjiSeq 배열에 danji_seq 키에 해당하는 value 삽입
		struct2 = data;
		$.map(struct2, function(value, key){
			$.map(value, function(value2, key2){
				key2 == 'danji_seq' ? danjiSeq2.push(value2) : '';
			});
		});
		bind(data, 'lst2', '.regular.slick-slider', 'y'); 
		bind(data, 'lst3', '.auto_slide.slick-slider', 'y');
	});

	// JSON 데이터 호출
	$.get('js/data/estateInfo.json', function(data) {
		// 재사용을 위해 JSON 데이터 객체에 저장
		struct = data;

		bind(data, 'lst', '.bx_lst_item_type2');

		// 초기화 버튼 클릭 이벤트
		$('.btn_reset').click(function(){
			$('.bx_lst_item_type2').empty();
			bind(data, 'lst', '.bx_lst_item_type2');
		})

		// 마커 생성
		var markers = $(struct).map(function(i, position) {
			return new daum.maps.Marker({
				position : new daum.maps.LatLng(position.ypos, position.xpos)
			});
		});
		
		// 단지 식별을 위해 danjiSeq 배열에 danji_seq 키에 해당하는 value 삽입
		$.map(struct, function(value, key){
			$.map(value, function(value2, key2){
				if(key2 == 'danji_seq' && value2 != ''){
					danjiSeq.push(value2);
				}else if(key2 == 'danji_seq' && value2 == ''){
					danjiSeq.push(value.memul_seq);
				}
				key2 == 'danji_name' ? danjiName.push(value2) : '';
				key2 == 'memul_class' ? memulClass.push(value2) : '';
			});
		});

		// 마커 클릭 이벤트
		var lstArr = [];
		$(data).map(function(i) {
			// 마크 객체의 Ta 키에 단지 식별값 danjiSeq 배열 대입
			markers[i].Ta = danjiSeq[i];
			if(danjiName[i] != ''){
				// markers[i].va = danjiName[i] + '<br>' + memulClass[i];
				markers[i].va = danjiName[i];
			}else{
				markers[i].va = memulClass[i];
			}
			
			daum.maps.event.addListener(markers[i], 'click', function() {
				// 클릭시 이전 배열 정보 초기화
				lstArr = [];
				// 매물 리스트 초기화
				$('.bx_lst_item_type2').empty();
				$.map(markers[i], function(value, key){
					if(key == 'Ta'){
						for(var j in danjiSeq){
							if(value == danjiSeq[j]){
								//클릭한 단지의 식별값과 danjiSeq 배열의 위치가 일치하는 경우 lstArr에 데이터 배열 삽입
								lstArr.push(data[j]);
							}
						}
					}
					if(key == 'va'){
						for(var j in memulClass){
							if(value == memulClass[j]){
								//클릭한 단지의 식별값과 memulClass 배열의 위치가 일치하는 경우 lstArr에 데이터 배열 삽입
								lstArr.push(data[j]);
							}
						}
					}
				})
				// 정제 데이터 바인딩
				bind(lstArr, 'lst', '.bx_lst_item_type2');
			});
			daum.maps.event.addListener(markers[i], 'mouseover', function() {
				// console.log(markers[i]);
			});
		});
		clusterer.addMarkers(markers);
	});

	// 마커 클러스터러 클릭 이벤트
	daum.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
		// 매물 리스트 초기화
		$('.bx_lst_item_type2').empty();

		// 단지 식별값을 저장할 배열 선언
		var idxArr = [];
		$.map(cluster._markers, function(value, key){
			$.map(value, function(value2, key2){
				if(key2 == 'Ta'){
					// 선택한 마커 클러스터의 단지 식별값을 idxArr 배열에 저장
					idxArr.push(value2);
				}
			});
		});

		// 중복 배열 값 제거
		idxArr = idxArr.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
		
		// 리스트에 보여질 정보를 담을 배열 선언
		var lstArr = [];

		// 클러스터 클릭
		for(var i in idxArr){
			$.map(struct, function(value, key){
				$.map(value, function(value2, key2){
					if(key2 == 'danji_seq' && value2 == idxArr[i] && value2 != ''){
						// 단지 식별값 idxArr의 값과 같은 경우 lstArr 배열에 데이터 저장
						lstArr.push(struct[key]);
					}else if(key2 == 'memul_seq' && value2 == idxArr[i] && value2 != ''){
						lstArr.push(struct[key]);
					}
				});
			});
		}
		
		// 정제 데이터 바인딩
		bind(lstArr, 'lst', '.bx_lst_item_type2');

		// 클릭시 활성화 클래스 on 전체 해제
		$('.map_info').find('.on').removeClass('on');
		
		// 지도 레벨 특정 수준 이하일 경우 디자인 처리
		if(map.getLevel() <= 3){
			// 기존 활성화 클러스터 매물 텍스트 삭제
			$.map(clusterer._clusters, function(value, key){
				$.map(value, function(value2, key2){
					if(key2 == '_content'){
						if(value2.innerHTML.length > 2){
							value2.innerHTML = value2.innerHTML.replace(/.*>/g , '');
						}
					}
				});
			});

			// 클릭된 매물에 디자인 적용을 위한 활성화 on 클래스 추가
			var wh = cluster._content.style.width;
			switch(wh){
				case bWh : cluster._content.className = 'wh on'; break;
				case bWh2 : cluster._content.className = 'wh2 on'; break;
				case bWh3 : cluster._content.className = 'wh3 on'; break;
				case bWh4 : cluster._content.className = 'wh4 on'; break;
			}
			
			cluster._content.innerHTML = cluster.getMarkers()[0].va + '<br>' + cluster.getMarkers().length;
		}else{
			// 지도 레벨 특정 수준 이상일 경우 기본 매물 개수 노출
			daum.maps.event.addListener( clusterer, 'clusterover', function( cluster) {
				cluster._content.innerHTML = cluster.getMarkers().length;
				cluster._content.className = '';
			});
		}
	});
	
	// Drag 이벤트
	daum.maps.event.addListener(map, 'dragend', function() {
		// 기존 활성화 클러스터 매물 텍스트 삭제
		if(map.getLevel() <= 3){
			$.map(clusterer._clusters, function(value, key){
				$.map(value, function(value2, key2){
					if(key2 == '_content'){
						if(value2.innerHTML.length > 2){
							value2.innerHTML = value2.innerHTML.replace(/.*>/g , '');
							value2.className = '';
						}
					}
				});
			});
		}
	});

	var bubble = function(){
		if(map.getLevel() <= 3){
			// 지도 레벨 특정 수준 이하일 경우 디자인 처리
			daum.maps.event.addListener( clusterer, 'clusterover', function( cluster) {
				var wh = cluster._content.style.width;
				switch(wh){
					case bWh : cluster._content.className == '' || cluster._content.className == 'wh' ? cluster._content.className = 'wh' : cluster._content.className = 'wh on'; break;
					case bWh2 : cluster._content.className == '' || cluster._content.className == 'wh2' ? cluster._content.className = 'wh2' : cluster._content.className = 'wh2 on'; break;
					case bWh3 :cluster._content.className == '' || cluster._content.className == 'wh3' ? cluster._content.className = 'wh3' : cluster._content.className = 'wh3 on'; break;
					case bWh4 : cluster._content.className == '' || cluster._content.className == 'wh4' ? cluster._content.className = 'wh4' : cluster._content.className = 'wh4 on'; break;
				}
				cluster._content.innerHTML = cluster.getMarkers()[0].va+ '<br>' + cluster.getMarkers().length;
			});
			daum.maps.event.addListener( clusterer, 'clusterout', function( cluster) {
				cluster._content.innerHTML = cluster.getMarkers().length;
				switch(cluster._content.className){
					case 'wh on' : cluster._content.className = 'wh on'; cluster._content.innerHTML = cluster.getMarkers()[0].va + '<br>' + cluster.getMarkers().length; break;
					case 'wh2 on' : cluster._content.className = 'wh2 on'; cluster._content.innerHTML = cluster.getMarkers()[0].va+ '<br>' + cluster.getMarkers().length; break;
					case 'wh3 on' : cluster._content.className = 'wh3 on'; cluster._content.innerHTML = cluster.getMarkers()[0].va+ '<br>' + cluster.getMarkers().length; break;
					case 'wh4 on' : cluster._content.className = 'wh4 on'; cluster._content.innerHTML = cluster.getMarkers()[0].va+ '<br>' + cluster.getMarkers().length; break;
					default : cluster._content.className = '';
				}
			});
		}else{
			// 지도 레벨 특정 수준 이상일 경우 디자인 처리
			daum.maps.event.addListener( clusterer, 'clusterover', function( cluster) {
				cluster._content.innerHTML = cluster.getMarkers().length;
				cluster._content.className = '';
			});
		}
	}

	bubble();

	daum.maps.event.addListener(map, 'zoom_changed', function() {
		bubble();
	});

	var currentPos = function(){
	
		var apiGeolocationSuccess = function() {
			// console.log('API geolocation success!\n\nlat = ' + position.coords.latitude + '\nlng = ' + position.coords.longitude);
		};

		var tryAPIGeolocation = function() {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			
			navigator.geolocation.getCurrentPosition(function(position) {
				var lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도
				var locPosition = new daum.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
				// 마커와 인포윈도우를 표시합니다
				displayMarker(locPosition, message);
				pinInfo(locPosition);
				map.setCenter(locPosition); 
				map.setLevel(4);
			});
		};
		var browserGeolocationSuccess = function(position) {
			// console.log('Browser geolocation success!\n\nlat = ' + position.coords.latitude + '\nlng = ' + position.coords.longitude);

			var lat = position.coords.latitude, // 위도
				lon = position.coords.longitude; // 경도
			
			var locPosition = new daum.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
			
			// 마커와 인포윈도우를 표시합니다
			//- displayMarker(locPosition, message);
			pinInfo(locPosition);
			map.setCenter(locPosition); 
			map.setLevel(4);
			$('.loader').removeClass('on');
			$('.user.icon').show();

		};
		var browserGeolocationFail = function(error) {
			$('.loader').removeClass('on');
			$('.user.icon').show();
			switch (error.code) {
				case error.TIMEOUT:
					console.log('Browser geolocation error !\n\nTimeout.');
					break;
				case error.PERMISSION_DENIED:
					if (error.message.indexOf('Only secure origins are allowed') == 0) {
						tryAPIGeolocation();
					}
					break;
				case error.POSITION_UNAVAILABLE:
					console.log('Browser geolocation error !\n\nPosition unavailable.');
					break;
			}
		};
		var tryGeolocation = function() {
			if (navigator.geolocation) {
				watchID = navigator.geolocation.watchPosition(browserGeolocationSuccess, browserGeolocationFail, {
					maximumAge: 50000,
					timeout: 20000,
					enableHighAccuracy: true
				});
			}
		};
		tryGeolocation();
	}

	function pinInfo(pos){
		setMarkers(null);
		map.setCenter(pos);
		addMarker(pos);
	}

	// 지도에 추가된 지도타입정보를 가지고 있을 변수입니다
	var currentTypeId;

	// 버튼이 클릭되면 호출되는 함수입니다
	function setOverlayMapTypeId(maptype) {
		var changeMaptype;
		
		// maptype에 따라 지도에 추가할 지도타입을 결정합니다
		if (maptype === 'roadmap') {            
			
			// 일반 지도타입
			changeMaptype = daum.maps.MapTypeId.ROADMAP;     
			
		} else if (maptype === 'traffic') {            
			
			// 교통정보 지도타입
			changeMaptype = daum.maps.MapTypeId.TRAFFIC;     
			
		} else if (maptype === 'roadview') {        
			
			// 로드뷰 도로정보 지도타입
			changeMaptype = daum.maps.MapTypeId.ROADVIEW;    

		} else if (maptype === 'skyview') {        
			
			// 항공뷰 도로정보 지도타입
			changeMaptype = daum.maps.MapTypeId.SKYVIEW;    

		} else if (maptype === 'terrain') {
			
			// 지형정보 지도타입
			changeMaptype = daum.maps.MapTypeId.TERRAIN;    

		} else if (maptype === 'use_district') {
			
			// 지적편집도 지도타입
			changeMaptype = daum.maps.MapTypeId.USE_DISTRICT;           
		}
		
		// 이미 등록된 지도 타입이 있으면 제거합니다
		if (currentTypeId) {
			map.removeOverlayMapTypeId(currentTypeId);    
		}
		
		// maptype에 해당하는 지도타입을 지도에 추가합니다
		map.addOverlayMapTypeId(changeMaptype);
		
		// 지도에 추가된 타입정보를 갱신합니다
		currentTypeId = changeMaptype;        
	}

	// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
	function zoomIn() {
		map.setLevel(map.getLevel() - 1);
	}

	// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
	function zoomOut() {
		map.setLevel(map.getLevel() + 1);
	}

	$('.btn_zoomin').click(function(){
		zoomIn();
	});

	$('.btn_zoomout').click(function(){
		zoomOut();
	});

	$('.btn_airline').click(function(){
		$(this).toggleClass('on');
		if($(this).hasClass('on')){
			setOverlayMapTypeId('skyview');
			if($('.btn_loadview').hasClass('on')){
				toggleOverlay(true);
			}
		}else{
			setOverlayMapTypeId('roadmap');
		}
	});
	
	var overlayOn = false, // 지도 위에 로드뷰 오버레이가 추가된 상태를 가지고 있을 변수
		container = document.getElementById('mapCtrl'), // 지도와 로드뷰를 감싸고 있는 div 입니다
		mapWrapper = document.getElementById('mapWrapper'), // 지도를 감싸고 있는 div 입니다
		mapContainer = document.getElementById('map'), // 지도를 표시할 div 입니다 
		rvContainer = document.getElementById('roadview'); //로드뷰를 표시할 div 입니다
	
	var flashAvailable = false;
	try {
		var flash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		flash == true ? flashAvailable = true : '';
	}
	catch(e) {
		navigator.mimeTypes ["application/x-shockwave-flash"] != undefined ? flashAvailable = true : '';
	}
	
	if(flashAvailable == true){
		// 로드뷰 객체를 생성합니다 
		var rv = new daum.maps.Roadview(rvContainer); 

		// 좌표로부터 로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체를 생성합니다 
		var rvClient = new daum.maps.RoadviewClient(); 

		// 로드뷰에 좌표가 바뀌었을 때 발생하는 이벤트를 등록합니다 
		daum.maps.event.addListener(rv, 'position_changed', function() {

			// 현재 로드뷰의 위치 좌표를 얻어옵니다 
			var rvPosition = rv.getPosition();

			// 지도의 중심을 현재 로드뷰의 위치로 설정합니다
			map.setCenter(rvPosition);

			// 지도 위에 로드뷰 도로 오버레이가 추가된 상태이면
			if(overlayOn) {
				// 마커의 위치를 현재 로드뷰의 위치로 설정합니다
				marker.setPosition(rvPosition);
			}
		});

		// 마커 이미지를 생성합니다
		var markImage = new daum.maps.MarkerImage(
			'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/roadview_wk.png',
			new daum.maps.Size(35,39), {
			//마커의 좌표에 해당하는 이미지의 위치를 설정합니다.
			//이미지의 모양에 따라 값은 다를 수 있으나, 보통 width/2, height를 주면 좌표에 이미지의 하단 중앙이 올라가게 됩니다.
			offset: new daum.maps.Point(14, 39)
		});

		// 드래그가 가능한 마커를 생성합니다
		var marker = new daum.maps.Marker({
			image : markImage,
			position: map.getCenter(),
			draggable: true
		});

		// 마커에 dragend 이벤트를 등록합니다
		daum.maps.event.addListener(marker, 'dragend', function(mouseEvent) {

			// 현재 마커가 놓인 자리의 좌표입니다 
			var position = marker.getPosition();

			// 마커가 놓인 위치를 기준으로 로드뷰를 설정합니다
			toggleRoadview(position);
		});

		//지도에 클릭 이벤트를 등록합니다
		daum.maps.event.addListener(map, 'click', function(mouseEvent){
			if($('.btn_loadview').hasClass('on')){
				marker.setMap(map);
			}
			// 지도 위에 로드뷰 도로 오버레이가 추가된 상태가 아니면 클릭이벤트를 무시합니다 
			if(!overlayOn) {
				return;
			}

			// 클릭한 위치의 좌표입니다 
			var position = mouseEvent.latLng;

			// 마커를 클릭한 위치로 옮깁니다
			marker.setPosition(position);

			// 클락한 위치를 기준으로 로드뷰를 설정합니다
			toggleRoadview(position);
		});

		// 전달받은 좌표(position)에 가까운 로드뷰의 파노라마 ID를 추출하여
		// 로드뷰를 설정하는 함수입니다
		function toggleRoadview(position){
			rvClient.getNearestPanoId(position, 50, function(panoId) {
				// 파노라마 ID가 null 이면 로드뷰를 숨깁니다
				if (panoId === null) {
					toggleMapWrapper(true, position);
				} else {
				toggleMapWrapper(false, position);

					// panoId로 로드뷰를 설정합니다
					rv.setPanoId(panoId, position);
				}
			});
		}

		// 지도를 감싸고 있는 div의 크기를 조정하는 함수입니다
		function toggleMapWrapper(active, position) {
			if (active) {

				// 지도를 감싸고 있는 div의 너비가 100%가 되도록 class를 변경합니다 
				container.className = '';

				// 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
				map.relayout();

				// 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
				// map.setCenter(position);
			} else {

				// 지도만 보여지고 있는 상태이면 지도의 너비가 50%가 되도록 class를 변경하여
				// 로드뷰가 함께 표시되게 합니다
				if (container.className.indexOf('view_roadview') === -1) {
					container.className = 'view_roadview';

					// 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
					map.relayout();

					// 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
					// map.setCenter(position);
				}
			}
		}

		// 지도 위의 로드뷰 도로 오버레이를 추가,제거하는 함수입니다
		function toggleOverlay(active) {
			if (active) {
				overlayOn = true;

				// 지도 위에 로드뷰 도로 오버레이를 추가합니다
				map.addOverlayMapTypeId(daum.maps.MapTypeId.ROADVIEW);

				// 지도 위에 마커를 표시합니다
				// marker.setMap(map);

				// 마커의 위치를 지도 중심으로 설정합니다 
				// marker.setPosition(map.getCenter());

				// 로드뷰의 위치를 지도 중심으로 설정합니다
				// toggleRoadview(map.getCenter());
			} else {
				overlayOn = false;

				// 지도 위의 로드뷰 도로 오버레이를 제거합니다
				map.removeOverlayMapTypeId(daum.maps.MapTypeId.ROADVIEW);

				// 지도 위의 마커를 제거합니다
				marker.setMap(null);
			}
		}

		// 지도 위의 로드뷰 버튼을 눌렀을 때 호출되는 함수입니다
		function setRoadviewRoad() {
			var control = document.getElementById('roadviewControl');

			// 버튼이 눌린 상태가 아니면
			if (control.className.indexOf('active') === -1) {
				control.className = 'btn_loadview on active';

				// 로드뷰 도로 오버레이가 보이게 합니다
				toggleOverlay(true);
				$('#mapCtrl.view_roadview #mapWrapper').css('width','75%');
				$('#rvWrapper').show();
			} else {
				control.className = 'btn_loadview';

				// 로드뷰 도로 오버레이를 제거합니다
				toggleOverlay(false);
				$('#mapCtrl.view_roadview #mapWrapper').css('width','100%');
				$('#rvWrapper').hide();
				marker.setMap(null);
				map.setCenter(map.getCenter());
				map.relayout();
			}
		}

		// 로드뷰에서 X버튼을 눌렀을 때 로드뷰를 지도 뒤로 숨기는 함수입니다
		function closeRoadview() {
			var position = marker.getPosition();
			toggleMapWrapper(true, position);
		}
	}

	$('#roadviewControl').click(function(){
		if(!$('.btn_distance').hasClass('on')){
			if(flashAvailable == true){
				setRoadviewRoad();
			}else{
				console.log('브라우저의 플래시 설정을 사용으로 변경해야 합니다.');
			}
		}
	});

	$('.btn_focus').click(function(){
		
		$(this).toggleClass('on');
		if($(this).hasClass('on')){
			currentPos();
		}else{
			setMarkers(null);
		}
	});

	var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
	var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
	var clickLine // 마우스로 클릭한 좌표로 그려질 선 객체입니다
	var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
	var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

	// 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
	function deleteClickLine() {
		if (clickLine) {
			clickLine.setMap(null);    
			clickLine = null;        
		}
	}

	// 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
	// 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
	function showDistance(content, position) {
		
		if (distanceOverlay) { // 커스텀오버레이가 생성된 상태이면
			
			// 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
			distanceOverlay.setPosition(position);
			distanceOverlay.setContent(content);
			
		} else { // 커스텀 오버레이가 생성되지 않은 상태이면
			
			// 커스텀 오버레이를 생성하고 지도에 표시합니다
			distanceOverlay = new daum.maps.CustomOverlay({
				map: map, // 커스텀오버레이를 표시할 지도입니다
				content: content,  // 커스텀오버레이에 표시할 내용입니다
				position: position, // 커스텀오버레이를 표시할 위치입니다.
				xAnchor: 0,
				yAnchor: 0,
				zIndex: 3  
			});      
		}
	}

	// 그려지고 있는 선의 총거리 정보와 
	// 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
	function deleteDistnce() {
		if (distanceOverlay) {
			distanceOverlay.setMap(null);
			distanceOverlay = null;
		}
	}

	// 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여 
	// 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
	function displayCircleDot(position, distance) {

		// 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
		var circleOverlay = new daum.maps.CustomOverlay({
			content: '<span class="dot"></span>',
			position: position,
			zIndex: 1
		});

		// 지도에 표시합니다
		circleOverlay.setMap(map);

		if (distance > 0) {
			// 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
			var distanceOverlay = new daum.maps.CustomOverlay({
				content: '<div class="dotOverlay">거리 <span class="number">' + distance + '</span>m</div>',
				position: position,
				yAnchor: 1,
				zIndex: 2
			});

			// 지도에 표시합니다
			distanceOverlay.setMap(map);
		}

		// 배열에 추가합니다
		dots.push({circle:circleOverlay, distance: distanceOverlay});
	}

	// 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
	function deleteCircleDot() {
		var i;

		for ( i = 0; i < dots.length; i++ ){
			if (dots[i].circle) { 
				dots[i].circle.setMap(null);
			}

			if (dots[i].distance) {
				dots[i].distance.setMap(null);
			}
		}

		dots = [];
	}

	// 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여 
	// 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
	// HTML Content를 만들어 리턴하는 함수입니다
	function getTimeHTML(distance) {

		// 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
		var walkkTime = distance / 67 | 0;
		var walkHour = '', walkMin = '';

		// 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
		if (walkkTime > 60) {
			walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
		}
		walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'

		// 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
		var bycicleTime = distance / 227 | 0;
		var bycicleHour = '', bycicleMin = '';

		// 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
		if (bycicleTime > 60) {
			bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
		}
		bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'

		// 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
		var content = '<ul class="dotOverlay distanceInfo">';
		content += '    <li>';
		content += '        <span class="label">총거리</span><span class="number">' + distance + '</span>m';
		content += '    </li>';
		content += '    <li>';
		content += '        <span class="label">도보</span>' + walkHour + walkMin;
		content += '    </li>';
		content += '    <li>';
		content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
		content += '    </li>';
		content += '</ul>'

		return content;
	}

	var events = [];

	var distance = function(){

		var evt1 = function(mouseEvent){
			// 마우스로 클릭한 위치입니다 
			var clickPosition = mouseEvent.latLng;

			// 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
			if (!drawingFlag) {

				// 상태를 true로, 선이 그리고있는 상태로 변경합니다
				drawingFlag = true;
				
				// 지도 위에 선이 표시되고 있다면 지도에서 제거합니다
				deleteClickLine();
				
				// 지도 위에 커스텀오버레이가 표시되고 있다면 지도에서 제거합니다
				deleteDistnce();

				// 지도 위에 선을 그리기 위해 클릭한 지점과 해당 지점의 거리정보가 표시되고 있다면 지도에서 제거합니다
				deleteCircleDot();
			
				// 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
				clickLine = new daum.maps.Polyline({
					map: map, // 선을 표시할 지도입니다 
					path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
					strokeWeight: 3, // 선의 두께입니다 
					strokeColor: '#db4040', // 선의 색깔입니다
					strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
					strokeStyle: 'solid' // 선의 스타일입니다
				});
				
				// 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
				moveLine = new daum.maps.Polyline({
					strokeWeight: 3, // 선의 두께입니다 
					strokeColor: '#db4040', // 선의 색깔입니다
					strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
					strokeStyle: 'solid' // 선의 스타일입니다    
				});
			
				// 클릭한 지점에 대한 정보를 지도에 표시합니다
				displayCircleDot(clickPosition, 0);

					
			} else { // 선이 그려지고 있는 상태이면

				// 그려지고 있는 선의 좌표 배열을 얻어옵니다
				var path = clickLine.getPath();

				// 좌표 배열에 클릭한 위치를 추가합니다
				path.push(clickPosition);
				
				// 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
				clickLine.setPath(path);

				var distance = Math.round(clickLine.getLength());
				displayCircleDot(clickPosition, distance);
			}
		}
		// 지도에 클릭 이벤트를 등록합니다
		// 지도를 클릭하면 선 그리기가 시작됩니다 그려진 선이 있으면 지우고 다시 그립니다
		daum.maps.event.addListener(map, 'click', evt1);
		events.push({target: map, type: 'click', handler: evt1 });
		
			
		// 지도에 마우스무브 이벤트를 등록합니다
		// 선을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 선의 위치를 동적으로 보여주도록 합니다
		var evt2 = function(mouseEvent){

			// 지도 마우스무브 이벤트가 발생했는데 선을 그리고있는 상태이면
			if (drawingFlag){
				
				// 마우스 커서의 현재 위치를 얻어옵니다 
				var mousePosition = mouseEvent.latLng; 

				// 마우스 클릭으로 그려진 선의 좌표 배열을 얻어옵니다
				var path = clickLine.getPath();
				
				// 마우스 클릭으로 그려진 마지막 좌표와 마우스 커서 위치의 좌표로 선을 표시합니다
				var movepath = [path[path.length-1], mousePosition];
				moveLine.setPath(movepath);    
				moveLine.setMap(map);
				
				var distance = Math.round(clickLine.getLength() + moveLine.getLength()), // 선의 총 거리를 계산합니다
					content = '<div class="dotOverlay distanceInfo">총거리 <span class="number">' + distance + '</span>m</div>'; // 커스텀오버레이에 추가될 내용입니다
				
				// 거리정보를 지도에 표시합니다
				showDistance(content, mousePosition);   
			}             
		};

		daum.maps.event.addListener(map, 'mousemove', evt2);
		events.push({target: map, type: 'mousemove', handler: evt2 });

		// 지도에 마우스 오른쪽 클릭 이벤트를 등록합니다
		// 선을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면 선 그리기를 종료합니다
		var evt3 = function(mouseEvent){

			// 지도 오른쪽 클릭 이벤트가 발생했는데 선을 그리고있는 상태이면
			if (drawingFlag) {
				
				// 마우스무브로 그려진 선은 지도에서 제거합니다
				moveLine.setMap(null);
				moveLine = null;  
				
				// 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
				var path = clickLine.getPath();
			
				// 선을 구성하는 좌표의 개수가 2개 이상이면
				if (path.length > 1) {

					// 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
					if (dots[dots.length-1].distance) {
						dots[dots.length-1].distance.setMap(null);
						dots[dots.length-1].distance = null;    
					}

					var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
						content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다
						
					// 그려진 선의 거리정보를 지도에 표시합니다
					showDistance(content, path[path.length-1]);  
					
				} else {

					// 선을 구성하는 좌표의 개수가 1개 이하이면 
					// 지도에 표시되고 있는 선과 정보들을 지도에서 제거합니다.
					deleteClickLine();
					deleteCircleDot(); 
					deleteDistnce();

				}
				
				// 상태를 false로, 그리지 않고 있는 상태로 변경합니다
				drawingFlag = false;          
			}  
		};
		daum.maps.event.addListener(map, 'rightclick', evt3);
		events.push({target: map, type: 'rightclick', handler: evt3 });
	}
	
	$('.btn_distance').click(function(){
		$(this).toggleClass('on');
		if($(this).hasClass('on') && !$('.btn_loadview').hasClass('on')){
			distance();
		}else{
			$(this).removeClass('on');
			deleteClickLine();
			deleteCircleDot(); 
			deleteDistnce();
			events.forEach(function(e) {
				daum.maps.event.removeListener(e.target, e.type, e.handler);
			});
		}
	});
});