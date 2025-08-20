/**
 * Layered Architecture (Многослойная архитектура)
 *
 * Типичные слои: Presentation -> Application -> Domain -> Infrastructure
 * Правило зависимостей: направлены только вниз, UI знает про Application, но не наоборот и т.д.
 */

// Infrastructure
class InMemoryDb { constructor() { this.tables = { users: new Map() }; } }
class UserInfraRepository { constructor(db) { this.db = db; } save(user) { this.db.tables.users.set(user.id, user); } find(id) { return this.db.tables.users.get(id) || null; } }

// Domain
class User { constructor({ id, email }) { this.id = id; this.email = email; this.active = false; } activate() { this.active = true; } }

// Application
class UserAppService {
  constructor(userRepo) { this.userRepo = userRepo; }
  register(id, email) { const u = new User({ id, email }); this.userRepo.save(u); return u; }
  activate(id) { const u = this.userRepo.find(id); if (!u) throw new Error('Not found'); u.activate(); this.userRepo.save(u); return u; }
}

// Presentation (Controller)
class UserController { constructor(app) { this.app = app; } postRegister({ id, email }) { return this.app.register(id, email); } postActivate({ id }) { return this.app.activate(id); } }

console.log('=== Layered Architecture: пример ===');
const db = new InMemoryDb();
const repo = new UserInfraRepository(db);
const app = new UserAppService(repo);
const ctrl = new UserController(app);
ctrl.postRegister({ id: '1', email: 'a@x' });
console.log(ctrl.postActivate({ id: '1' }));

/**
 * Плюсы: простота, понятные границы, зрелый подход
 * Минусы: риск утечки зависимостей, «сквозная» логика может сложнее проводиться
 */
