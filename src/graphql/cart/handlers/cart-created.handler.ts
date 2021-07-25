import { CartModel } from '../cart.model';
import { CartCreatedEvent } from '../events/cart-created.event';

export class CartCreatedHandler {
  static handle(event: CartCreatedEvent) {
    return CartModel.createCart({ userId: event.data.userId, items: [], totalPrice: 0 });
  }
}
