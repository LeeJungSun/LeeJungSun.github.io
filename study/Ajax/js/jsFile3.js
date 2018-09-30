"use strict";

// debugger;

// var node = document.querySelector('ul');
// for (var k = 0; k < node.children.length; k++) {
// 	var el = node.children[k];
// 	el.onclick = function (e) {
// 		e.target.style.backgroundColor = "yellow";
// 		console.log(k);
// 	};
// };

const Sports = function () {
	this.member = 11;
};

Sports.prototype.getMember = function () {};

const sportsObj = new Sports();

console.log(sportsObj.__proto__ === Sports.prototype);

// 1. new Sports로 인스턴스를 생성하여 sportsObj에 할당
// 2. Sports.prototype에 연결된 프로퍼티로 인스턴스를 생성하여 sportsObj.__

// __proto__ : object
// 1. 타입이 function이 아닌 Object
// 2. Sports.prototype에 연결된 getMember가 첨부됨