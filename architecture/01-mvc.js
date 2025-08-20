/**
 * MVC (Model-View-Controller)
 *
 * Назначение: Разделяет ответственность на три компонента:
 * - Model: состояние и бизнес-логика
 * - View: отображение
 * - Controller: принимает ввод пользователя и оркестрирует модель/представление
 *
 * Идея: Контроллер обновляет модель; модель уведомляет представление; представление запрашивает данные у модели.
 */

// ===== Простая реализация MVC без фреймворков (консольная имитация UI) =====

class Model {
  constructor(initial = { counter: 0 }) {
    this.state = { ...initial };
    this.listeners = new Set();
  }
  getState() {
    return { ...this.state };
  }
  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  notify() {
    this.listeners.forEach((fn) => fn(this.getState()));
  }
}

class View {
  constructor(model) {
    this.model = model;
    this.renderCount = 0;
  }
  render() {
    this.renderCount++;
    const { counter } = this.model.getState();
    console.log(`[View] render#${this.renderCount} -> counter=${counter}`);
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // Подписываемся на изменение модели, чтобы обновлять представление
    this.model.subscribe(() => this.view.render());
  }
  increment() {
    this.model.setState({ counter: this.model.getState().counter + 1 });
  }
  decrement() {
    this.model.setState({ counter: this.model.getState().counter - 1 });
  }
  reset() {
    this.model.setState({ counter: 0 });
  }
}

console.log("=== MVC: счетчик ===");
const model = new Model();
const view = new View(model);
const controller = new Controller(model, view);
view.render();
controller.increment();
controller.increment();
controller.decrement();
controller.reset();

/**
 * Преимущества:
 * - Четкое разделение ответственности
 * - Тестируемость модели и контроллера
 * - Возможность нескольких представлений одной модели
 * Недостатки:
 * - Контроллер может разрастаться
 * - Связи между компонентами могут быть неочевидны без конвенций
 */
