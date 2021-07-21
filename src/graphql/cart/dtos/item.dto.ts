import { Field, ID, InputType, ObjectType } from 'type-graphql';

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

  @Field()
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

  @Field()
  quantity!: number;
}
