/**
 * Event Sourcing (Источники событий)
 *
 * Назначение: Сохраняет все изменения состояния как последовательность событий.
 * Текущее состояние восстанавливается путем воспроизведения событий.
 *
 * Преимущества:
 * - Полная история изменений
 * - Аудит и отладка
 * - Временные путешествия (состояние на любой момент времени)
 * - Возможность пересмотра событий
 */

// ===== Базовые классы =====
class DomainEvent {
  constructor(aggregateId, version, timestamp = new Date()) {
    this.aggregateId = aggregateId;
    this.version = version;
    this.timestamp = timestamp;
  }
}

class Aggregate {
  constructor(id) {
    this.id = id;
    this.version = 0;
    this.uncommittedEvents = [];
  }

  apply(event) {
    this.version++;
    this.uncommittedEvents.push(event);
  }

  markEventsAsCommitted() {
    this.uncommittedEvents = [];
  }
}

// ===== События для User =====
class UserCreatedEvent extends DomainEvent {
  constructor(userId, email, name) {
    super(userId, 1);
    this.email = email;
    this.name = name;
  }
}

class UserEmailChangedEvent extends DomainEvent {
  constructor(userId, version, oldEmail, newEmail) {
    super(userId, version);
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
  }
}

class UserActivatedEvent extends DomainEvent {
  constructor(userId, version) {
    super(userId, version);
  }
}

class UserDeactivatedEvent extends DomainEvent {
  constructor(userId, version) {
    super(userId, version);
  }
}

// ===== Агрегат User =====
class User extends Aggregate {
  constructor(id, email, name) {
    super(id);
    this.email = email;
    this.name = name;
    this.active = false;

    // Применяем событие создания
    this.apply(new UserCreatedEvent(id, email, name));
  }

  changeEmail(newEmail) {
    if (this.email === newEmail) return;

    const oldEmail = this.email;
    this.email = newEmail;
    this.apply(
      new UserEmailChangedEvent(this.id, this.version + 1, oldEmail, newEmail)
    );
  }

  activate() {
    if (this.active) return;

    this.active = true;
    this.apply(new UserActivatedEvent(this.id, this.version + 1));
  }

  deactivate() {
    if (!this.active) return;

    this.active = false;
    this.apply(new UserDeactivatedEvent(this.id, this.version + 1));
  }

  // Восстановление состояния из событий
  static fromEvents(events) {
    if (events.length === 0)
      throw new Error("Cannot create user from empty events");

    const firstEvent = events[0];
    if (!(firstEvent instanceof UserCreatedEvent)) {
      throw new Error("First event must be UserCreatedEvent");
    }

    const user = new User(
      firstEvent.aggregateId,
      firstEvent.email,
      firstEvent.name
    );
    user.version = 0;
    user.uncommittedEvents = [];

    // Применяем все события по порядку
    for (let i = 1; i < events.length; i++) {
      user.applyEvent(events[i]);
    }

    return user;
  }

  applyEvent(event) {
    this.version = event.version;

    switch (event.constructor.name) {
      case "UserEmailChangedEvent":
        this.email = event.newEmail;
        break;
      case "UserActivatedEvent":
        this.active = true;
        break;
      case "UserDeactivatedEvent":
        this.active = false;
        break;
    }
  }
}

// ===== Event Store =====
class EventStore {
  constructor() {
    this.events = new Map(); // aggregateId -> events[]
  }

  async saveEvents(aggregateId, events, expectedVersion) {
    const existingEvents = this.events.get(aggregateId) || [];

    if (expectedVersion !== existingEvents.length) {
      throw new Error(
        `Concurrency conflict: expected version ${expectedVersion}, got ${existingEvents.length}`
      );
    }

    const newEvents = events.map((event, index) => ({
      ...event,
      version: expectedVersion + index + 1,
    }));

    this.events.set(aggregateId, [...existingEvents, ...newEvents]);
    return newEvents;
  }

  async getEvents(aggregateId) {
    return this.events.get(aggregateId) || [];
  }

  async getAllEvents() {
    return Array.from(this.events.values()).flat();
  }
}

// ===== Projection (Read Model) =====
class UserProjection {
  constructor() {
    this.users = new Map();
  }

  // Обработка события для обновления проекции
  handle(event) {
    switch (event.constructor.name) {
      case "UserCreatedEvent":
        this.users.set(event.aggregateId, {
          id: event.aggregateId,
          email: event.email,
          name: event.name,
          active: false,
          version: event.version,
        });
        break;

      case "UserEmailChangedEvent":
        const user = this.users.get(event.aggregateId);
        if (user) {
          user.email = event.newEmail;
          user.version = event.version;
        }
        break;

      case "UserActivatedEvent":
        const activeUser = this.users.get(event.aggregateId);
        if (activeUser) {
          activeUser.active = true;
          activeUser.version = event.version;
        }
        break;

      case "UserDeactivatedEvent":
        const deactiveUser = this.users.get(event.aggregateId);
        if (deactiveUser) {
          deactiveUser.active = false;
          deactiveUser.version = event.version;
        }
        break;
    }
  }

  // Восстановление проекции из всех событий
  rebuild(eventStore) {
    this.users.clear();
    return eventStore.getAllEvents().then((events) => {
      events.sort((a, b) => a.timestamp - b.timestamp);
      events.forEach((event) => this.handle(event));
    });
  }

  getUser(id) {
    return this.users.get(id);
  }

  getActiveUsers() {
    return Array.from(this.users.values()).filter((u) => u.active);
  }

  getAllUsers() {
    return Array.from(this.users.values());
  }
}

// ===== Repository =====
class UserRepository {
  constructor(eventStore) {
    this.eventStore = eventStore;
  }

  async save(user) {
    const events = user.uncommittedEvents;
    if (events.length === 0) return;

    await this.eventStore.saveEvents(
      user.id,
      events,
      user.version - events.length
    );
    user.markEventsAsCommitted();
  }

  async findById(id) {
    const events = await this.eventStore.getEvents(id);
    if (events.length === 0) return null;

    return User.fromEvents(events);
  }
}

// ===== Пример использования =====
console.log("=== Event Sourcing: пример ===");
(async () => {
  const eventStore = new EventStore();
  const userRepo = new UserRepository(eventStore);
  const projection = new UserProjection();

  // Создаем пользователя
  const user = new User("1", "alice@example.com", "Alice");
  await userRepo.save(user);

  // Изменяем email
  user.changeEmail("alice.smith@example.com");
  await userRepo.save(user);

  // Активируем пользователя
  user.activate();
  await userRepo.save(user);

  // Восстанавливаем проекцию
  await projection.rebuild(eventStore);
  console.log("Active users:", projection.getActiveUsers());
  console.log("All users:", projection.getAllUsers());

  // Восстанавливаем агрегат из событий
  const restoredUser = await userRepo.findById("1");
  console.log("Restored user:", {
    id: restoredUser.id,
    email: restoredUser.email,
    name: restoredUser.name,
    active: restoredUser.active,
    version: restoredUser.version,
  });

  // Показываем все события
  const allEvents = await eventStore.getAllEvents();
  console.log(
    "All events:",
    allEvents.map((e) => ({
      type: e.constructor.name,
      aggregateId: e.aggregateId,
      version: e.version,
      data: { ...e },
    }))
  );
})();

/**
 * Преимущества Event Sourcing:
 * - Полная история изменений
 * - Аудит и отладка
 - Временные путешествия
 * - Возможность пересмотра событий
 * - Отказоустойчивость
 * 
 * Недостатки:
 * - Сложность реализации
 * - Потребление памяти для больших историй
 * - Сложность запросов
 * - Необходимость обработки миграций схем событий
 * 
 * Применение:
 * - Системы с высокими требованиями к аудиту
 * - Сложные доменные модели
 * - Системы с необходимостью отката изменений
 * - Аналитика и отчетность
 */
