import { Moment } from 'moment';

export interface ICardTypes {
  id?: number;
  name?: string;
  issuerId?: number;
  modifiedDate?: Moment;
}

export class CardTypes implements ICardTypes {
  constructor(public id?: number, public name?: string, public issuerId?: number, public modifiedDate?: Moment) {}
}
