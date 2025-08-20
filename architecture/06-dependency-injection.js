/**
 * Dependency Injection (Внедрение зависимостей)
 *
 * Назначение: Отделяет создание зависимостей от их использования, что упрощает
 * тестирование, конфигурацию и замену реализаций.
 *
 * Способы внедрения:
 * - Конструктор (предпочтительно)
 * - Сеттеры/методы
 * - Интерфейсы/фабрики (передача фабрик вместо конкретных зависимостей)
 *
 * Также часто используется DI-контейнер для конфигурирования графа объектов.
 */

// ===== Пример без DI (жесткая связность) =====
class EmailService {
  send(to, subject, body) {
    console.log(`[EmailService] to=${to} subject=${subject}`);
  }
}

class UserRepository {
  constructor() {
    this.users = new Map();
  }
  save(user) {
    this.users.set(user.id, user);
    return user;
  }
  findById(id) {
    return this.users.get(id) || null;
  }
}

class RegistrationServiceTightCoupling {
  constructor() {
    // Анти-паттерн: сервис сам создает зависимости
    this.repo = new UserRepository();
    this.mail = new EmailService();
  }
  register(user) {
    this.repo.save(user);
    this.mail.send(user.email, "Welcome", "Thanks for registering!");
  }
}

// ===== Пример с DI (через конструктор) =====
class RegistrationService {
  constructor(userRepository, mailService) {
    this.repo = userRepository;
    this.mail = mailService;
  }
  register(user) {
    this.repo.save(user);
    this.mail.send(user.email, "Welcome", "Thanks for registering!");
  }
}

// ===== Упрощенный DI-контейнер =====
class Container {
  constructor() {
    this.registrations = new Map(); // token -> provider
    this.singletons = new Map(); // token -> instance
  }
  // provider: () => instance
  register(token, provider, { singleton = false } = {}) {
    this.registrations.set(token, { provider, singleton });
  }
  resolve(token) {
    const reg = this.registrations.get(token);
    if (!reg) throw new Error(`No provider for ${token}`);
    if (reg.singleton) {
      if (!this.singletons.has(token)) {
        this.singletons.set(token, reg.provider());
      }
      return this.singletons.get(token);
    }
    return reg.provider();
  }
}

console.log("=== Dependency Injection: пример ===");
const container = new Container();
container.register("UserRepository", () => new UserRepository(), {
  singleton: true,
});
container.register("EmailService", () => new EmailService(), {
  singleton: true,
});
container.register(
  "RegistrationService",
  () =>
    new RegistrationService(
      container.resolve("UserRepository"),
      container.resolve("EmailService")
    )
);

const regService = container.resolve("RegistrationService");
regService.register({ id: "1", email: "alice@example.com" });

// ===== Тестируемость: подменяем зависимости =====
class FakeMailService {
  constructor() {
    this.sent = [];
  }
  send(to, subject, body) {
    this.sent.push({ to, subject, body });
  }
}
const fakeMail = new FakeMailService();
const testService = new RegistrationService(new UserRepository(), fakeMail);
testService.register({ id: "2", email: "test@example.com" });
console.log("Отправленные письма (fake):", fakeMail.sent);

/**
 * Плюсы:
 * - Ослабляет связность, упрощает замену реализаций
 * - Улучшает тестируемость (моки/фейки)
 * - Централизованная конфигурация графа объектов
 * Минусы:
 * - Возможная сложность в настройке контейнеров
 * - Неаккуратное использование может усложнить отладку
 */
