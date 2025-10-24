[1,2,3].forEach(v => console.log(v)); // [1,2,3]
[1,2,3].map(v => v * 2); // [2,4,6]
[1,2,3,4].filter(v => v % 2 === 0); // [2,4]
[1,2,3].every(v => v > 0); // true
[1,2,3].some(v => v > 2); // true
[1,2,3].reduce((sum, v) => sum + v, 0); // 6
["a","b","c"].reduceRight((a,b)=>a+b); // cba
[1,2,3,2].indexOf(2); // 1 "поиск ПЕРВОГО элемента в массиве"
[1,2,3,2].lastIndexOf(2); // 3 "поиск ПОСЛЕДНЕГО элемента в массиве"
Array.isArray([]);

/** Нельзя объявлять переменные не правильно */
'use strict'
// console.log(x = 10)
// (function test() { this.a = 1 })()

/** Object.create */
const animal = { eats: true }
const dog = Object.create(animal)
console.log(dog.eats)

/** Object.defineProperty */
const user = {}
Object.defineProperty(user, "name", { 
    value: "Andrey",
    writable: false,     // нельзя изменить значение
    enumerable: true,    // видно в циклах и JSON
    configurable: true   // можно удалить или переопределить
});
console.log(user.name)

/** Object.getOwnPropertyDescriptor  */
console.log(Object.getOwnPropertyDescriptor(user, "name"))

/** Object.keys */
const car = { brand: "BMW", year: 2020 };
console.log(Object.keys(car)); // ["brand", "year"]

/** Object.getOwnPropertyNames(obj) */
// Возвращает все собственные имена свойств (включая неперечисляемые).
Object.defineProperty(car, "secret", { value: 123, enumerable: false });
console.log(Object.getOwnPropertyNames(car)); // ["brand", "year", "secret"]

/** Object.preventExtensions(obj), Object.isExtensible(obj) */
// Запрещает добавлять новые свойства.
const obj1 = {}
Object.preventExtensions(obj1)
obj1.newProp = 5

/** Object.seal(obj), Object.isSealed(obj) */
// Запрещает добавление и удаление свойств, но изменение значений разрешено.

/** Object.freeze(obj), Object.isFrozen(obj) */
// Полностью замораживает объект (нельзя изменять, удалять, добавлять свойства).

/** JSON */
const usr = { name: "Bob", age: 25 };
const str = JSON.stringify(usr); // '{"name":"Bob","age":25}'
const obj = JSON.parse(str); // { name: 'Bob', age: 25 }

/* Getters и Setters в литералах объектов */
const person = {
    firstName: 'Andrey',
    lastName: 'Taranoov',
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(' ')
    }
}
console.log(person.fullName)
person.fullName = 'Alex Petrov'
console.log(person.fullName)

/** Function.prototype.bind */
// Позволяет привязать this к функции.
const user1 = { name: 'Andrey' }
function greet() {
    console.log(`Hi, ${this.name}`)
}
const bound = greet.bind(user)
bound()

