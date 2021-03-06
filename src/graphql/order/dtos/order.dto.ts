import { Field, ID, ObjectType } from 'type-graphql';
import { OrderStatusEnum } from '../../../types/enums/order-status.enum';
import { Item } from '../../cart/dtos/item.dto';

@ObjectType()
export class Order {
  @Field(() => ID)
  _id!: string;

  @Field(() => ID)
  userId!: string;

  @Field()
  status!: string;

  @Field(() => [Item])
  items!: Item[];

  @Field(() => String, { nullable: true })
  paymentConfirmation?: string;

  isCancelled?: boolean;

  constructor(userId: string, items: Item[] = [], status: OrderStatusEnum = OrderStatusEnum.Pending) {
    this.userId = userId;
    this.items = items;
    this.status = status;
  }
}
