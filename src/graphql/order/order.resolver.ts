import { Arg, Mutation, Resolver } from 'type-graphql';
import eventStore from '../../core/event-store/event-store';
import { PaymentConfirmedEvent } from './events/payment-confirmed.event';

@Resolver()
export class CartResolver {
  @Mutation(() => String)
  async confirmPayment(@Arg('orderId') orderId: string, @Arg('paymentConfirmation') paymentConfirmation: string) {
    try {
      await eventStore.execute(new PaymentConfirmedEvent({ orderId, paymentConfirmation }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  cancelOrder() {
    return 'not implemented yet';
  }
}