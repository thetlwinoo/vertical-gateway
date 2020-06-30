export interface IProductBrand {
  id?: number;
  name?: string;
  shortLabel?: string;
  sortOrder?: number;
  iconFont?: string;
  thumbnailUrl?: string;
  supplierName?: string;
  supplierId?: number;
  iconThumbnailUrl?: string;
  iconId?: number;
}

export class ProductBrand implements IProductBrand {
  constructor(
    public id?: number,
    public name?: string,
    public shortLabel?: string,
    public sortOrder?: number,
    public iconFont?: string,
    public thumbnailUrl?: string,
    public supplierName?: string,
    public supplierId?: number,
    public iconThumbnailUrl?: string,
    public iconId?: number
  ) {}
}
