function person () {
	this.age = '20'
};

person.prototype.age = '30'

var person1 = new person ();

console.log(person1);




class apple {
	constructor () {
		this.color = 'red'
	}
}

var apple1 = new apple ();

console.log(apple1)



function fn () {
	var test = arguments;

	console.log(test[1])
}

fn(1,2,3,4,5)