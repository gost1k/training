/** Object.groupBy() и Map.groupBy() */ 
const items = [
  { name: 'Pencil', qty: 100 },
  { name: 'Pen', qty: 50 },
  { name: 'Notebook', qty: 150 },
  { name: 'Scale', qty: 0 },
];

console.log('Object.groupBy() и Map.groupBy()')

// Передаем массив, item и условия группировки в callback
const groupped = Object.groupBy(items, ({ name, qty}) => qty > 0 ? 'Available' : 'notAvailable')
console.log(groupped)

// Map.groupBy() работает аналогично, но возвращает объект типа Map
const mapGroupped = Map.groupBy(items, ({ name, qty}) => qty > 0 ? 'Available' : 'notAvailable')
console.log(mapGroupped)


/** Promise.withResolvers() */
const { promise, resolve, reject } = Promise.withResolvers()
const button = document.querySelector('button')
button.addEventListener('click', () => resolve('Кнопка нажата!'))

promise
    .then(message => console.log(message))
    .catch(error => console.error(error))
    
// Несколько промисов
const p1 = Promise.withResolvers();
const p2 = Promise.withResolvers();

p1.promise.then(value => console.log('p1 resolved with', value));
p2.promise.then(value => console.log('p2 resolved with', value));

// Разрешаем их по разному
p1.resolve('результат 1');
p2.resolve('результат 2');

/** String.prototype.isWellFormed() .toWellFormed() */
console.log('hello world'.isWellFormed())
console.log('\uD83D'.toWellFormed().isWellFormed())

/** Regexp /v the character U+1d49c "𝒜" */
console.log('Regexp /v', (/[a-z𝒜-𝓏]/v).test('𝒜'))

/** Record и Tuple неизменяемый объект и массив */
// Только с babel через npm, браузеры не поддерживают
// const record = #{ name: 'Andrey', age: 36 }
// const tuple = #[1,2,3]

/** Pepline Operator */
// Только с babel через npm, браузеры не поддерживают
// const result = "-64"
//   |> parseInt
//   |> Math.abs
//   |> Math.sqrt;
// Аналог const result = Math.sqrt(Math.abs(parseInt("-64")));

/** Atomics.waitAsync() */
// Не разобрался с ходу, надо копать...