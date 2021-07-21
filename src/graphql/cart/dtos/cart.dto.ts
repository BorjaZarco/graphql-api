import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Item } from './item.dto';

@ObjectType()
export class Cart {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  userId!: string;

  @Field(() => [Item])
  items!: Item[];

  constructor(userId: string) {
    this.id = `${Date.now()}`;
    this.items = [];
    this.userId = userId;
  }
}

@InputType()
export class CartCreatedInput {
  @Field()
  userId!: string;
}

@InputType()
export class CartInput {}
