import { Moment } from 'moment';

export interface IDiscountTypes {
  id?: number;
  name?: string;
  modifiedDate?: Moment;
}

export class DiscountTypes implements IDiscountTypes {
  constructor(public id?: number, public name?: string, public modifiedDate?: Moment) {}
}
