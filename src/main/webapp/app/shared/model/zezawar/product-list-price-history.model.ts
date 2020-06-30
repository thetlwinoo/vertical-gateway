import { Moment } from 'moment';

export interface IProductListPriceHistory {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  listPrice?: number;
  modifiedDate?: Moment;
  productName?: string;
  productId?: number;
}

export class ProductListPriceHistory implements IProductListPriceHistory {
  constructor(
    public id?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public listPrice?: number,
    public modifiedDate?: Moment,
    public productName?: string,
    public productId?: number
  ) {}
}
