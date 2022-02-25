// import { users } require('./mockup.js');

// -----------------------------------
// ------------ VARIABLES ------------
// -----------------------------------
let a: number = 0;
let isDone: boolean = false;
let color: string = 'green';
let uid: string|number;
let arrOfStrings : string[];


// -----------------------------------
// ----------- TYPES -----------------
// -----------------------------------
type Style = 'bold' | 'italic';
let font: Style;
font = 'bold'; // font = 'some style' // Error

type StringOrNum = string | number;
type objWithName = {name: string, uid: StringOrNum};

const logDetails = (uid: StringOrNum, item: string) => {
    console.log(`${item} has a uid of ${uid}`);
}
const greet1 = (user: objWithName) => {
    console.log(`${user.name} says hello`);
}

// -----------------------------------
// -------------- ARRAYS -------------
// -----------------------------------
let array: number[]  = [1,2,3];
let ninjas: string[] = []; //Array of strings
let mixed: (string|number|boolean)[] = []; // Array of types
let x: [number, boolean] = [2, true];
let names = ['luigi', 'mario', 'yoshi']; // Array of strings
// names.push('toad');
// names.push(3); Wrong! Array of stings
// names[0] = 3; Same error

type MyList = [number?, string?, boolean?];
const arr: MyList = [];
// arr.push(1);
// arr.push('string');
// arr.push(false);

// -----------------------------------
// ------------ Functions ------------
// -----------------------------------
let greet: (a: string, b: string) => void;
let calc: (a: number, b: number, c: string) => number;
greet = (name: string, greeting: string) => {
    console.log(`${name} says ${greeting}`)
}

const add = (a: number, b: number, c: number | string = 10) => {
    console.log(a + b);
    console.log(c); // Default = 10
};
add(5, 10);

const minus = (a: number, b: number): number => { // return number
    return a+ b;
}
let result = minus(10, 7);

function warn(): void { // Void Function have NOT RETURN something
    console.log('Void function return undefined', );
}
warn();

const circ = (diameter: number) => {
    return diameter * Math.PI;
}
console.log(circ(7.5)); // 23.561...


// -----------------------------------
// ----------- Objects ---------------
// -----------------------------------
let ninjaOne: object;
ninjaOne = { name: 'yoshi', age: 30};

let ninjaTwo: {
    name: string,
    age: number,
    beltColour: string
}
ninjaTwo = { name: 'Mario',  age: 20, beltColour: 'black' };

// -----------------------------------
// ---------- Intarface --------------
// -----------------------------------
interface checker {
    firstName   : string;
    lastName    : string;
    age         : number;
}
function YesNo(ask: boolean) {
    switch(ask) {
        case true: return 'Yes';
        case false: return 'No';
    }
}
function hi(man: checker) {
    debugger;
    return 'Hello, my name' + man.firstName + 'second Name is' + man.lastName + 'Age: ' + man.age;
}
let user = {firstName : 'Павлик', lastName: 'Морозов', age: 4};
console.log('hi(this.user)', hi(user));
console.log('YesNo(true);', YesNo(true));

// -----------------------------------
// ----------- Classes ---------------
// -----------------------------------
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