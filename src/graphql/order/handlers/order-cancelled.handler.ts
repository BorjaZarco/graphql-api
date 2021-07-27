import { OrderCancelledEvent } from '../events/order-cancelled.event';
import { OrderModel } from '../order.model';

export class OrderCancelledHandler {
  static handle(event: OrderCancelledEvent) {
    return OrderModel.updateOrder(event.data.orderId, { isCancelled: true });
  }
}
