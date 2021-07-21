import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import eventStore from '../../core/event-store/event-store';
import { CartModel } from './cart.model';
import { Cart, CartCreatedInput } from './dtos/cart.dto';
import { ItemInput } from './dtos/item.dto';
import { CartCreatedEvent } from './events/cart-created.event';
import { ItemUpdatedEvent } from './events/item-updated.event';

@Resolver()
export class CartResolver {
  @Query(() => [Cart])
  async getCarts() {
    try {
      return await CartModel.getCarts();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Query(() => Cart)
  async getCart(@Arg('cartId', () => String) cartId: string) {
    try {
      return await CartModel.getCart(cartId);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Mutation(() => Boolean)
  async createCart(@Arg('data', () => CartCreatedInput) data: CartCreatedInput) {
    try {
      eventStore.execute(new CartCreatedEvent(data.userId));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  updateItemInCart(@Arg('cartId') cartId: string, @Arg('item', () => ItemInput) item: ItemInput) {
    try {
      eventStore.execute(new ItemUpdatedEvent(cartId, item));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  updateAddress() {
    return 'not implemented yet';
  }

  @Mutation(() => String)
  confirmPayment() {
    return 'not implemented yet';
  }

  @Mutation(() => String)
  cancelOrder() {
    return 'not implemented yet';
  }
}
