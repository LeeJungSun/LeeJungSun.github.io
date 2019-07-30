(function ($, win, doc) {
  'use strict';

	function person (args) {
		var test = {
			a : 1
		}
		this.opts = $.extend({}, test, (args || {}));
		console.log(args);
	}

	person.prototype.getType = function () {
		console.log(this.opts.a)
	}
	person.prototype.getType2 = function () {
		return '인간'
	}

	var person1 = new person ({
		b : function () {
			ddd
		}
	});
	var person2 = new person ();

	person1.test = function () {}
	person1.test2 = function () {}

	console.log(person1.getType())
	console.log(person1)
	console.log(person2)



	class apple {
		constructor () {
			this.color = 'red'
		}
	}

	var apple1 = new apple ();

	// console.log(apple1)



	function fn () {
		var test = arguments;

		// console.log(test[1])
	}

	fn(1,2,3,4,5)
})(jQuery, window, document);