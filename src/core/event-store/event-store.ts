import { IEvent } from './event-message.interface';
import { EventHandlers } from './event.handlers';

const store: Record<string, IEvent> = {};

class EventStore {
  execute(event: IEvent) {
    const eventId: string = `${Object.keys(store).length + 1}`;
    store[eventId] = { ...event, id: eventId };
    EventHandlers.handle(event);
  }
}

export default new EventStore();
