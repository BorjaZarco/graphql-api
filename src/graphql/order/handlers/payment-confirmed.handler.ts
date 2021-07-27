import { PaymentConfirmedEvent } from '../events/payment-confirmed.event';
import { OrderModel } from '../order.model';

export class PaymentConfirmedHandler {
  static handle(event: PaymentConfirmedEvent) {
    return OrderModel.updateOrder(event.data.orderId, { paymentConfirmation: event.data.paymentConfirmation });
  }
}
