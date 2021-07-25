import { CartModel } from '../cart.model';
import { ItemUpdatedEvent } from '../events/item-updated.event';

export class ItemUpdatedHandler {
  static async handle(event: ItemUpdatedEvent) {
    console.log('Cart items updated!!');
    const eventData = event.data;

    const cart = await CartModel.getCart(eventData.cartId);
    if (cart) {
      const itemIdx = cart.items.findIndex((item) => item.sku === eventData.item.sku);
      if (itemIdx !== -1) {
        cart.items.splice(itemIdx, 1, eventData.item);
      } else {
        cart.items.push(eventData.item);
      }

      return CartModel.updateCart(cart.id, { items: cart.items });
    }
  }
}
