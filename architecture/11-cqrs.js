/**
 * CQRS (Command Query Responsibility Segregation)
 *
 * Назначение: Разделяет операции чтения (Query) и записи (Command) на разные модели.
 * Commands изменяют состояние, Queries только читают. Может включать разные БД для read/write.
 *
 * Преимущества:
 * - Оптимизация для чтения и записи независимо
 * - Масштабирование read/write нагрузок отдельно
 * - Возможность разных схем данных для разных операций
 */

// ===== Базовые интерфейсы =====
class Command {
  constructor(data) {
    this.data = data;
    this.timestamp = new Date();
  }
}

class Query {
  constructor(criteria) {
    this.criteria = criteria;
  }
}

// ===== Команды =====
class CreateUserCommand extends Command {
  constructor(userData) {
    super(userData);
    this.type = "CreateUser";
  }
}

class UpdateUserCommand extends Command {
  constructor(id, updates) {
    super({ id, ...updates });
    this.type = "UpdateUser";
  }
}

class DeleteUserCommand extends Command {
  constructor(id) {
    super({ id });
    this.type = "DeleteUser";
  }
}

// ===== Запросы =====
class GetUserByIdQuery extends Query {
  constructor(id) {
    super({ id });
    this.type = "GetUserById";
  }
}

class GetUsersByStatusQuery extends Query {
  constructor(status) {
    super({ status });
    this.type = "GetUsersByStatus";
  }
}

class GetUserCountQuery extends Query {
  constructor() {
    super({});
    this.type = "GetUserCount";
  }
}

// ===== Write Model (Command Side) =====
class UserWriteModel {
  constructor() {
    this.users = new Map();
  }

  async handle(command) {
    switch (command.type) {
      case "CreateUser":
        return this.createUser(command.data);
      case "UpdateUser":
        return this.updateUser(command.data.id, command.data);
      case "DeleteUser":
        return this.deleteUser(command.data.id);
      default:
        throw new Error(`Unknown command: ${command.type}`);
    }
  }

  async createUser(userData) {
    const user = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      status: "active",
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");

    Object.assign(user, updates, { updatedAt: new Date() });
    this.users.set(id, user);
    return user;
  }

  async deleteUser(id) {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");

    this.users.delete(id);
    return { id, deleted: true };
  }
}

// ===== Read Model (Query Side) =====
class UserReadModel {
  constructor() {
    this.users = new Map();
    this.userCount = 0;
  }

  async handle(query) {
    switch (query.type) {
      case "GetUserById":
        return this.getUserById(query.criteria.id);
      case "GetUsersByStatus":
        return this.getUsersByStatus(query.criteria.status);
      case "GetUserCount":
        return this.getUserCount();
      default:
        throw new Error(`Unknown query: ${query.type}`);
    }
  }

  async getUserById(id) {
    return this.users.get(id) || null;
  }

  async getUsersByStatus(status) {
    return Array.from(this.users.values()).filter((u) => u.status === status);
  }

  async getUserCount() {
    return this.userCount;
  }

  // Метод для синхронизации с Write Model
  syncFromWriteModel(writeModel) {
    this.users = new Map(writeModel.users);
    this.userCount = this.users.size;
  }
}

// ===== Command Handler =====
class CommandHandler {
  constructor(writeModel) {
    this.writeModel = writeModel;
  }

  async execute(command) {
    console.log(`[CommandHandler] Executing: ${command.type}`);
    const result = await this.writeModel.handle(command);
    console.log(`[CommandHandler] Result:`, result);
    return result;
  }
}

// ===== Query Handler =====
class QueryHandler {
  constructor(readModel) {
    this.readModel = readModel;
  }

  async execute(query) {
    console.log(`[QueryHandler] Executing: ${query.type}`);
    const result = await this.readModel.handle(query);
    console.log(`[QueryHandler] Result:`, result);
    return result;
  }
}

// ===== Пример использования =====
console.log("=== CQRS: пример ===");
(async () => {
  const writeModel = new UserWriteModel();
  const readModel = new UserReadModel();

  const commandHandler = new CommandHandler(writeModel);
  const queryHandler = new QueryHandler(readModel);

  // Выполняем команды
  await commandHandler.execute(
    new CreateUserCommand({
      id: "1",
      email: "alice@example.com",
      name: "Alice",
    })
  );

  await commandHandler.execute(
    new CreateUserCommand({
      id: "2",
      email: "bob@example.com",
      name: "Bob",
    })
  );

  // Синхронизируем Read Model
  readModel.syncFromWriteModel(writeModel);

  // Выполняем запросы
  await queryHandler.execute(new GetUserByIdQuery("1"));
  await queryHandler.execute(new GetUsersByStatusQuery("active"));
  await queryHandler.execute(new GetUserCountQuery());

  // Обновляем пользователя
  await commandHandler.execute(
    new UpdateUserCommand("1", { name: "Alice Smith" })
  );
  readModel.syncFromWriteModel(writeModel);
  await queryHandler.execute(new GetUserByIdQuery("1"));
})();

/**
 * Преимущества CQRS:
 * - Разделение ответственности между чтением и записью
 * - Возможность оптимизации каждого типа операций
 * - Масштабирование read/write нагрузок независимо
 * - Гибкость в выборе технологий для каждого типа операций
 *
 * Недостатки:
 * - Усложнение архитектуры
 * - Необходимость синхронизации между моделями
 * - Сложность в отладке и мониторинге
 *
 * Применение:
 * - Системы с высокой нагрузкой на чтение
 * - Сложные доменные модели
 * - Микросервисная архитектура
 */
