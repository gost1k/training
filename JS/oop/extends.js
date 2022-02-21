class Person {
    firstName;
    lastName;
    age;
    constructor(firstName, lastName, age) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
    }
    greeting() {
        console.log(`Привет я человек и меня зовут ${this._firstName}`);
    }
    get fullName() {
        return `Фамилия - ${this._lastName} Имя - ${this._firstName}`;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 0) {
            this._age = 0;
        }
        else {
            this._age = value;
        }
    }
}
class Employee extends Person {
    inn;
    number;
    snils;
    constructor(firstName, lastName, age, inn, number, snils) {
        super(firstName, lastName, age); // Parent class set
        this.inn = inn;
        this.number = number;
        this.snils = snils;
    }
    greeting() {
        console.log(`Привет я работник и меня зовут ${this._firstName}`);
    }
}
class Developer extends Employee {
    level;
    language;
    constructor(firstName, lastName, age, inn, number, snils, level, language) {
        super(firstName, lastName, age, inn, number, snils);
        this.level = level;
        this.language = language;
    }
    greeting() {
        console.log(`Привет я программист и меня зовут ${this._firstName}`);
    }
}
const person = new Person('Заушкин', 'Василий', 22);
const employee = new Employee('Name', 'Second Name', 20, 16, 20, 12);
const developer = new Developer('Таранов', 'Максим', 20, 16, 20, 12, 2, 'ru');
console.log(developer.fullName);
// person.greeting();
// employee1.greeting();
// developer.greeting();
const personList = [person, employee, developer];
function massGreeting(persons) {
    for (let i = 0; i < persons.length; i++) {
        const person = persons[i];
        person.greeting();
    }
}
massGreeting(personList);
