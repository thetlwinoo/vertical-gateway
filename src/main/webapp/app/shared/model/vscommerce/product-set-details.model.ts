export interface IProductSetDetails {
  id?: number;
  subGroupNo?: number;
  subGroupMinCount?: number;
  subGroupMinTotal?: number;
  minCount?: number;
  maxCount?: number;
  isOptional?: boolean;
  productSetName?: string;
  productSetId?: number;
  productName?: string;
  productId?: number;
  productCategoryName?: string;
  productCategoryId?: number;
}

export class ProductSetDetails implements IProductSetDetails {
  constructor(
    public id?: number,
    public subGroupNo?: number,
    public subGroupMinCount?: number,
    public subGroupMinTotal?: number,
    public minCount?: number,
    public maxCount?: number,
    public isOptional?: boolean,
    public productSetName?: string,
    public productSetId?: number,
    public productName?: string,
    public productId?: number,
    public productCategoryName?: string,
    public productCategoryId?: number
  ) {
    this.isOptional = this.isOptional || false;
  }
}
