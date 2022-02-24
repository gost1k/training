// import { users } require('./mockup.js');

// Variable with type
let a: number = 0;
let isDone: boolean = false;
let color: string = 'green';
let array: number[]  = [1,2,3];
let x: [number, boolean] = [2, true];

// Types
type Style = 'bold' | 'italic';
let font: Style;
font = 'bold'; // font = 'some style' // Error

// ARRAYS
let names = ['luigi', 'mario', 'yoshi'];
names.push('toad');
// names.push(3); Wrong! Array of stings
// names[0] = 3; Same error

type MyList = [number?, string?, boolean?];
const arr: MyList = [];
arr.push(1);
arr.push('string');
arr.push(false);

//Functions
function warn(): void {
    console.log('Void no return', );
}
warn();

const circ = (diameter: number) => {
    return diameter * Math.PI;
}
console.log(circ(7.5)); // 23.561...

// Classes
class Animal {
    name: string;
    constructor(TheName: string) {
        this.name = TheName;
    }
    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distance: number = 5) {
        console.log('Slithering...');
        super.move(distance);
    }
}

class Horse extends Animal {
    constructor(name) {
        super(name);
    }
    move(distance: number = 45) {
        console.log('Golloping...');
        super.move(distance);
    }
}

let sam = new Snake('Sammy the Phyton'); //Build new class with construction name
let tom: Animal = new Horse('Tommy is palamino');
sam.move();
tom.move(34); // Set prop value for class method

// Intarface
interface checker {
    firstName   : string;
    lastName    : string;
    age         : number;
}
function YesNo(ask: boolean) {
    switch(ask) {
        case true: return 'Yes'; break;
        case false: return 'No'; break;
    }
}
function hi(man: checker) {
    debugger;
    return 'Hello, my name' + man.firstName + 'second Name is' + man.lastName + 'Age: ' + man.age;
}
let user = {firstName : 'Павлик', lastName: 'Морозов', age: 4};
console.log('hi(this.user)', hi(user));
console.log('YesNo(true);', YesNo(true));
