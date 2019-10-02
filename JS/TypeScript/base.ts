// import { users } require('./mockup.js');

let a: number = 0;
let isDone: boolean = false;
let color: string = 'green';
let array: number[]  = [1,2,3];
let x: [number, boolean] = [2, true];

function warn(): void {
    console.log('Void no return', );
}

warn();

class personal {

}

interface checker {
    firstName: string;
    lastName: string;
    age: number;
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
