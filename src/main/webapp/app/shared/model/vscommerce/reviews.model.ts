import { Moment } from 'moment';
import { IReviewLines } from 'app/shared/model/vscommerce/review-lines.model';

export interface IReviews {
  id?: number;
  customerName?: string;
  emailAddress?: string;
  reviewDate?: Moment;
  sellerRating?: number;
  sellerReview?: any;
  deliveryRating?: number;
  deliveryReview?: any;
  reviewAsAnonymous?: boolean;
  completedReview?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  reviewLineLists?: IReviewLines[];
  orderId?: number;
}

export class Reviews implements IReviews {
  constructor(
    public id?: number,
    public customerName?: string,
    public emailAddress?: string,
    public reviewDate?: Moment,
    public sellerRating?: number,
    public sellerReview?: any,
    public deliveryRating?: number,
    public deliveryReview?: any,
    public reviewAsAnonymous?: boolean,
    public completedReview?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public reviewLineLists?: IReviewLines[],
    public orderId?: number
  ) {
    this.reviewAsAnonymous = this.reviewAsAnonymous || false;
    this.completedReview = this.completedReview || false;
  }
}
