import { CartModel } from '../cart.model';
import { CartClearedEvent } from '../events/cart-cleared.event';

export class CartClearedHandler {
  static handle(event: CartClearedEvent) {
    return CartModel.updateCart(event.data.cartId, { _id: event.data.cartId, items: [], totalPrice: 0 });
  }
}
