import { Moment } from 'moment';

export interface IDiscountDetails {
  id?: number;
  amount?: number;
  isPercentage?: boolean;
  isAllowCombinationDiscount?: boolean;
  isFinalBillDiscount?: boolean;
  name?: string;
  startCount?: number;
  endCount?: number;
  multiplyCount?: number;
  modifiedDate?: Moment;
  discountName?: string;
  discountId?: number;
  productName?: string;
  productId?: number;
  productCategoryName?: string;
  productCategoryId?: number;
}

export class DiscountDetails implements IDiscountDetails {
  constructor(
    public id?: number,
    public amount?: number,
    public isPercentage?: boolean,
    public isAllowCombinationDiscount?: boolean,
    public isFinalBillDiscount?: boolean,
    public name?: string,
    public startCount?: number,
    public endCount?: number,
    public multiplyCount?: number,
    public modifiedDate?: Moment,
    public discountName?: string,
    public discountId?: number,
    public productName?: string,
    public productId?: number,
    public productCategoryName?: string,
    public productCategoryId?: number
  ) {
    this.isPercentage = this.isPercentage || false;
    this.isAllowCombinationDiscount = this.isAllowCombinationDiscount || false;
    this.isFinalBillDiscount = this.isFinalBillDiscount || false;
  }
}
