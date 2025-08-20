/**
 * API Gateway Pattern
 *
 * Назначение: Единая точка входа для клиентов, которая маршрутизирует запросы
 * к соответствующим микросервисам, обеспечивает аутентификацию, авторизацию,
 * кэширование, мониторинг и агрегацию данных.
 *
 * Функции:
 * - Маршрутизация запросов
 * - Аутентификация и авторизация
 * - Rate limiting
 * - Кэширование
 * - Агрегация данных
 * - Мониторинг и логирование
 */

// ===== Базовые классы =====
class Request {
  constructor(method, path, headers = {}, body = null) {
    this.method = method;
    this.path = path;
    this.headers = headers;
    this.body = body;
    this.timestamp = new Date();
  }
}

class Response {
  constructor(status, body, headers = {}) {
    this.status = status;
    this.body = body;
    this.headers = { "Content-Type": "application/json", ...headers };
    this.timestamp = new Date();
  }
}

// ===== Аутентификация =====
class AuthService {
  constructor() {
    this.tokens = new Map();
    this.tokens.set("valid_token_123", {
      userId: "user_1",
      role: "user",
      expiresAt: Date.now() + 3600000,
    });
    this.tokens.set("admin_token_456", {
      userId: "admin_1",
      role: "admin",
      expiresAt: Date.now() + 3600000,
    });
  }

  validateToken(token) {
    const tokenData = this.tokens.get(token);
    if (!tokenData) {
      return null;
    }

    if (Date.now() > tokenData.expiresAt) {
      this.tokens.delete(token);
      return null;
    }

    return tokenData;
  }

  hasPermission(tokenData, requiredRole) {
    if (requiredRole === "admin") {
      return tokenData.role === "admin";
    }
    return true; // user role can access user endpoints
  }
}

// ===== Rate Limiting =====
class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = new Map(); // clientId -> { count, resetTime }
  }

  isAllowed(clientId) {
    const now = Date.now();
    const clientRequests = this.requests.get(clientId);

    if (!clientRequests || now > clientRequests.resetTime) {
      this.requests.set(clientId, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (clientRequests.count >= this.limit) {
      return false;
    }

    clientRequests.count++;
    return true;
  }
}

// ===== Кэширование =====
class Cache {
  constructor() {
    this.storage = new Map();
    this.ttl = new Map(); // key -> expiration time
  }

  set(key, value, ttlMs = 300000) {
    // default 5 minutes
    this.storage.set(key, value);
    this.ttl.set(key, Date.now() + ttlMs);
  }

  get(key) {
    if (!this.storage.has(key)) return null;

    if (Date.now() > this.ttl.get(key)) {
      this.storage.delete(key);
      this.ttl.delete(key);
      return null;
    }

    return this.storage.get(key);
  }

  invalidate(pattern) {
    for (const key of this.storage.keys()) {
      if (key.includes(pattern)) {
        this.storage.delete(key);
        this.ttl.delete(key);
      }
    }
  }
}

// ===== Микросервисы (моки) =====
class UserService {
  constructor() {
    this.users = new Map();
    this.users.set("user_1", {
      id: "user_1",
      name: "Alice",
      email: "alice@example.com",
    });
    this.users.set("user_2", {
      id: "user_2",
      name: "Bob",
      email: "bob@example.com",
    });
  }

  async getUser(id) {
    await this.simulateLatency();
    return this.users.get(id) || null;
  }

  async getUsers() {
    await this.simulateLatency();
    return Array.from(this.users.values());
  }

  async simulateLatency() {
    return new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  }
}

class OrderService {
  constructor() {
    this.orders = new Map();
    this.orders.set("order_1", {
      id: "order_1",
      userId: "user_1",
      total: 150.0,
      status: "completed",
    });
    this.orders.set("order_2", {
      id: "order_2",
      userId: "user_2",
      total: 75.5,
      status: "pending",
    });
  }

  async getOrders(userId) {
    await this.simulateLatency();
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }

  async simulateLatency() {
    return new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  }
}

class ProductService {
  constructor() {
    this.products = new Map();
    this.products.set("prod_1", {
      id: "prod_1",
      name: "Laptop",
      price: 999.99,
      category: "electronics",
    });
    this.products.set("prod_2", {
      id: "prod_2",
      name: "Book",
      price: 19.99,
      category: "books",
    });
  }

  async getProducts(category) {
    await this.simulateLatency();
    if (category) {
      return Array.from(this.products.values()).filter(
        (product) => product.category === category
      );
    }
    return Array.from(this.products.values());
  }

  async simulateLatency() {
    return new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  }
}

// ===== API Gateway =====
class ApiGateway {
  constructor() {
    this.authService = new AuthService();
    this.rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute
    this.cache = new Cache();

    this.services = {
      user: new UserService(),
      order: new OrderService(),
      product: new ProductService(),
    };

    this.routes = this.defineRoutes();
  }

  defineRoutes() {
    return [
      {
        path: "/api/users/:id",
        method: "GET",
        service: "user",
        handler: "getUser",
        auth: "user",
        cache: true,
      },
      {
        path: "/api/users",
        method: "GET",
        service: "user",
        handler: "getUsers",
        auth: "admin",
        cache: true,
      },
      {
        path: "/api/orders/:userId",
        method: "GET",
        service: "order",
        handler: "getOrders",
        auth: "user",
        cache: false,
      },
      {
        path: "/api/products",
        method: "GET",
        service: "product",
        handler: "getProducts",
        auth: false,
        cache: true,
      },
      {
        path: "/api/dashboard/:userId",
        method: "GET",
        service: "aggregate",
        handler: "getDashboard",
        auth: "user",
        cache: true,
      },
    ];
  }

  async handleRequest(request) {
    console.log(`[Gateway] ${request.method} ${request.path}`);

    try {
      // Rate limiting
      const clientId = this.getClientId(request);
      if (!this.rateLimiter.isAllowed(clientId)) {
        return new Response(429, { error: "Rate limit exceeded" });
      }

      // Find route
      const route = this.findRoute(request.method, request.path);
      if (!route) {
        return new Response(404, { error: "Route not found" });
      }

      // Authentication
      if (route.auth) {
        const token = this.extractToken(request);
        const tokenData = this.authService.validateToken(token);

        if (!tokenData) {
          return new Response(401, { error: "Invalid token" });
        }

        if (!this.authService.hasPermission(tokenData, route.auth)) {
          return new Response(403, { error: "Insufficient permissions" });
        }

        request.user = tokenData;
      }

      // Check cache
      if (route.cache) {
        const cacheKey = this.generateCacheKey(request);
        const cachedResponse = this.cache.get(cacheKey);
        if (cachedResponse) {
          console.log(`[Gateway] Cache hit for ${cacheKey}`);
          return cachedResponse;
        }
      }

      // Execute request
      let response;
      if (route.service === "aggregate") {
        response = await this.handleAggregateRequest(route, request);
      } else {
        response = await this.handleServiceRequest(route, request);
      }

      // Cache response
      if (route.cache) {
        const cacheKey = this.generateCacheKey(request);
        this.cache.set(cacheKey, response, 300000); // 5 minutes
      }

      return response;
    } catch (error) {
      console.error(`[Gateway] Error handling request:`, error);
      return new Response(500, { error: "Internal server error" });
    }
  }

  findRoute(method, path) {
    return this.routes.find((route) => {
      if (route.method !== method) return false;

      const routePathParts = route.path.split("/");
      const requestPathParts = path.split("/");

      if (routePathParts.length !== requestPathParts.length) return false;

      for (let i = 0; i < routePathParts.length; i++) {
        if (routePathParts[i].startsWith(":")) continue;
        if (routePathParts[i] !== requestPathParts[i]) return false;
      }

      return true;
    });
  }

  async handleServiceRequest(route, request) {
    const service = this.services[route.service];
    const params = this.extractParams(route.path, request.path);

    let result;
    if (route.handler === "getUser") {
      result = await service.getUser(params.id);
    } else if (route.handler === "getUsers") {
      result = await service.getUsers();
    } else if (route.handler === "getOrders") {
      result = await service.getOrders(params.userId);
    } else if (route.handler === "getProducts") {
      const category = request.headers["category"];
      result = await service.getProducts(category);
    }

    if (result === null) {
      return new Response(404, { error: "Resource not found" });
    }

    return new Response(200, result);
  }

  async handleAggregateRequest(route, request) {
    const params = this.extractParams(route.path, request.path);
    const userId = params.userId;

    // Агрегируем данные из нескольких сервисов
    const [user, orders, products] = await Promise.all([
      this.services.user.getUser(userId),
      this.services.order.getOrders(userId),
      this.services.product.getProducts(),
    ]);

    const dashboard = {
      user,
      orders: {
        count: orders.length,
        total: orders.reduce((sum, order) => sum + order.total, 0),
        recent: orders.slice(0, 5),
      },
      recommendations: products.slice(0, 3),
    };

    return new Response(200, dashboard);
  }

  extractParams(routePath, requestPath) {
    const params = {};
    const routeParts = routePath.split("/");
    const requestParts = requestPath.split("/");

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        const paramName = routeParts[i].substring(1);
        params[paramName] = requestParts[i];
      }
    }

    return params;
  }

  getClientId(request) {
    return request.headers["x-client-id"] || "anonymous";
  }

  extractToken(request) {
    const authHeader = request.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }
    return null;
  }

  generateCacheKey(request) {
    return `${request.method}:${request.path}:${JSON.stringify(
      request.headers
    )}`;
  }
}

// ===== Пример использования =====
console.log("=== API Gateway: пример ===");
(async () => {
  const gateway = new ApiGateway();

  // Запрос без аутентификации
  const productsRequest = new Request("GET", "/api/products", {
    "x-client-id": "client_1",
  });
  const productsResponse = await gateway.handleRequest(productsRequest);
  console.log(
    "Products response:",
    productsResponse.status,
    productsResponse.body
  );

  // Запрос с аутентификацией
  const userRequest = new Request("GET", "/api/users/user_1", {
    "x-client-id": "client_1",
    authorization: "Bearer valid_token_123",
  });
  const userResponse = await gateway.handleRequest(userRequest);
  console.log("User response:", userResponse.status, userResponse.body);

  // Агрегированный запрос
  const dashboardRequest = new Request("GET", "/api/dashboard/user_1", {
    "x-client-id": "client_1",
    authorization: "Bearer valid_token_123",
  });
  const dashboardResponse = await gateway.handleRequest(dashboardRequest);
  console.log(
    "Dashboard response:",
    dashboardResponse.status,
    dashboardResponse.body
  );

  // Запрос с неверным токеном
  const invalidRequest = new Request("GET", "/api/users/user_1", {
    "x-client-id": "client_1",
    authorization: "Bearer invalid_token",
  });
  const invalidResponse = await gateway.handleRequest(invalidRequest);
  console.log(
    "Invalid token response:",
    invalidResponse.status,
    invalidResponse.body
  );
})();

/**
 * Преимущества API Gateway:
 * - Единая точка входа для клиентов
 * - Централизованная аутентификация и авторизация
 * - Rate limiting и защита от DDoS
 * - Кэширование и оптимизация производительности
 * - Агрегация данных из нескольких сервисов
 * - Мониторинг и логирование
 *
 * Недостатки:
 * - Единая точка отказа
 * - Сложность конфигурации
 * - Возможность узкого места
 * - Необходимость синхронизации схем
 *
 * Применение:
 * - Микросервисная архитектура
 * - Мобильные приложения
 * - Публичные API
 * - Системы с множественными клиентами
 */
