// window.onload = function () {
// 	// debugger;
// 	var sports = function () {};
// };

// function myHome(book, video, audio) {
// 	return book + video + audio;
// };
// // console.log(myHome('책', '비디오', '오디오'));

// var myHome2 = function (book, video, audio) {
// 	return book + video + audio;
// };
// console.log(myHome2('책', '비디오', '오디오'));

// window.onload = function () {
// 	function sports() {
// 		debugger;
// 		var player = 11;
	
// 		function soccer() {
// 			return player;
// 		};
	
// 		var baseball = function () {};
	
// 		soccer();
// 	};
// 	sports();
// };

// 함수 선언문, 함수 호출(), 함수 선언문
// function apple () {
// 	console.log('apple1');
// };
// apple();
// function apple () {
// 	console.log('apple2');
// };

// // 함수 표현식, 함수 호출(), 함수 표현식
// var orange = function () {
// 	console.log('orange1');
// };
// orange();
// var orange = function () {
// 	console.log('orange2');
// };

// // 함수 선언문, 함수 호출(), 함수 표현식
// function red () {
// 	console.log('red1');
// };
// red();
// var red = function () {
// 	console.log('red2');
// };

// // 함수 표현식, 함수 호출(), 함수 선언문
// var yellow = function () {
// 	console.log('yellow2');
// };
// yellow();
// function yellow () {
// 	console.log('yellow1');
// };

// window.onload = function () {
// 	debugger;
// 	function sales () {
// 		function get () {
// 			function discount () {};
// 			discount();
// 		};
// 		get();
// 	};
// 	sales();
// }

window.onload = function () {
	// var sports = function () {
	// 	var value = 123;
	// 	function baseball () {
	// 		console.log(value);
	// 	};
	// 	function soccer () {
	// 		console.log(value);
	// 	};
	// 	baseball();
	// 	soccer();
	// };
	// sports();

	// function Sports(value) {
	// 	this.value = value;
	// };
	// Sports.prototype.getValue = function () {
	// 	return this.value + 300;
	// };
	// var sportsObj = new Sports(123);

	// console.log(sportsObj.value);
	// console.log(sportsObj.getValue());
};

// var sports = {
// 	value : 123,
// 	get : function () {
// 		var value = 456;
// 		console.log(this === window);
// 		console.log(this.value);
// 	}
// };

// var comp = sports.get;
// comp();

// function get () {
// 	console.log('사과');
// };

// var sports = function () {
// 	function get (){
// 		console.log('포도');
// 	};

// 	this.get();
// 	get();
// };
// sports();

// var bonus = {
// 	value : 123,
// 	get : function () {
// 		return this.value;
// 	}
// };
// console.log(bonus.get());

// var fnObj = bonus.get.bind();
// console.log(typeof fnObj);
// console.log(fnObj());

// fnObj = bonus.get.bind(bonus);
// console.log(fnObj());

// var sports = {
// 	value : 123
// }

// var el = document.getElementById('clickID');
// el.onclick = show.bind(sports, el);

// function show(element, event) {
// 	console.log(element.textContent);
// 	console.log(event.target.id);
// 	console.log(this.value);
// }

// var sports = {
// 	soccer : {member : 11, time : 90},
// 	basketball : {member : 5, time : 48}
// };

// function showValues(sports){
// 	var type, obj;
// 	for (type in sports) {
// 		obj = sports[type];
// 		typeof obj === 'object' ? showValues(obj) : console.log(type, ':', obj);
// 	}
// };
// showValues(sports);

var total = (1+2);
var value = function () {
	return 123;
}
console.log('함수호출' + value());
value = function () {
	return 456;
}();

console.log('자동실행:' + value);
value = (function () {
	return 789;
})();

console.log(value);
(function () {
	console.log('ABC')
})();