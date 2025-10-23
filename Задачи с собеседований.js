// Найти уникальные значения массива
const a = [1,2,3,4,5,6,7, 5, 5,7] 

// Вариант 1
const b = {} 
for(i = 0; i < a.length; i++ ) { 
    if(a[i] in b) { 
      b[a[i]]++  
    } else { 
        b[a[i]] = 0 
    } 
} 
for (const [key, value] of Object.entries(b)) { 
    if(value > 0) console.log(key) 
}
// Вариант 2 (indexOf находит первое вхождение в массиве)
const duplicates = [...new Set(a.filter((num, i) => a.indexOf(num) !== i))];


/** Сгенирированные задачи chatgpt **/
// Сформировать объект, где ключ — это категория, а значение — количество товаров в ней.
const products = [
  { name: 'Яблоко', category: 'Фрукты' },
  { name: 'Груша', category: 'Фрукты' },
  { name: 'Морковь', category: 'Овощи' },
  { name: 'Картофель', category: 'Овощи' },
  { name: 'Банан', category: 'Фрукты' },
];

// Вариант 1
const res = {}
products.forEach(({ name, category}) => 
  res[category] ? res[category]++ : res[category] = 1
)

// Вариант 2
const res2 = products.reduce((acc, {category}, index, arr) => {
  acc[category] = (acc[category] || 0) + 1 
  return acc
}, {})

// формировать объект, где ключ — имя пользователя, а значение — общее количество купленных им товаров.
const orders = [
  { user: 'Анна', items: ['яблоко', 'банан'] },
  { user: 'Иван', items: ['морковь'] },
  { user: 'Анна', items: ['груша', 'киви'] },
  { user: 'Иван', items: ['тыква', 'картофель', 'свёкла'] },
];

// Ответ
const res = orders.reduce((acc, { user, items }, index, arr) => {
    acc[user] = (acc[user] || 0) + items.length
    return acc
}, {})



// Codewars интересные задачи

/** 
    let testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15];
    let actual = countPositivesSumNegatives(testData);
    let expected = [10, -65];
 */
function countPositivesSumNegatives(input) {
  if(!input || !Array.isArray(input) || !input.length) return []
  const positive = input.filter(x => x > 0).length
  const negative = input.filter(x => x < 0).reduce((acc, num) => {
    acc = acc + num
    return acc
  } , 0)
  
  return [positive, negative]
}