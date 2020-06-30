import { Moment } from 'moment';

export interface IReviewLines {
  id?: number;
  stockItemRating?: number;
  stockItemReview?: any;
  attachedUrl?: string;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  reviewImageThumbnailUrl?: string;
  reviewImageId?: number;
  stockItemId?: number;
  orderLineId?: number;
  reviewId?: number;
}

export class ReviewLines implements IReviewLines {
  constructor(
    public id?: number,
    public stockItemRating?: number,
    public stockItemReview?: any,
    public attachedUrl?: string,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public reviewImageThumbnailUrl?: string,
    public reviewImageId?: number,
    public stockItemId?: number,
    public orderLineId?: number,
    public reviewId?: number
  ) {}
}
