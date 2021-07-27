import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { EventStore } from '../../core/event-store/event-store';
import { IContext } from '../../types/definitions/context';
import { CartModel } from '../cart/cart.model';
import { Order } from './dtos/order.dto';
import { OrderCancelledEvent } from './events/order-cancelled.event';
import { OrderCreatedEvent } from './events/order-created.event';
import { PaymentConfirmedEvent } from './events/payment-confirmed.event';
import { OrderModel } from './order.model';

@Resolver()
export class OrderResolver {
  @Query(() => [Order])
  @Authorized()
  async getOrders(@Ctx() ctx: IContext) {
    if (!ctx.requestUser?._id) {
      throw new Error('You must be a registered user to perform this action');
    }

    const orders = await OrderModel.getUserOrders(ctx.requestUser?._id as string);
    if (!orders) {
      throw new Error('No orders found for this user');
    }
    return orders;
  }

  @Query(() => Order)
  @Authorized()
  async getOrder(@Arg('orderId') orderId: string, @Ctx() ctx: IContext) {
    if (!ctx.requestUser?._id) {
      throw new Error('You must be a registered user to perform this action');
    }

    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('You must provide a valid id');
    }
    const order = await OrderModel.getUserOrder(orderId, ctx.requestUser?._id as string);
    if (!order) {
      throw new Error('No order found');
    }
    return order;
  }

  @Query(() => String)
  @Authorized()
  async getOrderStatus(@Arg('orderId') orderId: string, @Ctx() ctx: IContext) {
    if (!ctx.requestUser?._id) {
      throw new Error('You must be a registered user to perform this action');
    }
    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('You must provide a valid id');
    }
    const order = await OrderModel.getUserOrder(orderId, ctx.requestUser?._id as string);
    if (!order) {
      throw new Error('No order found');
    }
    return order.status;
  }

  @Mutation(() => String)
  @Authorized()
  async createOrder(@Ctx() ctx: IContext) {
    if (!ctx.requestUser?._id) {
      throw new Error('You must be a registered user to perform this action');
    }
    const cart = await CartModel.getUserCart(ctx.requestUser?._id);
    if (!cart) {
      throw new Error('You must have a cart with items and an address in before placing an order');
    }

    if (!cart?.address?.length) {
      throw new Error('You must declare a delivery address before placing an order');
    }

    if (!cart?.items?.length) {
      throw new Error('There must be at least an item in the cart to place an order');
    }

    await EventStore.execute(new OrderCreatedEvent({ cartId: cart._id }));
    return true;
  }

  @Mutation(() => String)
  @Authorized()
  async confirmPayment(@Arg('orderId') orderId: string, @Arg('paymentConfirmation') paymentConfirmation: string, @Ctx() ctx: IContext) {
    if (!ctx.requestUser?._id) {
      throw new Error('You must be a registered user to perform this action');
    }
    const order = await OrderModel.getUserOrder(orderId, ctx.requestUser?._id);
    if (order) {
      await EventStore.execute(new PaymentConfirmedEvent({ orderId, paymentConfirmation }));
    } else {
      throw new Error(`Order with id ${orderId} not found. Please provide an id of an existing order or create it`);
    }
    return true;
  }

  @Mutation(() => String)
  @Authorized()
  async cancelOrder(@Arg('orderId') orderId: string, @Ctx() ctx: IContext) {
    if (!ctx.requestUser?._id) {
      throw new Error('You must be a registered user to perform this action');
    }
    const order = await OrderModel.getUserOrder(orderId, ctx.requestUser?._id);
    if (!order) {
      throw new Error(`Order with id ${orderId} does not exist. Please provide an id of an existing order or create it`);
    }
    if (order) {
      if (order.isCancelled) {
        throw new Error('Order already cancelled');
      }
      await EventStore.execute(new OrderCancelledEvent({ orderId }));
    }
    return true;
  }
}
