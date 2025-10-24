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
