import { CartModel } from '../../cart/cart.model';
import { Order } from '../dtos/order.dto';
import { OrderCreatedEvent } from '../events/order-created.event';
import { OrderModel } from '../order.model';

export class OrderCreatedHandler {
  static async handle(event: OrderCreatedEvent) {
    const cart = await CartModel.getCart(event.data.cartId);
    OrderModel.createOrder(new Order(cart?.userId as string, cart?.items));
  }
}
