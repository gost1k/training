// Примитивы
let num: number = 5;
let str: string = 'hello';
let bool: boolean = true;
let anything: any = 123;
let unknownVar: unknown = 'abc';
let nothing: null = null;
let undef: undefined = undefined;

// Массивы и кортежи
let arr: number[] = [1,2,3];
let arr2: Array<string> = ['a','b'];
let tuple: [string, number] = ['age', 30];

// Enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Union и Intersection
let value: string | number = 'hello';
type A = {a: number};
type B = {b: string};
type C = A & B; // Intersection {a: number, b: string}

// Интерфейсы и типы
interface User {name: string, age: number}
type Point = {x: number, y: number};
const user: User = {name: 'John', age: 25};

// Типизация функций
const sum = (a: number, b: number): number => a + b;
const log = (msg: string): void => console.log(msg);

// Generics
function wrap<T>(value: T): {value: T} { return {value}; }
const wrapped = wrap<number>(123);

// Utility Types
interface Todo {id: number, title: string, done: boolean}
type PartialTodo = Partial<Todo>;
type RequiredTodo = Required<PartialTodo>;
type PickTodo = Pick<Todo, 'id'|'title'>;
type OmitTodo = Omit<Todo, 'done'>;
type RecordTodo = Record<'a'|'b', Todo>;

// Классы и наследование
class Person {
  constructor(public name: string, private age: number){}
  greet(): string { return `Hi, ${this.name}`; }
}
class Employee extends Person {
  constructor(name:string, age:number, public position:string){ super(name, age); }
}
const emp = new Employee('John', 30, 'Dev');

// Type Guards
function isNumber(x: unknown): x is number {
  return typeof x === 'number';
}
function double(x: number | string){
  return isNumber(x) ? x * 2 : x + x;
}

// Полезные короткие приёмы
let elem: HTMLElement = document.getElementById('app')!;
const len = user?.name?.length;
const val = undefined ?? 'default';