/**
 * MVP (Model-View-Presenter)
 *
 * Назначение: Разделяет ответственность на три компонента:
 * - Model: состояние и бизнес-логика
 * - View: только отображение и события UI; не содержит логики
 * - Presenter: посредник, содержит логику, реагирует на View, обновляет Model и View
 *
 * Отличия от MVC: View пассивен и общается только через Presenter; Presenter не зависит от платформы UI (легко тестируется)
 */

class Model {
  constructor(initial = { items: [] }) {
    this.state = { ...initial };
  }
  get items() {
    return [...this.state.items];
  }
  addItem(text) {
    this.state.items = [...this.state.items, { id: Date.now(), text }];
  }
  removeItem(id) {
    this.state.items = this.state.items.filter((i) => i.id !== id);
  }
}

class View {
  constructor() {
    this.handlers = {};
  }
  on(event, handler) {
    this.handlers[event] = handler;
  }
  trigger(event, payload) {
    this.handlers[event]?.(payload);
  }
  renderList(items) {
    console.log(
      "[View] Список:",
      items.map((i) => i.text).join(", ") || "(пусто)"
    );
  }
  showMessage(msg) {
    console.log("[View] Сообщение:", msg);
  }
}

class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bind();
    this.view.renderList(this.model.items);
  }
  bind() {
    this.view.on("add", (text) => {
      if (!text || !text.trim()) return this.view.showMessage("Введите текст");
      this.model.addItem(text.trim());
      this.view.renderList(this.model.items);
    });
    this.view.on("remove", (id) => {
      this.model.removeItem(id);
      this.view.renderList(this.model.items);
    });
  }
}

console.log("=== MVP: список задач ===");
const m = new Model();
const v = new View();
const p = new Presenter(m, v);

v.trigger("add", "Купить молоко");
v.trigger("add", "Почитать книгу");
v.trigger("remove", m.items[0]?.id);
v.trigger("add", "Выучить MVP");
