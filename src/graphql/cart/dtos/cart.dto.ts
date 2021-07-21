import { Field, Float, ID, InputType, ObjectType } from 'type-graphql';
import { CartStatusEnum } from '../../../types/enums/cart-status.enum';
import { Item } from './item.dto';

@ObjectType()
export class Cart {
  @Field(() => ID)
  id?: string;

  @Field(() => ID)
  userId!: string;

  @Field()
  status!: string;

  @Field(() => Float)
  totalPrice!: number;

  @Field(() => [Item])
  items!: Item[];

  constructor(userId: string, items: Item[] = [], status: CartStatusEnum = CartStatusEnum.Pending) {
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
