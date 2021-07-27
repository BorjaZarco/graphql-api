import { Field, Float, ID, InputType, ObjectType } from 'type-graphql';
import { Item } from './item.dto';

@ObjectType()
export class Cart {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  userId!: string;

  @Field(() => String)
  address?: string;

  @Field(() => Float)
  totalPrice!: number;

  @Field(() => [Item])
  items!: Item[];

  constructor(id: string, userId: string, items: Item[] = []) {
    this._id = id;
    this.userId = userId;
    this.items = items;
    this.totalPrice = items.reduce((total, item) => total + (item?.quantity || 0) * (item?.price || 0), 0);
  }
}

@InputType()
export class CartInput {}
