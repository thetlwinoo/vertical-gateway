import { Moment } from 'moment';

export interface IDiscount {
  id?: number;
  name?: string;
  description?: string;
  validFrom?: Moment;
  validTo?: Moment;
  supplierName?: string;
  supplierId?: number;
  discountTypeName?: string;
  discountTypeId?: number;
}

export class Discount implements IDiscount {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public validFrom?: Moment,
    public validTo?: Moment,
    public supplierName?: string,
    public supplierId?: number,
    public discountTypeName?: string,
    public discountTypeId?: number
  ) {}
}
