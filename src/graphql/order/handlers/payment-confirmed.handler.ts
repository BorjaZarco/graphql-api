import { PaymentConfirmedEvent } from '../events/payment-confirmed.event';
import { OrderModel } from '../order.model';

export class PaymentConfirmedHandler {
  static handle(event: PaymentConfirmedEvent) {
    console.log('Payment confirmed!!');
    OrderModel.updateOrder(event.data.orderId, { paymentConfirmation: event.data.paymentConfirmation });
  }
}
