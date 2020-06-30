import { Moment } from 'moment';

export interface IProductSet {
  id?: number;
  name?: string;
  noOfPerson?: number;
  isExclusive?: boolean;
  modifinedDate?: Moment;
}

export class ProductSet implements IProductSet {
  constructor(
    public id?: number,
    public name?: string,
    public noOfPerson?: number,
    public isExclusive?: boolean,
    public modifinedDate?: Moment
  ) {
    this.isExclusive = this.isExclusive || false;
  }
}
