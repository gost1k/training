import log from './logger.js'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/** Асинхронные итераторы (for await...of) */
async function* fetchData() {
  await delay(100);
  yield 'Шаг 1';
  
  await delay(100);
  yield 'Шаг 2';
  
  await delay(100);
  yield 'Шаг 3';
}

const letFetch = async () => {
  for await (const someData of fetchData()) {
    log(someData)
  }
}

letFetch()

/** Оператор Rest/Spread для объектов (...) */
const user = { name: 'Andrey', age: 36, city: 'Moscow'}
const {city, age, ...info} = user
log(city, age, info)

/** Promise.prototype.finally() */
fetch('https://api.example.com')
  .then(() => console.log('✅ Успешно'))
  .catch(() => console.log('❌ Ошибка'))
  .finally(() => console.log('🔚 Завершено'));


/** Улучшенная обработка регулярных выражений (RegExp) */
// Теперь . в RegExp может совпадать с переводом строки (\n), если указан флаг s.
const text = 'Hello\nWorld';
console.log(/Hello.World/.test(text));   // ❌ false
console.log(/Hello.World/s.test(text));  // ✅ true

/** Упорядоченные свойства объектов */
// Теперь перечисление ключей объекта (Object.keys, Object.values, Object.entries) следует строгому порядку:
// Сначала все числовые ключи (по возрастанию),
// Затем строковые (по порядку добавления),
// Затем символьные (по порядку добавления).
const obj = { 2: 'b', 1: 'a', z: 'z', a: 'x', [Symbol('s')]: 'sym' };
console.log(Object.keys(obj)); // ['1', '2', 'z', 'a']

/** Улучшения в Template Literals (Tagged Templates) */
// Теперь теги шаблонных строк получают «сырые» (raw) строки без интерпретации символов \n, \t и т.п.
const showRaw = (strings) => console.log(strings.raw[0])
showRaw`строка с \n не преобразуется` // → строка с \n не преобразуется
