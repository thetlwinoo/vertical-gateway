export interface IProductCategory {
  id?: number;
  name?: string;
  shortLabel?: string;
  sortOrder?: number;
  iconFont?: string;
  justForYouInd?: boolean;
  showInNavInd?: boolean;
  activeInd?: boolean;
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
    public justForYouInd?: boolean,
    public showInNavInd?: boolean,
    public activeInd?: boolean,
    public parentName?: string,
    public parentId?: number,
    public iconThumbnailUrl?: string,
    public iconId?: number
  ) {
    this.justForYouInd = this.justForYouInd || false;
    this.showInNavInd = this.showInNavInd || false;
    this.activeInd = this.activeInd || false;
  }
}
