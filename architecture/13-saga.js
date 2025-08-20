/**
 * Saga Pattern (Паттерн Сага)
 *
 * Назначение: Управляет распределенными транзакциями через последовательность
 * локальных транзакций с компенсирующими действиями для отката.
 *
 * Типы саг:
 * - Choreography: участники общаются через события
 * - Orchestration: центральный координатор управляет процессом
 */

// ===== Базовые классы =====
class SagaStep {
  constructor(name, action, compensation) {
    this.name = name;
    this.action = action;
    this.compensation = compensation;
    this.status = 'pending'; // pending, completed, failed, compensated
  }

  async execute() {
    try {
      console.log(`[Saga] Executing step: ${this.name}`);
      await this.action();
      this.status = 'completed';
      console.log(`[Saga] Step completed: ${this.name}`);
    } catch (error) {
      this.status = 'failed';
      console.log(`[Saga] Step failed: ${this.name}`, error.message);
      throw error;
    }
  }

  async compensate() {
    if (this.status === 'completed' && this.compensation) {
      try {
        console.log(`[Saga] Compensating step: ${this.name}`);
        await this.compensation();
        this.status = 'compensated';
        console.log(`[Saga] Step compensated: ${this.name}`);
      } catch (error) {
        console.log(`[Saga] Compensation failed: ${this.name}`, error.message);
        throw error;
      }
    }
  }
}

class Saga {
  constructor(name, steps) {
    this.name = name;
    this.steps = steps;
    this.currentStepIndex = 0;
    this.status = 'running'; // running, completed, failed, compensated
  }

  async execute() {
    console.log(`[Saga] Starting: ${this.name}`);
    
    try {
      for (let i = 0; i < this.steps.length; i++) {
        this.currentStepIndex = i;
        await this.steps[i].execute();
      }
      
      this.status = 'completed';
      console.log(`[Saga] Completed: ${this.name}`);
    } catch (error) {
      this.status = 'failed';
      console.log(`[Saga] Failed: ${this.name}`, error.message);
      await this.compensate();
    }
  }

  async compensate() {
    console.log(`[Saga] Starting compensation for: ${this.name}`);
    
    // Компенсируем в обратном порядке
    for (let i = this.currentStepIndex; i >= 0; i--) {
      await this.steps[i].compensate();
    }
    
    this.status = 'compensated';
    console.log(`[Saga] Compensation completed for: ${this.name}`);
  }
}

// ===== Пример: Заказ товара =====
class OrderService {
  constructor() {
    this.orders = new Map();
  }

  async createOrder(orderData) {
    const order = {
      id: `order_${Date.now()}`,
      ...orderData,
      status: 'created',
      createdAt: new Date()
    };
    
    this.orders.set(order.id, order);
    console.log(`[OrderService] Order created: ${order.id}`);
    return order;
  }

  async cancelOrder(orderId) {
    const order = this.orders.get(orderId);
    if (order) {
      order.status = 'cancelled';
      order.cancelledAt = new Date();
      console.log(`[OrderService] Order cancelled: ${orderId}`);
    }
  }
}

class InventoryService {
  constructor() {
    this.inventory = new Map();
    this.inventory.set('item1', { id: 'item1', quantity: 10, reserved: 0 });
    this.inventory.set('item2', { id: 'item2', quantity: 5, reserved: 0 });
  }

  async reserveItem(itemId, quantity) {
    const item = this.inventory.get(itemId);
    if (!item || item.quantity - item.reserved < quantity) {
      throw new Error(`Insufficient inventory for item: ${itemId}`);
    }
    
    item.reserved += quantity;
    console.log(`[InventoryService] Reserved ${quantity} of ${itemId}`);
    return { itemId, reserved: quantity };
  }

  async releaseReservation(itemId, quantity) {
    const item = this.inventory.get(itemId);
    if (item) {
      item.reserved = Math.max(0, item.reserved - quantity);
      console.log(`[InventoryService] Released reservation for ${itemId}`);
    }
  }
}

class PaymentService {
  constructor() {
    this.payments = new Map();
  }

  async processPayment(orderId, amount) {
    // Симуляция обработки платежа
    if (Math.random() < 0.1) { // 10% вероятность отказа
      throw new Error('Payment processing failed');
    }
    
    const payment = {
      id: `payment_${Date.now()}`,
      orderId,
      amount,
      status: 'processed',
      processedAt: new Date()
    };
    
    this.payments.set(payment.id, payment);
    console.log(`[PaymentService] Payment processed: ${payment.id} for order: ${orderId}`);
    return payment;
  }

  async refundPayment(orderId) {
    const payment = Array.from(this.payments.values()).find(p => p.orderId === orderId);
    if (payment) {
      payment.status = 'refunded';
      payment.refundedAt = new Date();
      console.log(`[PaymentService] Payment refunded for order: ${orderId}`);
    }
  }
}

class ShippingService {
  constructor() {
    this.shipments = new Map();
  }

  async createShipment(orderId, items) {
    const shipment = {
      id: `shipment_${Date.now()}`,
      orderId,
      items,
      status: 'created',
      createdAt: new Date()
    };
    
    this.shipments.set(shipment.id, shipment);
    console.log(`[ShippingService] Shipment created: ${shipment.id} for order: ${orderId}`);
    return shipment;
  }

  async cancelShipment(orderId) {
    const shipment = Array.from(this.shipments.values()).find(s => s.orderId === orderId);
    if (shipment) {
      shipment.status = 'cancelled';
      shipment.cancelledAt = new Date();
      console.log(`[ShippingService] Shipment cancelled for order: ${orderId}`);
    }
  }
}

// ===== Создание саги для заказа =====
function createOrderSaga(orderData) {
  const orderService = new OrderService();
  const inventoryService = new InventoryService();
  const paymentService = new PaymentService();
  const shippingService = new ShippingService();

  const steps = [
    // Шаг 1: Создание заказа
    new SagaStep(
      'Create Order',
      async () => {
        const order = await orderService.createOrder(orderData);
        return order;
      },
      async () => {
        // Компенсация: отмена заказа
        await orderService.cancelOrder(orderData.id);
      }
    ),

    // Шаг 2: Резервирование товара
    new SagaStep(
      'Reserve Inventory',
      async () => {
        const items = orderData.items || [];
        for (const item of items) {
          await inventoryService.reserveItem(item.id, item.quantity);
        }
      },
      async () => {
        // Компенсация: освобождение резерва
        const items = orderData.items || [];
        for (const item of items) {
          await inventoryService.releaseReservation(item.id, item.quantity);
        }
      }
    ),

    // Шаг 3: Обработка платежа
    new SagaStep(
      'Process Payment',
      async () => {
        const totalAmount = (orderData.items || []).reduce((sum, item) => sum + item.price * item.quantity, 0);
        await paymentService.processPayment(orderData.id, totalAmount);
      },
      async () => {
        // Компенсация: возврат платежа
        await paymentService.refundPayment(orderData.id);
      }
    ),

    // Шаг 4: Создание отправки
    new SagaStep(
      'Create Shipment',
      async () => {
        await shippingService.createShipment(orderData.id, orderData.items || []);
      },
      async () => {
        // Компенсация: отмена отправки
        await shippingService.cancelShipment(orderData.id);
      }
    )
  ];

  return new Saga('Order Processing Saga', steps);
}

// ===== Пример использования =====
console.log('=== Saga Pattern: пример заказа ===');
(async () => {
  const orderData = {
    id: 'order_123',
    customerId: 'customer_456',
    items: [
      { id: 'item1', quantity: 2, price: 25.00 },
      { id: 'item2', quantity: 1, price: 15.00 }
    ]
  };

  const saga = createOrderSaga(orderData);
  
  try {
    await saga.execute();
    console.log('Saga execution result:', saga.status);
  } catch (error) {
    console.log('Saga execution error:', error.message);
  }
})();

/**
 * Преимущества Saga Pattern:
 * - Управление распределенными транзакциями
 * - Автоматический откат при ошибках
 * - Масштабируемость и отказоустойчивость
 * - Поддержка длительных транзакций
 * 
 * Недостатки:
 * - Сложность реализации
 * - Необходимость проектирования компенсирующих действий
 * - Сложность отладки
 * - Возможность частичного выполнения
 * 
 * Применение:
 * - Микросервисная архитектура
 * - E-commerce системы
 * - Банковские операции
 * - Системы бронирования
 */
