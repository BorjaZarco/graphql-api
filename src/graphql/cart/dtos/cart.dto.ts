import { Field, Float, ID, InputType, ObjectType } from 'type-graphql';
import { Item } from './item.dto';

@ObjectType()
export class Cart {
  @Field(() => ID)
  id?: string;

  @Field(() => ID)
  userId!: string;

  @Field(() => ID)
  address?: string;

  @Field(() => Float)
  totalPrice!: number;

  @Field(() => [Item])
  items!: Item[];

  constructor(id: string, userId: string, items: Item[] = []) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.totalPrice = items.reduce((total, item) => total + (item?.quantity || 0) * (item?.price || 0), 0);
  }
}

@InputType()
export class CartCreatedInput {
  @Field()
  userId!: string;
}

@InputType()
export class CartInput {}
