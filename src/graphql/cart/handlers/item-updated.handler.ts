import { CartModel } from '../cart.model';
import { ItemUpdatedEvent } from '../events/item-updated.event';

export class ItemUpdatedHandler {
  static async handle(event: ItemUpdatedEvent) {
    const eventData = event.data;

    const cart = await CartModel.getCart(eventData.cartId);
    if (cart) {
      const itemIdx = cart.items.findIndex((item) => item.sku === eventData.item.sku);
      if (itemIdx !== -1) {
        cart.items.splice(itemIdx, 1, eventData.item);
      } else {
        cart.items.push(eventData.item);
      }

      const itemsWithQuantity = cart.items.filter((item) => !!item.quantity);
      return CartModel.updateCart(cart.id, { items: itemsWithQuantity, totalPrice: CartModel.calculateTotalPrice(cart.items) });
    }
  }
}
