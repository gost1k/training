// import { users } require('./mockup.js');
// Variable with type
let a = 0;
let isDone = false;
let color = 'green';
let array = [1, 2, 3];
let x = [2, true];
let font;
// font = 'some style' // Error
font = 'bold';
const arr = [];
arr.push(1);
arr.push('string');
arr.push(false);
//Functions
function warn() {
    console.log('Void no return');
}
warn();
// Classes
class Animal {
    name;
    constructor(TheName) {
        this.name = TheName;
    }
    move(distance = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}
class Snake extends Animal {
    constructor(name) {
        super(name);
    }
    move(distance = 5) {
        console.log('Slithering...');
        super.move(distance);
    }
}
class Horse extends Animal {
    constructor(name) {
        super(name);
    }
    move(distance = 45) {
        console.log('Golloping...');
        super.move(distance);
    }
}
let sam = new Snake('Sammy the Phyton'); //Build new class with construction name
let tom = new Horse('Tommy is palamino');
sam.move();
tom.move(34); // Set prop value for class method
function YesNo(ask) {
    switch (ask) {
        case true:
            return 'Yes';
            break;
        case false:
            return 'No';
            break;
    }
}
function hi(man) {
    debugger;
    return 'Hello, my name' + man.firstName + 'second Name is' + man.lastName + 'Age: ' + man.age;
}
let user = { firstName: 'Павлик', lastName: 'Морозов', age: 4 };
console.log('hi(this.user)', hi(user));
console.log('YesNo(true);', YesNo(true));
