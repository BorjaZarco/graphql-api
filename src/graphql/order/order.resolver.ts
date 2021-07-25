import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { EventStore } from '../../core/event-store/event-store';
import { IContext } from '../../types/definitions/context';
import { CartModel } from '../cart/cart.model';
import { OrderCancelledEvent } from './events/order-cancelled.event';
import { OrderCreatedEvent } from './events/order-created.event';
import { PaymentConfirmedEvent } from './events/payment-confirmed.event';
import { OrderModel } from './order.model';

@Resolver()
export class OrderResolver {
  @Mutation(() => String)
  @Authorized()
  async createOrder(@Ctx() ctx: IContext) {
    if (!ctx.requestUser?._id) {
      throw new Error('You must be a registered user to perform this action');
    }
    const cart = await CartModel.getUserCart(ctx.requestUser?._id);
    if (cart && !!cart?.items?.length) {
      if (!cart?.address?.length) {
        throw new Error('You must declare a delivery address before placing an order');
      }
      await EventStore.execute(new OrderCreatedEvent({ cartId: cart._id }));
    } else {
      throw new Error('You must have at least one item before placing an order');
    }
    return true;
  }

  @Mutation(() => String)
  @Authorized()
  async confirmPayment(@Arg('orderId') orderId: string, @Arg('paymentConfirmation') paymentConfirmation: string) {
    const order = await OrderModel.getOrder(orderId);
    if (order) {
      await EventStore.execute(new PaymentConfirmedEvent({ orderId, paymentConfirmation }));
    } else {
      throw new Error(`Order with id ${orderId} does not exist. Please provide an id of an existing order or create it`);
    }
    return true;
  }

  @Mutation(() => String)
  @Authorized()
  async cancelOrder(@Arg('orderId') orderId: string) {
    const order = await OrderModel.getOrder(orderId);
    if (order) {
      await EventStore.execute(new OrderCancelledEvent({ orderId }));
    } else {
      throw new Error(`Order with id ${orderId} does not exist. Please provide an id of an existing order or create it`);
    }
    return true;
  }
}
