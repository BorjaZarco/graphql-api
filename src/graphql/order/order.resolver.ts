import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { EventStore } from '../../core/event-store/event-store';
import { OrderCancelledEvent } from './events/order-cancelled.event';
import { OrderCreatedEvent } from './events/order-created.event';
import { PaymentConfirmedEvent } from './events/payment-confirmed.event';
import { OrderModel } from './order.model';

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
      const order = await OrderModel.getOrder(orderId);
      if (order) {
        await EventStore.execute(new PaymentConfirmedEvent({ orderId, paymentConfirmation }));
      } else {
        throw new Error(`Order with id ${orderId} does not exist. Please provide an id of an existing order or create it`);
      }
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
      const order = await OrderModel.getOrder(orderId);
      if (order) {
        await EventStore.execute(new OrderCancelledEvent({ orderId }));
      } else {
        throw new Error(`Order with id ${orderId} does not exist. Please provide an id of an existing order or create it`);
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
