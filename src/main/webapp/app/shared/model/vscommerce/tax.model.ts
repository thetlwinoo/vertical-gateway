import { Moment } from 'moment';

export interface ITax {
  id?: number;
  code?: string;
  name?: string;
  rate?: number;
  modifiedDate?: Moment;
  taxClassName?: string;
  taxClassId?: number;
}

export class Tax implements ITax {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public rate?: number,
    public modifiedDate?: Moment,
    public taxClassName?: string,
    public taxClassId?: number
  ) {}
}
