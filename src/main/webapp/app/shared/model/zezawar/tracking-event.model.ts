export interface ITrackingEvent {
  id?: number;
  name?: string;
}

export class TrackingEvent implements ITrackingEvent {
  constructor(public id?: number, public name?: string) {}
}
