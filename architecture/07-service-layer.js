/**
 * Service Layer (Слой сервисов)
 *
 * Назначение: Инкапсулирует бизнес-логику приложения и координирует работу
 * доменных объектов/репозиториев. Предоставляет API для контроллеров/интерфейсов.
 */

class User {
  constructor({ id, email, active = true }) { this.id = id; this.email = email; this.active = active; }
}

class UserRepository {
  constructor() { this.items = new Map(); }
  async get(id) { return this.items.get(id) || null; }
  async save(user) { this.items.set(user.id, user); return user; }
}

class MailService { async send(to, subject, body) { console.log(`[Mail] to=${to} ${subject}`); } }

class UserService {
  constructor(repo, mail) { this.repo = repo; this.mail = mail; }
  // Пример бизнес-правила: активация пользователя с отправкой письма
  async activateUser(id) {
    const user = await this.repo.get(id);
    if (!user) throw new Error('User not found');
    if (user.active) return user;
    user.active = true;
    await this.repo.save(user);
    await this.mail.send(user.email, 'Account activated', 'Welcome back');
    return user;
  }
  async register(id, email) {
    const user = new User({ id, email, active: false });
    await this.repo.save(user);
    await this.mail.send(email, 'Confirm your account', 'Click link');
    return user;
  }
}

// Контроллер тонкий: делегирует слой сервисов
class UserController {
  constructor(service) { this.service = service; }
  async postRegister(req) { return this.service.register(req.id, req.email); }
  async postActivate(req) { return this.service.activateUser(req.id); }
}

console.log('=== Service Layer: пример ===');
(async () => {
  const repo = new UserRepository();
  const mail = new MailService();
  const service = new UserService(repo, mail);
  const controller = new UserController(service);
  await controller.postRegister({ id: '1', email: 'a@x' });
  await controller.postActivate({ id: '1' });
})();

/**
 * Плюсы:
 * - Централизация бизнес-логики
 * - Тонкие контроллеры и UI
 * - Удобные границы транзакций и кэширования
 * Минусы:
 * - Возможен «аномический домен», если логика уходит полностью в сервисы
 */
