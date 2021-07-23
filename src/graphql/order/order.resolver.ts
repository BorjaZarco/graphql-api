import { Arg, Mutation, Resolver } from 'type-graphql';
import eventStore from '../../core/event-store/event-store';
import { OrderCancelledEvent } from './events/order-cancelled.event';
import { OrderCreatedEvent } from './events/order-created.event';
import { PaymentConfirmedEvent } from './events/payment-confirmed.event';

@Resolver()
export class OrderResolver {
  @Mutation(() => String)
  async createOrder(@Arg('cartId') cartId: string) {
    try {
      await eventStore.execute(new OrderCreatedEvent({ cartId }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  async confirmPayment(@Arg('orderId') orderId: string, @Arg('paymentConfirmation') paymentConfirmation: string) {
    try {
      await eventStore.execute(new PaymentConfirmedEvent({ orderId, paymentConfirmation }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  async cancelOrder(@Arg('orderId') orderId: string) {
    try {
      await eventStore.execute(new OrderCancelledEvent({ orderId }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
