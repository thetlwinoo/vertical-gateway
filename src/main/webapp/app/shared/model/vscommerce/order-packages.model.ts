import { Moment } from 'moment';
import { IOrderLines } from 'app/shared/model/vscommerce/order-lines.model';

export interface IOrderPackages {
  id?: number;
  expectedDeliveryDate?: Moment;
  comments?: string;
  deliveryInstructions?: string;
  internalComments?: string;
  packageShippingFee?: number;
  packageShippingFeeDiscount?: number;
  packagePrice?: number;
  packageSubTotal?: number;
  packageTaxAmount?: number;
  packageVoucherDiscount?: number;
  packagePromotionDiscount?: number;
  pickingCompletedWhen?: Moment;
  customerReviewedOn?: Moment;
  sellerRating?: number;
  sellerReview?: any;
  deliveryRating?: number;
  deliveryReview?: any;
  reviewAsAnonymous?: boolean;
  completedReview?: boolean;
  orderPackageDetails?: any;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  orderLineLists?: IOrderLines[];
  supplierName?: string;
  supplierId?: number;
  deliveryMethodName?: string;
  deliveryMethodId?: number;
  specialDealsId?: number;
  orderId?: number;
}

export class OrderPackages implements IOrderPackages {
  constructor(
    public id?: number,
    public expectedDeliveryDate?: Moment,
    public comments?: string,
    public deliveryInstructions?: string,
    public internalComments?: string,
    public packageShippingFee?: number,
    public packageShippingFeeDiscount?: number,
    public packagePrice?: number,
    public packageSubTotal?: number,
    public packageTaxAmount?: number,
    public packageVoucherDiscount?: number,
    public packagePromotionDiscount?: number,
    public pickingCompletedWhen?: Moment,
    public customerReviewedOn?: Moment,
    public sellerRating?: number,
    public sellerReview?: any,
    public deliveryRating?: number,
    public deliveryReview?: any,
    public reviewAsAnonymous?: boolean,
    public completedReview?: boolean,
    public orderPackageDetails?: any,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public orderLineLists?: IOrderLines[],
    public supplierName?: string,
    public supplierId?: number,
    public deliveryMethodName?: string,
    public deliveryMethodId?: number,
    public specialDealsId?: number,
    public orderId?: number
  ) {
    this.reviewAsAnonymous = this.reviewAsAnonymous || false;
    this.completedReview = this.completedReview || false;
  }
}
