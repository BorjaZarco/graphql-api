import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { ObjectID } from 'typeorm';

const carts: Record<string, Cart> = { '1': { id: '1', items: [] } };

@ObjectType()
export class Item {
  @Field(() => ID)
  id!: ObjectID;

  @Field()
  color!: String;

  @Field()
  size!: String;

  @Field()
  quantity!: number;
}

@ObjectType()
export class Cart {
  @Field(() => ID)
  id!: string;

  @Field(() => [Item])
  items!: Item[];

  constructor(id: string, items: Item[] = []) {
    this.id = id;
    this.items = items;
  }

  static insert(items: Item[] = []) {
    const newCart = new Cart(`${Object.keys(carts).length + 1}`, items);
    carts[newCart.id] = newCart;
    return newCart;
  }

  static find() {
    return Object.values(carts);
  }
}

@InputType()
export class CartInput {
  @Field(() => [ItemInput])
  items!: ItemInput[];
}

@InputType()
export class ItemInput {
  @Field(() => ID)
  id!: ObjectID;

  @Field()
  color!: String;

  @Field()
  size!: String;

  @Field()
  quantity!: number;
}
