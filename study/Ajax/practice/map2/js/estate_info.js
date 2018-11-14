var memXpos = 0;
var memYpos = 0;

// 중개사 데이터 처리
$.get('js/data/estateInfo_member.json', function(data) {	

	$.map(data, function(value, key){
		memXpos = data[0].member_xpos;
		memYpos = data[0].member_ypos;
	});
	
	var map = new daum.maps.Map(document.getElementById('map'), {
		center: new daum.maps.LatLng(memYpos, memXpos), // 중개사 좌표로 지도 중심 설정
		level : 3
	});

	// 마커를 생성하고 지도위에 표시하는 함수입니다
	var imageSrc = 'img/marker/marker01_on.png',
    	imageSize = new daum.maps.Size(38, 52),
    	imageOption = {offset: new daum.maps.Point(27, 53)},
		markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption)

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

	// 매물 JSON 데이터 저장 객체
	var data = {}

	// 추천 단지 시퀀스 배열
	var danjiSeq2 = [];


 // 숫자 천단위 콤마
	var comma = function (str) {
		return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	// 매물 금액
	var money = function () {
		var sum = $('.bx_align').find('.sum');
		
		for (var i = 0 ; i<=sum.length ; i++) {
			if (sum.eq(i).text().length > 4) { 
				var million = sum.eq(i).text()%10000;
				var billion = Math.floor(sum.eq(i).text()/10000);

				if (million === 0) {
					// 천만원 단위 없음

					// 숫자 + 억 천단위는 절사
					sum.eq(i).text(billion + '억');							
				} else {
					// 천만원 단위 있음

					// 숫자 + 억 + 콤마 포함된 천만원 단위
					sum.eq(i).text(billion + '억' + comma(million) + '만원');
				}
			}
		}
	}
	// 확인매물 날짜
	var date = function () {
		var tag = $('.tag_type .date');
		for (var i = 0 ; i < tag.length ; i ++) {
			var characterConvert = tag.eq(i).text().replace(/-/g, '.');

			tag.eq(i).text(characterConvert);
		}
	}

	// Handlebars.js를 활용한 데이터 바인딩
	var bind = function (arr, cnt) {
		var hbs = $.ajax({
			url: "js/hbs/practice.hbs"
		});
		var hbsThen = function (hbs) {
			var template = Handlebars.compile(hbs);
			var target = $('.bx_lst_item_type2');
			for(var i in arr){
				var html = template(arr[i]);
				target.append(html);
			}
			// 총 검색 매물
			$('.num').text(cnt);
			
			// 매물 금액 치환
			money();
			// 확인매물 날짜 특수문자 치환
			date();
		}
		hbs.then(hbsThen);
	}
	// 단지 시퀀스 배열
	var danjiSeq = [];
	// 단지명
	var danjiName = [];
	// 매물 종류 배열
	var memulClass = [];
	$.ajax({
		url: 'js/data/estateInfo.json',
		success: function (res) {
			bind(res, res.length);

			// 마커 생성
			var markers = $(res).map(function (i, position) {
				return new daum.maps.Marker({
					map : map,
					position : new daum.maps.LatLng(position.ypos, position.xpos)
				})
			});

			// 단지 식별을 위해 danjiSeq 배열에 danji_seq 키에 해당하는 value 삽입
			$.map(res, function (value) {
				$.map(value, function (value2, key2) {
					// console.log(key2, value2)
					if (key2 === 'danji_seq' && value2 !== '') {
						danjiSeq.push(value2);
					} else if (key2 === 'danji_seq' && value2 === '') {
						danjiSeq.push(value.memul_seq);
					}

					key2 === 'danji_name' ? danjiName.push(value2) : '',
					key2 === 'memul_class' ? memulClass.push(value2) : ''
				})
			});
			// console.log(danjiSeq)

			var lstArr = [];

			$.map(res, function (value, key) {
				markers[key].Ta = danjiSeq[key]

				// 아파트일 경우
				if (danjiName[key] !== '') {
					markers[key].va = danjiName[key];
				} else {
					// 아파트가 아닐 경우
					markers[key].va = memulClass[key];
				}
				// console.log(markers[key]);	

				// 마커 클릭 이벤트
				// api같은 것들은 jquery는 사용하지않고 자바스크립트를 사용함 (사용자가 jquery를 쓸지 안쓸지 모르기 때문)
				daum.maps.event.addListener(markers[key], 'click', function () {
					// 인포윈도우 생성
					var iwContent = '<div style="padding:5px">' + markers[key].va + '</div>';
					var iwRemovale = true;
					var iw = new daum.maps.InfoWindow({
						content : iwContent,
						removable : iwRemovale
					});
					iw.open(map, markers[key]);

					// 초기화 버튼
					$('.btn_reset').click(function () {
						// 목록 비운 후
						$('.bx_lst_item_type2').empty();
						// 다시 초기 값 호출
						bind(res, res.length);
					})

					// 클릭할 때 마다 쌓이는 배열 초기화
					lstArr = [];

					// 기존에 있던 리스트 목록 비우기
					$('.bx_lst_item_type2').empty();

					// 클릭한 마커의 값을 배열화한걸 분리
					$.map(markers[key], function (value2, key2) {
						// console.log(key2, value2)
						// ta => 단지시퀀스 값을 넣어준 상태

						// Ta 일 경우에만 처리
						if (key2 === 'Ta') {
							//danjiSeq의 갯수(121번)만큼의 루프를 돌면서 
							for (var j in danjiSeq) {
								//클릭한 단지의 값과 같은 것을 찾음 value2 는 Ta의 값
								if (value2 === danjiSeq[j]) {
									lstArr.push(res[j]);
									console.log(lstArr);
								}
							}
						} else if (key2 === 'va') { //단지에 대한 처리
							for (var j in memulClass) {
								if (value2 === memulClass[j]) {
									lstArr.push(res[j]);
									console.log(lstArr);
								}
							}
						}
					});
					// 기존에 전체적으로 json값을 노출시키던 값을 lstArr값으로 변경해서 bind
					bind(lstArr, lstArr.length);
				});
			});



		}
	});

	
	
	// $.get('js/data/estateInfo.json', function (data) {
	// 	bind(data);
	// })

	// var bind = function(arr, template, obj){
	// 	var hbs = $.ajax({
	// 		url: 'js/hbs/' + template + '.hbs'
	// 	});
	// 	var hbsThen = function(hbs){
	// 		var template = Handlebars.compile(hbs);
	// 		var target = $(''+obj+'');
	// 		for(var i in arr){
	// 			var html = template(arr[i]);
	// 			target.append(html);
	// 		}

	// 		$('.num').text(arr.length);
	// 		// 화폐 단위 조정
	// 		moneyUnit();
	// 		// 날짜 포멧 조정
	// 		dateUnit();
	// 	}
	// 	hbs.then(hbsThen);
	// }

	// JSON 데이터 호출
	// $.get('js/data/estateInfo.json', function(data) {

	// 	// bind(data, 'lst', '.bx_lst_item_type2');

	// 	// 초기화 버튼 클릭 이벤트
	// 	$('.btn_reset').click(function(){
	// 		$('.bx_lst_item_type2').empty();
	// 		bind(data, 'lst', '.bx_lst_item_type2');
	// 	})

	// 	// 마커 생성
	// 	var markers = $(data).map(function(i, position) {
	// 		return new daum.maps.Marker({
	// 			map : map,
	// 			position : new daum.maps.LatLng(position.ypos, position.xpos)
	// 		});
	// 	});
		
	// 	// 단지 식별을 위해 danjiSeq 배열에 danji_seq 키에 해당하는 value 삽입
	// 	$.map(data, function(value){
	// 		$.map(value, function(value2, key2){
	// 			if(key2 == 'danji_seq' && value2 != ''){
	// 				danjiSeq.push(value2);
	// 			}else if(key2 == 'danji_seq' && value2 == ''){
	// 				danjiSeq.push(value.memul_seq);
	// 			}
	// 			key2 == 'danji_name' ? danjiName.push(value2) : '';
	// 			key2 == 'memul_class' ? memulClass.push(value2) : '';
	// 		});
	// 	});

	// 	// 마커 클릭 이벤트
	// 	var lstArr = [];
	// 	$(data).map(function(i) {
	// 		// 마크 객체의 Ta 키에 단지 식별값 danjiSeq 배열 대입
	// 		markers[i].Ta = danjiSeq[i];
	// 		if(danjiName[i] != ''){
	// 			// markers[i].va = danjiName[i] + '<br>' + memulClass[i];
	// 			markers[i].va = danjiName[i];
	// 		}else{
	// 			markers[i].va = memulClass[i];
	// 		}
			
	// 		daum.maps.event.addListener(markers[i], 'click', function() {
	// 			// 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
	// 			var iwContent = '<div style="padding:5px;">' + markers[i].va + '</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
	// 			var iwRemoveable = true;

	// 			// 인포윈도우를 생성합니다
	// 			var iw = new daum.maps.InfoWindow({
	// 				content : iwContent,
	// 				removable : iwRemoveable
	// 			});			

	// 			iw.open(map, markers[i]);

	// 			// 클릭시 이전 배열 정보 초기화
	// 			lstArr = [];
	// 			// 매물 리스트 초기화
	// 			$('.bx_lst_item_type2').empty();
	// 			$.map(markers[i], function(value, key){
					
	// 				if(key == 'Ta'){
	// 					for(var j in danjiSeq){
	// 						if(value == danjiSeq[j]){
	// 							//클릭한 단지의 식별값과 danjiSeq 배열의 위치가 일치하는 경우 lstArr에 데이터 배열 삽입
	// 							lstArr.push(data[j]);
	// 						}
	// 					}
	// 				}
	// 				if(key == 'va'){
	// 					for(var j in memulClass){
	// 						if(value == memulClass[j]){
	// 							//클릭한 단지의 식별값과 memulClass 배열의 위치가 일치하는 경우 lstArr에 데이터 배열 삽입
	// 							lstArr.push(data[j]);
	// 						}
	// 					}
	// 				}
	// 			})
	// 			// 정제 데이터 바인딩
	// 			bind(lstArr, 'lst', '.bx_lst_item_type2');
	// 		});
	// 	});
	// });

});