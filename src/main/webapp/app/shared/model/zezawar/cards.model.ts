import { Moment } from 'moment';

export interface ICards {
  id?: number;
  number?: string;
  modifiedDate?: Moment;
}

export class Cards implements ICards {
  constructor(public id?: number, public number?: string, public modifiedDate?: Moment) {}
}
