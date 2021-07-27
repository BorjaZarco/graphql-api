import { model, Schema } from 'mongoose';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

const EventSchema = new Schema(
  {
    type: { type: String, enum: [...Object.values(EventTypeEnum)] },
    data: { type: Schema.Types.Mixed },
  },
  { timestamps: { updatedAt: false } }
);

export const EventEntity = model<Event>('event-store', EventSchema, 'event-store');
