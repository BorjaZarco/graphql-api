import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id?: string;

  @Field(() => ID)
  email!: string;

  @Field(() => ID)
  password!: string;
}

@InputType()
export class EmailInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
