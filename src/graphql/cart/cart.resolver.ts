import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import eventStore from '../../core/event-store/event-store';
import { CartModel } from './cart.model';
import { Cart, CartCreatedInput } from './dtos/cart.dto';
import { ItemInput } from './dtos/item.dto';
import { AddressUpdatedEvent } from './events/address-updated.event';
import { CartCreatedEvent } from './events/cart-created.event';
import { ItemUpdatedEvent } from './events/item-updated.event';

@Resolver()
export class CartResolver {
  @Query(() => [Cart])
  @Authorized()
  async getCarts() {
    try {
      return await CartModel.getCarts();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Query(() => Cart)
  @Authorized()
  async getCart(@Arg('cartId', () => String) cartId: string) {
    try {
      return await CartModel.getCart(cartId);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async createCart(@Arg('data', () => CartCreatedInput) data: CartCreatedInput) {
    try {
      await eventStore.execute(new CartCreatedEvent(data.userId));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async updateItemInCart(@Arg('cartId') cartId: string, @Arg('item', () => ItemInput) item: ItemInput) {
    try {
      await eventStore.execute(new ItemUpdatedEvent({ cartId, item }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  @Authorized()
  async updateAddress(@Arg('cartId') cartId: string, @Arg('address') address: string) {
    try {
      await eventStore.execute(new AddressUpdatedEvent({ cartId, address }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
