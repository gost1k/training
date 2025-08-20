/**
 * Clean Architecture (Чистая архитектура)
 *
 * Круги: Entities -> Use Cases -> Interface Adapters -> Frameworks & Drivers
 * Правило зависимостей: направлены внутрь (к сущностям/юзкейсам).
 */

// Entities (бизнес-правила)
class Account { constructor(balance = 0) { this.balance = balance; } deposit(x) { this.balance += x; } withdraw(x) { if (this.balance < x) throw new Error('Insufficient'); this.balance -= x; } }

// Use Cases (приложение-специфичная логика)
class TransferUseCase {
  constructor(loadAccount, saveAccount) { this.load = loadAccount; this.save = saveAccount; }
  async execute({ fromId, toId, amount }) {
    const from = await this.load(fromId);
    const to = await this.load(toId);
    from.withdraw(amount);
    to.deposit(amount);
    await this.save(fromId, from);
    await this.save(toId, to);
    return { fromBalance: from.balance, toBalance: to.balance };
  }
}

// Interface Adapters (репозитории/мэпперы)
class InMemoryAccountGateway { constructor() { this.map = new Map(); } async load(id) { return this.map.get(id) || new Account(0); } async save(id, acc) { this.map.set(id, acc); } }

// Frameworks & Drivers (контроллер/веб/cli)
class CliController { constructor(uc) { this.uc = uc; } async transfer(fromId, toId, amount) { const res = await this.uc.execute({ fromId, toId, amount }); console.log('[CLI]', res); } }

console.log('=== Clean Architecture: пример ===');
(async () => {
  const gateway = new InMemoryAccountGateway();
  await gateway.save('A', new Account(100));
  await gateway.save('B', new Account(10));
  const uc = new TransferUseCase(gateway.load.bind(gateway), gateway.save.bind(gateway));
  const cli = new CliController(uc);
  await cli.transfer('A', 'B', 30);
})();
