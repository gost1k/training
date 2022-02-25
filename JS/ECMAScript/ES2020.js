// Нововведения JavaScript в ES2020:
//
// метод String.prototype.matchAll;
// динамический import();
// тип BigInt;
// метод Promise.allSettled;
// объект globalThis;
// механизм выполнения цикла for-in;
// оператор Optional Chaining;
// оператор Nullish Coalescing.


// ------- Match All -----------

const string = 'Magic hex numbers: DEADBEEF CAFE';
const regex = /\b\p{ASCII_Hex_Digit}+b/gu;
for (const match of string.match(regex)) {
	console.log(match);
}
// Output:
// 'DEADBEEF'
// 'CAFE'

const string2 = 'Magic hex numbers: DEADBEEF CAFE';
const regex2 = /\b\p{ASCII_Hex_Digit}+b/gu;
for (const match of string2.matchAll(regex2)) {
	console.log(match);
}
// Output:
// ['DEADBEEF', index: 19, input: 'Magic hex numbers: BEADEEF CAFE']
// ['CAFE', index: 28, input: 'Magic hex numbers: BEADEEF CAFE']

const string3 = 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev';
const regex3 = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9\.]+)\b/g;
for (const {0: ocurrance, index, input, groups} of string3.matchAll(regex3)) {
	console.log(`${ocurrance} at ${index} with '${input}'`);
}

// -----------------------------------
// --------------- IMPORT ------------
// -----------------------------------

const moduleSpecifier = '../utils.js';
// Variant 1
import(moduleSpecifier)
	.then((module) => {
		module.doStaff1(); //Method-1
		module.doStaff2(); //Method-2
	});

//Variant 2
(async function() {
	const module = await import(moduleSpecifier);
	module.doStaff1();
	module.doStaff2();
})();

// ---------------------------------
// ------------- BigInt ------------
// ---------------------------------

const limit = Number.MAX_SAFE_INTEGER; // 9007199254740991
limit + 1; // 9007199254740992
limit + 2; // 9007199254740992 <--- MAX_SAFE_INTEGER +1 exceeded

// BigInt (constructor)
const larget = 9007199254740991n; // 9007199254740991n
const integer = BigInt(9007199254740991); // 9007199254740991n
const same = BigInt('9007199254740991'); // 9007199254740991n

// Typeof
typeof 10; // number
typeof 10n; // BigInt

// Equality
10n === BigInt(10); // true
10n == 10; // true

// -------------------------------------------------------
// ----------- метод Promise.allSettled; -----------------
// -------------------------------------------------------

const p1 = new Promise(resolve => resolve('Hamburger'));
const p2 = new Promise((_, reject) => reject('There is not Pasta!'));
const p3 = new Promise(resolve => resolve('Pizza!'));

Promise.all([p1, p2, p3])
	.then(response => console.log(response))
	.then(error => console.log(error));
// Result 'There is not Pasta! (Immediately rejects tith that error

Promise.allSettled([p1, p2, p3])
	.then(response => console.log(response))
// Wait for all passed promises to settle
// Result
// [ {status: 'fulfilled', value: 'Hamburger'}, { status: 'rejected', reason: 'There is not Pasta!'}, {status: 'fulfilled', value: 'Pizza!'} ]

//-------------------------------------------------------------
// -------------- Оператор Nullish Coalescing -----------------
//-------------------------------------------------------------

const values = {
	nullValue: null,
	numberValue: 400,
	zeroValue: 0,
	emptyText: '',
	falseValue: false
};

// OLD
const undefinedValue = values.undefinedValue || 'some other text'; // 'some other text'
// NEW Coalescing operator
const value = valuse.undefinedValue ?? 'some other text' // 'some other text'

//-------------------------------------------------------------
// -------------- Оператор Optional Chaining ------------------
//-------------------------------------------------------------

const book = {
	created_at: '22 jun 21:00:00',
	id: 985812501252,
	text: 'Some book with good text!',
	entities: {
		hashtag: ['Vuejs']
	}
}
// OLD
const hashtags = book.entities && book.entities.hashtag;
// New
const hashtags1 = book.entities?.hashtag;
const hashtags2 = book.entities?.hashtag ?? ['Vuejs'];

// Также стоит отметить, что многие API возвращают или object, или null/undefined,
// а вам может потребоваться извлечь свойство из результата только тогда, когда оно не является null.

// OLD
const form = {};
const book1 = form.querySelector('input[name=book]');
const value1 = book ? book.value : undefined;
// NEW
const value2 = form.querySelector('input[name=book]')?.value;

