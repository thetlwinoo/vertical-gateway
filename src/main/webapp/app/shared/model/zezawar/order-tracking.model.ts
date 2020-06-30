import { Moment } from 'moment';

export interface IOrderTracking {
  id?: number;
  carrierTrackingNumber?: string;
  eventDetails?: any;
  eventDate?: Moment;
  orderId?: number;
  trackingEventName?: string;
  trackingEventId?: number;
}

export class OrderTracking implements IOrderTracking {
  constructor(
    public id?: number,
    public carrierTrackingNumber?: string,
    public eventDetails?: any,
    public eventDate?: Moment,
    public orderId?: number,
    public trackingEventName?: string,
    public trackingEventId?: number
  ) {}
}
