// Modules import\export
import log from "./logger.js"

// let, const
function test() {
    // Блочная область видимости, существует только внутри функции
    let a = 0
    //глобальная область видимости
    var b = 0
}
// log(a ? a : '') // a is not defined

/** Стрелочные функции */
[1,2,3,4,5].map(x => x * 2)

/** Шаблонные строки */
log(`Привет ${true ? 'Андрей': 'без имени'}`)

/** Деструктуризация */
const { name, age } = { firstName: 'Andrey', age: 36 } 
const [first, second] = [1,2]

// Краткий синтаксис для свойст и методов
const user = { 
    name // name: name 
}

// ...spread, ...rest
const arr = Array.from('1234')
log([...arr]) // [1, 2, 3, 4]
function restFunc(a, ...rest) {
    log('only rest:', rest)
}
restFunc(...arr)

/** Параметры по умолчанию */
const defaultFunc = (name = 'Andrey') => log('defaultName', name)
defaultFunc()

/** for ... of */
for(const number of [1,2]) {
    console.log('for of', number)
}

/** Classes */
class Car {
    constructor(name) {
        this.name = name
    }
    drive() { console.log(this.name, 'едет') }
}
class MyCar extends Car {}
new MyCar('Супер автомобиль').drive()

/** Promise */
const delay = ms => new Promise((res, rej) => setTimeout(res, ms))

/** Символы */
const id = Symbol['id']
const user1 = { name: 'Alex', [id]: 123 };
console.log(user1[id]); // 123

/** Map и Set */
const map = new Map()
map.set('name', 'Andrey')
log('new Get map.get("name")', map.get('name')) // Andrey

const set = new Set([1,2,3,1,2,3])
log('new Set', set) // Set(3) {1,2,3}

/** WeakMap и WeakSet */
let obj = {}
const wm = new WeakMap()
wm.set(obj, 'Какие-то данные')
obj = null // теперь можно удалить из памяти

/** Итераторы и генераторы */
function* counter() {
  yield 1;
  yield 2;
  yield 3;
}
for (const n of counter()) console.log(n);

/** Unicode улучшения */
// Строки и регулярки теперь полностью поддерживают Unicode (u-флаг).
log(/^👍$/u.test('👍')); // true

/** Новое в Number, Math, Object, Array, String */
Object.assign({}, {a:1}) // Копирование свойств без ссылки
Array.from('123') // [1,2,3]
'hello'.startsWith('he'); // true
'hello'.includes('ell'); // true
'hello'.repeat(3); // hellohellohello