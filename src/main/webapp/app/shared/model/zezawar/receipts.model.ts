import { Moment } from 'moment';

export interface IReceipts {
  id?: number;
  receiptNo?: string;
  issuedDate?: Moment;
  printCount?: number;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  orderId?: number;
  invoiceId?: number;
}

export class Receipts implements IReceipts {
  constructor(
    public id?: number,
    public receiptNo?: string,
    public issuedDate?: Moment,
    public printCount?: number,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public orderId?: number,
    public invoiceId?: number
  ) {}
}
