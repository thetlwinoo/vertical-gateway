import { Moment } from 'moment';

export interface IProductSetDetailPrice {
  id?: number;
  price?: number;
  startCount?: number;
  endCount?: number;
  multiplyCount?: number;
  startDate?: Moment;
  endDate?: Moment;
  modifiedDate?: Moment;
  productSetDetailId?: number;
}

export class ProductSetDetailPrice implements IProductSetDetailPrice {
  constructor(
    public id?: number,
    public price?: number,
    public startCount?: number,
    public endCount?: number,
    public multiplyCount?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public modifiedDate?: Moment,
    public productSetDetailId?: number
  ) {}
}
