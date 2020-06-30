import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';

export interface IPhotos {
  id?: number;
  blobId?: string;
  thumbnailUrl?: string;
  originalUrl?: string;
  bannerTallUrl?: string;
  bannerWideUrl?: string;
  circleUrl?: string;
  sharpenedUrl?: string;
  squareUrl?: string;
  watermarkUrl?: string;
  priority?: number;
  defaultInd?: boolean;
  stockItems?: IStockItems[];
}

export class Photos implements IPhotos {
  constructor(
    public id?: number,
    public blobId?: string,
    public thumbnailUrl?: string,
    public originalUrl?: string,
    public bannerTallUrl?: string,
    public bannerWideUrl?: string,
    public circleUrl?: string,
    public sharpenedUrl?: string,
    public squareUrl?: string,
    public watermarkUrl?: string,
    public priority?: number,
    public defaultInd?: boolean,
    public stockItems?: IStockItems[]
  ) {
    this.defaultInd = this.defaultInd || false;
  }
}
