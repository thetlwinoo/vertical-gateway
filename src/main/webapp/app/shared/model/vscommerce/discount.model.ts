import { Moment } from 'moment';

export interface IDiscount {
  id?: number;
  name?: string;
  description?: string;
  modifiedDate?: Moment;
}

export class Discount implements IDiscount {
  constructor(public id?: number, public name?: string, public description?: string, public modifiedDate?: Moment) {}
}
