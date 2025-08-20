/**
 * Repository (Репозиторий)
 *
 * Назначение: Инкапсулирует логику доступа к данным и их маппинг между
 * доменной моделью и источниками данных (БД, API, кэш), предоставляя
 * коллекцию-подобный интерфейс (add, get, find, remove, list).
 */

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
  async add(user) {
    this.items.set(user.id, user);
    return user;
  }
  async get(id) {
    return this.items.get(id) || null;
  }
  async remove(id) {
    const u = this.items.get(id) || null;
    this.items.delete(id);
    return u;
  }
  async find(predicate) {
    return Array.from(this.items.values()).filter(predicate);
  }
  async list() {
    return Array.from(this.items.values());
  }
}

// Мок удаленного API
class RemoteUserApi {
  constructor(latencyMs = 50) {
    this.latencyMs = latencyMs;
    this.storage = new Map();
  }
  _delay() {
    return new Promise((r) => setTimeout(r, this.latencyMs));
  }
  async create(dto) {
    await this._delay();
    this.storage.set(dto.id, dto);
    return dto;
  }
  async read(id) {
    await this._delay();
    return this.storage.get(id) || null;
  }
  async update(id, patch) {
    await this._delay();
    const cur = this.storage.get(id) || null;
    if (!cur) return null;
    const next = { ...cur, ...patch };
    this.storage.set(id, next);
    return next;
  }
  async remove(id) {
    await this._delay();
    const cur = this.storage.get(id) || null;
    this.storage.delete(id);
    return cur;
  }
  async query(filterFn) {
    await this._delay();
    return Array.from(this.storage.values()).filter(filterFn);
  }
}

class ApiUserRepository {
  constructor(api) {
    this.api = api;
  }
  async add(user) {
    const dto = await this.api.create(user);
    return new User(dto);
  }
  async get(id) {
    const dto = await this.api.read(id);
    return dto ? new User(dto) : null;
  }
  async remove(id) {
    const dto = await this.api.remove(id);
    return dto ? new User(dto) : null;
  }
  async find(predicate) {
    const all = await this.api.query(() => true);
    return all.map((d) => new User(d)).filter(predicate);
  }
  async list() {
    const all = await this.api.query(() => true);
    return all.map((d) => new User(d));
  }
}

console.log("=== Repository: InMemory и API ===");
(async () => {
  const memRepo = new InMemoryUserRepository();
  await memRepo.add(new User({ id: "1", name: "Alice", email: "a@x" }));
  await memRepo.add(
    new User({ id: "2", name: "Bob", email: "b@x", active: false })
  );
  console.log("All:", await memRepo.list());
  console.log("Active:", await memRepo.find((u) => u.active));
  await memRepo.remove("2");
  console.log("After remove:", await memRepo.list());

  const api = new RemoteUserApi(10);
  const apiRepo = new ApiUserRepository(api);
  await apiRepo.add(new User({ id: "10", name: "Carol", email: "c@x" }));
  await apiRepo.add(new User({ id: "11", name: "Dave", email: "d@x" }));
  console.log("API all:", await apiRepo.list());
})();
