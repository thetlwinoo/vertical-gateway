import { Moment } from 'moment';

export interface ICardTypeCreditCards {
  id?: number;
  name?: string;
  startNumber?: number;
  endNumber?: number;
  modifiedDate?: Moment;
}

export class CardTypeCreditCards implements ICardTypeCreditCards {
  constructor(
    public id?: number,
    public name?: string,
    public startNumber?: number,
    public endNumber?: number,
    public modifiedDate?: Moment
  ) {}
}
