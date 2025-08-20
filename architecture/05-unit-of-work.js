/**
 * Unit of Work (Единица работы)
 *
 * Назначение: Отслеживает изменения в наборе объектов (new/dirty/removed)
 * и координирует их атомарное сохранение как одну транзакцию.
 */

class UnitOfWork {
  constructor(repository) {
    this.repo = repository;
    this.newObjects = new Map();
    this.dirtyObjects = new Map();
    this.removedObjects = new Map();
  }
  registerNew(entity) {
    this.newObjects.set(entity.id, entity);
  }
  registerDirty(entity) {
    if (!this.newObjects.has(entity.id))
      this.dirtyObjects.set(entity.id, entity);
  }
  registerRemoved(entity) {
    // если объект новый и удален до коммита, просто забываем его
    if (this.newObjects.delete(entity.id)) return;
    this.dirtyObjects.delete(entity.id);
    this.removedObjects.set(entity.id, entity);
  }
  clear() {
    this.newObjects.clear();
    this.dirtyObjects.clear();
    this.removedObjects.clear();
  }
  async commit() {
    // Последовательность: создаем новые, обновляем измененные, удаляем помеченные
    for (const [, e] of this.newObjects) {
      await this.repo.add(e);
    }
    for (const [, e] of this.dirtyObjects) {
      await this.repo.add(e); /* упрощенно: upsert */
    }
    for (const [, e] of this.removedObjects) {
      await this.repo.remove(e.id);
    }
    this.clear();
  }
}

// Пример использования поверх InMemory репозитория из Repository паттерна
class User {
  constructor({ id, name, email, active = true }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.active = active;
  }
}
class InMemoryUserRepository {
  constructor() {
    this.items = new Map();
  }
  async add(u) {
    this.items.set(u.id, u);
    return u;
  }
  async remove(id) {
    const u = this.items.get(id);
    this.items.delete(id);
    return u;
  }
  async list() {
    return Array.from(this.items.values());
  }
}

console.log("=== Unit of Work: транзакционное сохранение ===");
(async () => {
  const repo = new InMemoryUserRepository();
  const uow = new UnitOfWork(repo);
  const u1 = new User({ id: "1", name: "Alice", email: "a@x" });
  const u2 = new User({ id: "2", name: "Bob", email: "b@x" });
  uow.registerNew(u1);
  uow.registerNew(u2);
  u2.name = "Bob Jr";
  uow.registerDirty(u2);
  uow.registerRemoved(u1);
  await uow.commit();
  console.log("Repo state:", await repo.list());
})();
