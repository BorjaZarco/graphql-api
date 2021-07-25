import { CartModel } from '../cart.model';
import { CartCreatedEvent } from '../events/cart-created.event';

export class CartCreatedHandler {
  static handle(event: CartCreatedEvent) {
    console.log('Cart created!!');
    return CartModel.createCart({ userId: event.data.userId, items: [], totalPrice: 0 });
  }
}
