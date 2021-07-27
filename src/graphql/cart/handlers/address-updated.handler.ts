import { CartModel } from '../cart.model';
import { AddressUpdatedEvent } from '../events/address-updated.event';

export class AddressUpdatedHandler {
  static handle(event: AddressUpdatedEvent) {
    return CartModel.updateCart(event.data.cartId, { address: event.data.address });
  }
}
