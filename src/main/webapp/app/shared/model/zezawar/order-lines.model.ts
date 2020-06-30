import { Moment } from 'moment';
import { OrderLineStatus } from 'app/shared/model/enumerations/order-line-status.model';

export interface IOrderLines {
  id?: number;
  quantity?: number;
  description?: string;
  unitPrice?: number;
  unitPriceDiscount?: number;
  lineTotal?: number;
  taxRate?: number;
  pickedQuantity?: number;
  pickingCompletedWhen?: Moment;
  status?: OrderLineStatus;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  reviewLineId?: number;
  supplierName?: string;
  supplierId?: number;
  stockItemName?: string;
  stockItemId?: number;
  packageTypeName?: string;
  packageTypeId?: number;
  orderId?: number;
}

export class OrderLines implements IOrderLines {
  constructor(
    public id?: number,
    public quantity?: number,
    public description?: string,
    public unitPrice?: number,
    public unitPriceDiscount?: number,
    public lineTotal?: number,
    public taxRate?: number,
    public pickedQuantity?: number,
    public pickingCompletedWhen?: Moment,
    public status?: OrderLineStatus,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public reviewLineId?: number,
    public supplierName?: string,
    public supplierId?: number,
    public stockItemName?: string,
    public stockItemId?: number,
    public packageTypeName?: string,
    public packageTypeId?: number,
    public orderId?: number
  ) {}
}
