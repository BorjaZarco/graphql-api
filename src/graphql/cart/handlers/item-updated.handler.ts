import { CartModel } from '../cart.model';
import { Cart } from '../dtos/cart.dto';
import { ItemUpdatedEvent } from '../events/item-updated.event';

export class ItemUpdatedHandler {
  static async handle(event: ItemUpdatedEvent) {
    console.log('Cart items updated!!');

    const cart = await CartModel.getCart(event.cartId);
    if (cart) {
      const itemIdx = cart.items.findIndex((item) => item.sku === event.item.sku);
      if (itemIdx !== -1) {
        cart.items.splice(itemIdx, 1, event.item);
      } else {
        cart.items.push(event.item);
      }

      CartModel.updateCart(new Cart(cart.userId, cart.items));
    }
  }
}
