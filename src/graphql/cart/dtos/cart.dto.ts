import { Field, Float, ID, InputType, ObjectType } from 'type-graphql';
import { CartStatusEnum } from '../../../types/enums/cart-status.enum';
import { CartModel } from '../cart.model';
import { Item } from './item.dto';

@ObjectType()
export class Cart {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  userId!: string;

  @Field()
  status!: string;

  @Field(() => Float)
  totalPrice!: number;

  @Field(() => [Item])
  items!: Item[];

  constructor(
    id: string = `${(CartModel.getCarts()?.length || 0) + 1}`,
    userId: string,
    items: Item[] = [],
    status: CartStatusEnum = CartStatusEnum.Pending
  ) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.totalPrice = items.reduce((total, item) => total + (item?.quantity || 0) * (item?.price || 0), 0);

    this.status = status;
  }
}

@InputType()
export class CartCreatedInput {
  @Field()
  userId!: string;
}

@InputType()
export class CartInput {}
