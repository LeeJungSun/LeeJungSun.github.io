(function(win, $) {
	'use strict';

	// forEach
	// var book = function () {},
	// 	values = [];

	// for (var i = 0; i < 1000000 ; i++) {
	// 	values[i] = i;
	// }

	// var start = Date.now();
	// values.forEach(function (element, index, all) {
	// 	book();
	// }, this);

	// console.log(Date.now() - start);


	// forEach
	// [1, 2, 3].forEach(function (element, index, list) {
		// console.log('value:' + element +', index:' + index);
	// })
	// 1. 배열의 첫 번째 엘리먼트인 [1]을 읽는다
	// 2. 콜백 함수를 호출한다.
	// 	- 배열 엘리먼트, 인덱스, 배열 전체 순서로 넘겨준다.
	// 3. 콜백 함수의 문장 리스트를 수행한다.
	// 	- 파라미터 값을 출력한다.

	// 코딩 시간1
	var tagPush = [],
		obj = document.getElementById('list');

	for (var i = 1, imax = 10; i <= imax; i++) {
		tagPush.push('<li id="id'+ i +'">'+ i +'</li>');
	};

	obj.innerHTML = tagPush.join('');
	

	// sort
	var value = [101, 26, 7, 1234];

	value.sort(function (one, two) {
		return one - two; // 콜백함수, 익명함수
	});
	// 1. sort()의 파라미터에 작성한 function () {}을 호출하면서 101과 26을 파라미터 값으로 넘겨준다.
	// 2. one(101) - two(26) 결과는 양수이며 0보다 큰 값을 반환하게 된다.
	// 3. sort()는 0보다 큰 값이 반환되면 배열에서 값의 위치를 바꾼다 따라서 [26,101,7,1234]가 된다.
	// 4. 다시 함수를 호출하면서 101과 7을 넘겨준다.
	// 	- one(101) - two(7)은 양수이며 0보다 큰 값을 반환하게 된다.
	// 5. 반환 값이 0보다 크므로 배열에서 값의 위치를 바꾼다.
	//	- 따라서 [26, 7, 101, 1234]가 된다.
	// 6. 다시 함수를 호출하면서 101과 1234를 넘겨준다.
	//	- one(101) - two(1234)는 음수이며 0보다 작은 값을 반환하게 된다.
	// 7. sort()는 0보다 작거나 같으면 배열에서 값의 위치를 바꾸지 않는다.
	// 8. 다시 처음으로 돌아가 바뀌는 것이 없을 때까지 배열의 엘리먼트 위치를 조정한다.
	

	
})(window, jQuery);

// for (var a = 1; a <= 10; a++) {
// 	if (a%2 === 0) {
// 		// 짝수
// 		// console.log(a);
// 	} else {
// 		// 홀수
// 		console.log(a);
// 	}
// }



// var sports,
// 	result;

// try {
// 	console.log('try');
// 	sports = baseball;
// } catch (e) {
// 	result = 'error';
// 	console.log('catch');
// } finally {
// 	console.log('finally');
// 	console.log(result);
// }

// try {
// 	if (!sports) {
// 		throw 'sports에 값이 없습니다.';
// 	};
// 	result = sports;
// } catch (e) {
// 	console.log(e)
// }




// var sports = {
// 	soccer: {
// 		player:'11명', time:'90분'
// 	}
// };

// with(sports) {
// 	with(soccer) {
// 		console.log('while:', player);
// 		console.log('while:', time);
// 	}
// }


// for (var k = 0 ; k < 5 ; k++) {
// 	console.log(k);
//  }

//  var add = k + 10;

//  console.log(true);
//  console.log(false);

//  console.log("2 + true:", 2 + true);
//  console.log("2 + false:", 2 + false);

//  if (123) {
// 	console.log(123);
//  } 
//  if (0) {
// 	console.log('0을 true로 인식');
//  } else {
// 	console.log('0을 false로 인식');
//  }
//  // 숫자값으로 인식

//  var result = 22;
//  if (undefined) {
// 	result = true;
//  };
//  console.log('undefined:', result);
//  // undefined, null

// result = 33;
// if (null) { 
// 	result = 11; 
// } else {
// 	result = 44;
// }
// console.log('null:', result);


// var six,
// 	seven = 0,
// 	nine = 9;

// console.log(six || seven || nine);
// console.log(seven || six);
// console.log(six || seven);
