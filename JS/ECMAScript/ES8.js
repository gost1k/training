import log from './logger.js'

/** Async \ Await */
const promise = new Promise((resolve, reject) => setTimeout(resolve, 1000))
const asyncFunc = async() => {
    await promise
    // Ждет выполнения промиса в 1000 сек
    log('Выполнено после setTimeout 1000')
}
asyncFunc()

/** Object.values и Object.entries */
const user = {
    name: 'Andrey',
    age: 36,
    city: 'Moscow'
}

log(Object.values(user)) // ['Andrey', 36, 'Moscow']
log(Object.entries(user)) //[ ['name', 'Andrey'], ['age', 36], ['city', 'Moscow'] ]
// Часто удобно для преобразования в Map:
const map = new Map(Object.entries(user))

/** String.prototype.padStart() и .padEnd() */
// Добавляют символы в начало или конец строки до нужной длины.
log('строка'.padStart(3, '0')) // 000строка
log('42'.padEnd(5, '.')) // 42...

/** Object.getOwnPropertyDescriptors() */
// Позволяет получить все дескрипторы свойств объекта (включая геттеры/сеттеры, writable и т.п.).
const obj = {
  get value() { return 42 }
}
log(Object.getOwnPropertyDescriptors(obj))
// Удобно при клонировании объектов с сохранением геттеров/сеттеров:
const clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))

/** SharedArrayBuffer и Atomics */
// TODO тема еще  не изучена нормально.
// Добавляют низкоуровневые примитивы для многопоточности (используются с Web Workers).
// Это позволяет нескольким потокам работать с одной и той же областью памяти безопасно.
const buffer = new SharedArrayBuffer(16)
const view = new Int32Array(buffer)
Atomics.store(view, 0, 123)
log(Atomics.load(view, 0)) // 123

/** Trailing commas (запятые в параметрах функций) */
const testFunc = (a,b,) => [1,2,3,4,]