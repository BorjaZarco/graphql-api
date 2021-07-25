import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { EventStore } from '../../core/event-store/event-store';
import { OrderCancelledEvent } from './events/order-cancelled.event';
import { OrderCreatedEvent } from './events/order-created.event';
import { PaymentConfirmedEvent } from './events/payment-confirmed.event';

@Resolver()
export class OrderResolver {
  @Mutation(() => String)
  @Authorized()
  async createOrder(@Arg('cartId') cartId: string) {
    try {
      await EventStore.execute(new OrderCreatedEvent({ cartId }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  @Authorized()
  async confirmPayment(@Arg('orderId') orderId: string, @Arg('paymentConfirmation') paymentConfirmation: string) {
    try {
      await EventStore.execute(new PaymentConfirmedEvent({ orderId, paymentConfirmation }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  @Authorized()
  async cancelOrder(@Arg('orderId') orderId: string) {
    try {
      await EventStore.execute(new OrderCancelledEvent({ orderId }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
