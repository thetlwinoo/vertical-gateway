export interface IProductCategory {
  id?: number;
  name?: string;
  shortLabel?: string;
  sortOrder?: number;
  iconFont?: string;
  parentName?: string;
  parentId?: number;
  iconThumbnailUrl?: string;
  iconId?: number;
}

export class ProductCategory implements IProductCategory {
  constructor(
    public id?: number,
    public name?: string,
    public shortLabel?: string,
    public sortOrder?: number,
    public iconFont?: string,
    public parentName?: string,
    public parentId?: number,
    public iconThumbnailUrl?: string,
    public iconId?: number
  ) {}
}
