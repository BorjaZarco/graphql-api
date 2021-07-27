import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  _id?: string;

  @Field(() => ID)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class EmailInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
