import { CartModel } from '../cart.model';
import { AddressUpdatedEvent } from '../events/address-updated.event';

export class AddressUpdatedHandler {
  static handle(event: AddressUpdatedEvent) {
    console.log('Cart address updated!!');
    return CartModel.updateCart(event.data.cartId, { address: event.data.address });
  }
}
