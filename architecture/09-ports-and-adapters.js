/**
 * Ports & Adapters (Hexagonal Architecture)
 *
 * Идея: Ядро (домен/юзкейсы) общается с внешним миром через порты (интерфейсы).
 * Адаптеры реализуют порты для конкретных технологий (DB, Web, CLI, MessageBus).
 * Зависимости направлены к ядру.
 */

// Порты ядра
class UserWritePort { save(user) { throw new Error('not implemented'); } }
class UserReadPort { findById(id) { throw new Error('not implemented'); } }

// Ядро: Use Case
class ActivateUserUseCase {
  constructor(readPort, writePort) { this.readPort = readPort; this.writePort = writePort; }
  async execute({ id }) {
    const user = await this.readPort.findById(id);
    if (!user) throw new Error('User not found');
    if (!user.active) { user.active = true; await this.writePort.save(user); }
    return user;
  }
}

// Адаптеры: Infrastructure (DB)
class InMemoryUserAdapter extends UserWritePort {
  constructor() { super(); this.storage = new Map(); }
  async save(user) { this.storage.set(user.id, user); return user; }
  async findById(id) { return this.storage.get(id) || null; }
}

// Адаптер: Web (Controller)
class HttpController {
  constructor(activateUser) { this.activateUser = activateUser; }
  async postActivate(req) {
    try { const res = await this.activateUser.execute({ id: req.id }); console.log('[HTTP 200]', res); }
    catch (e) { console.log('[HTTP 404]', e.message); }
  }
}

console.log('=== Hexagonal: пример ===');
(async () => {
  const adapter = new InMemoryUserAdapter();
  const useCase = new ActivateUserUseCase(adapter, adapter);
  await adapter.save({ id: '1', email: 'a@x', active: false });
  const web = new HttpController(useCase);
  await web.postActivate({ id: '1' });
  await web.postActivate({ id: '2' });
})();
