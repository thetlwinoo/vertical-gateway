import { Moment } from 'moment';

export interface ICreditCardType {
  id?: number;
  name?: string;
  modifiedDate?: Moment;
}

export class CreditCardType implements ICreditCardType {
  constructor(public id?: number, public name?: string, public modifiedDate?: Moment) {}
}
