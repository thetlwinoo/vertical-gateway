export interface IProductTags {
  id?: number;
  name?: string;
}

export class ProductTags implements IProductTags {
  constructor(public id?: number, public name?: string) {}
}
