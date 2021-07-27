import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Item {
  @Field(() => ID)
  sku!: string;

  @Field()
  price!: number;

  @Field()
  barcode!: string;

  @Field()
  color!: string;

  @Field()
  size!: string;

  @Field(() => Int)
  quantity!: number;
}

@InputType()
export class ItemInput {
  @Field(() => ID)
  sku!: string;

  @Field()
  price!: number;

  @Field()
  barcode!: string;

  @Field()
  color!: string;

  @Field()
  size!: string;

  @Field(() => Int)
  quantity!: number;
}
