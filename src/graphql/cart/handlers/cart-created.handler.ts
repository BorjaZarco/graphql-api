import { CartModel } from '../cart.model';
import { Cart } from '../dtos/cart.dto';
import { CartCreatedEvent } from '../events/cart-created.event';

export class CartCreatedHandler {
  static handle(event: CartCreatedEvent) {
    console.log('Cart created!!');
    CartModel.createCart(new Cart(event.userId));
  }
}
