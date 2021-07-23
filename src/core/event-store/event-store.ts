import { EventEntity } from '../../repostory/mongo/entitites/event.entity';
import { IEvent } from './event-message.interface';
import { EventHandlers } from './event.handlers';

class EventStore {
  async execute(event: IEvent) {
    // store the event
    await EventEntity.create(event);
    // call event handler, do not wait for it
    void EventHandlers.handle(event);
  }
}

export default new EventStore();
