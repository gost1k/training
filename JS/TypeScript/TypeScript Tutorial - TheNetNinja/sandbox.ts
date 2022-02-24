const character = 'luigi';
console.log(character);
const inputs = document.querySelectorAll('input');
console.log(inputs);

inputs.forEach(input => {
    console.log(input);
})

let names = ['luigi', 'mario', 'yoshi'];

names.push('toad');
names.push(3);
names[0] = 3;