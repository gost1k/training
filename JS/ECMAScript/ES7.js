import log from './logger.js'

/** Возведение в степень */
log(2 ** 3) // Math.pow(2,3) = 8
// Можно использовать с присваиванием:
let x = 4;
x **= 2; // то же самое, что x = x ** 2

/** Array.prototype.includes() */
log(['a','b','c'].includes('a')) // true
log(['a','b','c'].includes('a',1)) // false (начинает искать с индекса 1)
log([NaN].includes(NaN)) // true Работает корректно с NaN (в отличие от indexOf()):