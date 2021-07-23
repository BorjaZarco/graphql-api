import { OrderCancelledEvent } from '../events/order-cancelled.event';
import { OrderModel } from '../order.model';

export class OrderCancelledHandler {
  static handle(event: OrderCancelledEvent) {
    console.log('Order cancelled!!');
    OrderModel.updateOrder(event.data.orderId, { isCancelled: true });
  }
}
