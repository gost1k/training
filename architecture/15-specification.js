/**
 * Specification Pattern (Паттерн Спецификация)
 *
 * Назначение: Инкапсулирует бизнес-правила и критерии в объекты, которые можно
 * комбинировать для создания сложных запросов и валидации.
 *
 * Преимущества:
 * - Переиспользование бизнес-правил
 * - Композиция сложных критериев
 * - Тестируемость бизнес-логики
 * - Читаемость кода
 */

// ===== Базовые интерфейсы =====
class Specification {
  isSatisfiedBy(candidate) {
    throw new Error("isSatisfiedBy must be implemented");
  }

  and(other) {
    return new AndSpecification(this, other);
  }

  or(other) {
    return new OrSpecification(this, other);
  }

  not() {
    return new NotSpecification(this);
  }
}

// ===== Композитные спецификации =====
class AndSpecification extends Specification {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  isSatisfiedBy(candidate) {
    return (
      this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate)
    );
  }
}

class OrSpecification extends Specification {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  isSatisfiedBy(candidate) {
    return (
      this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
    );
  }
}

class NotSpecification extends Specification {
  constructor(specification) {
    super();
    this.specification = specification;
  }

  isSatisfiedBy(candidate) {
    return !this.specification.isSatisfiedBy(candidate);
  }
}

// ===== Доменные объекты =====
class User {
  constructor({ id, name, email, age, active, role, createdAt, lastLoginAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.active = active;
    this.role = role;
    this.createdAt = createdAt;
    this.lastLoginAt = lastLoginAt;
  }
}

class Product {
  constructor({ id, name, price, category, inStock, rating, tags }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.inStock = inStock;
    this.rating = rating;
    this.tags = tags || [];
  }
}

// ===== Спецификации для User =====
class ActiveUserSpecification extends Specification {
  isSatisfiedBy(user) {
    return user.active === true;
  }
}

class AdultUserSpecification extends Specification {
  isSatisfiedBy(user) {
    return user.age >= 18;
  }
}

class AdminUserSpecification extends Specification {
  isSatisfiedBy(user) {
    return user.role === "admin";
  }
}

class RecentUserSpecification extends Specification {
  constructor(daysAgo = 30) {
    super();
    this.daysAgo = daysAgo;
  }

  isSatisfiedBy(user) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.daysAgo);
    return user.createdAt >= cutoffDate;
  }
}

class UserWithEmailSpecification extends Specification {
  constructor(emailPattern) {
    super();
    this.emailPattern = emailPattern;
  }

  isSatisfiedBy(user) {
    return this.emailPattern.test(user.email);
  }
}

class UserNameContainsSpecification extends Specification {
  constructor(searchTerm) {
    super();
    this.searchTerm = searchTerm.toLowerCase();
  }

  isSatisfiedBy(user) {
    return user.name.toLowerCase().includes(this.searchTerm);
  }
}

// ===== Спецификации для Product =====
class InStockProductSpecification extends Specification {
  isSatisfiedBy(product) {
    return product.inStock > 0;
  }
}

class PriceRangeSpecification extends Specification {
  constructor(minPrice, maxPrice) {
    super();
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }

  isSatisfiedBy(product) {
    return product.price >= this.minPrice && product.price <= this.maxPrice;
  }
}

class CategorySpecification extends Specification {
  constructor(category) {
    super();
    this.category = category;
  }

  isSatisfiedBy(product) {
    return product.category === this.category;
  }
}

class HighRatedProductSpecification extends Specification {
  constructor(minRating = 4.0) {
    super();
    this.minRating = minRating;
  }

  isSatisfiedBy(product) {
    return product.rating >= this.minRating;
  }
}

class ProductWithTagSpecification extends Specification {
  constructor(tag) {
    super();
    this.tag = tag;
  }

  isSatisfiedBy(product) {
    return product.tags.includes(this.tag);
  }
}

// ===== Репозитории с поддержкой спецификаций =====
class UserRepository {
  constructor() {
    this.users = new Map();
    this.initializeUsers();
  }

  initializeUsers() {
    const users = [
      new User({
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        age: 25,
        active: true,
        role: "user",
        createdAt: new Date("2024-01-15"),
        lastLoginAt: new Date("2024-03-10"),
      }),
      new User({
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        age: 17,
        active: true,
        role: "user",
        createdAt: new Date("2024-02-20"),
        lastLoginAt: new Date("2024-03-08"),
      }),
      new User({
        id: "3",
        name: "Charlie Admin",
        email: "admin@example.com",
        age: 35,
        active: true,
        role: "admin",
        createdAt: new Date("2023-12-01"),
        lastLoginAt: new Date("2024-03-12"),
      }),
      new User({
        id: "4",
        name: "Diana Wilson",
        email: "diana@test.org",
        age: 28,
        active: false,
        role: "user",
        createdAt: new Date("2024-01-10"),
        lastLoginAt: new Date("2024-02-15"),
      }),
    ];

    users.forEach((user) => this.users.set(user.id, user));
  }

  findBySpecification(specification) {
    return Array.from(this.users.values()).filter((user) =>
      specification.isSatisfiedBy(user)
    );
  }

  countBySpecification(specification) {
    return this.findBySpecification(specification).length;
  }
}

class ProductRepository {
  constructor() {
    this.products = new Map();
    this.initializeProducts();
  }

  initializeProducts() {
    const products = [
      new Product({
        id: "1",
        name: "Laptop Pro",
        price: 1299.99,
        category: "electronics",
        inStock: 15,
        rating: 4.8,
        tags: ["laptop", "computer", "tech"],
      }),
      new Product({
        id: "2",
        name: "Wireless Headphones",
        price: 199.99,
        category: "electronics",
        inStock: 0,
        rating: 4.5,
        tags: ["audio", "wireless", "tech"],
      }),
      new Product({
        id: "3",
        name: "Programming Book",
        price: 49.99,
        category: "books",
        inStock: 25,
        rating: 4.2,
        tags: ["book", "programming", "education"],
      }),
      new Product({
        id: "4",
        name: "Coffee Mug",
        price: 12.99,
        category: "home",
        inStock: 100,
        rating: 4.0,
        tags: ["home", "kitchen", "coffee"],
      }),
    ];

    products.forEach((product) => this.products.set(product.id, product));
  }

  findBySpecification(specification) {
    return Array.from(this.products.values()).filter((product) =>
      specification.isSatisfiedBy(product)
    );
  }

  countBySpecification(specification) {
    return this.findBySpecification(specification).length;
  }
}

// ===== Примеры использования =====
console.log("=== Specification Pattern: примеры ===");

// Создаем репозитории
const userRepo = new UserRepository();
const productRepo = new ProductRepository();

// Простые спецификации
console.log("\n--- Простые спецификации ---");
const activeUsers = userRepo.findBySpecification(new ActiveUserSpecification());
console.log("Активные пользователи:", activeUsers.length);

const adultUsers = userRepo.findBySpecification(new AdultUserSpecification());
console.log("Взрослые пользователи:", adultUsers.length);

const adminUsers = userRepo.findBySpecification(new AdminUserSpecification());
console.log("Администраторы:", adminUsers.length);

// Композитные спецификации
console.log("\n--- Композитные спецификации ---");
const activeAdultUsers = userRepo.findBySpecification(
  new ActiveUserSpecification().and(new AdultUserSpecification())
);
console.log("Активные взрослые пользователи:", activeAdultUsers.length);

const recentOrAdminUsers = userRepo.findBySpecification(
  new RecentUserSpecification(60).or(new AdminUserSpecification())
);
console.log("Недавние или администраторы:", recentOrAdminUsers.length);

const nonAdminUsers = userRepo.findBySpecification(
  new AdminUserSpecification().not()
);
console.log("Не администраторы:", nonAdminUsers.length);

// Сложные спецификации
console.log("\n--- Сложные спецификации ---");
const complexUserSpec = new ActiveUserSpecification()
  .and(new AdultUserSpecification())
  .and(new UserWithEmailSpecification(/@example\.com$/))
  .and(new UserNameContainsSpecification("johnson").not());

const complexUsers = userRepo.findBySpecification(complexUserSpec);
console.log("Сложная спецификация пользователей:", complexUsers.length);

// Спецификации для продуктов
console.log("\n--- Спецификации продуктов ---");
const availableElectronics = productRepo.findBySpecification(
  new InStockProductSpecification().and(
    new CategorySpecification("electronics")
  )
);
console.log("Доступная электроника:", availableElectronics.length);

const affordableHighRated = productRepo.findBySpecification(
  new PriceRangeSpecification(0, 100).and(
    new HighRatedProductSpecification(4.0)
  )
);
console.log("Доступные высокооцененные товары:", affordableHighRated.length);

const techProducts = productRepo.findBySpecification(
  new ProductWithTagSpecification("tech")
);
console.log("Технические товары:", techProducts.length);

// Статистика
console.log("\n--- Статистика ---");
console.log("Всего пользователей:", userRepo.users.size);
console.log("Всего продуктов:", productRepo.products.size);

const activeUserCount = userRepo.countBySpecification(
  new ActiveUserSpecification()
);
console.log("Количество активных пользователей:", activeUserCount);

const expensiveProducts = productRepo.countBySpecification(
  new PriceRangeSpecification(1000, Infinity)
);
console.log("Количество дорогих товаров (>$1000):", expensiveProducts);

/**
 * Преимущества Specification Pattern:
 * - Переиспользование бизнес-правил
 * - Композиция сложных критериев
 * - Тестируемость бизнес-логики
 * - Читаемость и понятность кода
 * - Разделение ответственности
 * - Легкость добавления новых правил
 *
 * Недостатки:
 * - Дополнительный слой абстракции
 * - Возможная избыточность для простых случаев
 * - Сложность отладки сложных композиций
 *
 * Применение:
 * - Валидация бизнес-правил
 * - Фильтрация и поиск данных
 * - Проверка прав доступа
 * - Бизнес-логика приложения
 * - Системы с множественными критериями
 */
