/**
 * MVVM (Model-View-ViewModel)
 *
 * Назначение: Разделяет состояние (Model), презентационную логику и биндинги (ViewModel)
 * и декларативное отображение (View). ViewModel предоставляет реактивные свойства/команды,
 * которые View привязывает к UI. Здесь имитируем биндинг через события.
 */

class ObservableValue {
  constructor(value) {
    this._value = value;
    this.listeners = new Set();
  }
  get value() {
    return this._value;
  }
  set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.listeners.forEach((l) => l(v));
    }
  }
  subscribe(l) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
}

class Model {
  constructor() {
    this.firstName = "Alice";
    this.lastName = "Smith";
  }
}

class ViewModel {
  constructor(model) {
    this.model = model;
    this.firstName = new ObservableValue(model.firstName);
    this.lastName = new ObservableValue(model.lastName);
    this.fullName = new ObservableValue(`${model.firstName} ${model.lastName}`);
    // Команда сохранения
    this.saveCommand = () => {
      console.log(
        "[ViewModel] save",
        this.firstName.value,
        this.lastName.value
      );
      this.model.firstName = this.firstName.value;
      this.model.lastName = this.lastName.value;
    };
    // Автообновление fullName при изменениях
    this.firstName.subscribe(() => this.updateFullName());
    this.lastName.subscribe(() => this.updateFullName());
  }
  updateFullName() {
    this.fullName.value =
      `${this.firstName.value} ${this.lastName.value}`.trim();
  }
}

class View {
  constructor(vm) {
    this.vm = vm;
    this.vm.fullName.subscribe((v) => this.render(v));
  }
  render(fullName = this.vm.fullName.value) {
    console.log(`[View] FullName: ${fullName}`);
  }
}

console.log("=== MVVM: профиль пользователя ===");
const model = new Model();
const vm = new ViewModel(model);
const view = new View(vm);
view.render();
vm.firstName.value = "Bob";
vm.lastName.value = "Brown";
vm.saveCommand();
