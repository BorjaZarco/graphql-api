import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Item {
  @Field(() => ID)
  sku!: String;

  @Field()
  price!: number;

  @Field()
  barcode!: String;

  @Field()
  color!: String;

  @Field()
  size!: String;

  @Field()
  quantity!: number;
}

@InputType()
export class ItemInput {
  @Field(() => ID)
  sku!: String;

  @Field()
  price!: number;

  @Field()
  barcode!: String;

  @Field()
  color!: String;

  @Field()
  size!: String;

  @Field()
  quantity!: number;
}
